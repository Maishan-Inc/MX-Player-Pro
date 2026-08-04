export interface Closeable {
  readonly timestamp: number
  close(): void
}

export const VIDEO_QUEUE_HIGH = 12
export const VIDEO_QUEUE_TARGET = 6
/** Draw a frame that becomes due within one vsync rather than holding it a whole tick. */
export const FRAME_EARLY_TOLERANCE = 0.004
export const CATCHUP_SKIP_LATE_BY = 0.25

export interface TakeResult<T> {
  frame: T
  skipDraw: boolean
}

/**
 * Bounded queue of decoded frames. Every frame leaves through exactly one of
 * close-on-push, close-on-overflow, close-on-take, or flush, so no VideoFrame is
 * leaked to the GPU.
 */
export class FrameQueue<T extends Closeable> {
  private items: T[] = []
  private floor = Number.NEGATIVE_INFINITY
  dropped = 0

  push(item: T): void {
    if (item.timestamp < this.floor) {
      item.close()
      this.dropped += 1
      return
    }
    this.items.push(item)
    // Drop-oldest: overflow means we are already behind, and the oldest frame is
    // the one take() would discard next anyway. Dropping the newest starves the head.
    while (this.items.length > VIDEO_QUEUE_HIGH) {
      const oldest = this.items.shift()
      oldest?.close()
      this.dropped += 1
    }
  }

  take(now: number): TakeResult<T> | null {
    const due = now + FRAME_EARLY_TOLERANCE
    if (!this.items.length || this.items[0].timestamp > due) return null

    let frame = this.items.shift() as T
    // Select the newest frame whose presentation time has arrived; late frames are
    // dropped as a consequence of that selection rather than by a separate rule.
    while (this.items.length && this.items[0].timestamp <= due) {
      frame.close()
      this.dropped += 1
      frame = this.items.shift() as T
    }

    const lateBy = now - frame.timestamp
    const remainingDue = this.items.filter((item) => item.timestamp <= due).length
    const skipDraw = lateBy > CATCHUP_SKIP_LATE_BY && remainingDue >= 2
    return { frame, skipDraw }
  }

  setFloor(time: number): void {
    this.floor = time
    const kept: T[] = []
    for (const item of this.items) {
      if (item.timestamp < time) { item.close(); this.dropped += 1 }
      else kept.push(item)
    }
    this.items = kept
  }

  clearFloor(): void {
    this.floor = Number.NEGATIVE_INFINITY
  }

  flush(): void {
    for (const item of this.items) item.close()
    this.items = []
  }

  get length(): number { return this.items.length }

  get horizon(): number {
    return this.items.length ? this.items[this.items.length - 1].timestamp : Number.NEGATIVE_INFINITY
  }
}
