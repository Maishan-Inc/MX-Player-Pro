export type MediaFormat = 'auto' | 'mkv' | 'hls' | 'native'

export type SourceDescriptor =
  | { kind: 'file'; file: File; format?: 'mkv' }
  | { kind: 'url'; url: string; format?: MediaFormat }

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
  /** DefaultDuration is stored in nanoseconds and is not scaled by TimecodeScale. */
  defaultDurationNs?: number
  /** HLS rendition/track metadata when supplied by the playlist. */
  groupId?: string
  role?: string
}

export interface MKVPacket {
  trackId: number
  timestamp: number
  duration: number
  key: boolean
  /**
   * Always backed by its own ArrayBuffer (never SharedArrayBuffer): every packet is
   * produced by `bytes.slice()`, and the worker transfers each `data.buffer`
   * individually. The explicit parameter is what makes it a valid BufferSource for
   * EncodedVideoChunk / EncodedAudioChunk.
   */
  data: Uint8Array<ArrayBuffer>
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
  | { type: 'init'; source: SourceDescriptor; fetchPort?: MessagePort }
  | { type: 'next'; epoch: number }
  | { type: 'seek'; time: number; epoch: number }
  | { type: 'select-track'; kind: TrackKind; trackId: number; time: number; epoch: number }
  | { type: 'close' }

export type DemuxEvent =
  | { type: 'metadata'; metadata: PlaybackMetadata; probe: ProbeInfo }
  | { type: 'packets'; packets: MKVPacket[]; epoch: number }
  | { type: 'progress'; phase: string; value: number }
  | { type: 'error'; code: string; message: string }
  | { type: 'eof'; epoch: number }
