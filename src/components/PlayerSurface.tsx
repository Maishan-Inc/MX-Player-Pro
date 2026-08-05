import { Fragment, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, BarChart3, Captions, Check, Info, Maximize2, Minimize2,
  Pause, Play, RectangleHorizontal, RefreshCw, RotateCcw, Settings, Volume2, VolumeX, X,
} from 'lucide-react'
import { activeCues, parseAssBlock, stripAssMarkup, type SubtitleCue } from '../lib/srt'
import { isAssSubtitle, isTextSubtitle, trackLabel } from '../lib/codec'
import {
  DEFAULT_SUBTITLE_STYLE, SUBTITLE_FONTS, clampOffset, clampScale,
  fontStack, loadSubtitleStyle, saveSubtitleStyle, subtitleStyleScope, type SubtitleStyle,
} from '../lib/subtitle-style'
import { WebCodecsEngine, type EngineStats } from '../lib/webcodecs'
import { explainPlaybackError } from '../lib/playback-error'
import type { DemuxEvent, DemuxRequest, MKVPacket, ProbeInfo, SourceDescriptor, TrackInfo } from '../types'

interface Props { source: SourceDescriptor; label: string; onExit: () => void }
interface ContextMenuState { open: boolean; x: number; y: number }
type SubtitlePage = 'track' | 'font'

const PLAYER_VERSION = __APP_VERSION__
/** Cues are bounded per track; a feature film is well under this. */
const MAX_CUES_PER_TRACK = 2048
/** Font previews use a mixed-script sample so CJK and Latin coverage is visible. */
const FONT_SAMPLE = 'ABCabc123'
/** Geometry of one track row, mirrored from the stylesheet, for the menu height sum. */
const MENU_ROW_HEIGHT = 34
const MENU_ROW_GAP = 4
const EMPTY_STATS: EngineStats = {
  currentTime: 0, bufferedStart: 0, bufferedEnd: 0, bufferedAhead: 0,
  bufferedBytes: 0, stalled: false, droppedFrames: 0,
}

