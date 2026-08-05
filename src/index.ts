// MX Player Pro SDK
// 纯客户端 Matroska 播放器：HTTP Range 按需读取 + Worker 解封装 + WebCodecs 解码。

export { MXPlayer } from './sdk/MXPlayer'
export type { MXPlayerOptions, MXPlayerState, MXPlayerEvents } from './sdk/MXPlayer'

export type {
  SourceDescriptor,
  TrackKind,
  TrackInfo,
  ProbeInfo,
  PlaybackMetadata,
} from './types'

export const VERSION = '1.0.0'
