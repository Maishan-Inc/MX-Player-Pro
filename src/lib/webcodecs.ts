import type { MKVPacket, TrackInfo } from '../types'
import { FrameQueue, type Closeable } from './frame-queue'
import { AudioAnchoredClock, MasterClock, MonotonicClock } from './media-clock'
import { AUDIO_HORIZON, shouldRequestMore } from './backpressure'

interface VideoChunk { new (init: { type: 'key' | 'delta'; timestamp: number; duration?: number; data: BufferSource }): unknown }
interface AudioChunk { new (init: { type: 'key' | 'delta'; timestamp: number; duration?: number; data: BufferSource }): unknown }
interface VideoDecoderLike {
  decodeQueueSize: number
  state?: string
  configure(config: Record<string, unknown>): void
  decode(chunk: unknown): void
  reset(): void
  close(): void
  flush(): Promise<void>
}
interface AudioDecoderLike {
  decodeQueueSize: number
  state?: string
  configure(config: Record<string, unknown>): void
  decode(chunk: unknown): void
  reset(): void
  close(): void
  flush(): Promise<void>
}
interface AudioDataLike {
  numberOfFrames: number
  numberOfChannels: number
  sampleRate: number
  timestamp: number
  copyTo(destination: Float32Array, options: { planeIndex: number }): void
  close(): void
}
interface VideoFrameLike extends Closeable {
  timestamp: number
  close(): void
}

type DecoderConstructor = {
  new (init: { output: (frame: unknown) => void; error: (error: DOMException) => void }): VideoDecoderLike
  isConfigSupported?: (config: Record<string, unknown>) => Promise<{ supported?: boolean }>
}

type AudioDecoderConstructor = {
  new (init: { output: (data: AudioDataLike) => void; error: (error: DOMException) => void }): AudioDecoderLike
  isConfigSupported?: (config: Record<string, unknown>) => Promise<{ supported?: boolean }>
}

export interface EngineStatus {
  videoReady: boolean
  audioReady: boolean
  error?: string
}

/** Wraps a decoded VideoFrame so FrameQueue can treat timestamps as seconds. */
class QueuedFrame implements Closeable {
  readonly timestamp: number
  private readonly frame: VideoFrameLike
  private closed = false

  constructor(frame: VideoFrameLike) {
    this.frame = frame
    this.timestamp = (frame.timestamp || 0) / 1_000_000
  }

  get image(): CanvasImageSource { return this.frame as unknown as CanvasImageSource }

  close(): void {
    if (this.closed) return
    this.closed = true
    this.frame.close()
  }
}

export class WebCodecsEngine {
  private readonly canvas: HTMLCanvasElement
  private readonly onStatus: (status: EngineStatus) => void
  private ctx: CanvasRenderingContext2D | null = null
  private videoDecoder: VideoDecoderLike | null = null
  private audioDecoder: AudioDecoderLike | null = null
  private videoConfig: Record<string, unknown> | null = null
  private audioConfig: Record<string, unknown> | null = null
  private audioContext: AudioContext | null = null
  private gainNode: GainNode | null = null
  private readonly frames = new FrameQueue<QueuedFrame>()
  private clock = new MasterClock(new MonotonicClock())
  private audioClock: AudioAnchoredClock | null = null
  private scheduledSources = new Set<AudioBufferSourceNode>()
  private pendingAudio: AudioDataLike[] = []
  private audioScheduleEnd = 0
  private audioMediaEnd = Number.NEGATIVE_INFINITY
  private lastVideoTimestamp = Number.NEGATIVE_INFINITY
  private playbackRate = 1
  private volume = 1
  private playing = false
  private awaitingKeyframe = true
  private previewPending = false
  private seekTarget = 0
  private raf: number | null = null

  constructor(canvas: HTMLCanvasElement, onStatus: (status: EngineStatus) => void) {
    this.canvas = canvas
    this.onStatus = onStatus
  }

  get currentTime(): number { return this.clock.currentTime }

