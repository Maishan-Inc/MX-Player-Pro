import type { MKVPacket, TrackInfo } from '../types'
import { codecDisplayName, descriptionForTrack } from './codec'
import { FrameQueue, type Closeable } from './frame-queue'
import { AudioAnchoredClock, MasterClock, MonotonicClock } from './media-clock'
import { AUDIO_HORIZON, STALL_ENTER, STALL_EXIT, canFeedAudio, canFeedVideo, shouldRequestMore } from './backpressure'
import { PacketBuffer } from './packet-buffer'

/** A selected audio track that yields nothing for this long is treated as absent. */
const AUDIO_PRIME_TIMEOUT_MS = 5000

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

/** Snapshot for the UI: buffered range, rebuffering state and drop counters. */
export interface EngineStats {
  currentTime: number
  bufferedStart: number
  bufferedEnd: number
  bufferedAhead: number
  bufferedBytes: number
  stalled: boolean
  droppedFrames: number
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
  private readonly packets = new PacketBuffer()
  private clock = new MasterClock(new MonotonicClock())
  private audioClock: AudioAnchoredClock | null = null
  private scheduledSources = new Set<AudioBufferSourceNode>()
  private pendingAudio: AudioDataLike[] = []
  private audioScheduleEnd = 0
  private playbackRate = 1
  private volume = 1
  private playing = false
  private stalled = false
  private endOfStream = false
  private flushed = false
  private awaitingKeyframe = true
  private previewPending = false
  private seekTarget = 0
  private audioWaitSince = 0
  private raf: number | null = null

  constructor(canvas: HTMLCanvasElement, onStatus: (status: EngineStatus) => void) {
    this.canvas = canvas
    this.onStatus = onStatus
  }

  get currentTime(): number { return this.clock.currentTime }

  get isStalled(): boolean { return this.stalled }

  stats(): EngineStats {
    const now = this.clock.currentTime
    const end = this.packets.bufferedEnd
    return {
      currentTime: now,
      bufferedStart: this.seekTarget,
      bufferedEnd: end === Number.NEGATIVE_INFINITY ? this.seekTarget : end,
      bufferedAhead: this.packets.bufferedAhead(now),
      bufferedBytes: this.packets.byteLength,
      stalled: this.stalled,
      droppedFrames: this.frames.dropped,
    }
  }

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

