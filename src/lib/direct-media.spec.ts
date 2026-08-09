import { afterEach, describe, expect, it, vi } from 'vitest'
import { createDirectFetchClient, createDirectFetchHost, isLocalNetworkUrl, primeLocalNetworkAccess } from './direct-media'

afterEach(() => vi.restoreAllMocks())

describe('direct media access', () => {
  it.each([
    'http://192.168.31.206:5244/video.mkv',
    'http://10.0.0.2/video.mkv',
    'http://172.16.0.2/video.mkv',
    'http://localhost:5244/video.mkv',
    'http://nas.local/video.mkv',
    'http://[::1]/video.mkv',
  ])('recognises local source %s', (url) => {
    expect(isLocalNetworkUrl(url)).toBe(true)
  })

  it.each([
    'https://media.example.com/video.mkv',
    'http://172.32.0.2/video.mkv',
    'not a url',
  ])('does not classify public source %s as local', (url) => {
    expect(isLocalNetworkUrl(url)).toBe(false)
  })

  it('primes permission with a bodyless request to the original URL', async () => {
    const url = 'http://192.168.31.206:5244/video.mkv'
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }))

    await expect(primeLocalNetworkAccess({ kind: 'url', url })).resolves.toBe(true)
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'HEAD', mode: 'cors', redirect: 'follow', cache: 'no-store',
    })
  })

  it('falls back to one direct byte when HEAD is blocked', async () => {
    const url = 'http://192.168.31.206:5244/video.mkv'
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockRejectedValueOnce(new TypeError('HEAD blocked'))
      .mockResolvedValueOnce(new Response(new Uint8Array([0]), { status: 206 }))

    await expect(primeLocalNetworkAccess({ kind: 'url', url })).resolves.toBe(true)
    expect(fetchMock.mock.calls[1]).toEqual([url, {
      headers: { Range: 'bytes=0-0' }, mode: 'cors', redirect: 'follow', cache: 'no-store',
    }])
  })

  it('does not add a request in front of a public media source', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
    await expect(primeLocalNetworkAccess({ kind: 'url', url: 'https://media.example.com/video.mkv' })).resolves.toBe(false)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('bridges a Range response without changing the source URL', async () => {
    const url = 'http://192.168.31.206:5244/video.mkv'
    const fetcher = vi.fn(async () => new Response(new Uint8Array([7]), {
      status: 206,
      headers: { 'content-range': 'bytes 0-0/99' },
    }))
    const host = createDirectFetchHost(url, fetcher)
    const client = createDirectFetchClient(host.port)

    const response = await client.fetch(url, { headers: { Range: 'bytes=0-0' }, mode: 'cors' })

    expect(response.status).toBe(206)
    expect(response.headers.get('content-range')).toBe('bytes 0-0/99')
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([7])
    expect(fetcher).toHaveBeenCalledWith(url, expect.objectContaining({
      headers: [['range', 'bytes=0-0']],
      mode: 'cors',
    }))
    client.close()
    host.close()
  })

  it('rejects a bridged request that changes the media URL', async () => {
    const host = createDirectFetchHost('http://192.168.31.206/video.mkv', vi.fn())
    const client = createDirectFetchClient(host.port)
    await expect(client.fetch('http://192.168.31.206/other.mkv')).rejects.toThrow('FETCH_BRIDGE_URL_REJECTED')
    client.close()
    host.close()
  })
})
