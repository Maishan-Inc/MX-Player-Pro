import type { ProbeInfo, SourceDescriptor } from '../types'

/**
 * Chunk size is deliberately small. Reads are cached per aligned chunk and missing
 * runs are coalesced into one request, so a small chunk costs nothing in round trips
 * but keeps time-to-first-frame short: an 8 MB window had to land in full before the
 * first cluster could be parsed.
 */
const DEFAULT_CHUNK_SIZE = 1024 * 1024
const MAX_CACHE_BYTES = 128 * 1024 * 1024
/** Chunks fetched in the background after a read, so the demuxer rarely waits. */
const PREFETCH_CHUNKS = 4
/** A server that ignores Range forces the whole body into memory; refuse the absurd. */
const MAX_FULL_BODY_BYTES = 512 * 1024 * 1024
const RETRY_DELAY_MS = 200

export class RangeLoader {
  private readonly source: SourceDescriptor
  private readonly chunkSize: number
  /** Aligned chunk index -> bytes. Insertion order doubles as LRU order. */
  private readonly chunks = new Map<number, Uint8Array<ArrayBuffer>>()
  private readonly inflight = new Map<number, Promise<void>>()
  private cachedBytes = 0
  private downloadedBytes = 0
  private size: number | null = null
  private contentType: string | null = null
  private rangeSupport = false
  private fullBody: Uint8Array<ArrayBuffer> | null = null
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

  async read(offset: number, length: number): Promise<Uint8Array<ArrayBuffer>> {
    if (offset < 0 || length <= 0) throw new Error('READ_RANGE_INVALID')
    const boundedLength = this.size === null ? length : Math.min(length, Math.max(0, this.size - offset))
    if (boundedLength <= 0) return new Uint8Array()

    if (this.source.kind === 'file') {
      // Slicing a File is effectively free, so it needs no cache of its own.
      return new Uint8Array(await this.source.file.slice(offset, offset + boundedLength).arrayBuffer())
    }
    if (this.fullBody) return this.fullBody.slice(offset, offset + boundedLength)

    const first = Math.floor(offset / this.chunkSize)
    const last = Math.floor((offset + boundedLength - 1) / this.chunkSize)
    await this.ensureChunks(first, last)
    // ensureChunks may discover the server ignores Range and switch to a whole-body
    // read. The cast is load-bearing: the check above narrowed this.fullBody to null
    // and the compiler cannot see that the await changed it.
    const whole = this.fullBody as Uint8Array<ArrayBuffer> | null
    if (whole) return whole.slice(offset, offset + boundedLength)
    this.prefetch(last + 1, last + PREFETCH_CHUNKS)
    return this.assemble(offset, boundedLength)
  }

  async readChunk(offset: number): Promise<Uint8Array<ArrayBuffer>> {
    return this.read(offset, this.chunkSize)
  }

  /**
   * Read a window covering at least `minLength` bytes from `offset`.
   *
   * For remote sources the base is chunk-aligned so consecutive clusters land inside
   * the same cached chunks. Because the cache is keyed per chunk rather than per
   * (offset, length) pair, a cluster that straddles the end of a window now fetches
   * only the one extra chunk instead of re-downloading the entire window.
   */
  async readWindow(offset: number, minLength: number): Promise<{ bytes: Uint8Array<ArrayBuffer>; base: number }> {
    if (offset < 0 || minLength <= 0) throw new Error('READ_RANGE_INVALID')
    if (this.source.kind === 'file') {
      return { bytes: await this.read(offset, minLength), base: offset }
    }
    const base = Math.floor(offset / this.chunkSize) * this.chunkSize
    const needed = offset - base + minLength
    const length = Math.max(this.chunkSize, needed)
    const bytes = await this.read(base, length)
    return { bytes, base }
  }

  /** Fetch every missing chunk in the range, coalescing consecutive gaps. */
  private async ensureChunks(first: number, last: number): Promise<void> {
    const waits: Array<Promise<void>> = []
    let runStart = -1
    for (let index = first; index <= last + 1; index += 1) {
      const missing = index <= last && !this.chunks.has(index) && !this.inflight.has(index)
      if (missing && runStart < 0) runStart = index
      if (!missing && runStart >= 0) {
        waits.push(this.startRun(runStart, index - 1))
        runStart = -1
      }
      const pending = index <= last ? this.inflight.get(index) : undefined
      if (pending) waits.push(pending)
    }
    if (waits.length) await Promise.all(waits)
  }

  private startRun(first: number, last: number): Promise<void> {
    const run = this.fetchRun(first, last).finally(() => {
      for (let index = first; index <= last; index += 1) {
        if (this.inflight.get(index) === run) this.inflight.delete(index)
      }
    })
    for (let index = first; index <= last; index += 1) this.inflight.set(index, run)
    return run
  }