    // alpha:false lets the compositor skip a blend per frame; desynchronized takes the
    // canvas off the regular commit path, both of which matter at 1080p60.
    this.ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true })
    this.audioClock = null
    this.clock = new MasterClock(new MonotonicClock())
    this.frames.clearFloor()
    this.awaitingKeyframe = true
    this.endOfStream = false
    this.flushed = false
    this.stalled = false
    this.seekTarget = 0
    // Set before the first await. The worker posts metadata and the opening packets
    // back to back, so packets land while isConfigSupported is still pending; an
    // inactive buffer would drop them and playback would start at the next keyframe.
    this.packets.setActive('video', Boolean(video?.codec && video.width && video.height))
    this.packets.setActive('audio', Boolean(audio?.codec))

    let videoReady = false
    let audioReady = false
    // Collected rather than reported as they happen: configure() ends with one status
    // call, and an earlier call carrying an error was overwritten by it, so the reason
    // audio was missing never reached the UI.
    let videoError: string | undefined
    let audioError: string | undefined

    if (video?.codec && video.width && video.height) {
      const config = { codec: video.codec, codedWidth: video.width, codedHeight: video.height, description: descriptionForTrack(video) }
      try {
        const supported = await globals.VideoDecoder.isConfigSupported?.(config)
        if (supported?.supported === false) {
          videoError = `DECODER_UNSUPPORTED_VIDEO:${video.codec}`
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
        videoError = `DECODER_ERROR_VIDEO:${describe(error)}`
      }
    }

    if (audio?.codec && globals.AudioDecoder && globals.EncodedAudioChunk) {
      const config = { codec: audio.codec, sampleRate: audio.sampleRate || 48_000, numberOfChannels: audio.channels || 2, description: descriptionForTrack(audio) }
      try {
        const supported = await globals.AudioDecoder.isConfigSupported?.(config)
        if (supported?.supported === false) {
          audioError = `DECODER_UNSUPPORTED_AUDIO:${audio.codec}`
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
        audioError = `DECODER_ERROR_AUDIO:${describe(error)}`
      }
    } else if (audio) {
      // A track with no WebCodecs mapping used to fall through silently, so the file
      // played with no sound and nothing said why.
      audioError = `DECODER_UNSUPPORTED_AUDIO:${codecDisplayName(audio)}`
    }

    // Correct the provisional flags: only decoders that actually came up may
    // constrain the buffered horizon.
    this.packets.setActive('video', videoReady)
    this.packets.setActive('audio', audioReady)
    // A dead video pipeline is fatal and an unusable audio track is not, so video wins
    // when both failed.
    this.onStatus({ videoReady, audioReady, error: videoError ?? audioError })
  }

  /** Reconfigure only the selected audio track while keeping video playback alive. */
  async configureAudio(audio: TrackInfo | undefined): Promise<void> {
    const globals = globalThis as unknown as {
      AudioDecoder?: AudioDecoderConstructor
      EncodedAudioChunk?: AudioChunk
    }
    this.disposeAudioPipeline()
    this.audioWaitSince = performance.now()

    let audioReady = false
    let audioError: string | undefined
    if (audio?.codec && globals.AudioDecoder && globals.EncodedAudioChunk) {
      const config = {
        codec: audio.codec,
        sampleRate: audio.sampleRate || 48_000,
        numberOfChannels: audio.channels || 2,
        description: descriptionForTrack(audio),
      }
      try {
        const supported = await globals.AudioDecoder.isConfigSupported?.(config)
        if (supported?.supported === false) {
          audioError = `DECODER_UNSUPPORTED_AUDIO:${audio.codec}`
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
        audioError = `DECODER_ERROR_AUDIO:${describe(error)}`
      }
    } else if (audio) {
      audioError = `DECODER_UNSUPPORTED_AUDIO:${codecDisplayName(audio)}`
    }

    this.packets.setActive('audio', audioReady)
    this.onStatus({ videoReady: this.videoDecoder !== null, audioReady, error: audioError })
  }

  /**
   * Buffer a demuxed packet. Nothing is decoded here: the decoders are fed from the
   * buffer just-in-time by pumpDecoders(), which is what lets the demuxer read tens
   * of seconds ahead without piling up decoded frames.
   */
  enqueue(packet: MKVPacket, videoTrackId: number | undefined, audioTrackId: number | undefined) {
    if (packet.trackId === videoTrackId) this.packets.push('video', packet)
    else if (packet.trackId === audioTrackId) this.packets.push('audio', packet)
  }

  /** True when the demuxer should be asked for another batch. */
  needsPackets(playing = this.playing, eof = false, inFlight = false): boolean {
    // With no decoder to feed there is nothing to buffer for, and asking anyway would
    // pull the whole file over the network behind a fatal error overlay.
    if (!this.packets.isActive('video') && !this.packets.isActive('audio')) return false
    return shouldRequestMore({
      bufferedAhead: this.packets.bufferedAhead(this.clock.currentTime),
      bufferedBytes: this.packets.byteLength,
      playing,
      eof,
      inFlight,
    })
  }

  /**
   * Advance the decode pipeline and the rebuffering state machine. Driven by the
   * render loop while playing and by the UI timer while paused, so a paused player
   * still decodes its preview frame.
   */
  tick() {
    this.audioClock?.prune()
    this.pumpDecoders()
    this.drainPendingAudio()
    this.updateStall()
  }

  play() {
    this.playing = true
    this.previewPending = false
    this.stalled = false
    this.audioWaitSince = performance.now()
    // Created here rather than on the first decoded packet: inside the click handler
    // the context starts running instead of suspended, and a video-only file never
    // gets an audio clock that would hold time at zero forever.
    this.ensureAudioContext()
    void this.audioContext?.resume()
    this.clock.start()
    this.tick()
    this.startRenderLoop()
  }

  pause() {
    this.playing = false
    this.stalled = false
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
    // Already-scheduled audio keeps its own rate and is left alone. Stopping it
    // instead dropped up to a second of audio and re-anchored the clock to the last
    // seek target, which jumped playback backwards on every speed change.
  }

  seekTo(mediaTime: number) {
    this.seekTarget = mediaTime
    this.clock.reset(mediaTime)
    this.packets.clear()
    this.frames.flush()
    this.frames.setFloor(mediaTime)
    this.stopScheduledAudio()
    this.pendingAudio.forEach((data) => data.close())
    this.pendingAudio = []
    this.endOfStream = false
    this.flushed = false
    this.stalled = false
    this.audioWaitSince = performance.now()
    this.resetDecoders()
    // The queue was just flushed, so the preview frame cannot be drawn yet; arm it
    // for the first frame that arrives from the new position instead.
    this.previewPending = !this.playing
  }

  reset() {
    this.seekTo(this.clock.currentTime)
  }

  /**
   * The demuxer has no more packets. Everything still buffered is decoded first, then
   * the decoders are flushed so the trailing GOP is emitted instead of being lost.
   */
  markEndOfStream() {
    this.endOfStream = true
    this.tick()
  }

  close() {
    this.stopRenderLoop()
    this.playing = false
    this.stalled = false
    this.previewPending = false
    this.packets.clear()
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

  /** Move buffered packets into the decoders while they have room. */
  private pumpDecoders() {
    const globals = globalThis as unknown as { EncodedVideoChunk?: VideoChunk; EncodedAudioChunk?: AudioChunk }

    while (this.videoDecoder && globals.EncodedVideoChunk && this.packets.pending('video')) {
      if (!canFeedVideo(this.decodePressure('video'))) break
      const packet = this.packets.shift('video')
      if (!packet) break
      // A decoder that was just reset raises DataError on anything but a keyframe.
      if (this.awaitingKeyframe && !packet.key) continue
      this.awaitingKeyframe = false
      try {
        this.videoDecoder.decode(new globals.EncodedVideoChunk({
          type: packet.key ? 'key' : 'delta',
          timestamp: packet.timestamp,
          duration: packet.duration || undefined,
          data: packet.data,
        }))
      } catch (error) {
        this.failVideo(error)
        break
      }
    }

    // Audio is only decoded while playing: decoded PCM is far bigger than the encoded
    // packet it came from, and scheduling it against a suspended context is useless.
    while (this.playing && this.audioDecoder && globals.EncodedAudioChunk && this.packets.pending('audio')) {
      if (!canFeedAudio(this.decodePressure('audio'))) break
      const packet = this.packets.shift('audio')
      if (!packet) break
      try {
        this.audioDecoder.decode(new globals.EncodedAudioChunk({
          type: 'key',
          timestamp: packet.timestamp,
          duration: packet.duration || undefined,
          data: packet.data,
        }))
      } catch (error) {
        this.failAudio(error)
        break
      }
    }

    this.checkAudioLiveness()
    if (this.endOfStream && !this.packets.length && !this.flushed) {
      this.flushed = true
      void this.flushDecoders()
    }
  }

  private decodePressure(kind: 'video' | 'audio') {
    const context = this.audioContext
    const decoder = kind === 'video' ? this.videoDecoder : this.audioDecoder
    return {
      decodeQueueSize: decoder?.decodeQueueSize ?? 0,
      frameQueueLength: this.frames.length,
      audioHorizonAhead: context ? Math.max(0, this.audioScheduleEnd - context.currentTime) : 0,
    }
  }

  /**
   * A selected audio track that never yields a packet would pin the buffered horizon
   * at negative infinity and hold the clock still forever, so give up on it. Video
   * must be flowing first, otherwise this would fire during an ordinary slow start.
   */
  private checkAudioLiveness() {
    if (!this.playing || !this.packets.isActive('audio')) return
    if (this.packets.endOf('audio') !== Number.NEGATIVE_INFINITY) return
    if (this.packets.endOf('video') === Number.NEGATIVE_INFINITY) return
    if (performance.now() - this.audioWaitSince < AUDIO_PRIME_TIMEOUT_MS) return
    this.packets.setActive('audio', false)
    this.rebuildClockWithoutAudio()
    this.onStatus({ videoReady: this.videoDecoder !== null, audioReady: false, error: 'DECODER_ERROR_AUDIO:音频轨没有数据' })
  }

  /**
   * Enter rebuffering when nothing playable is left, leave it once there is a real
   * cushion again. Freezing the clock is the point: a wall clock that keeps running
   * through a stall never gives the picture a chance to catch up.
   */
  private updateStall() {
    if (!this.playing) return
    const ahead = this.packets.bufferedAhead(this.clock.currentTime)
    if (this.stalled) {
      if (ahead < STALL_EXIT && !this.endOfStream) return
      this.stalled = false
      this.clock.resume()
      void this.audioContext?.resume()
      return
    }
    if (this.endOfStream || ahead > STALL_ENTER || this.frames.length > 0) return
    this.stalled = true
    this.clock.hold()
    void this.audioContext?.suspend()
  }

  private async flushDecoders(): Promise<void> {
    // Without a flush the trailing GOP is never emitted and video ends early.
    try { await this.videoDecoder?.flush() } catch { /* decoder already torn down */ }
    try { await this.audioDecoder?.flush() } catch { /* decoder already torn down */ }
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
   * Tear the decoder down and null it. pumpDecoders() already null-checks, so packets
   * are then ignored instead of throwing InvalidStateError on every later decode, and
   * audio plus subtitles keep working after a video decoder failure.
   */
  private failVideo(error: unknown) {
    try { this.videoDecoder?.close() } catch { /* already closed */ }
    this.videoDecoder = null
    this.packets.setActive('video', false)
    this.frames.flush()
    this.onStatus({ videoReady: false, audioReady: this.audioDecoder !== null, error: `DECODER_ERROR_VIDEO:${describe(error)}` })
  }

  private failAudio(error: unknown) {
    this.disposeAudioPipeline()
    this.onStatus({ videoReady: this.videoDecoder !== null, audioReady: false, error: `DECODER_ERROR_AUDIO:${describe(error)}` })
  }

  /** Drop audio state and hand timing back to the wall clock at the same position. */
  private disposeAudioPipeline() {
    try { this.audioDecoder?.close() } catch { /* already closed */ }
    this.audioDecoder = null
    this.audioConfig = null
    this.packets.setActive('audio', false)
    this.stopScheduledAudio()
    this.pendingAudio.forEach((data) => data.close())
    this.pendingAudio = []
    this.rebuildClockWithoutAudio()
    void this.audioContext?.close().catch(() => undefined)
    this.audioContext = null
    this.gainNode = null
  }

  /** Hand timing back to the wall clock, anchored where audio left off. */
  private rebuildClockWithoutAudio() {
    if (!this.audioClock) return
    const now = this.clock.currentTime
    this.audioClock = null
    this.clock = new MasterClock(new MonotonicClock())
    this.clock.reset(now)
    this.clock.setRate(this.playbackRate)
    if (this.playing && !this.stalled) this.clock.start()
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
    this.tick()
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
      // propagates back through the decoder feed gate as backpressure.
      if (this.audioScheduleEnd - context.currentTime >= AUDIO_HORIZON) return
      const data = this.pendingAudio.shift()
      if (!data) return
      this.scheduleAudio(context, data)
    }
  }

  private ensureAudioContext(): AudioContext | null {
    if (this.audioContext) return this.audioContext
    // No audio decoder means no audio clock: attaching one would hold media time at
    // the seek target forever, because it would never prime.
    if (!this.audioDecoder) return null
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
    this.audioClock?.addSpan({ startAt, endAt: startAt + contextDuration, mediaStart, rate: this.playbackRate })
    data.close()
  }

  private stopScheduledAudio() {
    // Read the position before dropping the spans that define it.
    const position = this.clock.currentTime
    for (const source of this.scheduledSources) {
      try { source.stop() } catch { /* not started or already ended */ }
    }
    this.scheduledSources.clear()
    this.audioScheduleEnd = this.audioContext?.currentTime ?? 0
    // Re-anchor to where playback actually is. Using the last seek target instead
    // teleported the clock backwards on every playback-rate change.
    this.audioClock?.reset(position)
  }
}

function describe(error: unknown): string {
  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : '未知解码错误'
}
