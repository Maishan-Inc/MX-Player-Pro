import type { SourceDescriptor, TrackInfo, DemuxEvent, DemuxRequest } from '../types'
import { WebCodecsEngine } from '../lib/webcodecs'
import { explainPlaybackError } from '../lib/playback-error'

export interface MXPlayerOptions {
  /** 播放器容器选择器或 DOM 元素 */
  playerElm: string | HTMLElement
  /** 云端 MKV 下载地址，需支持 CORS 与 Range */
  url?: string
  /** 本地文件，与 url 二选一 */
  file?: File
  /** 允许把本地 MKV 拖拽到容器上播放 */
  localPlayback?: boolean
  /** 元数据就绪后自动播放。浏览器自动播放策略通常要求同时 muted */
  autoplay?: boolean
  /** 初始音量 0-1 */
  volume?: number
  /** 初始静音 */
  muted?: boolean
  /**
   * mkv_demuxer.js 所在目录。从 CDN 引入时必须指定，否则 Worker 会去嵌入方自己的
   * 域名下找 WASM 并 404，静默退回较慢的 TypeScript 解析器。
   */
  wasmBaseUrl?: string
}

export interface MXPlayerState {
  playing: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  bufferedAhead: number
  stalled: boolean
  error: string | null
}

export interface MXPlayerEvents {
  ready: { tracks: TrackInfo[]; duration: number }
  play: void
  pause: void
  timeupdate: { currentTime: number; duration: number }
  ended: void
  error: { message: string }
}

type Listener<K extends keyof MXPlayerEvents> = (payload: MXPlayerEvents[K]) => void

/**
 * MX Player Pro 原生 JS SDK
 *
 * 纯客户端 Matroska 播放器：通过 HTTP Range 按需读取，在 Worker 中解封装，
 * 再由 WebCodecs 解码。文件和链接都只在本机处理。
 */
export class MXPlayer {
  private readonly container: HTMLElement
  private readonly canvas: HTMLCanvasElement
  private readonly wasmBaseUrl?: string
  private readonly autoplay: boolean
  private worker: Worker | null = null
  private engine: WebCodecsEngine | null = null

  private _playing = false
  private _currentTime = 0
  private _duration = 0
  private _volume: number
  private _muted: boolean
  private _error: string | null = null
  private _stalled = false
  private _metadata: { tracks: TrackInfo[]; duration: number } | null = null
  /** 缓存选中的轨道 id，避免每批 packet 都去 tracks 里线性查找。 */
  private videoTrackId: number | undefined
  private audioTrackId: number | undefined

  private epoch = 0
  private inFlight = false
  private eof = false
  private ready = false
  private tickTimer: number | null = null
  private destroyed = false
  private detachDrop: (() => void) | null = null
  private readonly listeners = new Map<string, Set<(payload: never) => void>>()

  constructor(options: MXPlayerOptions) {
    const container = typeof options.playerElm === 'string'
      ? document.querySelector<HTMLElement>(options.playerElm)
      : options.playerElm
    if (!container) throw new Error(`MX Player: 找不到容器元素 ${String(options.playerElm)}`)

    this.container = container
    this.wasmBaseUrl = options.wasmBaseUrl
    this.autoplay = options.autoplay ?? false
    this._volume = clamp01(options.volume ?? 0.85)
    this._muted = options.muted ?? false

    this.canvas = document.createElement('canvas')
    this.canvas.className = 'mxplayer-canvas'
    this.canvas.style.cssText = 'display:block;width:100%;height:100%;object-fit:contain;background:#000'
    this.container.appendChild(this.canvas)

    if (options.localPlayback) this.enableLocalPlayback()

    if (options.url) void this.load({ kind: 'url', url: options.url })
    else if (options.file) void this.load({ kind: 'file', file: options.file })
  }