  async configure(video: TrackInfo | undefined, audio: TrackInfo | undefined): Promise<void> {
    this.close()
    const globals = globalThis as unknown as {
      VideoDecoder?: DecoderConstructor
      AudioDecoder?: AudioDecoderConstructor
      EncodedVideoChunk?: VideoChunk
      EncodedAudioChunk?: AudioChunk
    }
    if (!globals.VideoDecoder || !globals.EncodedVideoChunk) {
      this.onStatus({ videoReady: false, audioReady: false, error: '当前浏览器不支持 WebCodecs VideoDecoder' })
      return
    }

    this.ctx = this.canvas.getContext('2d')
    this.audioClock = null
    this.clock = new MasterClock(new MonotonicClock())
    this.awaitingKeyframe = true
    this.seekTarget = 0

    let videoReady = false
    let audioReady = false

    if (video?.codec && video.width && video.height) {
      const config = { codec: video.codec, codedWidth: video.width, codedHeight: video.height, description: video.codecPrivate }
      try {
        const supported = await globals.VideoDecoder.isConfigSupported?.(config)
        if (supported?.supported === false) {
          this.onStatus({ videoReady: false, audioReady, error: `DECODER_UNSUPPORTED_VIDEO:${video.codec}` })
        } else {
          const Decoder = globals.VideoDecoder
          this.videoConfig = config
          this.videoDecoder = new Decoder({
            output: (frame) => this.acceptFrame(frame as VideoFrameLike),
            error: (error) => this.failVideo(error),
          })
          this.videoDecoder.configure(config)
          videoReady = true
          this.canvas.width = video.width
          this.canvas.height = video.height
        }
      } catch (error) {
        this.onStatus({ videoReady: false, audioReady, error: `DECODER_ERROR_VIDEO:${describe(error)}` })
      }
    }

    if (audio?.codec && globals.AudioDecoder && globals.EncodedAudioChunk) {
      const config = { codec: audio.codec, sampleRate: audio.sampleRate || 48_000, numberOfChannels: audio.channels || 2, description: audio.codecPrivate }
      try {
        const supported = await globals.AudioDecoder.isConfigSupported?.(config)
        if (supported?.supported === false) {
          this.onStatus({ videoReady, audioReady: false, error: `DECODER_UNSUPPORTED_AUDIO:${audio.codec}` })
        } else {
          const Decoder = globals.AudioDecoder
          this.audioConfig = config
          this.audioDecoder = new Decoder({
            output: (data) => this.onAudioData(data),
            error: (error) => this.failAudio(error),
          })
          this.audioDecoder.configure(config)
          audioReady = true
        }
      } catch (error) {
        this.onStatus({ videoReady, audioReady: false, error: `DECODER_ERROR_AUDIO:${describe(error)}` })
      }
    }

    this.onStatus({ videoReady, audioReady })
  }

  enqueue(packet: MKVPacket, videoTrackId: number | undefined, audioTrackId: number | undefined) {
    const globals = globalThis as unknown as { EncodedVideoChunk?: VideoChunk; EncodedAudioChunk?: AudioChunk }
    if (packet.trackId === videoTrackId && this.videoDecoder && globals.EncodedVideoChunk) {
      // The decoder's first chunk after any reset must be a keyframe, otherwise it
      // raises DataError. Only correct keyframe flags make this gate meaningful.
      if (this.awaitingKeyframe && !packet.key) return
      this.awaitingKeyframe = false
      try {
        this.videoDecoder.decode(new globals.EncodedVideoChunk({
          type: packet.key ? 'key' : 'delta',
          timestamp: packet.timestamp,
          duration: packet.duration || undefined,
          data: packet.data,
        }))
        this.lastVideoTimestamp = Math.max(this.lastVideoTimestamp, packet.timestamp / 1_000_000)
      } catch (error) {
        this.failVideo(error)
      }
    }
    if (packet.trackId === audioTrackId && this.audioDecoder && globals.EncodedAudioChunk) {
      try {
        this.audioDecoder.decode(new globals.EncodedAudioChunk({
          type: 'key',
          timestamp: packet.timestamp,
          duration: packet.duration || undefined,
          data: packet.data,
        }))
      } catch (error) {
        this.failAudio(error)
      }
    }
  }

  /** True when the demuxer should be asked for another cluster. */
  needsPackets(playing = this.playing, eof = false, inFlight = false): boolean {
    const now = this.clock.currentTime
    const buffered = Math.max(this.lastVideoTimestamp, this.audioMediaEnd)
    const context = this.audioContext
    return shouldRequestMore({
      bufferedAhead: buffered === Number.NEGATIVE_INFINITY ? 0 : buffered - now,
      frameQueueLength: this.frames.length,
      decodeQueueSize: Math.max(this.videoDecoder?.decodeQueueSize ?? 0, this.audioDecoder?.decodeQueueSize ?? 0),
      audioHorizonAhead: context ? Math.max(0, this.audioScheduleEnd - context.currentTime) : 0,
      playing,
      eof,
      inFlight,
    })
  }

  play() {
    this.playing = true
    this.previewPending = false
    this.clock.start()
    void this.audioContext?.resume()
    this.drainPendingAudio()
    this.startRenderLoop()
  }

