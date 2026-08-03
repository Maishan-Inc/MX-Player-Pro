import { afterEach, describe, expect, it, vi } from 'vitest'
import { RangeLoader } from './range-loader'

const source = { kind: 'url' as const, url: 'https://media.example.test/video.mkv' }

function response(status: number, body: number[], headers: Record<string, string> = {}) {
  return new Response(new Uint8Array(body), { status, headers })
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
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({ headers: { Range: 'bytes=0-0' } })
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
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({ headers: { Range: 'bytes=2-3' } })
  })
})
