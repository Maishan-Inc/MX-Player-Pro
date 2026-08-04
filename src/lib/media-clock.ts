export interface MediaClock {
  readonly currentTime: number
  start(): void
  stop(): void
  reset(mediaTime: number): void
  setRate(rate: number): void
}

export interface AudioSpan {
  startAt: number
  endAt: number
  mediaStart: number
  rate: number
}

/** Wall-clock driven clock, used until audio primes and whenever there is no audio track. */
export class MonotonicClock implements MediaClock {
  private anchorMedia = 0
  private anchorWall = 0
  private rate = 1
  private running = false
  private readonly now: () => number

  constructor(now: () => number = () => performance.now()) {
    this.now = now
    this.anchorWall = now()
  }

  get currentTime(): number {
    if (!this.running) return this.anchorMedia
    return this.anchorMedia + ((this.now() - this.anchorWall) / 1000) * this.rate
  }

  start(): void {
    if (this.running) return
    this.anchorWall = this.now()
    this.running = true
  }

  stop(): void {
    if (!this.running) return
    this.anchorMedia = this.currentTime
    this.running = false
  }

  reset(mediaTime: number): void {
    this.anchorMedia = mediaTime
    this.anchorWall = this.now()
  }

  setRate(rate: number): void {
    // Re-anchor first so the new rate is not applied retroactively to elapsed time.
    this.anchorMedia = this.currentTime
    this.anchorWall = this.now()
    this.rate = rate
  }

  get isRunning(): boolean { return this.running }
}

/**
 * Maps AudioContext.currentTime onto media time using the spans that scheduleAudio
 * actually queued. Anchoring on the audio context (rather than performance.now())
 * makes pause/resume correct for free: suspend() freezes currentTime and preserves
 * absolute-time scheduling of already-started sources.
 */
export class AudioAnchoredClock implements MediaClock {
  private spans: AudioSpan[] = []
  private hold = 0
  private contextTime: () => number

  constructor(contextTime: () => number) {
    this.contextTime = contextTime
  }

  get primed(): boolean { return this.spans.length > 0 }

  addSpan(span: AudioSpan): void {
    this.spans.push(span)
    this.spans.sort((left, right) => left.startAt - right.startAt)
  }

  get currentTime(): number {
    const time = this.contextTime()
    let last: AudioSpan | null = null
    for (const span of this.spans) {
      if (time >= span.startAt && time < span.endAt) {
        return span.mediaStart + (time - span.startAt) * span.rate
      }
      if (span.startAt <= time) last = span
    }
    // Underrun: hold at the media end of the last span that started. Never run
    // ahead of decoded audio, otherwise video races during a stall.
    if (last) return last.mediaStart + (last.endAt - last.startAt) * last.rate
    return this.hold
  }

  prune(): void {
    const time = this.contextTime()
    this.spans = this.spans.filter((span) => span.endAt >= time - 1)
  }

  start(): void { /* driven by the audio context */ }

  stop(): void { /* suspend() freezes contextTime, which freezes this clock */ }

  reset(mediaTime: number): void {
    this.spans = []
    this.hold = mediaTime
  }

  setRate(): void { /* spans carry their own rate; scheduleAudio re-emits them */ }

  get scheduledUntil(): number {
    return this.spans.reduce((max, span) => Math.max(max, span.endAt), 0)
  }

  get mediaEnd(): number {
    const last = this.spans[this.spans.length - 1]
    return last ? last.mediaStart + (last.endAt - last.startAt) * last.rate : this.hold
  }
}

/**
 * Reports the audio clock once it primes, and the monotonic clock before that.
 * While an audio track exists but has not primed, the monotonic clock is held (not
 * started) so video cannot advance before audio exists.
 */
export class MasterClock implements MediaClock {
  readonly monotonic: MonotonicClock
  readonly audio: AudioAnchoredClock | null
  private lastReported = 0

  constructor(monotonic: MonotonicClock, audio: AudioAnchoredClock | null = null) {
    this.monotonic = monotonic
    this.audio = audio
  }

  get currentTime(): number {
    const value = this.audio?.primed ? this.audio.currentTime : this.monotonic.currentTime
    // Never report a backward jump across the monotonic -> audio switch.
    this.lastReported = Math.max(this.lastReported, value)
    return this.lastReported
  }

  start(): void {
    this.monotonic.start()
    this.audio?.start()
  }

  stop(): void {
    this.monotonic.stop()
    this.audio?.stop()
  }

  reset(mediaTime: number): void {
    this.lastReported = mediaTime
    this.monotonic.reset(mediaTime)
    this.audio?.reset(mediaTime)
  }

  setRate(rate: number): void {
    this.monotonic.setRate(rate)
    this.audio?.setRate(rate)
  }
}
