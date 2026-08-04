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

  /**
   * Drop spans that are well behind the playhead, but never the last one.
   *
   * Emptying the list would clear `primed`, which hands authority back to the
   * monotonic clock — and that clock has been free-running through the very stall
   * that emptied the list, so it reports a time far ahead of the decoded audio.
   * Keeping the final span means an underrun holds at real media time instead.
   */
  prune(): void {
    if (this.spans.length <= 1) return
    const time = this.contextTime()
    const kept = this.spans.filter((span) => span.endAt >= time - 1)
    this.spans = kept.length ? kept : this.spans.slice(-1)
  }

  start(): void { /* driven by the audio context */ }

  stop(): void { /* suspend() freezes contextTime, which freezes this clock */ }

  reset(mediaTime: number): void {
    this.spans = []
    this.hold = mediaTime
  }

  /** Spans carry their own rate; scheduleAudio re-emits them after a rate change. */
  setRate(_rate: number): void { /* no anchor to adjust */ }

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
 *
 * Whenever audio is authoritative the monotonic clock is re-anchored to it, so if
 * audio ever stops being authoritative the fallback continues from real media time
 * rather than from a value that drifted during a stall. There is deliberately no
 * ratchet on the reported value: a clock that can only move forward turns one
 * network stall into a permanent offset, which is what desynchronised subtitles and
 * made every decoded frame look late.
 */
export class MasterClock implements MediaClock {
  readonly monotonic: MonotonicClock
  readonly audio: AudioAnchoredClock | null
  private held = false
  private holdValue = 0

  constructor(monotonic: MonotonicClock, audio: AudioAnchoredClock | null = null) {
    this.monotonic = monotonic
    this.audio = audio
  }

  get currentTime(): number {
    if (this.held) return this.holdValue
    if (!this.audio?.primed) return this.monotonic.currentTime
    const value = this.audio.currentTime
    // Keep the fallback in sync with the authority so switching sources is seamless.
    this.monotonic.reset(value)
    return value
  }

  start(): void {
    this.held = false
    // With an audio track the audio context is the authority. Running the wall clock
    // before it primes is exactly what used to leave the readout ahead of the media,
    // so time simply holds at the anchor until the first audio span lands.
    if (!this.audio) this.monotonic.start()
    this.audio?.start()
  }

  stop(): void {
    this.monotonic.stop()
    this.audio?.stop()
  }

  /**
   * Freeze the reported time while rebuffering. The monotonic clock is stopped so it
   * cannot accumulate drift, and the frozen value is what the UI shows — the time
   * readout stops instead of running away from the picture.
   */
  hold(): void {
    if (this.held) return
    this.holdValue = this.currentTime
    this.held = true
    this.monotonic.stop()
  }

  resume(): void {
    if (!this.held) return
    this.held = false
    this.monotonic.reset(this.holdValue)
    if (!this.audio) this.monotonic.start()
  }

  get isHeld(): boolean { return this.held }

  reset(mediaTime: number): void {
    this.held = false
    this.holdValue = mediaTime
    this.monotonic.reset(mediaTime)
    this.audio?.reset(mediaTime)
  }

  setRate(rate: number): void {
    this.monotonic.setRate(rate)
    this.audio?.setRate(rate)
  }
}
