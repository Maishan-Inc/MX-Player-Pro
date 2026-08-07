import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import PlayerSurface, { type PlayerSurfaceHandle } from '../components/PlayerSurface'
import type { MXPlayerDanmakuOptions, MXPlayerQuality, MXPlayerState } from '../player-api'
import type { SourceDescriptor, TrackInfo } from '../types'
import '../player.css'

export interface MXPlayerProps {
  url?: string
  file?: File
  label?: string
  autoplay?: boolean
  muted?: boolean
  volume?: number
  localPlayback?: boolean
  workerUrl?: string | URL
  /** @deprecated 1.x 兼容参数，播放器已不再加载 WASM。 */
  wasmBaseUrl?: string
  onNext?: () => void
  qualities?: MXPlayerQuality[]
  selectedQuality?: string
  onQualityChange?: (qualityId: string) => void
  danmaku?: MXPlayerDanmakuOptions
  onTheaterChange?: (enabled: boolean) => void
  /** 自适应宽度，宽高比 16:9。 */
  fluid?: boolean
  className?: string
  style?: React.CSSProperties
  onReady?: (payload: { tracks: TrackInfo[]; duration: number }) => void
  onPlay?: () => void
  onPause?: () => void
  onTimeUpdate?: (payload: { currentTime: number; duration: number }) => void
  onEnded?: () => void
  onError?: (payload: { message: string }) => void
}

export interface MXPlayerHandle {
  play(): void
  pause(): void
  toggle(): void
  seek(time: number): void
  setVolume(value: number): void
  setMuted(value: boolean): void
  setPlaybackRate(rate: number): void
  requestFullscreen(): void
  requestPictureInPicture(): Promise<void>
  getState(): MXPlayerState | undefined
  getTracks(): TrackInfo[]
}

interface DroppedFileOverride {
  file: File
  /** 拖入文件时的受控来源；任一 prop 改变后自动让新 prop 接管。 */
  baseUrl?: string
  baseFile?: File
}

/**
 * React 组件直接渲染统一播放器界面，不再通过 MXPlayer 创建嵌套 React root。
 * prop 换源会让 PlayerSurface 原位重建 Worker/解码器；普通父组件重渲染不会重载媒体。
 */
export const MXPlayerReact = forwardRef<MXPlayerHandle, MXPlayerProps>(function MXPlayerReact(props, ref) {
  const surfaceRef = useRef<PlayerSurfaceHandle>(null)
  const [dragging, setDragging] = useState(false)
  const [dropped, setDropped] = useState<DroppedFileOverride | null>(null)

  const source = useMemo<SourceDescriptor | undefined>(() => {
    if (dropped && dropped.baseUrl === props.url && dropped.baseFile === props.file) {
      return { kind: 'file', file: dropped.file }
    }
    if (props.url) return { kind: 'url', url: props.url }
    if (props.file) return { kind: 'file', file: props.file }
    return undefined
  }, [dropped, props.file, props.url])

  useEffect(() => {
    if (props.volume !== undefined) surfaceRef.current?.setVolume(props.volume)
  }, [props.volume])

  useEffect(() => {
    if (props.muted !== undefined) surfaceRef.current?.setMuted(props.muted)
  }, [props.muted])

  useImperativeHandle(ref, () => ({
    play: () => surfaceRef.current?.play(),
    pause: () => surfaceRef.current?.pause(),
    toggle: () => surfaceRef.current?.toggle(),
    seek: (time: number) => surfaceRef.current?.seek(time),
    setVolume: (value: number) => surfaceRef.current?.setVolume(value),
    setMuted: (value: boolean) => surfaceRef.current?.setMuted(value),
    setPlaybackRate: (rate: number) => surfaceRef.current?.setPlaybackRate(rate),
    requestFullscreen: () => surfaceRef.current?.requestFullscreen(),
    requestPictureInPicture: () => surfaceRef.current?.requestPictureInPicture() ?? Promise.resolve(),
    getState: () => surfaceRef.current?.getState(),
    getTracks: () => surfaceRef.current?.getTracks() ?? [],
  }), [])

  function acceptLocalFile(file: File | undefined) {
    if (!file || !props.localPlayback) return
    if (!file.name.toLowerCase().endsWith('.mkv') && file.type !== 'video/x-matroska') {
      props.onError?.({ message: '请拖入 Matroska (.mkv) 文件。' })
      return
    }
    setDropped({ file, baseUrl: props.url, baseFile: props.file })
  }

  const fluid = props.fluid ?? true
  return (
    <div
      className={`mxplayer-container ${dragging ? 'mxplayer-dragging' : ''} ${props.className || ''}`.trim()}
      style={{
        background: '#000',
        ...(fluid ? { width: '100%', aspectRatio: '16 / 9' } : {}),
        ...props.style,
      }}
      onDragOver={props.localPlayback ? (event) => { event.preventDefault(); setDragging(true) } : undefined}
      onDragLeave={props.localPlayback ? () => setDragging(false) : undefined}
      onDrop={props.localPlayback ? (event) => {
        event.preventDefault()
        setDragging(false)
        acceptLocalFile(event.dataTransfer.files[0])
      } : undefined}
    >
      <PlayerSurface
        ref={surfaceRef}
        source={source}
        label={props.label}
        embedded
        autoplay={props.autoplay}
        initialVolume={props.volume}
        initialMuted={props.muted}
        workerUrl={props.workerUrl}
        onNext={props.onNext}
        qualities={props.qualities}
        selectedQuality={props.selectedQuality}
        onQualityChange={props.onQualityChange}
        danmaku={props.danmaku}
        onTheaterChange={props.onTheaterChange}
        onReady={props.onReady}
        onPlay={props.onPlay}
        onPause={props.onPause}
        onTimeUpdate={props.onTimeUpdate}
        onEnded={props.onEnded}
        onError={props.onError}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
})

export default MXPlayerReact
