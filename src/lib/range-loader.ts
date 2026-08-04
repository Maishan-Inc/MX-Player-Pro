import type { ProbeInfo, SourceDescriptor } from '../types'

const DEFAULT_CHUNK_SIZE = 8 * 1024 * 1024
const MAX_CACHE_ENTRIES = 3

export class RangeLoader {
  private readonly source: SourceDescriptor
  private readonly chunkSize: number
  private readonly cache = new Map<string, Uint8Array>()
  private size: number | null = null
  private contentType: string | null = null
  private rangeSupport = false
  private fullBody: Uint8Array | null = null
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

    let head: Response | null = null
    try {
      head = await fetch(this.source.url, { method: 'HEAD', redirect: 'follow' })
    } catch {
      // A blocked or unsupported HEAD is followed by a CORS-readable GET probe.
    }

    if (head) {
      this.size = this.parseLength(head.headers.get('content-length'))
      this.contentType = head.headers.get('content-type')
      this.rangeSupport = head.headers.get('accept-ranges')?.toLowerCase() === 'bytes'
      this.lastProbe = {
        size: this.size,
        contentType: this.contentType,
        acceptsRanges: this.rangeSupport,
        status: head.status,
        cors: 'ok',
        message: head.ok && this.rangeSupport ? undefined : head.ok ? '正在验证 GET Range 响应' : `探测请求返回 HTTP ${head.status}`,
      }
      if (head.ok && this.rangeSupport) return this.lastProbe
    }

    try {
      const response = await fetch(this.source.url, {
        headers: { Range: 'bytes=0-0' },
        redirect: 'follow',
      })
      this.updateFromResponse(response)
      if (response.body) await response.body.cancel()
      return this.lastProbe
    } catch (error) {
      this.lastProbe = {
        size: this.size,
        contentType: this.contentType,
        acceptsRanges: false,
        status: head?.status || null,
        cors: 'blocked',
        message: error instanceof Error ? error.message : '跨域或网络请求被阻止',
      }
      return this.lastProbe
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

  /**
   * Read a chunk-aligned window covering at least `minLength` bytes from `offset`.
   * Aligning the base lets consecutive clusters inside one window share a cache key
   * instead of missing on every arbitrary cluster offset. When the request spans past
   * the aligned window, one merged read covers the whole extent rather than two.
   */
  async readWindow(offset: number, minLength: number): Promise<{ bytes: Uint8Array; base: number }> {
    if (offset < 0 || minLength <= 0) throw new Error('READ_RANGE_INVALID')
    const base = Math.floor(offset / this.chunkSize) * this.chunkSize
    const needed = offset - base + minLength
    const length = Math.max(this.chunkSize, needed)
    const bytes = await this.read(base, length)
    return { bytes, base }
  }

  private async readRemote(offset: number, length: number): Promise<Uint8Array> {
    if (this.fullBody) return this.fullBody.slice(offset, offset + length)
    const end = offset + length - 1
    const response = await fetch(this.source.kind === 'url' ? this.source.url : '', {
      headers: { Range: `bytes=${offset}-${end}` },
      redirect: 'follow',
    })
    if (!response.ok) throw new Error(`RANGE_HTTP_${response.status}`)
    const bytes = new Uint8Array(await response.arrayBuffer())
    if (response.status === 206) {
      this.updateFromResponse(response)
      return bytes
    }

    // Some download servers ignore Range and return the whole representation.
    // Keep it once, then serve all later offset reads locally.
    if (response.status === 200) {
      this.fullBody = bytes
      this.size = bytes.byteLength
      this.contentType = response.headers.get('content-type') || this.contentType
      this.rangeSupport = false
      this.lastProbe = {
        size: this.size,
        contentType: this.contentType,
        acceptsRanges: false,
        status: response.status,
        cors: 'ok',
        message: '资源未返回 206 Partial Content，将使用完整响应读取',
      }
      return bytes.slice(offset, offset + length)
    }

    throw new Error(`RANGE_HTTP_${response.status}`)
  }

  private parseLength(value: string | null): number | null {
    const length = Number(value)
    return Number.isFinite(length) && length > 0 ? length : null
  }

  private updateFromResponse(response: Response) {
    const contentRange = response.headers.get('content-range')?.match(/^bytes\s+(\d+)-(\d+)\/(\d+|\*)$/i)
    const total = contentRange?.[3] && contentRange[3] !== '*' ? Number(contentRange[3]) : null
    if (total && Number.isFinite(total)) this.size = total
    this.contentType = response.headers.get('content-type') || this.contentType
    this.rangeSupport = response.status === 206
    this.lastProbe = {
      size: this.size,
      contentType: this.contentType,
      acceptsRanges: this.rangeSupport,
      status: response.status,
      cors: 'ok',
      message: this.rangeSupport ? undefined : '资源未返回 206 Partial Content',
    }
  }

  get totalSize() { return this.size }
  get supportsRange() { return this.rangeSupport }
  get probeInfo() { return this.lastProbe }
}
