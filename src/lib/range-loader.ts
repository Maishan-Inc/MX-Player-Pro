import type { ProbeInfo, SourceDescriptor } from '../types'

const DEFAULT_CHUNK_SIZE = 8 * 1024 * 1024
const MAX_CACHE_ENTRIES = 6

export class RangeLoader {
  private readonly source: SourceDescriptor
  private readonly chunkSize: number
  private readonly cache = new Map<string, Uint8Array>()
  private size: number | null = null
  private contentType: string | null = null
  private rangeSupport = false
  private lastProbe: ProbeInfo = { size: null, contentType: null, acceptsRanges: false, status: null, cors: 'unknown' }

  constructor(source: SourceDescriptor, chunkSize = DEFAULT_CHUNK_SIZE) {
    this.source = source
    this.chunkSize = chunkSize
  }

  async probe(): Promise<ProbeInfo> {
    if (this.source.kind === 'file') {
      this.size = this.source.file.size
      this.contentType = this.source.file.type || 'video/x-matroska'
      this.rangeSupport = true
      this.lastProbe = { size: this.size, contentType: this.contentType, acceptsRanges: true, status: 200, cors: 'ok' }
      return this.lastProbe
    }

    try {
      const response = await fetch(this.source.url, { method: 'HEAD', redirect: 'follow' })
      const length = Number(response.headers.get('content-length'))
      const acceptRanges = response.headers.get('accept-ranges')?.toLowerCase() === 'bytes'
      this.size = Number.isFinite(length) && length > 0 ? length : null
      this.contentType = response.headers.get('content-type')
      this.rangeSupport = acceptRanges
      this.lastProbe = {
        size: this.size,
        contentType: this.contentType,
        acceptsRanges: acceptRanges,
        status: response.status,
        cors: 'ok',
        message: response.ok ? undefined : `探测请求返回 HTTP ${response.status}`,
      }
      return this.lastProbe
    } catch {
      try {
        const response = await fetch(this.source.url, {
          headers: { Range: 'bytes=0-0' },
          redirect: 'follow',
        })
        const contentRange = response.headers.get('content-range')
        const match = contentRange?.match(/\/([0-9]+)$/)
        this.size = match ? Number(match[1]) : null
        this.contentType = response.headers.get('content-type')
        this.rangeSupport = response.status === 206
        this.lastProbe = {
          size: this.size,
          contentType: this.contentType,
          acceptsRanges: this.rangeSupport,
          status: response.status,
          cors: 'ok',
          message: this.rangeSupport ? undefined : '资源未返回 206 Partial Content',
        }
        return this.lastProbe
      } catch (error) {
        this.lastProbe = {
          size: null,
          contentType: null,
          acceptsRanges: false,
          status: null,
          cors: 'blocked',
          message: error instanceof Error ? error.message : '跨域或网络请求被阻止',
        }
        return this.lastProbe
      }
    }
  }

  async read(offset: number, length: number): Promise<Uint8Array> {
    if (offset < 0 || length <= 0) throw new Error('READ_RANGE_INVALID')
    const boundedLength = this.size === null ? length : Math.min(length, Math.max(0, this.size - offset))
    if (boundedLength <= 0) return new Uint8Array()
    const key = `${offset}:${boundedLength}`
    const cached = this.cache.get(key)
    if (cached) return cached

    const bytes = this.source.kind === 'file'
      ? new Uint8Array(await this.source.file.slice(offset, offset + boundedLength).arrayBuffer())
      : await this.readRemote(offset, boundedLength)
    this.cache.set(key, bytes)
    while (this.cache.size > MAX_CACHE_ENTRIES) {
      const oldest = this.cache.keys().next().value
      if (oldest) this.cache.delete(oldest)
      else break
    }
    return bytes
  }

  async readChunk(offset: number): Promise<Uint8Array> {
    return this.read(offset, this.chunkSize)
  }

  private async readRemote(offset: number, length: number): Promise<Uint8Array> {
    const end = offset + length - 1
    const response = await fetch(this.source.kind === 'url' ? this.source.url : '', {
      headers: { Range: `bytes=${offset}-${end}` },
      redirect: 'follow',
    })
    if (!response.ok) throw new Error(`RANGE_HTTP_${response.status}`)
    if (offset > 0 && response.status !== 206) throw new Error('RANGE_UNSUPPORTED')
    const bytes = new Uint8Array(await response.arrayBuffer())
    if (response.status === 206) this.rangeSupport = true
    if (!this.size) {
      const contentRange = response.headers.get('content-range')?.match(/\/([0-9]+)$/)
      if (contentRange) this.size = Number(contentRange[1])
    }
    return bytes
  }

  get totalSize() { return this.size }
  get supportsRange() { return this.rangeSupport }
  get probeInfo() { return this.lastProbe }
}
