import Hls from 'hls.js'
import type { MediaFormat, SourceDescriptor, TrackInfo } from '../types'
import type { BackendSnapshot, PlaybackBackend } from './playback-backend'

export interface HlsBackendOptions {
  lowLatencyMode?: boolean
  withCredentials?: boolean
  maxBufferLength?: number
}

export type HlsBackendEvent =
  | { type: 'ready' }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'timeupdate' }
  | { type: 'ended' }
  | { type: 'stalled'; stalled: boolean }
  | { type: 'qualitychange'; qualityId: string }
  | { type: 'tracksupdate' }
  | { type: 'error'; code: string; detail?: string }

export class HlsBackend implements PlaybackBackend {
  readonly kind = 'hls' as const
  private readonly video: HTMLVideoElement
  private readonly options: HlsBackendOptions
  private readonly emit: (event: HlsBackendEvent) => void
  private hls: Hls | null = null
  private qualities: Array<{ id: string; label: string }> = []
  private tracks: TrackInfo[] = []
  private ready = false
  private live = false
  private listeners: Array<() => void> = []
  private recoveryCount = 0

  constructor(video: HTMLVideoElement, options: HlsBackendOptions = {}, emit: (event: HlsBackendEvent) => void = () => undefined) {
    this.video = video
    this.options = options
    this.emit = emit
  }

