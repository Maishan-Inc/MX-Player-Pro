import { afterEach, describe, expect, it, vi } from 'vitest'
import { RangeLoader } from './range-loader'

const source = { kind: 'url' as const, url: 'https://media.example.test/video.mkv' }

function response(status: number, body: number[], headers: Record<string, string> = {}) {
  return new Response(new Uint8Array(body), { status, headers })
}

function rangeHeaderOf(call: unknown[] | undefined): string | undefined {
  const init = call?.[1] as { headers?: Record<string, string> } | undefined
  return init?.headers?.Range
}

function modeOf(call: unknown[] | undefined): RequestMode | undefined {
  return (call?.[1] as RequestInit | undefined)?.mode
}

/** Serve any Range request out of a fixture body, recording each requested span. */
function serveRanges(body: number[]) {
  const requests: Array<[number, number]> = []
  const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
    const header = (init as { headers?: Record<string, string> } | undefined)?.headers?.Range
    const match = header?.match(/bytes=(\d+)-(\d+)/)
    if (!match) return response(200, [], { 'content-length': String(body.length), 'accept-ranges': 'bytes' })
    const start = Number(match[1])
    const end = Math.min(Number(match[2]), body.length - 1)
    requests.push([start, end])
    return response(206, body.slice(start, end + 1), { 'content-range': `bytes ${start}-${end}/${body.length}` })
  })
  return { requests, fetchMock }
}

afterEach(() => vi.restoreAllMocks())

describe('RangeLoader', () => {
  it('verifies Range support when HEAD omits Accept-Ranges', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(response(200, [], { 'content-length': '4' }))
      .mockResolvedValueOnce(response(206, [0], { 'content-range': 'bytes 0-0/4', 'content-type': 'video/x-matroska' }))

    const loader = new RangeLoader(source, 2)
    const probe = await loader.probe()

    expect(probe.acceptsRanges).toBe(true)
    expect(loader.supportsRange).toBe(true)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[0][0]).toBe(source.url)
    expect(modeOf(fetchMock.mock.calls[0])).toBe('cors')
    expect(rangeHeaderOf(fetchMock.mock.calls[1])).toBe('bytes=0-0')
    expect(fetchMock.mock.calls[1][0]).toBe(source.url)
    expect(modeOf(fetchMock.mock.calls[1])).toBe('cors')
  })

  it('reads by slicing a full response when the server ignores Range', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(response(200, [], { 'content-length': '4' }))
      .mockResolvedValueOnce(response(200, [10, 20, 30, 40], { 'content-length': '4' }))
      .mockResolvedValueOnce(response(200, [10, 20, 30, 40], { 'content-length': '4' }))

    const loader = new RangeLoader(source, 2)
    await loader.probe()

    await expect(loader.read(2, 2)).resolves.toEqual(new Uint8Array([30, 40]))
    expect(loader.supportsRange).toBe(false)
  })

  it('returns the requested bytes from a 206 response', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(response(200, [], { 'content-length': '4', 'accept-ranges': 'bytes' }))
      .mockResolvedValueOnce(response(206, [30, 40], { 'content-range': 'bytes 2-3/4' }))

    const loader = new RangeLoader(source, 2)
    await loader.probe()

    await expect(loader.read(2, 2)).resolves.toEqual(new Uint8Array([30, 40]))
    expect(rangeHeaderOf(fetchMock.mock.calls[1])).toBe('bytes=2-3')
    expect(fetchMock.mock.calls[1][0]).toBe(source.url)
    expect(modeOf(fetchMock.mock.calls[1])).toBe('cors')
  })
})

describe('RangeLoader chunk cache', () => {
  const body = Array.from({ length: 64 }, (_value, index) => index)

  async function loaded(chunkSize = 8) {
    const served = serveRanges(body)
    const loader = new RangeLoader(source, chunkSize)
    await loader.probe()
    served.requests.length = 0
    return { loader, ...served }
  }

  it('never refetches a byte range it already holds', async () => {
    const { loader, requests } = await loaded()
    await loader.read(0, 8)
    const afterFirst = requests.length
    await loader.read(0, 8)
    await loader.read(2, 4)
    expect(requests.length).toBe(afterFirst)
  })

  it('fetches only the extra chunk when a read crosses a window boundary', async () => {
    const { loader, requests } = await loaded()
    // The old cache keyed on (base, length), so growing the window past the chunk
    // boundary re-downloaded everything from the base again.
    await loader.readWindow(0, 8)
    requests.length = 0
    const window = await loader.readWindow(0, 12)
    expect(window.base).toBe(0)
    expect(Array.from(window.bytes.subarray(0, 12))).toEqual(body.slice(0, 12))
    // Chunk 0 is cached; only chunk 1 is missing, and it is requested once.
    expect(requests.every(([start]) => start >= 8)).toBe(true)
  })

  it('coalesces a run of missing chunks into one request', async () => {
    const { loader, requests } = await loaded()
    await loader.read(0, 32)
    const spanning = requests.filter(([start, end]) => end - start + 1 > 8)
    expect(spanning.length).toBeGreaterThan(0)
    expect(requests.filter(([start]) => start < 32).length).toBeLessThan(4)
  })

  it('serves overlapping concurrent reads with a single request per chunk', async () => {
    const { loader, requests } = await loaded()
    await Promise.all([loader.read(0, 8), loader.read(0, 8), loader.read(4, 4)])
    expect(requests.filter(([start]) => start === 0).length).toBe(1)
  })

  it('retries once after a transient network failure', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(response(200, [], { 'content-length': '8', 'accept-ranges': 'bytes' }))
      .mockRejectedValueOnce(new TypeError('network error'))
      .mockResolvedValueOnce(response(206, [1, 2, 3, 4, 5, 6, 7, 8], { 'content-range': 'bytes 0-7/8' }))

    const loader = new RangeLoader(source, 8)
    await loader.probe()
    await expect(loader.read(0, 4)).resolves.toEqual(new Uint8Array([1, 2, 3, 4]))
    expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(3)
  })

  it('treats 416 as the end of the representation instead of failing', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(response(200, [], { 'content-length': '8', 'accept-ranges': 'bytes' }))
      .mockResolvedValueOnce(response(416, []))

    const loader = new RangeLoader(source, 8)
    await loader.probe()
    await expect(loader.read(0, 8)).resolves.toEqual(new Uint8Array())
  })
})
