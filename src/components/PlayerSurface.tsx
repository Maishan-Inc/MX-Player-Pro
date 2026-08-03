import { Fragment, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, BarChart3, Captions, Info, Maximize2, Minimize2,
  Pause, Play, RectangleHorizontal, RefreshCw, Settings, Volume2, VolumeX, X,
} from 'lucide-react'
import { activeCue, type SubtitleCue } from '../lib/srt'
import { trackLabel } from '../lib/codec'
import { WebCodecsEngine } from '../lib/webcodecs'
import type { DemuxEvent, DemuxRequest, MKVPacket, ProbeInfo, SourceDescriptor, TrackInfo } from '../types'

interface Props { source: SourceDescriptor; label: string; onExit: () => void }
interface ContextMenuState { open: boolean; x: number; y: number }

const PLAYER_VERSION = '1.0.0'

export default function PlayerSurface({ source, label, onExit }: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const workerRef = useRef<Worker | null>(null)
  const engineRef = useRef<WebCodecsEngine | null>(null)
  const clockRef = useRef({ value: 0, anchor: 0 })
  const clickTimerRef = useRef<number | null>(null)
  const controlsTimerRef = useRef<number | null>(null)
  const longPressTimerRef = useRef<number | null>(null)
  const touchStartRef = useRef({ x: 0, y: 0 })
  const longPressFiredRef = useRef(false)
  const [metadata, setMetadata] = useState<{ tracks: TrackInfo[]; duration: number } | null>(null)
  const [probe, setProbe] = useState<ProbeInfo | null>(null)
  const [progress, setProgress] = useState('正在连接媒体…')
  const [error, setError] = useState('')
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.85)
  const [rate, setRate] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoTrackId, setVideoTrackId] = useState<number>()
  const [audioTrackId, setAudioTrackId] = useState<number>()
  const [subtitleTrackId, setSubtitleTrackId] = useState<number | null>(null)
  const [subtitleEnabled, setSubtitleEnabled] = useState(false)
  const [subtitleCues, setSubtitleCues] = useState<SubtitleCue[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [theater, setTheater] = useState(false)
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ open: false, x: 0, y: 0 })
  const [statsOpen, setStatsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [engineStatus, setEngineStatus] = useState('等待 WebCodecs…')
  const playingRef = useRef(false)
  const videoTrackRef = useRef<number | undefined>(undefined)
  const audioTrackRef = useRef<number | undefined>(undefined)
  const subtitleTrackRef = useRef<number | null>(null)
  const eventHandlerRef = useRef<(event: DemuxEvent) => void>(() => undefined)
  const durationRef = useRef(0)
  const rateRef = useRef(1)

  const videoTracks = metadata?.tracks.filter((track) => track.kind === 'video') || []
  const audioTracks = metadata?.tracks.filter((track) => track.kind === 'audio') || []
  const allSubtitleTracks = metadata?.tracks.filter((track) => track.kind === 'subtitle') || []
  const subtitleTracks = allSubtitleTracks.filter((track) => track.codecId.toUpperCase() === 'S_TEXT/UTF8')
  const cue = subtitleEnabled ? activeCue(subtitleCues, currentTime) : null
  const duration = metadata?.duration || 0
  const selectedSubtitle = subtitleTracks.find((track) => track.id === subtitleTrackId)

  playingRef.current = playing
  videoTrackRef.current = videoTrackId
  audioTrackRef.current = audioTrackId
  subtitleTrackRef.current = subtitleTrackId
  durationRef.current = duration
  rateRef.current = rate
  eventHandlerRef.current = handleWorkerEvent

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const worker = new Worker(new URL('../worker/demux.worker.ts', import.meta.url), { type: 'module' })
    const engine = new WebCodecsEngine(canvas, (status) => {
      setEngineStatus(status.error || `${status.videoReady ? '视频' : '视频不可用'}${status.audioReady ? ' · 音频' : ' · 音频不可用'}`)
      if (status.error) setError(status.error)
    })
    workerRef.current = worker
    engineRef.current = engine
    worker.onmessage = (event: MessageEvent<DemuxEvent>) => eventHandlerRef.current(event.data)
    worker.postMessage({ type: 'init', source } satisfies DemuxRequest)
    const timer = window.setInterval(() => {
      if (!playingRef.current) return
      const value = clockRef.current.value + (performance.now() / 1000 - clockRef.current.anchor) * rateRef.current
      setCurrentTime(Math.min(value, durationRef.current || value))
    }, 100)
    return () => {
      window.clearInterval(timer)
      worker.postMessage({ type: 'close' } satisfies DemuxRequest)
      worker.terminate()
      engine.close()
      workerRef.current = null
      engineRef.current = null
    }
  }, [source])

  useEffect(() => {
    function syncFullscreen() { setFullscreen(document.fullscreenElement === frameRef.current) }
    function closePopups(event: PointerEvent) {
      const target = event.target as Node | null
      if (target && frameRef.current?.contains(target)) return
      setContextMenu((current) => current.open ? { ...current, open: false } : current)
      setShowSettings(false)
      setShowSubtitleMenu(false)
    }
    document.addEventListener('fullscreenchange', syncFullscreen)
    document.addEventListener('pointerdown', closePopups)
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreen)
      document.removeEventListener('pointerdown', closePopups)
    }
  }, [])

  useEffect(() => () => {
    if (clickTimerRef.current !== null) window.clearTimeout(clickTimerRef.current)
    if (controlsTimerRef.current !== null) window.clearTimeout(controlsTimerRef.current)
    if (longPressTimerRef.current !== null) window.clearTimeout(longPressTimerRef.current)
  }, [])

  function handleWorkerEvent(event: DemuxEvent) {
    if (event.type === 'progress') { setProgress(event.phase); return }
    if (event.type === 'error') { setError(event.message); setProgress('读取失败'); return }
    if (event.type === 'metadata') {
      const tracks = event.metadata.tracks
      const video = tracks.find((track) => track.kind === 'video')
      const audio = tracks.find((track) => track.kind === 'audio')
      setMetadata({ tracks, duration: event.metadata.duration })
      setProbe(event.probe)
      setVideoTrackId(video?.id)
      setAudioTrackId(audio?.id)
      videoTrackRef.current = video?.id
      audioTrackRef.current = audio?.id
      setSubtitleTrackId(null)
      subtitleTrackRef.current = null
      setSubtitleEnabled(false)
      setSubtitleCues([])
      setProgress('轨道已识别')
      void engineRef.current?.configure(video, audio)
      engineRef.current?.setVolume(muted ? 0 : volume)
      return
    }
    if (event.type === 'packets') {
      event.packets.forEach((packet) => handlePacket(packet))
      workerRef.current?.postMessage({ type: 'next' } satisfies DemuxRequest)
      return
    }
    if (event.type === 'eof') setProgress('已到达缓存末端')
  }

  function handlePacket(packet: MKVPacket) {
    if (packet.trackId === subtitleTrackRef.current) {
      const text = new TextDecoder().decode(packet.data).trim()
      if (text) {
        setSubtitleCues((cues) => [...cues, {
          start: packet.timestamp / 1_000_000,
          end: packet.timestamp / 1_000_000 + Math.max(packet.duration / 1_000_000, 3),
          text: cleanSubtitleText(text),
        }])
      }
      return
    }
    engineRef.current?.enqueue(packet, videoTrackRef.current, audioTrackRef.current)
  }

  function togglePlayback() {
    const nextPlaying = !playing
    setPlaying(nextPlaying)
    playingRef.current = nextPlaying
    if (nextPlaying) {
      clockRef.current.anchor = performance.now() / 1000
      engineRef.current?.play()
    } else {
      clockRef.current.value = currentTime
      engineRef.current?.pause()
    }
    showControls()
  }

  function seek(value: number) {
    const next = Math.max(0, Math.min(value, duration || value))
    clockRef.current = { value: next, anchor: performance.now() / 1000 }
    setCurrentTime(next)
    setSubtitleCues([])
    engineRef.current?.reset()
    workerRef.current?.postMessage({ type: 'seek', time: next } satisfies DemuxRequest)
    showControls()
  }

  function selectTrack(kind: 'audio' | 'subtitle', id: number | null) {
    if (kind === 'audio') {
      setAudioTrackId(id === null ? undefined : id)
      audioTrackRef.current = id === null ? undefined : id
    } else {
      setSubtitleTrackId(id)
      subtitleTrackRef.current = id
      setSubtitleEnabled(id !== null)
      setSubtitleCues([])
      setShowSubtitleMenu(false)
    }
    if (id !== null) workerRef.current?.postMessage({ type: 'select-track', kind, trackId: id } satisfies DemuxRequest)
  }

  function toggleFullscreen() {
    const element = frameRef.current
    if (!element) return
    if (document.fullscreenElement) void document.exitFullscreen()
    else void element.requestFullscreen()
  }

  function showControls(pinned = false) {
    setControlsVisible(true)
    if (controlsTimerRef.current !== null) window.clearTimeout(controlsTimerRef.current)
    if (pinned || controlsPinned()) return
    controlsTimerRef.current = window.setTimeout(() => setControlsVisible(false), 5000)
  }

  function controlsPinned() {
    return contextMenu.open || statsOpen || aboutOpen || showSettings || showSubtitleMenu
  }

  function handleSurfaceClick(event: React.MouseEvent<HTMLDivElement>) {
    if (isPlayerControl(event.target)) return
    closeContextMenu()
    if (clickTimerRef.current !== null) window.clearTimeout(clickTimerRef.current)
    clickTimerRef.current = window.setTimeout(() => {
      clickTimerRef.current = null
      togglePlayback()
    }, 220)
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (isPlayerControl(event.target)) return
    if (clickTimerRef.current !== null) { window.clearTimeout(clickTimerRef.current); clickTimerRef.current = null }
    toggleFullscreen()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)) return
    const key = event.key.toLowerCase()
    if (![' ', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'j', 'l', 'm', 'f', 'escape'].includes(key)) return
    event.preventDefault()
    if (key === 'escape') { closeContextMenu(); setStatsOpen(false); setAboutOpen(false); setShowSettings(false); setShowSubtitleMenu(false); return }
    showControls()
    if (key === ' ') togglePlayback()
    else if (key === 'arrowleft') seek(currentTime - 5)
    else if (key === 'arrowright') seek(currentTime + 5)
    else if (key === 'j') seek(currentTime - 10)
    else if (key === 'l') seek(currentTime + 10)
    else if (key === 'arrowup') setVolumeAndUnmute(Math.min(1, volume + .05))
    else if (key === 'arrowdown') setVolumeAndUnmute(Math.max(0, volume - .05))
    else if (key === 'm') toggleMuted()
    else if (key === 'f') toggleFullscreen()
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    if (isPlayerControl(event.target)) return
    const touch = event.touches[0]
    if (!touch) return
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    longPressFiredRef.current = false
    if (longPressTimerRef.current !== null) window.clearTimeout(longPressTimerRef.current)
    longPressTimerRef.current = window.setTimeout(() => {
      longPressFiredRef.current = true
      openContextMenuAt(touchStartRef.current.x, touchStartRef.current.y)
    }, 500)
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0]
    if (!touch || longPressTimerRef.current === null) return
    if (Math.abs(touch.clientX - touchStartRef.current.x) > 10 || Math.abs(touch.clientY - touchStartRef.current.y) > 10) {
      window.clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (isPlayerControl(event.target)) return
    event.preventDefault()
    if (longPressTimerRef.current !== null) { window.clearTimeout(longPressTimerRef.current); longPressTimerRef.current = null }
    if (longPressFiredRef.current) { longPressFiredRef.current = false; return }
    if (controlsVisible) setControlsVisible(false)
    else showControls()
  }

  function openContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    openContextMenuAt(event.clientX, event.clientY)
  }

  function openContextMenuAt(clientX: number, clientY: number) {
    const frame = frameRef.current
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    const menuWidth = 234
    const menuHeight = 84
    const x = Math.max(8, Math.min(clientX - rect.left, rect.width - menuWidth - 8))
    const y = Math.max(8, Math.min(clientY - rect.top, rect.height - menuHeight - 8))
    setContextMenu({ open: true, x, y })
    setShowSettings(false)
    setShowSubtitleMenu(false)
    showControls(true)
    frame.focus()
  }

  function closeContextMenu() {
    setContextMenu((current) => current.open ? { ...current, open: false } : current)
  }

  function openStats() {
    closeContextMenu()
    setStatsOpen(true)
    setShowSettings(false)
    setShowSubtitleMenu(false)
    showControls(true)
  }

  function openAbout() {
    closeContextMenu()
    setAboutOpen(true)
    setShowSettings(false)
    setShowSubtitleMenu(false)
    showControls(true)
  }

  function setVolumeAndUnmute(next: number) {
    setVolume(next)
    setMuted(next <= 0)
    engineRef.current?.setVolume(next)
  }

  function toggleMuted() {
    const next = !muted
    setMuted(next)
    engineRef.current?.setVolume(next ? 0 : volume)
  }

  const statsRows: Array<[string, string]> = [
    ['源', source.kind === 'file' ? '本地文件' : safeHostname(label)],
    ['状态', progress],
    ['HTTP', String(probe?.status || '--')],
    ['CORS', probe?.cors === 'ok' ? '允许' : probe?.cors === 'blocked' ? '阻断' : '未知'],
    ['Range', probe?.acceptsRanges ? '206 Partial Content' : '完整响应 / 不支持 206'],
    ['视频', videoTracks[0] ? trackLabel(videoTracks[0]) : '未识别'],
    ['音频', audioTracks[0] ? trackLabel(audioTracks[0]) : '未识别'],
    ['字幕', `${allSubtitleTracks.length} 条（${subtitleTracks.length} 条可用）`],
    ['解码器', engineStatus],
  ]

  return (
    <div className={`player-page ${theater ? 'is-theater' : ''}`}>
      <header className="player-topbar">
        <button className="back-button" onClick={onExit}><ArrowLeft size={18} aria-hidden="true" /> <span>重新选择</span></button>
        <div className="player-title" title={label}>{label}</div>
        <div className="player-topbar-right"><span className="status-dot"><i /> {progress}</span></div>
      </header>
      <main className="player-layout">
        <section className="player-column">
          <div
            ref={frameRef}
            className="player-frame"
            tabIndex={0}
            onMouseMove={() => showControls()}
            onMouseLeave={() => { if (!controlsPinned()) setControlsVisible(false) }}
            onClick={handleSurfaceClick}
            onDoubleClick={handleDoubleClick}
            onContextMenu={openContextMenu}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-label="MX Player 视频播放器"
          >
            <canvas ref={canvasRef} className="video-canvas" aria-label="视频画面" />
            {!metadata && !error && <div className="player-loading" data-player-control><span className="spinner" /><strong>{progress}</strong></div>}
            {error && <div className="player-error" data-player-control><strong>无法播放此媒体</strong><span>{error}</span><button className="secondary-button" onClick={() => window.location.reload()}><RefreshCw size={15} /> 重新读取</button></div>}
            {cue && <div className="subtitle-overlay">{cue.text.split('\n').map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}</div>}
            {statsOpen && <StatsPanel rows={statsRows} onClose={() => setStatsOpen(false)} />}
            {aboutOpen && <AboutPanel onClose={() => setAboutOpen(false)} />}
            {showSubtitleMenu && <SubtitleMenu tracks={subtitleTracks} selectedId={subtitleTrackId} enabled={subtitleEnabled} onSelect={(id) => selectTrack('subtitle', id)} />}
            <div className={`player-controls ${controlsVisible ? 'is-visible' : ''}`} data-player-control onClick={(event) => event.stopPropagation()}>
              <button className="control-button" title={playing ? '暂停' : '播放'} aria-label={playing ? '暂停' : '播放'} onClick={togglePlayback}>{playing ? <Pause size={21} /> : <Play size={21} fill="currentColor" />}</button>
              <span className="time-readout">{formatTime(currentTime)} / {formatTime(duration)}</span>
              <input className="seek-slider" type="range" min="0" max={duration || 100} step="0.1" value={Math.min(currentTime, duration || 100)} onChange={(event) => seek(Number(event.target.value))} aria-label="播放进度" />
              <button className="control-button" title={muted ? '取消静音' : '静音'} aria-label={muted ? '取消静音' : '静音'} onClick={toggleMuted}>{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
              <input className="volume-slider" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => setVolumeAndUnmute(Number(event.target.value))} aria-label="音量" />
              {subtitleTracks.length > 0 && <button className={`control-button ${subtitleEnabled ? 'is-active' : ''}`} title={selectedSubtitle ? `字幕：${subtitleLabel(selectedSubtitle)}` : '字幕'} aria-label="字幕" aria-pressed={subtitleEnabled} onClick={() => { const next = !showSubtitleMenu; setShowSubtitleMenu(next); setShowSettings(false); showControls(next) }}><Captions size={20} /></button>}
              <button className={`control-button ${showSettings ? 'is-active' : ''}`} title="设置" aria-label="设置" onClick={() => { const next = !showSettings; setShowSettings(next); setShowSubtitleMenu(false); showControls(next) }}><Settings size={20} /></button>
              <button className={`control-button ${theater ? 'is-active' : ''}`} title="剧场模式" aria-label="剧场模式" aria-pressed={theater} onClick={() => setTheater((value) => !value)}><RectangleHorizontal size={20} /></button>
              <button className="control-button" title={fullscreen ? '退出全屏' : '全屏'} aria-label={fullscreen ? '退出全屏' : '全屏'} onClick={toggleFullscreen}>{fullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>
            </div>
            {showSettings && <SettingsPanel rate={rate} setRate={(next) => { setRate(next); engineRef.current?.setPlaybackRate(next) }} audioTracks={audioTracks} subtitleTracks={subtitleTracks} audioTrackId={audioTrackId} subtitleTrackId={subtitleTrackId} selectTrack={selectTrack} />}
            {contextMenu.open && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={closeContextMenu} onStats={openStats} onAbout={openAbout} />}
          </div>
          <div className="player-status-line"><span>{engineStatus}</span><span>当前时间 {formatTime(currentTime)}</span></div>
        </section>
      </main>
    </div>
  )
}

