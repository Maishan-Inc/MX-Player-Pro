export type SourceDescriptor =
  | { kind: 'file'; file: File }
  | { kind: 'url'; url: string }

export type TrackKind = 'video' | 'audio' | 'subtitle'

export interface TrackInfo {
  id: number
  kind: TrackKind
  codecId: string
  codec?: string
  codecPrivate?: ArrayBuffer
  language?: string
  name?: string
  width?: number
  height?: number
  frameRate?: number
  sampleRate?: number
  channels?: number
}

export interface MKVPacket {
  trackId: number
  timestamp: number
  duration: number
  key: boolean
  data: Uint8Array
}

export interface ProbeInfo {
  size: number | null
  contentType: string | null
  acceptsRanges: boolean
  status: number | null
  cors: 'ok' | 'blocked' | 'unknown'
  message?: string
}

export interface PlaybackMetadata {
  tracks: TrackInfo[]
  duration: number
  timecodeScale: number
}

export type DemuxRequest =
  | { type: 'init'; source: SourceDescriptor }
  | { type: 'next' }
  | { type: 'seek'; time: number }
  | { type: 'select-track'; kind: TrackKind; trackId: number }
  | { type: 'close' }

export type DemuxEvent =
  | { type: 'metadata'; metadata: PlaybackMetadata; probe: ProbeInfo }
  | { type: 'packets'; packets: MKVPacket[] }
  | { type: 'progress'; phase: string; value: number }
  | { type: 'error'; code: string; message: string }
  | { type: 'eof' }
