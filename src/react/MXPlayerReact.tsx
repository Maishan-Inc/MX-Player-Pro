import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { MXPlayer, type MXPlayerState } from '../sdk/MXPlayer'
import type { TrackInfo } from '../types'

export interface MXPlayerProps {
  url?: string
  file?: File
  autoplay?: boolean
  muted?: boolean
  volume?: number
  localPlayback?: boolean
  wasmBaseUrl?: string
  /** 自适应宽度，宽高比 16:9 */
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
  getState(): MXPlayerState | undefined
  getTracks(): TrackInfo[]
}

/**
 * React 组件封装。
 *
 * 播放器实例只在挂载时创建一次；换源走 load()，避免重建 Worker 丢掉分片缓存。
 * 事件回调存在 ref 里，父组件每次渲染传新函数也不会重挂播放器。
 */
export const MXPlayerReact = forwardRef<MXPlayerHandle, MXPlayerProps>(function MXPlayerReact(props, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<MXPlayer | null>(null)
  const handlersRef = useRef(props)
  handlersRef.current = props

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const player = new MXPlayer({
      playerElm: container,
      url: props.url,
      file: props.file,
      autoplay: props.autoplay,
      muted: props.muted,
      volume: props.volume,
      localPlayback: props.localPlayback,
      wasmBaseUrl: props.wasmBaseUrl,
    })

    player.on('ready', (payload) => handlersRef.current.onReady?.(payload))
    player.on('play', () => handlersRef.current.onPlay?.())
    player.on('pause', () => handlersRef.current.onPause?.())
    player.on('timeupdate', (payload) => handlersRef.current.onTimeUpdate?.(payload))
    player.on('ended', () => handlersRef.current.onEnded?.())
    player.on('error', (payload) => handlersRef.current.onError?.(payload))

    playerRef.current = player
    return () => {
      player.destroy()
      playerRef.current = null
    }
    // 只在挂载时建一次；url/file 的后续变化由下面的 effect 走 load()。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (props.url) void playerRef.current?.load({ kind: 'url', url: props.url })
  }, [props.url])

  useEffect(() => {
    if (props.file) void playerRef.current?.load({ kind: 'file', file: props.file })
  }, [props.file])

  useEffect(() => {
    if (props.volume !== undefined) playerRef.current?.setVolume(props.volume)
  }, [props.volume])

  useEffect(() => {
    if (props.muted !== undefined) playerRef.current?.setMuted(props.muted)
  }, [props.muted])

  useImperativeHandle(ref, () => ({
    play: () => playerRef.current?.play(),
    pause: () => playerRef.current?.pause(),
    toggle: () => playerRef.current?.toggle(),
    seek: (time: number) => playerRef.current?.seek(time),
    setVolume: (value: number) => playerRef.current?.setVolume(value),
    setMuted: (value: boolean) => playerRef.current?.setMuted(value),
    setPlaybackRate: (rate: number) => playerRef.current?.setPlaybackRate(rate),
    requestFullscreen: () => playerRef.current?.requestFullscreen(),
    getState: () => playerRef.current?.getState(),
    getTracks: () => playerRef.current?.tracks ?? [],
  }), [])

  const fluid = props.fluid ?? true
  return (
    <div
      ref={containerRef}
      className={props.className ?? 'mxplayer-container'}
      style={{
        background: '#000',
        ...(fluid ? { width: '100%', aspectRatio: '16 / 9' } : {}),
        ...props.style,
      }}
    />
  )
})

export default MXPlayerReact