function ContextMenu({ x, y, onClose, onStats, onAbout }: { x: number; y: number; onClose: () => void; onStats: () => void; onAbout: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => { menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus() }, [])
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const buttons = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('button') || [])
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
    if (!['ArrowDown', 'ArrowUp'].includes(event.key) || !buttons.length) return
    event.preventDefault()
    const delta = event.key === 'ArrowDown' ? 1 : -1
    buttons[(index + delta + buttons.length) % buttons.length]?.focus()
  }
  return <div ref={menuRef} className="context-menu" role="menu" data-player-control style={{ left: x, top: y }} onKeyDown={handleKeyDown} onClick={(event) => event.stopPropagation()}><button role="menuitem" onClick={onStats}><BarChart3 size={15} /> 播放器统计</button><span className="menu-separator" /><button role="menuitem" onClick={onAbout}><Info size={15} /> 关于 MX Player</button></div>
}

function SubtitleMenu({ tracks, selectedId, enabled, onSelect }: { tracks: TrackInfo[]; selectedId: number | null; enabled: boolean; onSelect: (id: number | null) => void }) {
  return <div className="subtitle-menu" role="menu" data-player-control onClick={(event) => event.stopPropagation()}><strong>字幕</strong><button className={!enabled || selectedId === null ? 'is-selected' : ''} onClick={() => onSelect(null)}>关闭</button>{tracks.map((track) => <button key={track.id} className={enabled && selectedId === track.id ? 'is-selected' : ''} onClick={() => onSelect(track.id)}>{subtitleLabel(track)}</button>)}</div>
}

