import type { SourceDescriptor, TrackInfo } from '../types'
import type { BackendSnapshot, PlaybackBackend } from './playback-backend'
import type { HlsBackendEvent } from './hls-backend'

/** Browser-native backend for progressive MP4/WebM/Ogg media. */
export class NativeBackend implements PlaybackBackend {
  readonly kind = 'native' as const
  private readonly video: HTMLVideoElement
  private readonly emit: (event: HlsBackendEvent) => void
  private tracks: TrackInfo[] = []
  private ready = false
  private listeners: Array<() => void> = []
  constructor(video: HTMLVideoElement, emit: (event: HlsBackendEvent) => void = () => undefined) { this.video = video; this.emit = emit }
  async load(source: SourceDescriptor): Promise<void> {
    if (source.kind !== 'url') throw new Error('NATIVE_UNSUPPORTED:本地媒体文件请使用 MKV')
    // Signed direct links (Quark etc.) reject requests bearing a Referer with 403.
    this.video.setAttribute('referrerpolicy', 'no-referrer')
    this.destroyRuntime(); this.ready = false; this.bindEvents(); this.video.src = source.url.trim(); this.video.load()
  }
  async play(): Promise<void> { await this.video.play() }
  pause(): void { this.video.pause() }
  seek(time: number): void { this.video.currentTime = Math.max(0, time) }
  setVolume(value: number): void { this.video.volume = Math.max(0, Math.min(1, value)) }
  setMuted(value: boolean): void { this.video.muted = value }
  setPlaybackRate(rate: number): void { this.video.playbackRate = Math.max(.25, Math.min(4, rate)) }
  getSnapshot(): BackendSnapshot { const current = Number.isFinite(this.video.currentTime) ? this.video.currentTime : 0; let start = current; let end = current; for (let i = 0; i < this.video.buffered.length; i++) if (current >= this.video.buffered.start(i) && current <= this.video.buffered.end(i)) { start = this.video.buffered.start(i); end = this.video.buffered.end(i); break } const duration = Number.isFinite(this.video.duration) ? this.video.duration : 0; return { ready: this.ready, playing: !this.video.paused, currentTime: current, duration, bufferedStart: start, bufferedEnd: end, bufferedAhead: Math.max(0, end - current), stalled: this.video.readyState < 3 && !this.video.paused, live: false, seekableStart: 0, seekableEnd: duration } }
  getTracks(): TrackInfo[] { return this.tracks }
  getQualities(): Array<{ id: string; label: string }> { return [] }
  selectQuality(_id: string): void { /* progressive media has no adaptive levels */ }
  selectAudio(_id: number): void { /* native audioTracks selection is browser-specific */ }
  selectSubtitle(id: number | null): void { Array.from(this.video.textTracks || []).forEach((track, index) => { track.mode = id !== null && id === 2000 + index ? 'showing' : 'disabled' }) }
  async requestPictureInPicture(): Promise<void> { const doc = document as Document & { pictureInPictureElement?: Element | null; exitPictureInPicture?: () => Promise<void> }; if (doc.pictureInPictureElement) { await doc.exitPictureInPicture?.(); return }; const request = (this.video as HTMLVideoElement & { requestPictureInPicture?: () => Promise<unknown> }).requestPictureInPicture; if (!request) throw new Error('当前浏览器不支持画中画。'); await request.call(this.video) }
  destroy(): void { this.destroyRuntime(); this.video.removeAttribute('src'); this.video.load(); this.tracks = []; this.ready = false }
  private bindEvents() { const map: Array<[keyof HTMLMediaElementEventMap, HlsBackendEvent]> = [['loadedmetadata', { type: 'ready' }], ['playing', { type: 'play' }], ['pause', { type: 'pause' }], ['timeupdate', { type: 'timeupdate' }], ['waiting', { type: 'stalled', stalled: true }], ['stalled', { type: 'stalled', stalled: true }], ['canplay', { type: 'stalled', stalled: false }], ['ended', { type: 'ended' }]]; map.forEach(([name, event]) => { const handler = () => { if (name === 'loadedmetadata') { this.ready = true; this.refreshTracks() }; this.emit(event) }; this.video.addEventListener(name, handler); this.listeners.push(() => this.video.removeEventListener(name, handler)) }); const onError = () => this.emit({ type: 'error', code: 'NATIVE_MEDIA_ERROR', detail: this.video.error?.message }); this.video.addEventListener('error', onError); this.listeners.push(() => this.video.removeEventListener('error', onError)) }
  private refreshTracks() { this.tracks = Array.from(this.video.textTracks || []).map((track, index) => ({ id: 2000 + index, kind: 'subtitle' as const, codecId: 'webvtt', codec: 'webvtt', language: track.language, name: track.label || track.language })); this.emit({ type: 'tracksupdate' }) }
  private destroyRuntime() { this.listeners.splice(0).forEach((remove) => remove()) }
}
