import type { SourceDescriptor, TrackInfo } from '../types'

export type BackendKind = 'mkv' | 'hls' | 'native'

export interface BackendSnapshot {
  ready: boolean
  playing: boolean
  currentTime: number
  duration: number
  bufferedStart: number
  bufferedEnd: number
  bufferedAhead: number
  stalled: boolean
  live: boolean
  /** Seekable media-time window; present for native/HLS live streams. */
  seekableStart?: number
  seekableEnd?: number
}

export interface PlaybackBackend {
  readonly kind: BackendKind
  load(source: SourceDescriptor): Promise<void>
  play(): Promise<void>
  pause(): void
  seek(time: number): void
  setVolume(value: number): void
  setMuted(value: boolean): void
  setPlaybackRate(rate: number): void
  getSnapshot(): BackendSnapshot
  getTracks(): TrackInfo[]
  requestPictureInPicture(): Promise<void>
  destroy(): void
}