  /** 加载新的播放源，会先释放上一个源的 Worker 与解码器 */
  async load(source: SourceDescriptor): Promise<void> {
    if (this.destroyed) throw new Error('MX Player: 播放器已销毁')
    this.teardownPlayback()

    this._error = null
    this._currentTime = 0
    this._duration = 0
    this._playing = false
    this._metadata = null
    this.videoTrackId = undefined
    this.audioTrackId = undefined
    this.epoch = 0
    this.inFlight = false
    this.eof = false
    this.ready = false

    const worker = new Worker(new URL('../worker/demux.worker.ts', import.meta.url), { type: 'module' })
    const engine = new WebCodecsEngine(this.canvas, (status) => {
      // 只有视频管线彻底挂掉才算致命；音频单独失败时文件仍可观看。
      if (!status.error) return
      const message = explainPlaybackError(status.error)
      if (/^DECODER_(?:ERROR|UNSUPPORTED)_AUDIO/i.test(status.error)) return
      this._error = message
      this.emit('error', { message })
    })

    this.worker = worker
    this.engine = engine

    worker.onmessage = (event: MessageEvent<DemuxEvent>) => this.handleWorkerEvent(event.data)
    worker.postMessage({ type: 'init', source, wasmBaseUrl: this.wasmBaseUrl } satisfies DemuxRequest)

    // 与主应用一致的 100ms 心跳：暂停时也要驱动解码，seek 预览帧才画得出来。
    this.tickTimer = window.setInterval(() => this.tick(), 100)
  }

  play(): void {
    if (!this.engine || !this.ready || this._playing) return
    this._playing = true
    this.engine.play()
    this.pump()
    this.emit('play', undefined)
  }

  pause(): void {
    if (!this.engine || !this._playing) return
    this._playing = false
    this.engine.pause()
    this.emit('pause', undefined)
  }

  toggle(): void {
    if (this._playing) this.pause()
    else this.play()
  }

  /** 跳转到指定媒体时间（秒） */
  seek(time: number): void {
    if (!this.engine || !this.worker) return
    const next = Math.max(0, Math.min(time, this._duration || time))
    this._currentTime = next
    this.epoch += 1
    this.eof = false
    this.engine.seekTo(next)
    this.worker.postMessage({ type: 'seek', time: next, epoch: this.epoch } satisfies DemuxRequest)
    // seek 请求本身就是一次在途取包，置位以免 pump() 立刻再发一次。
    this.inFlight = true
  }

  setVolume(value: number): void {
    this._volume = clamp01(value)
    if (this._volume > 0) this._muted = false
    this.engine?.setVolume(this._muted ? 0 : this._volume)
  }

  setMuted(muted: boolean): void {
    this._muted = muted
    this.engine?.setVolume(muted ? 0 : this._volume)
  }

  setPlaybackRate(rate: number): void {
    this.engine?.setPlaybackRate(rate)
  }

  requestFullscreen(): void {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void this.container.requestFullscreen?.()
  }

  getState(): MXPlayerState {
    const stats = this.engine?.stats()
    return {
      playing: this._playing,
      currentTime: this._currentTime,
      duration: this._duration,
      volume: this._volume,
      muted: this._muted,
      bufferedAhead: stats?.bufferedAhead ?? 0,
      stalled: stats?.stalled ?? false,
      error: this._error,
    }
  }

  get tracks(): TrackInfo[] {
    return this._metadata?.tracks ?? []
  }

  on<K extends keyof MXPlayerEvents>(event: K, listener: Listener<K>): this {
    const set = this.listeners.get(event) ?? new Set()
    set.add(listener as (payload: never) => void)
    this.listeners.set(event, set)
    return this
  }

  off<K extends keyof MXPlayerEvents>(event: K, listener: Listener<K>): this {
    this.listeners.get(event)?.delete(listener as (payload: never) => void)
    return this
  }

  /** 释放 Worker、解码器、事件监听与 canvas */
  destroy(): void {
    if (this.destroyed) return
    this.destroyed = true
    this.teardownPlayback()
    this.detachDrop?.()
    this.detachDrop = null
    this.listeners.clear()
    this.canvas.remove()
  }

  private tick(): void {
    const engine = this.engine
    if (!engine) return
    engine.tick()
    const stats = engine.stats()
    this._stalled = stats.stalled
    const value = this._duration ? Math.min(stats.currentTime, this._duration) : stats.currentTime
    if (value !== this._currentTime) {
      this._currentTime = value
      this.emit('timeupdate', { currentTime: value, duration: this._duration })
    }
    this.pump()
  }

