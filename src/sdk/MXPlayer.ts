import { createElement, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import PlayerSurface, { type PlayerSurfaceHandle } from '../components/PlayerSurface'
import '../player.css'
import type { MXPlayerEvents, MXPlayerOptions, MXPlayerState } from '../player-api'
import type { SourceDescriptor, TrackInfo } from '../types'

export type {
  MXPlayerDanmakuOptions,
  MXPlayerEvents,
  MXPlayerOptions,
  MXPlayerQuality,
  MXPlayerState,
} from '../player-api'

type Listener<K extends keyof MXPlayerEvents> = (payload: MXPlayerEvents[K]) => void

/**
 * Standalone SDK facade. The same React player surface used by the demo application is
 * mounted into the supplied element, so CDN, Vue and React consumers share one playback
 * implementation and one subtitle path.
 */
export class MXPlayer {
  private readonly container: HTMLElement
  private readonly root: Root
  private readonly surfaceRef = createRef<PlayerSurfaceHandle>()
  private readonly listeners = new Map<string, Set<(payload: never) => void>>()
  private options: MXPlayerOptions
  private source: SourceDescriptor | undefined
  private label: string
  private destroyed = false
  private detachDrop: (() => void) | null = null

  constructor(options: MXPlayerOptions) {
    const container = typeof options.playerElm === 'string'
      ? document.querySelector<HTMLElement>(options.playerElm)
      : options.playerElm
    if (!container) throw new Error(`MX Player: 找不到容器元素 ${String(options.playerElm)}`)

    this.container = container
    this.options = { ...options }
    this.source = options.url
      ? { kind: 'url', url: options.url }
      : options.file
        ? { kind: 'file', file: options.file }
        : undefined
    this.label = options.label || sourceLabel(this.source)
    this.container.classList.add('mxplayer-container')
    this.root = createRoot(container)

    if (options.localPlayback) this.enableLocalPlayback()
    this.render()
  }

  /** Load a new source while keeping the mounted React UI and user preferences. */
  async load(source: SourceDescriptor): Promise<void> {
    if (this.destroyed) throw new Error('MX Player: 播放器已销毁')
    this.source = source
    this.label = sourceLabel(source)
    this.render()
  }

  play(): void { this.surfaceRef.current?.play() }
  pause(): void { this.surfaceRef.current?.pause() }
  toggle(): void { this.surfaceRef.current?.toggle() }
  seek(time: number): void { this.surfaceRef.current?.seek(time) }

  setVolume(value: number): void {
    this.options.volume = value
    this.surfaceRef.current?.setVolume(value)
  }

  setMuted(value: boolean): void {
    this.options.muted = value
    this.surfaceRef.current?.setMuted(value)
  }

  setPlaybackRate(rate: number): void { this.surfaceRef.current?.setPlaybackRate(rate) }
  requestFullscreen(): void { this.surfaceRef.current?.requestFullscreen() }
  requestPictureInPicture(): Promise<void> { return this.surfaceRef.current?.requestPictureInPicture() ?? Promise.resolve() }

  getState(): MXPlayerState {
    return this.surfaceRef.current?.getState() ?? {
      ready: false,
      playing: false,
      currentTime: 0,
      duration: 0,
      volume: clampUnit(this.options.volume ?? 0.85),
      muted: this.options.muted ?? false,
      playbackRate: 1,
      bufferedAhead: 0,
      stalled: false,
      error: null,
    }
  }

  get tracks(): TrackInfo[] { return this.surfaceRef.current?.getTracks() ?? [] }

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

  destroy(): void {
    if (this.destroyed) return
    this.destroyed = true
    this.detachDrop?.()
    this.detachDrop = null
    this.root.unmount()
    this.listeners.clear()
    this.container.classList.remove('mxplayer-container', 'mxplayer-dragging')
  }

  private render(): void {
    const danmaku = this.options.danmaku
      ? {
          ...this.options.danmaku,
          onToggle: (visible: boolean) => {
            this.options.danmaku?.onToggle?.(visible)
            this.emit('danmakuchange', { visible })
          },
        }
      : undefined

    this.root.render(createElement(PlayerSurface, {
      ref: this.surfaceRef,
      source: this.source,
      label: this.label,
      embedded: true,
      autoplay: this.options.autoplay,
      initialVolume: this.options.volume,
      initialMuted: this.options.muted,
      workerUrl: this.options.workerUrl,
      onNext: this.options.onNext,
      qualities: this.options.qualities,
      selectedQuality: this.options.selectedQuality,
      danmaku,
      onReady: (payload) => this.emit('ready', payload),
      onPlay: () => this.emit('play', undefined),
      onPause: () => this.emit('pause', undefined),
      onTimeUpdate: (payload) => this.emit('timeupdate', payload),
      onEnded: () => this.emit('ended', undefined),
      onError: (payload) => this.emit('error', payload),
      onTheaterChange: (enabled) => {
        this.options.onTheaterChange?.(enabled)
        this.emit('theaterchange', { enabled })
      },
      onQualityChange: (qualityId) => {
        this.options.selectedQuality = qualityId
        this.options.onQualityChange?.(qualityId)
        this.emit('qualitychange', { qualityId })
        this.render()
      },
    }))
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
        this.emit('error', { message: '请拖入 Matroska (.mkv) 文件。' })
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

  private emit<K extends keyof MXPlayerEvents>(event: K, payload: MXPlayerEvents[K]): void {
    const set = this.listeners.get(event)
    if (!set) return
    for (const listener of set) {
      try {
        ;(listener as Listener<K>)(payload)
      } catch (error) {
        console.error('[MXPlayer] 事件回调异常', error)
      }
    }
  }
}

function sourceLabel(source?: SourceDescriptor): string {
  if (!source) return 'MX Player Pro'
  if (source.kind === 'file') return source.file.name
  try {
    const url = new URL(source.url)
    const name = decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '')
    return name || url.hostname || source.url
  } catch {
    return source.url
  }
}

function clampUnit(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.85
}
