// MX Player Pro SDK
// 纯客户端 Matroska 播放器：HTTP Range 按需读取 + Worker 解封装 + WebCodecs 解码。

export { MXPlayer } from './sdk/MXPlayer'
export type {
  MXPlayerDanmakuOptions,
  MXPlayerEvents,
  MXPlayerOptions,
  MXPlayerQuality,
  MXPlayerState,
} from './sdk/MXPlayer'

export type {
  SourceDescriptor,
  TrackKind,
  TrackInfo,
  ProbeInfo,
  PlaybackMetadata,
} from './types'

export const VERSION = __APP_VERSION__