  private handleWorkerEvent(event: DemuxEvent): void {
    if (event.type === 'error') {
      // 清掉在途标记：一次瞬时 range 失败不能永久卡死取包循环。
      this.inFlight = false
      this._error = explainPlaybackError(event.message)
      this.emit('error', { message: this._error })
      return
    }

    if (event.type === 'metadata') {
      const { tracks, duration } = event.metadata
      const video = tracks.find((track) => track.kind === 'video')
      const audio = tracks.find((track) => track.kind === 'audio')
      this._metadata = { tracks, duration }
      this._duration = duration
      this.videoTrackId = video?.id
      this.audioTrackId = audio?.id
      this.ready = true
      void this.engine?.configure(video, audio)
      this.engine?.setVolume(this._muted ? 0 : this._volume)
      this.emit('ready', { tracks, duration })
      if (this.autoplay) this.play()
      return
    }

    if (event.type === 'packets') {
      // 丢弃 seek 之前发出的回包，它们属于已经作废的播放位置。
      if (event.epoch < this.epoch) return
      this.inFlight = false
      for (const packet of event.packets) {
        this.engine?.enqueue(packet, this.videoTrackId, this.audioTrackId)
      }
      // 空批次意味着 Worker 尚未就绪，交给 100ms 心跳重试，避免空转。
      if (event.packets.length) this.pump()
      return
    }

    if (event.type === 'eof') {
      if (event.epoch < this.epoch) return
      this.inFlight = false
      this.eof = true
      this.engine?.markEndOfStream()
      this.emit('ended', undefined)
    }
  }

  private pump(): void {
    if (!this.ready || this.inFlight || this.eof) return
    if (!this.engine?.needsPackets(this._playing, this.eof, this.inFlight)) return
    this.inFlight = true
    this.worker?.postMessage({ type: 'next', epoch: this.epoch } satisfies DemuxRequest)
  }

  private enableLocalPlayback(): void {
    const onDragOver = (event: DragEvent) => {
      event.preventDefault()
      this.container.classList.add('mxplayer-dragging')
    }
    const onDragLeave = () => this.container.classList.remove('mxplayer-dragging')
    const onDrop = (event: DragEvent) => {
      event.preventDefault()
      this.container.classList.remove('mxplayer-dragging')
      const file = event.dataTransfer?.files?.[0]
      if (!file) return
      if (!file.name.toLowerCase().endsWith('.mkv') && file.type !== 'video/x-matroska') {
        const message = '请拖入 Matroska (.mkv) 文件。'
        this._error = message
        this.emit('error', { message })
        return
      }
      void this.load({ kind: 'file', file })
    }

    this.container.addEventListener('dragover', onDragOver)
    this.container.addEventListener('dragleave', onDragLeave)
    this.container.addEventListener('drop', onDrop)
    this.detachDrop = () => {
      this.container.removeEventListener('dragover', onDragOver)
      this.container.removeEventListener('dragleave', onDragLeave)
      this.container.removeEventListener('drop', onDrop)
    }
  }

  private teardownPlayback(): void {
    if (this.tickTimer !== null) {
      window.clearInterval(this.tickTimer)
      this.tickTimer = null
    }
    if (this.worker) {
      this.worker.postMessage({ type: 'close' } satisfies DemuxRequest)
      this.worker.terminate()
      this.worker = null
    }
    this.engine?.close()
    this.engine = null
    this._playing = false
    this.ready = false
  }

  private emit<K extends keyof MXPlayerEvents>(event: K, payload: MXPlayerEvents[K]): void {
    const set = this.listeners.get(event)
    if (!set) return
    for (const listener of set) {
      try {
        ;(listener as Listener<K>)(payload)
      } catch (error) {
        // 一个消费者的异常不应该中断其余监听器或播放循环。
        console.error('[MXPlayer] 事件回调异常', error)
      }
    }
  }
}

function clamp01(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0
}