  /** Warm the chunks after a read without blocking it. */
  private prefetch(first: number, last: number): void {
    if (this.fullBody || this.size === null) return
    const ceiling = Math.floor(Math.max(0, this.size - 1) / this.chunkSize)
    const end = Math.min(last, ceiling)
    for (let index = first; index <= end; index += 1) {
      if (this.chunks.has(index) || this.inflight.has(index)) continue
      let runEnd = index
      while (runEnd + 1 <= end && !this.chunks.has(runEnd + 1) && !this.inflight.has(runEnd + 1)) runEnd += 1
      void this.startRun(index, runEnd).catch(() => undefined)
      index = runEnd
    }
  }

  private async fetchRun(first: number, last: number): Promise<void> {
    const offset = first * this.chunkSize
    const requestedEnd = (last + 1) * this.chunkSize - 1
    const end = this.size === null ? requestedEnd : Math.min(requestedEnd, this.size - 1)
    if (end < offset) return

    const response = await this.fetchWithRetry({ Range: `bytes=${offset}-${end}` })
    if (response.status === 416) {
      // Past the end of the representation: treat it as the real EOF.
      if (this.size === null || this.size > offset) this.size = offset
      return
    }
    if (!response.ok) throw new Error(`RANGE_HTTP_${response.status}`)
    const bytes = new Uint8Array(await response.arrayBuffer()) as Uint8Array<ArrayBuffer>
    this.downloadedBytes += bytes.byteLength

    if (response.status === 206) {
      this.updateFromResponse(response)
      if (!bytes.byteLength) {
        if (this.size === null || this.size > offset) this.size = offset
        return
      }
      this.storeChunks(offset, bytes)
      return
    }

    // Some download servers ignore Range and return the whole representation.
    // Keep it once, then serve all later offset reads locally.
    if (response.status === 200) {
      if (bytes.byteLength > MAX_FULL_BODY_BYTES) throw new Error('RANGE_UNSUPPORTED:服务器忽略 Range 且文件过大')
      this.fullBody = bytes
      this.size = bytes.byteLength
      this.contentType = response.headers.get('content-type') || this.contentType
      this.rangeSupport = false
      this.chunks.clear()
      this.cachedBytes = 0
      this.lastProbe = {
        size: this.size,
        contentType: this.contentType,
        acceptsRanges: false,
        status: response.status,
        cors: 'ok',
        message: '资源未返回 206 Partial Content，将使用完整响应读取',
      }
      return
    }

    throw new Error(`RANGE_HTTP_${response.status}`)
  }

  private async fetchWithRetry(headers: Record<string, string>): Promise<Response> {
    const url = this.source.kind === 'url' ? this.source.url : ''
    let lastError: unknown = null
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await fetch(url, { headers, redirect: 'follow' })
        // One transient 5xx should cost a retry, not the whole playback session.
        if (response.status >= 500 && attempt === 0) {
          await delay(RETRY_DELAY_MS)
          continue
        }
        return response
      } catch (error) {
        lastError = error
        if (attempt === 0) await delay(RETRY_DELAY_MS)
      }
    }
    throw lastError instanceof Error ? lastError : new Error('RANGE_NETWORK_ERROR')
  }

  private storeChunks(offset: number, bytes: Uint8Array<ArrayBuffer>): void {
    for (let cursor = 0; cursor < bytes.byteLength; cursor += this.chunkSize) {
      const index = (offset + cursor) / this.chunkSize
      if (!Number.isInteger(index)) continue
      const slice = bytes.slice(cursor, cursor + this.chunkSize)
      const existing = this.chunks.get(index)
      if (existing) this.cachedBytes -= existing.byteLength
      this.chunks.set(index, slice)
      this.cachedBytes += slice.byteLength
    }
    this.evict()
  }

  private evict(): void {
    while (this.cachedBytes > MAX_CACHE_BYTES) {
      const oldest = this.chunks.keys().next()
      if (oldest.done) break
      const bytes = this.chunks.get(oldest.value)
      this.chunks.delete(oldest.value)
      this.cachedBytes -= bytes?.byteLength ?? 0
    }
  }

  /** Copy the requested span out of the cached chunks, touching each for LRU. */
  private assemble(offset: number, length: number): Uint8Array<ArrayBuffer> {
    const out = new Uint8Array(length) as Uint8Array<ArrayBuffer>
    let written = 0
    while (written < length) {
      const position = offset + written
      const index = Math.floor(position / this.chunkSize)
      const chunk = this.chunks.get(index)
      if (!chunk) break
      // Re-insert so the most recently used chunk is the last eviction candidate.
      this.chunks.delete(index)
      this.chunks.set(index, chunk)
      const within = position - index * this.chunkSize
      if (within >= chunk.byteLength) break
      const take = Math.min(chunk.byteLength - within, length - written)
      out.set(chunk.subarray(within, within + take), written)
      written += take
    }
    return written === length ? out : out.slice(0, written)
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
  /** Bytes actually pulled over the network, for the player's stats panel. */
  get networkBytes() { return this.downloadedBytes }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
