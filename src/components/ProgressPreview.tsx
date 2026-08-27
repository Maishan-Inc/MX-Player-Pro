import { useEffect, useRef, useState } from 'react'
import type { SourceDescriptor } from '../types'

interface ProgressPreviewProps {
  currentTime: number
  duration: number
  bufferedEnd: number
  seekableStart?: number
  seekableEnd?: number
  live?: boolean
  source?: SourceDescriptor
  onSeek: (time: number) => void
}

/**
 * A native media preview is deliberately isolated from the WebCodecs canvas.
 * Browsers that cannot preview the source (for example native MKV playback)
 * keep the time card and never interrupt the primary decoder.
 */
export default function ProgressPreview({ currentTime, duration, bufferedEnd, seekableStart = 0, seekableEnd, live = false, source, onSeek }: ProgressPreviewProps) {
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const seekTimerRef = useRef<number | null>(null)
  const [sourceUrl, setSourceUrl] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewTime, setPreviewTime] = useState(0)
  const [previewLeft, setPreviewLeft] = useState(80)
  const [previewReady, setPreviewReady] = useState(false)
  const [previewFailed, setPreviewFailed] = useState(false)

  useEffect(() => {
    if (!source) {
      setSourceUrl('')
      return
    }
    if (source.kind === 'url') {
      setSourceUrl(source.url)
      return
    }
    const objectUrl = URL.createObjectURL(source.file)
    setSourceUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [source])

  useEffect(() => {
    setPreviewReady(false)
    setPreviewFailed(false)
    setPreviewVisible(false)
    if (seekTimerRef.current !== null) window.clearTimeout(seekTimerRef.current)
    seekTimerRef.current = null
  }, [sourceUrl])

  useEffect(() => () => {
    if (seekTimerRef.current !== null) window.clearTimeout(seekTimerRef.current)
  }, [])

  const rangeStart = live ? seekableStart : 0
  const rangeEnd = live ? (seekableEnd ?? duration) : duration
  const safeDuration = Number.isFinite(rangeEnd) && rangeEnd > rangeStart ? rangeEnd - rangeStart : 0.01
  const playedPercent = clampPercent(((Math.max(rangeStart, currentTime) - rangeStart) / safeDuration) * 100)
  const bufferedPercent = clampPercent(((Math.max(rangeStart, bufferedEnd) - rangeStart) / safeDuration) * 100)

  function schedulePreviewSeek(nextTime: number) {
    if (seekTimerRef.current !== null) window.clearTimeout(seekTimerRef.current)
    seekTimerRef.current = window.setTimeout(() => {
      seekTimerRef.current = null
      const video = previewVideoRef.current
      if (!video || previewFailed || video.readyState < 1) return
      const target = Math.min(Math.max(rangeStart, nextTime), Math.max(rangeStart, rangeEnd - 0.05))
      try {
        video.currentTime = target
        video.pause()
      } catch {
        setPreviewFailed(true)
      }
    }, 80)
  }

  function updatePreview(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType && !['mouse', 'pen'].includes(event.pointerType)) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (rect.width <= 0) return
    const offset = Math.min(rect.width, Math.max(0, event.clientX - rect.left))
    const halfPreview = Math.min(80, rect.width / 2)
    const nextTime = rangeStart + (offset / rect.width) * safeDuration
    setPreviewLeft(Math.min(rect.width - halfPreview, Math.max(halfPreview, offset)))
    setPreviewTime(nextTime)
    setPreviewVisible(true)
    schedulePreviewSeek(nextTime)
  }

  function seek(event: React.ChangeEvent<HTMLInputElement>) {
    onSeek(Number(event.target.value))
  }

  return (
    <div
      className="mx-player-progress"
      data-player-control
      onPointerMove={updatePreview}
      onPointerLeave={() => setPreviewVisible(false)}
    >
      {previewVisible && (
        <div
          className={`mx-player-progress-preview ${previewReady ? 'frame-ready' : ''}`}
          style={{ left: `${previewLeft}px` }}
          aria-hidden="true"
        >
          {sourceUrl && !previewFailed && (
            <video
              ref={previewVideoRef}
              className="mx-player-progress-preview-video"
              src={sourceUrl}
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={() => schedulePreviewSeek(previewTime)}
              onSeeked={() => setPreviewReady(true)}
              onError={() => setPreviewFailed(true)}
            />
          )}
          <span className="mx-player-progress-preview-empty" />
          <time>{formatTime(previewTime)}</time>
        </div>
      )}
      <div className="mx-player-progress-rail" aria-hidden="true">
        <span className="buffered" style={{ width: `${bufferedPercent}%` }} />
        <span className="played" style={{ width: `${playedPercent}%` }} />
      </div>
      <input
        type="range"
        min={rangeStart}
        max={Math.max(rangeStart + 0.01, rangeEnd)}
        step="0.05"
        value={Math.min(Math.max(rangeStart, currentTime), Math.max(rangeStart + 0.01, rangeEnd))}
        aria-label="播放进度"
        aria-valuetext={`${formatTime(currentTime)}，已缓冲至 ${formatTime(bufferedEnd)}`}
        onChange={seek}
      />
    </div>
  )
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0))
}

function formatTime(value: number) {
  const total = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60).toString().padStart(hours ? 2 : 1, '0')
  const seconds = (total % 60).toString().padStart(2, '0')
  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}
