import type { MKVPacket } from '../types'

export type BufferKind = 'video' | 'audio'

/**
 * Compressed-packet buffer sitting between the demuxer and the decoders.
 *
 * The decoders can only hold a fraction of a second of work — decoded VideoFrames
 * are GPU-backed and have to stay shallow — so using them as the network buffer
 * caps the read-ahead at roughly one second and starves the pipeline on any remote
 * hiccup. Buffering the encoded packets instead costs ordinary heap memory
 * (megabytes, not gigabytes) and lets the demuxer run tens of seconds ahead of the
 * playhead.
 *
 * `end` is tracked separately from queue contents: a packet handed to a decoder has
 * left the queue but is still buffered downstream, so it must keep counting towards
 * the buffered horizon.
 */
export class PacketBuffer {
  private readonly queues: Record<BufferKind, MKVPacket[]> = { video: [], audio: [] }
  private readonly ends: Record<BufferKind, number> = { video: Number.NEGATIVE_INFINITY, audio: Number.NEGATIVE_INFINITY }
  private readonly active: Record<BufferKind, boolean> = { video: false, audio: false }
  private bytes = 0

  /** Only active tracks constrain the buffered horizon. */
  setActive(kind: BufferKind, active: boolean): void {
    this.active[kind] = active
    if (active) return
    this.dropQueue(kind)
    this.ends[kind] = Number.NEGATIVE_INFINITY
  }

  isActive(kind: BufferKind): boolean { return this.active[kind] }

  push(kind: BufferKind, packet: MKVPacket): void {
    if (!this.active[kind]) return
    this.queues[kind].push(packet)
    this.bytes += packet.data.byteLength
    // Blocks arrive in decode order, so with B-frames the presentation timestamps are
    // not monotonic; the horizon is the highest one seen, not the most recent one.
    this.ends[kind] = Math.max(this.ends[kind], packet.timestamp / 1_000_000)
  }

  peek(kind: BufferKind): MKVPacket | undefined { return this.queues[kind][0] }

  /** Highest timestamp seen on one track, or -Infinity if it has produced nothing. */
  endOf(kind: BufferKind): number { return this.ends[kind] }

  shift(kind: BufferKind): MKVPacket | undefined {
    const packet = this.queues[kind].shift()
    if (packet) this.bytes -= packet.data.byteLength
    return packet
  }

  pending(kind: BufferKind): number { return this.queues[kind].length }

  get byteLength(): number { return this.bytes }

  get length(): number { return this.queues.video.length + this.queues.audio.length }

  /**
   * Media time up to which every active track has data. Reporting the minimum (not
   * the maximum) is what makes this safe to drive playback with: a position is only
   * playable once both audio and video have reached it.
   */
  get bufferedEnd(): number {
    let end = Number.POSITIVE_INFINITY
    for (const kind of ['video', 'audio'] as const) {
      if (!this.active[kind]) continue
      end = Math.min(end, this.ends[kind])
    }
    return Number.isFinite(end) ? end : Number.NEGATIVE_INFINITY
  }

  bufferedAhead(now: number): number {
    const end = this.bufferedEnd
    return end === Number.NEGATIVE_INFINITY ? 0 : Math.max(0, end - now)
  }

  /** Forget everything: a seek invalidates both the queues and the horizon. */
  clear(): void {
    this.dropQueue('video')
    this.dropQueue('audio')
    this.ends.video = Number.NEGATIVE_INFINITY
    this.ends.audio = Number.NEGATIVE_INFINITY
    this.bytes = 0
  }

  private dropQueue(kind: BufferKind): void {
    for (const packet of this.queues[kind]) this.bytes -= packet.data.byteLength
    this.queues[kind] = []
    if (this.bytes < 0) this.bytes = 0
  }
}
