import type { MKVPacket, TrackInfo } from '../types'

interface VideoChunk { new (init: { type: 'key' | 'delta'; timestamp: number; duration?: number; data: BufferSource }): unknown }
interface AudioChunk { new (init: { type: 'key' | 'delta'; timestamp: number; duration?: number; data: BufferSource }): unknown }
interface VideoDecoderLike {
  decodeQueueSize: number
  configure(config: Record<string, unknown>): void
  decode(chunk: unknown): void
  reset(): void
  close(): void
  flush(): Promise<void>
}
interface AudioDecoderLike {
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
  copyTo(destination: Float32Array, options: { planeIndex: number }): void
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

export class WebCodecsEngine {
  private readonly canvas: HTMLCanvasElement
  private readonly onStatus: (status: EngineStatus) => void
  private videoDecoder: VideoDecoderLike | null = null
  private audioDecoder: AudioDecoderLike | null = null
  private audioContext: AudioContext | null = null
  private gainNode: GainNode | null = null
  private audioStart = 0
  private playbackRate = 1
  private volume = 1
  private mediaStart = 0
  private playing = false
  private lastFrameTime = 0
  private animationTimer: number | null = null

  constructor(canvas: HTMLCanvasElement, onStatus: (status: EngineStatus) => void) {
    this.canvas = canvas
    this.onStatus = onStatus
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
    let videoReady = false
    let audioReady = false
    if (video?.codec && video.width && video.height) {
      const config = { codec: video.codec, codedWidth: video.width, codedHeight: video.height, description: video.codecPrivate }
      try {
        const supported = await globals.VideoDecoder.isConfigSupported?.(config)
        if (supported?.supported !== false) {
          const Decoder = globals.VideoDecoder
          this.videoDecoder = new Decoder({ output: (frame) => this.renderFrame(frame), error: (error) => this.onStatus({ videoReady: false, audioReady, error: error.message }) })
          this.videoDecoder.configure(config)
          videoReady = true
          this.canvas.width = video.width
          this.canvas.height = video.height
        }
      } catch (error) {
        this.onStatus({ videoReady: false, audioReady, error: error instanceof Error ? error.message : '视频解码配置失败' })
      }
    }
    if (audio?.codec && globals.AudioDecoder && globals.EncodedAudioChunk) {
      const config = { codec: audio.codec, sampleRate: audio.sampleRate || 48_000, numberOfChannels: audio.channels || 2, description: audio.codecPrivate }
      try {
        const supported = await globals.AudioDecoder.isConfigSupported?.(config)
        if (supported?.supported !== false) {
          const Decoder = globals.AudioDecoder
          this.audioDecoder = new Decoder({ output: (data) => this.scheduleAudio(data), error: (error) => this.onStatus({ videoReady, audioReady: false, error: error.message }) })
          this.audioDecoder.configure(config)
          audioReady = true
        }
      } catch (error) {
        this.onStatus({ videoReady, audioReady: false, error: error instanceof Error ? error.message : '音频解码配置失败' })
      }
    }
    this.onStatus({ videoReady, audioReady })
  }

  enqueue(packet: MKVPacket, videoTrackId: number | undefined, audioTrackId: number | undefined) {
    const globals = globalThis as unknown as { EncodedVideoChunk?: VideoChunk; EncodedAudioChunk?: AudioChunk }
    if (packet.trackId === videoTrackId && this.videoDecoder && globals.EncodedVideoChunk) {
      const chunk = new globals.EncodedVideoChunk({ type: packet.key ? 'key' : 'delta', timestamp: packet.timestamp, duration: packet.duration || undefined, data: packet.data.slice().buffer as ArrayBuffer })
      this.videoDecoder.decode(chunk)
    }
    if (packet.trackId === audioTrackId && this.audioDecoder && globals.EncodedAudioChunk) {
      const chunk = new globals.EncodedAudioChunk({ type: 'key', timestamp: packet.timestamp, duration: packet.duration || undefined, data: packet.data.slice().buffer as ArrayBuffer })
      this.audioDecoder.decode(chunk)
    }
  }

  play() {
    this.playing = true
    this.mediaStart = performance.now() / 1000 - this.lastFrameTime
    void this.audioContext?.resume()
    this.scheduleRenderTick()
  }

  pause() {
    this.playing = false
    if (this.animationTimer !== null) window.clearTimeout(this.animationTimer)
    this.animationTimer = null
  }

  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value))
    if (this.audioContext && !this.gainNode) this.gainNode = this.audioContext.createGain()
    if (this.gainNode) this.gainNode.gain.value = this.volume
  }

  setPlaybackRate(value: number) {
    this.playbackRate = Math.max(0.25, Math.min(4, value))
  }

  reset() {
    this.videoDecoder?.reset()
    this.audioDecoder?.reset()
    this.lastFrameTime = 0
    this.mediaStart = performance.now() / 1000
    this.audioStart = 0
  }

  close() {
    this.pause()
    this.videoDecoder?.close()
    this.audioDecoder?.close()
    this.videoDecoder = null
    this.audioDecoder = null
    void this.audioContext?.close()
    this.audioContext = null
    this.gainNode = null
  }

  private renderFrame(frame: unknown) {
    const mediaFrame = frame as { timestamp?: number; close?: () => void }
    const timestamp = (mediaFrame.timestamp || 0) / 1_000_000
    this.lastFrameTime = timestamp
    if (!this.playing || timestamp >= performance.now() / 1_000_000 - this.mediaStart - 0.08) {
      const context = this.canvas.getContext('2d')
      if (context) context.drawImage(frame as CanvasImageSource, 0, 0, this.canvas.width, this.canvas.height)
    }
    mediaFrame.close?.()
  }

  private scheduleAudio(data: AudioDataLike) {
    this.audioContext ||= new AudioContext()
    const context = this.audioContext
    this.gainNode ||= context.createGain()
    this.gainNode.gain.value = this.volume
    this.gainNode.connect(context.destination)
    const start = Math.max(context.currentTime + 0.03, this.audioStart || context.currentTime + 0.03)
    const buffer = context.createBuffer(data.numberOfChannels, data.numberOfFrames, data.sampleRate)
    for (let channel = 0; channel < data.numberOfChannels; channel += 1) {
      const samples = new Float32Array(data.numberOfFrames)
      data.copyTo(samples, { planeIndex: channel })
      buffer.copyToChannel(samples, channel)
    }
    const source = context.createBufferSource()
    source.buffer = buffer
    source.playbackRate.value = this.playbackRate
    source.connect(this.gainNode)
    source.start(start)
    this.audioStart = start + buffer.duration
    data.close()
  }

  private scheduleRenderTick() {
    if (!this.playing) return
    this.animationTimer = window.setTimeout(() => this.scheduleRenderTick(), 100)
  }
}