  pause() {
    this.playing = false
    this.clock.stop()
    // suspend() freezes AudioContext.currentTime, which freezes the audio clock and
    // stops already-scheduled sources from being heard.
    void this.audioContext?.suspend()
    this.stopRenderLoop()
  }

  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value))
    if (this.gainNode) this.gainNode.gain.value = this.volume
  }

  setPlaybackRate(value: number) {
    const rate = Math.max(0.25, Math.min(4, value))
    this.playbackRate = rate
    this.clock.setRate(rate)
    this.stopScheduledAudio()
    this.audioScheduleEnd = this.audioContext?.currentTime ?? 0
  }

  seekTo(mediaTime: number) {
    this.seekTarget = mediaTime
    this.clock.reset(mediaTime)
    this.frames.flush()
    this.frames.setFloor(mediaTime)
    this.stopScheduledAudio()
    this.pendingAudio.forEach((data) => data.close())
    this.pendingAudio = []
    this.audioMediaEnd = Number.NEGATIVE_INFINITY
    this.lastVideoTimestamp = Number.NEGATIVE_INFINITY
    this.resetDecoders()
    // The queue was just flushed, so the preview frame cannot be drawn yet; arm it
    // for the first frame that arrives from the new position instead.
    this.previewPending = !this.playing
  }

  reset() {
    this.seekTo(this.clock.currentTime)
  }

  async finish(): Promise<void> {
    // Without a flush the trailing GOP is never emitted and video ends early.
    try { await this.videoDecoder?.flush() } catch { /* decoder already torn down */ }
    try { await this.audioDecoder?.flush() } catch { /* decoder already torn down */ }
  }

  close() {
    this.stopRenderLoop()
    this.playing = false
    this.previewPending = false
    this.frames.flush()
    this.stopScheduledAudio()
    this.pendingAudio.forEach((data) => data.close())
    this.pendingAudio = []
    // close() on an already-closed decoder throws InvalidStateError.
    try { this.videoDecoder?.close() } catch { /* already closed */ }
    try { this.audioDecoder?.close() } catch { /* already closed */ }
    this.videoDecoder = null
    this.audioDecoder = null
    void this.audioContext?.close().catch(() => undefined)
    this.audioContext = null
    this.gainNode = null
    this.audioClock = null
    this.ctx = null
  }

  private resetDecoders() {
    this.awaitingKeyframe = true
    if (this.videoDecoder && this.videoConfig) {
      try {
        this.videoDecoder.reset()
        // reset() returns the decoder to the unconfigured state, so it must be
        // configured again before the next decode call.
        this.videoDecoder.configure(this.videoConfig)
      } catch {
        this.recreateVideoDecoder()
      }
    }
    if (this.audioDecoder && this.audioConfig) {
      try {
        this.audioDecoder.reset()
        this.audioDecoder.configure(this.audioConfig)
      } catch {
        this.recreateAudioDecoder()
      }
    }
  }

  private recreateVideoDecoder() {
    const globals = globalThis as unknown as { VideoDecoder?: DecoderConstructor }
    if (!globals.VideoDecoder || !this.videoConfig) return
    try { this.videoDecoder?.close() } catch { /* already closed */ }
    try {
      this.videoDecoder = new globals.VideoDecoder({
        output: (frame) => this.acceptFrame(frame as VideoFrameLike),
        error: (error) => this.failVideo(error),
      })
      this.videoDecoder.configure(this.videoConfig)
    } catch (error) {
      this.failVideo(error)
    }
  }

  private recreateAudioDecoder() {
    const globals = globalThis as unknown as { AudioDecoder?: AudioDecoderConstructor }
    if (!globals.AudioDecoder || !this.audioConfig) return
    try { this.audioDecoder?.close() } catch { /* already closed */ }
    try {
      this.audioDecoder = new globals.AudioDecoder({
        output: (data) => this.onAudioData(data),
        error: (error) => this.failAudio(error),
      })
      this.audioDecoder.configure(this.audioConfig)
    } catch (error) {
      this.failAudio(error)
    }
  }

  /**
   * Tear the decoder down and null it. enqueue() already null-checks, so packets are
   * then ignored instead of throwing InvalidStateError on every later decode, and
   * audio plus subtitles keep working after a video decoder failure.
   */
  private failVideo(error: unknown) {
    try { this.videoDecoder?.close() } catch { /* already closed */ }
    this.videoDecoder = null
    this.frames.flush()
    this.onStatus({ videoReady: false, audioReady: this.audioDecoder !== null, error: `DECODER_ERROR_VIDEO:${describe(error)}` })
  }

  private failAudio(error: unknown) {
    try { this.audioDecoder?.close() } catch { /* already closed */ }
    this.audioDecoder = null
    this.stopScheduledAudio()
    this.onStatus({ videoReady: this.videoDecoder !== null, audioReady: false, error: `DECODER_ERROR_AUDIO:${describe(error)}` })
  }

  private startRenderLoop() {
    if (this.raf !== null) return
    const tick = () => {
      this.raf = requestAnimationFrame(tick)
      this.renderTick()
    }
    this.raf = requestAnimationFrame(tick)
  }

  private stopRenderLoop() {
    if (this.raf === null) return
    cancelAnimationFrame(this.raf)
    this.raf = null
  }

  private renderTick() {
    this.audioClock?.prune()
    this.drainPendingAudio()
    const picked = this.frames.take(this.clock.currentTime)
    if (!picked) return
    if (!picked.skipDraw && this.ctx) {
      this.ctx.drawImage(picked.frame.image, 0, 0, this.canvas.width, this.canvas.height)
    }
    picked.frame.close()
  }

  /** Show the target frame after seeking while paused. */
  private renderPreviewFrame() {
    const picked = this.frames.take(this.seekTarget)
    if (!picked) return
    if (this.ctx) this.ctx.drawImage(picked.frame.image, 0, 0, this.canvas.width, this.canvas.height)
    picked.frame.close()
  }

  /**
   * Single entry point for decoded frames. While paused after a seek the render
   * loop is not running, so the first arriving frame has to paint the preview.
   */
  private acceptFrame(frame: VideoFrameLike) {
    this.frames.push(new QueuedFrame(frame))
    if (!this.previewPending) return
    this.previewPending = false
    this.renderPreviewFrame()
  }

  private onAudioData(data: AudioDataLike) {
    const mediaStart = (data.timestamp || 0) / 1_000_000
    const mediaEnd = mediaStart + data.numberOfFrames / data.sampleRate
    // Drop pre-roll audio that belongs before the seek target.
    if (mediaEnd < this.seekTarget) { data.close(); return }
    this.pendingAudio.push(data)
    this.drainPendingAudio()
  }

  private drainPendingAudio() {
    if (!this.pendingAudio.length) return
    const context = this.ensureAudioContext()
    if (!context) return
    while (this.pendingAudio.length) {
      // Refuse to schedule beyond the horizon; the surplus stays pending and
      // propagates back through needsPackets() as backpressure.
      if (this.audioScheduleEnd - context.currentTime >= AUDIO_HORIZON) return
      const data = this.pendingAudio.shift()
      if (!data) return
      this.scheduleAudio(context, data)
    }
  }

  private ensureAudioContext(): AudioContext | null {
    if (this.audioContext) return this.audioContext
    const Ctor = (globalThis as unknown as { AudioContext?: typeof AudioContext }).AudioContext
    if (!Ctor) return null
    this.audioContext = new Ctor()
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.value = this.volume
    this.gainNode.connect(this.audioContext.destination)
    this.audioClock = new AudioAnchoredClock(() => this.audioContext?.currentTime ?? 0)
    this.clock = new MasterClock(new MonotonicClock(), this.audioClock)
    this.clock.reset(this.seekTarget)
    this.clock.setRate(this.playbackRate)
    if (this.playing) this.clock.start()
    this.audioScheduleEnd = this.audioContext.currentTime
    return this.audioContext
  }

  private scheduleAudio(context: AudioContext, data: AudioDataLike) {
    const buffer = context.createBuffer(data.numberOfChannels, data.numberOfFrames, data.sampleRate)
    for (let channel = 0; channel < data.numberOfChannels; channel += 1) {
      const samples = new Float32Array(data.numberOfFrames)
      data.copyTo(samples, { planeIndex: channel })
      buffer.copyToChannel(samples, channel)
    }
    const mediaStart = (data.timestamp || 0) / 1_000_000
    const startAt = Math.max(context.currentTime + 0.03, this.audioScheduleEnd)
    const source = context.createBufferSource()
    source.buffer = buffer
    source.playbackRate.value = this.playbackRate
    if (this.gainNode) source.connect(this.gainNode)
    source.start(startAt)
    // playbackRate compresses wall-clock duration; the schedule must account for it
    // or the mapping drifts cumulatively at any rate other than 1.
    const contextDuration = buffer.duration / this.playbackRate
    source.onended = () => this.scheduledSources.delete(source)
    this.scheduledSources.add(source)
    this.audioScheduleEnd = startAt + contextDuration
    this.audioMediaEnd = Math.max(this.audioMediaEnd, mediaStart + buffer.duration)
    this.audioClock?.addSpan({ startAt, endAt: startAt + contextDuration, mediaStart, rate: this.playbackRate })
    data.close()
  }

  private stopScheduledAudio() {
    for (const source of this.scheduledSources) {
      try { source.stop() } catch { /* not started or already ended */ }
    }
    this.scheduledSources.clear()
    this.audioScheduleEnd = this.audioContext?.currentTime ?? 0
    this.audioClock?.reset(this.seekTarget)
  }
}

function describe(error: unknown): string {
  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : '未知解码错误'
}