  async load(source: SourceDescriptor): Promise<void> {
    if (source.kind !== 'url') throw new Error('HLS_UNSUPPORTED:本地 m3u8 文件暂不支持')
    this.destroyRuntime()
    this.recoveryCount = 0
    this.ready = false
    this.live = false
    const url = source.url.trim()
    if (!url) throw new Error('HLS_MANIFEST_ERROR:缺少播放地址')
    this.bindMediaEvents()
    const native = this.video.canPlayType('application/vnd.apple.mpegurl') !== '' || this.video.canPlayType('application/x-mpegURL') !== ''
    if (native) {
      this.video.src = url
      this.video.load()
      return
    }
    if (typeof MediaSource === 'undefined' || !Hls.isSupported()) throw new Error('HLS_UNSUPPORTED')
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: this.options.lowLatencyMode ?? false,
      backBufferLength: 90,
      maxBufferLength: this.options.maxBufferLength ?? 30,
      xhrSetup: (xhr) => { xhr.withCredentials = this.options.withCredentials ?? false },
    })
    this.hls = hls
    hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
      this.tracks = this.mapTracks(data.levels)
      this.qualities = data.levels.map((level, index) => ({ id: String(index), label: level.height ? `${level.height}p` : `${Math.round((level.bitrate || 0) / 1000)} kbps` }))
      this.ready = true
      this.emit({ type: 'ready' })
    })
    hls.on(Hls.Events.FRAG_LOADED, () => { this.recoveryCount = 0 })
    hls.on(Hls.Events.LEVEL_LOADED, (_event, data) => { this.live = Boolean(data.details?.live) })
    hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => this.emit({ type: 'qualitychange', qualityId: String(data.level) }))
    hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (_event, data) => {
      const audio = (data.audioTracks || []).map((track, index) => { const item = track as typeof track & { codec?: string }; return { id: 1000 + index, kind: 'audio' as const, codecId: item.codec || 'hls-audio', codec: item.codec, language: track.lang, name: track.name, groupId: track.groupId } })
      this.tracks = [...this.tracks.filter((track) => track.kind !== 'audio'), ...audio]
      this.emit({ type: 'tracksupdate' })
    })
    hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, (_event, data) => {
      const subtitles = (data.subtitleTracks || []).map((track, index) => ({ id: 2000 + index, kind: 'subtitle' as const, codecId: 'webvtt', codec: 'webvtt', language: track.lang, name: track.name, groupId: track.groupId }))
      this.tracks = [...this.tracks.filter((track) => track.kind !== 'subtitle'), ...subtitles]
      this.emit({ type: 'tracksupdate' })
    })
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (!data.fatal) return
      const detail = String(data.details || '')
      if (/cors/i.test(detail)) { this.emit({ type: 'error', code: 'HLS_CORS_BLOCKED', detail }); return }
      if (this.recoveryCount >= 3) { this.emit({ type: 'error', code: 'HLS_FATAL_ERROR', detail: `恢复次数已达上限（${detail || '未知错误'}）` }); return }
      this.recoveryCount += 1
      // A fatal hls.js error can still be recovered. Do not raise the user-facing
      // error overlay until all three recovery attempts have failed.
      if (data.type === Hls.ErrorTypes.NETWORK_ERROR) { hls.startLoad(); return }
      if (data.type === Hls.ErrorTypes.MEDIA_ERROR) { hls.recoverMediaError(); return }
      this.emit({ type: 'error', code: /manifest/i.test(detail) ? 'HLS_MANIFEST_ERROR' : 'HLS_FATAL_ERROR', detail })
    })
    hls.attachMedia(this.video)
    hls.loadSource(url)
  }

  async play(): Promise<void> { await this.video.play() }
  pause(): void { this.video.pause() }
  seek(time: number): void {
    if (this.live && this.video.seekable.length) {
      const start = this.video.seekable.start(0); const end = this.video.seekable.end(this.video.seekable.length - 1)
      this.video.currentTime = Math.max(start, Math.min(end, time)); return
    }
    this.video.currentTime = Math.max(0, time)
  }
  setVolume(value: number): void { this.video.volume = Math.max(0, Math.min(1, value)) }
  setMuted(value: boolean): void { this.video.muted = value }
  setPlaybackRate(rate: number): void { this.video.playbackRate = Math.max(0.25, Math.min(4, rate)) }
  getSnapshot(): BackendSnapshot {
    const current = Number.isFinite(this.video.currentTime) ? this.video.currentTime : 0
    let bufferedStart = current; let bufferedEnd = current
    for (let i = 0; i < this.video.buffered.length; i += 1) {
      if (current >= this.video.buffered.start(i) && current <= this.video.buffered.end(i)) { bufferedStart = this.video.buffered.start(i); bufferedEnd = this.video.buffered.end(i); break }
    }
    return { ready: this.ready, playing: !this.video.paused, currentTime: current, duration: Number.isFinite(this.video.duration) ? this.video.duration : 0, bufferedStart, bufferedEnd, bufferedAhead: Math.max(0, bufferedEnd - current), stalled: this.video.readyState < 3 && !this.video.paused, live: this.live }
  }
  getTracks(): TrackInfo[] { return this.tracks }
  async requestPictureInPicture(): Promise<void> {
    const doc = document as Document & { pictureInPictureElement?: Element | null; exitPictureInPicture?: () => Promise<void> }
    if (doc.pictureInPictureElement) { await doc.exitPictureInPicture?.(); return }
    const request = (this.video as HTMLVideoElement & { requestPictureInPicture?: () => Promise<unknown> }).requestPictureInPicture
    if (!request) throw new Error('当前浏览器不支持画中画。')
    await request.call(this.video)
  }
  destroy(): void { this.destroyRuntime(); this.video.removeAttribute('src'); this.video.load(); this.tracks = []; this.qualities = []; this.ready = false }

  selectQuality(id: string): void { if (this.hls) this.hls.currentLevel = id === 'auto' ? -1 : Number(id) }
  selectAudio(id: number): void { if (this.hls) this.hls.audioTrack = id - 1000 }
  selectSubtitle(id: number | null): void { if (this.hls) this.hls.subtitleTrack = id === null ? -1 : id - 2000 }
  getQualities(): Array<{ id: string; label: string }> { return this.qualities }

  private bindMediaEvents() {
    const map: Array<[keyof HTMLMediaElementEventMap, HlsBackendEvent]> = [['loadedmetadata', { type: 'ready' }], ['playing', { type: 'play' }], ['pause', { type: 'pause' }], ['timeupdate', { type: 'timeupdate' }], ['waiting', { type: 'stalled', stalled: true }], ['stalled', { type: 'stalled', stalled: true }], ['canplay', { type: 'stalled', stalled: false }], ['ended', { type: 'ended' }]]
    map.forEach(([name, event]) => { const handler = () => { if (name === 'loadedmetadata') { this.ready = true; this.refreshNativeTracks() }; this.emit(event) }; this.video.addEventListener(name, handler); this.listeners.push(() => this.video.removeEventListener(name, handler)) })
    const onError = () => {
      // With hls.js attached, the library's ERROR event classifies and recovers
      // media failures. The element-level error is a duplicate and would surface
      // a false overlay before recovery can complete.
      if (this.hls) return
      const mediaError = this.video.error
      const detail = mediaError ? `code=${mediaError.code}${mediaError.message ? `, ${mediaError.message}` : ''}` : 'video element error'
      this.emit({ type: 'error', code: 'HLS_MEDIA_ERROR', detail })
    }
    this.video.addEventListener('error', onError); this.listeners.push(() => this.video.removeEventListener('error', onError))
  }
  private destroyRuntime() { this.listeners.splice(0).forEach((remove) => remove()); this.hls?.destroy(); this.hls = null }
  private mapTracks(levels: Array<{ width?: number; height?: number; bitrate?: number; name?: string; videoCodec?: string }>): TrackInfo[] {
    return levels.length ? [{ id: 0, kind: 'video', codecId: levels[0].videoCodec || 'hls-video', codec: levels[0].videoCodec, width: levels[0].width, height: levels[0].height, name: levels[0].name || '自动' }] : []
  }
  private refreshNativeTracks() {
    const textTracks = Array.from(this.video.textTracks || []).map((track, index) => ({ id: 2000 + index, kind: 'subtitle' as const, codecId: 'webvtt', codec: 'webvtt', language: track.language, name: track.label || track.language }))
    const audioList = (this.video as HTMLVideoElement & { audioTracks?: ArrayLike<{ id?: string; language?: string; label?: string }> }).audioTracks
    const audioTracks = audioList ? Array.from(audioList).map((track, index) => ({ id: 1000 + index, kind: 'audio' as const, codecId: 'hls-audio', language: track.language, name: track.label || track.language })) : []
    this.tracks = [...this.tracks.filter((track) => track.kind === 'video'), ...audioTracks, ...textTracks]
  }
}
