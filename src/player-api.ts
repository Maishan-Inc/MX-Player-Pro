import type { TrackInfo } from './types'

export interface MXPlayerQuality {
  id: string
  label: string
}

export interface MXPlayerDanmakuOptions {
  /** 初始是否显示弹幕入口与弹幕层。 */
  visible?: boolean
  /** 宿主处理实际弹幕显示/隐藏。 */
  onToggle?: (visible: boolean) => void
  /** 宿主打开自己的弹幕输入器。 */
  onCompose?: () => void
}

export interface MXPlayerOptions {
  /** 播放器容器选择器或 DOM 元素。 */
  playerElm: string | HTMLElement
  /** 云端 MKV 下载地址，需支持 CORS 与 Range。 */
  url?: string
  /** 本地文件，与 url 二选一。 */
  file?: File
  /** 播放器标题；未提供时从 URL 或文件名推导。 */
  label?: string
  /** 允许把本地 MKV 拖拽到容器上播放。 */
  localPlayback?: boolean
  /** 元数据就绪后自动播放。 */
  autoplay?: boolean
  /** 初始音量 0-1。 */
  volume?: number
  /** 初始静音。 */
  muted?: boolean
  /** CSP 禁止 blob: Worker 时使用的同源 Worker 地址。 */
  workerUrl?: string | URL
  /** @deprecated 1.x 中保留兼容，播放器已不再加载 WASM。 */
  wasmBaseUrl?: string
  /** 提供后显示“下一集”按钮。 */
  onNext?: () => void
  /** 宿主提供的清晰度列表；播放器只负责选择 UI。 */
  qualities?: MXPlayerQuality[]
  selectedQuality?: string
  onQualityChange?: (qualityId: string) => void
  /** 可选弹幕入口；实际弹幕数据与渲染由宿主负责。 */
  danmaku?: MXPlayerDanmakuOptions
  /** 剧场模式变化时通知宿主调整页面布局。 */
  onTheaterChange?: (enabled: boolean) => void
}

export interface MXPlayerState {
  ready: boolean
  playing: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  playbackRate: number
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
  theaterchange: { enabled: boolean }
  qualitychange: { qualityId: string }
  danmakuchange: { visible: boolean }
}