function StatsPanel({ rows, onClose }: { rows: Array<[string, string]>; onClose: () => void }) {
  return <section className="player-modal player-stats" data-player-control><header><strong>播放器统计</strong><button className="modal-close" title="关闭" aria-label="关闭" onClick={onClose}><X size={17} /></button></header><dl>{rows.map(([label, value]) => <Fragment key={label}><dt>{label}</dt><dd>{value}</dd></Fragment>)}</dl></section>
}

function AboutPanel({ onClose }: { onClose: () => void }) {
  return <section className="player-modal player-about" data-player-control><button className="modal-close" title="关闭" aria-label="关闭" onClick={onClose}><X size={17} /></button><strong>MX Player</strong><span>v{PLAYER_VERSION}</span><p>纯客户端 Matroska 播放器。文件和链接只在本机读取，视频帧由 WebCodecs 输出。</p></section>
}

function SettingsPanel({ rate, setRate, audioTracks, subtitleTracks, audioTrackId, subtitleTrackId, selectTrack }: { rate: number; setRate: (value: number) => void; audioTracks: TrackInfo[]; subtitleTracks: TrackInfo[]; audioTrackId?: number; subtitleTrackId: number | null; selectTrack: (kind: 'audio' | 'subtitle', id: number | null) => void }) {
  return <div className="settings-panel" data-player-control><label><span>播放速度</span><select value={rate} onChange={(event) => setRate(Number(event.target.value))}>{[0.5, 0.75, 1, 1.25, 1.5, 2].map((value) => <option value={value} key={value}>{value}×</option>)}</select></label><label><span>音频轨</span><select value={audioTrackId ?? ''} onChange={(event) => selectTrack('audio', event.target.value ? Number(event.target.value) : null)}><option value="">自动</option>{audioTracks.map((track) => <option value={track.id} key={track.id}>{trackLabel(track)}</option>)}</select></label>{subtitleTracks.length > 0 && <label><span>字幕轨</span><select value={subtitleTrackId ?? ''} onChange={(event) => selectTrack('subtitle', event.target.value ? Number(event.target.value) : null)}><option value="">关闭</option>{subtitleTracks.map((track) => <option value={track.id} key={track.id}>{subtitleLabel(track)}</option>)}</select></label>}</div>
}

function isPlayerControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest('[data-player-control]'))
}

function subtitleLabel(track: TrackInfo) {
  return [track.language, track.name].filter(Boolean).join(' · ') || `字幕轨 ${track.id}`
}

function cleanSubtitleText(value: string) {
  return value.replace(/^\{\\[^}]+\}/, '').replace(/<[^>]+>/g, '').trim()
}

function safeHostname(value: string) {
  try { return new URL(value).hostname || '远程 URL' } catch { return '远程 URL' }
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '00:00'
  const total = Math.floor(value)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
