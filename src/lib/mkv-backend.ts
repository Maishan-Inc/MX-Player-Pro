import type { SourceDescriptor, TrackInfo } from '../types'
import { WebCodecsEngine } from './webcodecs'
import type { BackendSnapshot, PlaybackBackend } from './playback-backend'

/** Thin adapter reserved for callers that need to reason about backend kind.
 * The existing demux Worker remains owned by PlayerSurface for MKV compatibility. */
export class MkvBackend implements PlaybackBackend {
  readonly kind = 'mkv' as const
  private readonly engine: WebCodecsEngine
  private tracks: TrackInfo[] = []
  private duration = 0
  constructor(canvas: HTMLCanvasElement, onStatus: ConstructorParameters<typeof WebCodecsEngine>[1]) {
    this.engine = new WebCodecsEngine(canvas, onStatus)
  }
  async load(_source: SourceDescriptor): Promise<void> { throw new Error('MKV backend source loading is managed by the demux Worker') }
  async play(): Promise<void> { this.engine.play() }
  pause(): void { this.engine.pause() }
  seek(time: number): void { this.engine.seekTo(time) }
  setVolume(value: number): void { this.engine.setVolume(value) }
  setMuted(value: boolean): void { this.engine.setVolume(value ? 0 : 1) }
  setPlaybackRate(rate: number): void { this.engine.setPlaybackRate(rate) }
  getSnapshot(): BackendSnapshot { const stats = this.engine.stats(); return { ...stats, ready: true, playing: !stats.stalled, duration: this.duration, live: false } }
  getTracks(): TrackInfo[] { return this.tracks }
  async requestPictureInPicture(): Promise<void> { throw new Error('MKV 画中画由 PlayerSurface Canvas 路径处理') }
  destroy(): void { this.engine.close() }
}