export default function PlayerSurface({ source, label, onExit }: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const workerRef = useRef<Worker | null>(null)
  const engineRef = useRef<WebCodecsEngine | null>(null)
  const epochRef = useRef(0)
  const inFlightRef = useRef(false)
  const eofRef = useRef(false)
  const readyRef = useRef(false)
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
  const [cueLines, setCueLines] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false)
  const [subtitleMenuPage, setSubtitleMenuPage] = useState<SubtitlePage>('track')
  const [showSubtitleEditor, setShowSubtitleEditor] = useState(false)
  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyle>(() => loadSubtitleStyle(subtitleStyleScope(source)))
  const [controlsVisible, setControlsVisible] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [theater, setTheater] = useState(false)
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ open: false, x: 0, y: 0 })
  const [statsOpen, setStatsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [engineStatus, setEngineStatus] = useState('等待 WebCodecs…')
  const [stats, setStats] = useState<EngineStats>(EMPTY_STATS)
  const playingRef = useRef(false)
  const videoTrackRef = useRef<number | undefined>(undefined)
  const audioTrackRef = useRef<number | undefined>(undefined)
  const subtitleTrackRef = useRef<number | null>(null)
  const subtitleEnabledRef = useRef(false)
  /**
   * Cues for every text subtitle track, collected continuously. The demuxer keeps all
   * subtitle tracks selected, so turning subtitles on is a pure UI switch — it used to
   * rewind the demuxer, which replayed already-scheduled audio and desynced the clock.
   */
  const cuesRef = useRef(new Map<number, SubtitleCue[]>())
  const subtitleIsAssRef = useRef(new Map<number, boolean>())
  const cueTextRef = useRef('')
  const eventHandlerRef = useRef<(event: DemuxEvent) => void>(() => undefined)
  const pumpRef = useRef<() => void>(() => undefined)
  const durationRef = useRef(0)
  const styleScopeRef = useRef(subtitleStyleScope(source))
  const wasPausedBeforeEditRef = useRef(false)
  const closeMenuRef = useRef<() => void>(() => undefined)

  const videoTracks = metadata?.tracks.filter((track) => track.kind === 'video') || []
  const audioTracks = metadata?.tracks.filter((track) => track.kind === 'audio') || []
  const allSubtitleTracks = metadata?.tracks.filter((track) => track.kind === 'subtitle') || []
  const subtitleTracks = allSubtitleTracks.filter(isTextSubtitle)
  const duration = metadata?.duration || 0
  const selectedSubtitle = subtitleTracks.find((track) => track.id === subtitleTrackId)
  /** The subtitle menu and its editor hold the picture still for as long as they are open. */
  const playbackLocked = showSubtitleMenu || showSubtitleEditor

  playingRef.current = playing
  videoTrackRef.current = videoTrackId
  audioTrackRef.current = audioTrackId
  subtitleTrackRef.current = subtitleTrackId
  subtitleEnabledRef.current = subtitleEnabled
  durationRef.current = duration
  eventHandlerRef.current = handleWorkerEvent
  pumpRef.current = pump
  closeMenuRef.current = closeSubtitleMenu

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const worker = new Worker(new URL('../worker/demux.worker.ts', import.meta.url), { type: 'module' })
    const engine = new WebCodecsEngine(canvas, (status) => {
      setEngineStatus(status.error ? explainPlaybackError(status.error) : `${status.videoReady ? '视频' : '视频不可用'}${status.audioReady ? ' · 音频' : ' · 音频不可用'}`)
      // Only a dead video pipeline is a fatal, overlay-worthy error; audio-only
      // failures leave the file watchable.
      if (status.error && !/^DECODER_(?:ERROR|UNSUPPORTED)_AUDIO/i.test(status.error)) setError(explainPlaybackError(status.error))
    })
    workerRef.current = worker
    engineRef.current = engine
    epochRef.current = 0
    inFlightRef.current = false
    eofRef.current = false
    readyRef.current = false
    worker.onmessage = (event: MessageEvent<DemuxEvent>) => eventHandlerRef.current(event.data)
    worker.postMessage({ type: 'init', source } satisfies DemuxRequest)
    const timer = window.setInterval(() => {
      const active = engineRef.current
      if (!active) return
      // Keeps the decoders fed while paused too, so a seek preview still paints.
      active.tick()
      const snapshot = active.stats()
      setStats(snapshot)
      // The engine clock is the single source of truth; a paused or rebuffering clock
      // reports a frozen value, which is exactly what should be displayed.
      const value = durationRef.current ? Math.min(snapshot.currentTime, durationRef.current) : snapshot.currentTime
      setCurrentTime(value)
      syncCues(value)
      pumpRef.current()
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
      // Route through the ref so closing the menu also resumes playback.
      closeMenuRef.current()
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

  /**
   * Subtitle styling is cached per playback host rather than globally, so a size that
   * suits one site's releases is not imposed on the next. Reload on source change and
   * write back on every edit; the scope ref keeps the load from echoing straight into
   * a save of the value that was just read.
   */
  useEffect(() => {
    const scope = subtitleStyleScope(source)
    styleScopeRef.current = scope
    setSubtitleStyle(loadSubtitleStyle(scope))
  }, [source])

  useEffect(() => {
    saveSubtitleStyle(styleScopeRef.current, subtitleStyle)
  }, [subtitleStyle])

  function pump() {
    // The worker cannot serve packets until init() has produced metadata.
    if (!readyRef.current || inFlightRef.current || eofRef.current) return
    if (!engineRef.current?.needsPackets(playingRef.current, eofRef.current, inFlightRef.current)) return
    inFlightRef.current = true
    workerRef.current?.postMessage({ type: 'next', epoch: epochRef.current } satisfies DemuxRequest)
  }

  /**
   * Resolve the on-screen subtitle from the selected track's cues. Rendering is driven
   * off the media clock rather than off packet arrival, so cue text stays put while
   * the demuxer runs seconds ahead of the playhead.
   */
  function syncCues(time: number) {
    const trackId = subtitleTrackRef.current
    const cues = subtitleEnabledRef.current && trackId !== null ? cuesRef.current.get(trackId) : undefined
    const lines = cues ? activeCues(cues, time).map((cue) => cue.text) : []
    const joined = lines.join(' ')
    // Only re-render when the visible text actually changes, not every 100ms.
    if (joined === cueTextRef.current) return
    cueTextRef.current = joined
    setCueLines(lines)
  }

  function handleWorkerEvent(event: DemuxEvent) {
    if (event.type === 'progress') { setProgress(event.phase); return }
    if (event.type === 'error') {
      // Clear the in-flight flag: one transient range failure must not wedge the
      // fill loop for the rest of the session.
      inFlightRef.current = false
      setError(explainPlaybackError(event.message))
      setProgress('读取失败')
      return
    }
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
      subtitleEnabledRef.current = false
      cuesRef.current = new Map()
      subtitleIsAssRef.current = new Map(
        tracks.filter(isTextSubtitle).map((track) => [track.id, isAssSubtitle(track)]),
      )
      cueTextRef.current = ''
      setCueLines([])
      setProgress('轨道已识别')
      readyRef.current = true
      void engineRef.current?.configure(video, audio)
      engineRef.current?.setVolume(muted ? 0 : volume)
      return
    }
    if (event.type === 'packets') {
      // Discard replies that predate a seek; they belong to a superseded position.
      if (event.epoch < epochRef.current) return
      inFlightRef.current = false
      event.packets.forEach((packet) => handlePacket(packet))
      // An empty batch means the worker was not ready yet. The 100ms interval will
      // retry, so do not pump straight back and spin.
      if (event.packets.length) pump()
      return
    }
    if (event.type === 'eof') {
      if (event.epoch < epochRef.current) return
      inFlightRef.current = false
      eofRef.current = true
      engineRef.current?.markEndOfStream()
      setProgress('已到达文件末端')
    }
  }

  function handlePacket(packet: MKVPacket) {
    const isAss = subtitleIsAssRef.current.get(packet.trackId)
    if (isAss !== undefined) {
      const raw = new TextDecoder().decode(packet.data)
      const text = isAss ? parseAssBlock(raw) : stripAssMarkup(raw.trim())
      if (text) storeCue(packet, text)
      return
    }
    engineRef.current?.enqueue(packet, videoTrackRef.current, audioTrackRef.current)
  }

  function storeCue(packet: MKVPacket, text: string) {
    const start = packet.timestamp / 1_000_000
    // BlockDuration is authoritative now that it is parsed and preferred over the
    // track default; the fallback only applies to muxers that omit both.
    const end = start + (packet.duration > 0 ? packet.duration / 1_000_000 : 3)
    const existing = cuesRef.current.get(packet.trackId) || []
    // Cues arrive in order, so this walks back zero steps in the common case.
    let index = existing.length
    while (index > 0 && existing[index - 1].start > start) index -= 1
    // A re-demuxed cue lands exactly where its twin already sits, so only the
    // neighbours at the insertion point can be duplicates.
    if (index > 0 && existing[index - 1].start === start && existing[index - 1].text === text) return
    for (let probe = index; probe < existing.length && existing[probe].start === start; probe += 1) {
      if (existing[probe].text === text) return
    }
    existing.splice(index, 0, { start, end, text })
    if (existing.length > MAX_CUES_PER_TRACK) existing.splice(0, existing.length - MAX_CUES_PER_TRACK)
    cuesRef.current.set(packet.trackId, existing)
  }

  function togglePlayback() {
    // While the subtitle menu or its editor is open the picture is deliberately frozen,
    // so every route to playback — button, space bar, surface click — is inert.
    if (playbackLocked) { showControls(true); return }
    const nextPlaying = !playing
    setPlaying(nextPlaying)
    playingRef.current = nextPlaying
    if (nextPlaying) {
      engineRef.current?.play()
      pump()
    } else {
      engineRef.current?.pause()
    }
    showControls()
  }

  function seek(value: number) {
    const next = Math.max(0, Math.min(value, duration || value))
    setCurrentTime(next)
    // Cues are keyed by media time, so they survive a seek; only the visible line
    // has to be recomputed for the new position.
    epochRef.current += 1
    eofRef.current = false
    inFlightRef.current = false
    engineRef.current?.seekTo(next)
    syncCues(next)
    workerRef.current?.postMessage({ type: 'seek', time: next, epoch: epochRef.current } satisfies DemuxRequest)
    inFlightRef.current = true
    showControls()
  }

  function selectTrack(kind: 'audio' | 'subtitle', id: number | null) {
    if (kind === 'subtitle') {
      // Every subtitle track is demuxed continuously, so this is display-only: no
      // epoch bump, no worker round trip, no rewind of the demux cursor.
      setSubtitleTrackId(id)
      subtitleTrackRef.current = id
      setSubtitleEnabled(id !== null)
      subtitleEnabledRef.current = id !== null
      // Picking a track ends the comparison, so the menu closes and playback resumes.
      closeSubtitleMenu()
      syncCues(engineRef.current?.currentTime ?? currentTime)
      return
    }
    setAudioTrackId(id === null ? undefined : id)
    audioTrackRef.current = id === null ? undefined : id
    if (id === null) return
    // A newly selected audio track only yields packets from clusters demuxed after
    // the switch, so re-demux from the current position and reset the engine.
    const time = engineRef.current?.currentTime ?? 0
    epochRef.current += 1
    eofRef.current = false
    engineRef.current?.seekTo(time)
    workerRef.current?.postMessage({ type: 'select-track', kind, trackId: id, time, epoch: epochRef.current } satisfies DemuxRequest)
    inFlightRef.current = true
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
    return contextMenu.open || statsOpen || aboutOpen || showSettings || showSubtitleMenu || showSubtitleEditor
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
    if (key === 'escape') { closeContextMenu(); setStatsOpen(false); setAboutOpen(false); setShowSettings(false); closeSubtitleMenu(); return }
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
    closeSubtitleMenu()
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
    closeSubtitleMenu()
    showControls(true)
  }

  function openAbout() {
    closeContextMenu()
    setAboutOpen(true)
    setShowSettings(false)
    closeSubtitleMenu()
    showControls(true)
  }

  /**
   * The subtitle menu pauses playback for as long as it is open: picking a track or a
   * font is a comparison task, and a moving picture makes it harder. The pause is
   * menu-owned — a deliberate pause made before opening survives the close.
   */
  function toggleSubtitleMenu() {
    if (showSubtitleMenu) { closeSubtitleMenu(); return }
    holdPlayback()
    setShowSubtitleMenu(true)
    setSubtitleMenuPage('track')
    setShowSettings(false)
    showControls(true)
  }

  /**
   * Freeze the picture and remember whether it was already still. Only the first hold
   * records that: an editor opened on top of the menu must not mistake the menu's own
   * pause for one the viewer made.
   */
  function holdPlayback() {
    if (!playbackLocked) wasPausedBeforeEditRef.current = !playing
    if (!playing) return
    setPlaying(false)
    playingRef.current = false
    engineRef.current?.pause()
  }

  function closeSubtitleMenu() {
    if (!showSubtitleMenu && !showSubtitleEditor) return
    setShowSubtitleMenu(false)
    setShowSubtitleEditor(false)
    if (!wasPausedBeforeEditRef.current) {
      setPlaying(true)
      playingRef.current = true
      engineRef.current?.play()
      pump()
    }
    showControls()
  }

  function openSubtitleEditor() {
    // The menu stays open: editing is a mode layered on top of it, so the font list
    // remains one click away while size and position are dragged. The hold is
    // re-asserted rather than assumed, so the editor freezes the picture on its own.
    holdPlayback()
    setShowSettings(false)
    setShowSubtitleEditor(true)
    showControls(true)
  }

  function closeSubtitleEditor() {
    // Leaving the editor keeps the menu — and its pause — in place; only the drag
    // affordances go away.
    setShowSubtitleEditor(false)
    showControls()
  }

  /**
   * Drag the subtitle vertically to adjust its offset. The frame is a container,
   * so a percentage resolves to the same on-screen distance windowed and fullscreen.
   */
  function startSubtitleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!frameRef.current) return
    event.stopPropagation()
    const frame = frameRef.current
    const startY = event.clientY
    const startOffset = subtitleStyle.offset
    const frameHeight = frame.getBoundingClientRect().height
    function onMove(moveEvent: PointerEvent) {
      const deltaY = moveEvent.clientY - startY
      // Positive offset moves the subtitle up (bottom increases), so a downward
      // pointer drag (positive deltaY) should decrease offset.
      const deltaPercent = (-deltaY / frameHeight) * 100
      setSubtitleStyle((current) => ({ ...current, offset: clampOffset(startOffset + deltaPercent) }))
    }
    function onUp() {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }

  /**
   * Drag any corner to scale. Size tracks the pointer's distance from the box centre,
   * so every corner behaves the same way: out enlarges, in shrinks, and the ratio of
   * distances maps directly onto the ratio of sizes.
   */
  function startSubtitleResize(event: React.PointerEvent<HTMLSpanElement>) {
    const box = (event.currentTarget.parentElement as HTMLElement | null)?.getBoundingClientRect()
    if (!box) return
    event.stopPropagation()
    event.preventDefault()
    const centreX = box.left + box.width / 2
    const centreY = box.top + box.height / 2
    const startDistance = Math.hypot(event.clientX - centreX, event.clientY - centreY)
    const startScale = subtitleStyle.scale
    // A corner grabbed exactly at the centre would divide by zero on the first move.
    if (startDistance < 1) return
    function onMove(moveEvent: PointerEvent) {
      const distance = Math.hypot(moveEvent.clientX - centreX, moveEvent.clientY - centreY)
      setSubtitleStyle((current) => ({ ...current, scale: clampScale(startScale * (distance / startDistance)) }))
    }
    function onUp() {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
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
    ['状态', stats.stalled ? '缓冲中' : progress],
    ['HTTP', String(probe?.status || '--')],
    ['CORS', probe?.cors === 'ok' ? '允许' : probe?.cors === 'blocked' ? '阻断' : '未知'],
    ['Range', probe?.acceptsRanges ? '206 Partial Content' : '完整响应 / 不支持 206'],
    ['视频', videoTracks[0] ? trackLabel(videoTracks[0]) : '未识别'],
    ['音频', audioTracks[0] ? trackLabel(audioTracks[0]) : '未识别'],
    ['字幕', `${allSubtitleTracks.length} 条（${subtitleTracks.length} 条可用）`],
    ['缓冲', `${stats.bufferedAhead.toFixed(1)} 秒 · ${formatBytes(stats.bufferedBytes)}`],
    ['丢帧', String(stats.droppedFrames)],
    ['解码器', engineStatus],
  ]

  // Percentages for the seek bar's played and buffered layers.
  const scale = duration || 100
  const playedPercent = clampPercent((Math.min(currentTime, scale) / scale) * 100)
  const bufferedPercent = clampPercent((Math.min(Math.max(stats.bufferedEnd, currentTime), scale) / scale) * 100)

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
            {metadata && !error && stats.stalled && (
              <div className="player-buffering" data-player-control><span className="spinner" /><strong>缓冲中…</strong></div>
            )}
            {error && <div className="player-error" data-player-control><strong>无法播放此媒体</strong><span>{error}</span><button className="secondary-button" onClick={() => window.location.reload()}><RefreshCw size={15} /> 重新读取</button></div>}
            {(cueLines.length > 0 || showSubtitleEditor) && (
              <div
                className={`subtitle-overlay ${showSubtitleEditor ? 'is-editing' : ''}`}
                style={{
                  '--subtitle-font': fontStack(subtitleStyle.font),
                  '--subtitle-scale': subtitleStyle.scale,
                  '--subtitle-offset': `${subtitleStyle.offset}%`,
                } as React.CSSProperties}
                data-player-control={showSubtitleEditor ? '' : undefined}
                onPointerDown={showSubtitleEditor ? startSubtitleMove : undefined}
              >
                {cueLines.length > 0
                  ? cueLines.flatMap((line, cueIndex) => line.split('\n').map((part, index) => (
                    <span key={`${cueIndex}-${index}-${part}`}>{part}</span>
                  )))
                  : <span className="subtitle-sample">{FONT_SAMPLE}</span>}
                {showSubtitleEditor && (
                  <Fragment>
                    <span className="subtitle-handle is-nw" onPointerDown={startSubtitleResize} title="拖动调整大小" />
                    <span className="subtitle-handle is-ne" onPointerDown={startSubtitleResize} title="拖动调整大小" />
                    <span className="subtitle-handle is-sw" onPointerDown={startSubtitleResize} title="拖动调整大小" />
                    <span className="subtitle-handle is-se" onPointerDown={startSubtitleResize} title="拖动调整大小" />
                  </Fragment>
                )}
              </div>
            )}
            {statsOpen && <StatsPanel rows={statsRows} onClose={() => setStatsOpen(false)} />}
            {aboutOpen && <AboutPanel onClose={() => setAboutOpen(false)} />}
            {showSubtitleMenu && (
              <SubtitleMenu
                page={subtitleMenuPage}
                tracks={subtitleTracks}
                selectedId={subtitleTrackId}
                enabled={subtitleEnabled}
                style={subtitleStyle}
                onSelect={(id) => selectTrack('subtitle', id)}
                onFontChange={(font) => setSubtitleStyle((current) => ({ ...current, font }))}
                onPage={setSubtitleMenuPage}
                onEdit={openSubtitleEditor}
              />
            )}
            {showSubtitleEditor && (
              <SubtitleEditBar
                style={subtitleStyle}
                onReset={() => setSubtitleStyle({ ...DEFAULT_SUBTITLE_STYLE })}
                onDone={closeSubtitleEditor}
              />
            )}
            <div className={`player-controls ${controlsVisible ? 'is-visible' : ''}`} data-player-control onClick={(event) => event.stopPropagation()}>
              <button className="control-button" title={playbackLocked ? '字幕菜单打开时已暂停' : playing ? '暂停' : '播放'} aria-label={playing ? '暂停' : '播放'} disabled={playbackLocked} onClick={togglePlayback}>{playing ? <Pause size={21} /> : <Play size={21} fill="currentColor" />}</button>
              <span className="time-readout">{formatTime(currentTime)} / {formatTime(duration)}</span>
              <div className="seek-shell" style={{ '--played': `${playedPercent}%`, '--buffered': `${bufferedPercent}%` } as React.CSSProperties}>
                <div className="seek-rail" aria-hidden="true"><i className="seek-buffered" /><i className="seek-played" /></div>
                <input
                  className="seek-slider"
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={Math.min(currentTime, duration || 100)}
                  onChange={(event) => seek(Number(event.target.value))}
                  aria-label="播放进度"
                  aria-valuetext={`${formatTime(currentTime)}，已缓冲至 ${formatTime(stats.bufferedEnd)}`}
                />
              </div>
              <button className="control-button" title={muted ? '取消静音' : '静音'} aria-label={muted ? '取消静音' : '静音'} onClick={toggleMuted}>{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
              <input className="volume-slider" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => setVolumeAndUnmute(Number(event.target.value))} aria-label="音量" />
              {subtitleTracks.length > 0 && <button className={`control-button ${subtitleEnabled ? 'is-active' : ''}`} title={selectedSubtitle ? `字幕：${subtitleLabel(selectedSubtitle)}` : '字幕'} aria-label="字幕" aria-pressed={subtitleEnabled} onClick={toggleSubtitleMenu}><Captions size={20} /></button>}
              <button className={`control-button ${showSettings ? 'is-active' : ''}`} title="设置" aria-label="设置" onClick={() => { const next = !showSettings; setShowSettings(next); closeSubtitleMenu(); showControls(next) }}><Settings size={20} /></button>
              <button className={`control-button ${theater ? 'is-active' : ''}`} title="剧场模式" aria-label="剧场模式" aria-pressed={theater} onClick={() => setTheater((value) => !value)}><RectangleHorizontal size={20} /></button>
              <button className="control-button" title={fullscreen ? '退出全屏' : '全屏'} aria-label={fullscreen ? '退出全屏' : '全屏'} onClick={toggleFullscreen}>{fullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>
            </div>
            {showSettings && <SettingsPanel rate={rate} setRate={(next) => { setRate(next); engineRef.current?.setPlaybackRate(next) }} audioTracks={audioTracks} subtitleTracks={subtitleTracks} audioTrackId={audioTrackId} subtitleTrackId={subtitleTrackId} selectTrack={selectTrack} />}
            {contextMenu.open && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={closeContextMenu} onStats={openStats} onAbout={openAbout} />}
          </div>
          <div className="player-status-line">
            <span>{stats.stalled ? '缓冲中…' : engineStatus}</span>
            <span>已缓冲 {stats.bufferedAhead.toFixed(1)} 秒</span>
            <span>当前时间 {formatTime(currentTime)}</span>
          </div>
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
  return <div ref={menuRef} className="context-menu" role="menu" data-player-control style={{ left: x, top: y }} onKeyDown={handleKeyDown} onClick={(event) => event.stopPropagation()}><button role="menuitem" onClick={onStats}><BarChart3 size={15} /> 播放器统计</button><span className="menu-separator" /><button role="menuitem" onClick={onAbout}><Info size={15} /> 关于 MX Player Pro</button></div>
}

/**
 * Two pages: track list and font picker. Both are the same height — the track list sets
 * it, from the number of subtitle tracks the current video carries, so switching pages
 * does not resize the menu under the pointer. The font list scrolls inside that height.
 */
function SubtitleMenu({ page, tracks, selectedId, enabled, style, onSelect, onFontChange, onPage, onEdit }: { page: SubtitlePage; tracks: TrackInfo[]; selectedId: number | null; enabled: boolean; style: SubtitleStyle; onSelect: (id: number | null) => void; onFontChange: (font: string) => void; onPage: (page: SubtitlePage) => void; onEdit: () => void }) {
  const isFontPage = page === 'font'
  // The 关闭 row is always present, hence the + 1; the last row carries no trailing gap.
  const rows = tracks.length + 1
  const bodyHeight = rows * MENU_ROW_HEIGHT + (rows - 1) * MENU_ROW_GAP
  return (
    <div className="subtitle-menu" role="menu" data-player-control onClick={(event) => event.stopPropagation()}>
      <div className="subtitle-menu-head">
        <button className={`subtitle-tab ${!isFontPage ? 'is-active' : ''}`} onClick={() => onPage('track')}>字幕</button>
        <button className={`subtitle-tab ${isFontPage ? 'is-active' : ''}`} onClick={() => onPage('font')}>选择字体</button>
        <button className="control-button subtitle-head-icon" title="编辑" aria-label="编辑字幕样式" onClick={onEdit}><Settings size={20} /></button>
      </div>
      <div className="subtitle-menu-body" style={{ '--menu-body-height': `${bodyHeight}px` } as React.CSSProperties}>
        {isFontPage
          ? SUBTITLE_FONTS.map((font) => (
            <button
              key={font.id}
              className={`subtitle-font-item ${style.font === font.id ? 'is-selected' : ''}`}
              onClick={() => onFontChange(font.id)}
            >
              <span className="subtitle-font-name">{font.label}{style.font === font.id ? <Check size={13} /> : null}</span>
              <span className="subtitle-font-sample" style={{ fontFamily: font.stack }}>{FONT_SAMPLE}</span>
            </button>
          ))
          : (
            <Fragment>
              <button className={!enabled || selectedId === null ? 'is-selected' : ''} onClick={() => onSelect(null)}>关闭</button>
              {tracks.map((track) => <button key={track.id} className={enabled && selectedId === track.id ? 'is-selected' : ''} onClick={() => onSelect(track.id)}>{subtitleLabel(track)}</button>)}
            </Fragment>
          )}
      </div>
    </div>
  )
}

/**
 * Size and vertical position are edited against the live overlay — the frame keeps
 * playing behind the panel and a sample line stands in whenever no cue is on screen,
 * so the result is judged in place rather than from a number. Horizontal position is
 * deliberately absent: subtitles stay centred.
 */
/**
 * A thin bar rather than a dialog: the editing happens on the subtitle itself, so the
 * only chrome needed is a readout of the current values and a way to finish.
 */
function SubtitleEditBar({ style, onReset, onDone }: { style: SubtitleStyle; onReset: () => void; onDone: () => void }) {
  return (
    <div className="subtitle-edit-bar" data-player-control onClick={(event) => event.stopPropagation()}>
      <span className="subtitle-edit-hint">拖动字幕调整位置，拖动上下边框调整大小</span>
      <em>{Math.round(style.scale * 100)}% · {style.offset > 0 ? `+${style.offset}` : style.offset}</em>
      <button onClick={onReset}><RotateCcw size={13} /> 恢复默认</button>
      <button onClick={onDone}><Check size={14} /> 完成</button>
    </div>
  )
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

function safeHostname(value: string) {
  try { return new URL(value).hostname || '远程 URL' } catch { return '远程 URL' }
}

function clampPercent(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0
}

function formatBytes(value: number) {
  if (value < 1024) return `${value} B`
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(0)} KB`
  return `${(value / 1024 / 1024).toFixed(1)} MB`
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '00:00'
  const total = Math.floor(value)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
