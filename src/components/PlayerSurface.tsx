import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Captions, ChevronDown, Expand, Gauge, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { activeCue, type SubtitleCue } from '../lib/srt'
import { trackLabel } from '../lib/codec'
import { WebCodecsEngine } from '../lib/webcodecs'
import type { DemuxEvent, DemuxRequest, MKVPacket, ProbeInfo, SourceDescriptor, TrackInfo } from '../types'

interface Props { source: SourceDescriptor; label: string; onExit: () => void }

export default function PlayerSurface({ source, label, onExit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const workerRef = useRef<Worker | null>(null)
  const engineRef = useRef<WebCodecsEngine | null>(null)
  const clockRef = useRef({ value: 0, anchor: 0 })
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
  const [subtitleEnabled, setSubtitleEnabled] = useState(true)
  const [subtitleCues, setSubtitleCues] = useState<SubtitleCue[]>([])
  const [showSettings, setShowSettings] = useState(false)
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
  const subtitleTracks = metadata?.tracks.filter((track) => track.kind === 'subtitle') || []
  const cue = subtitleEnabled ? activeCue(subtitleCues, currentTime) : null
  const duration = metadata?.duration || 0

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
      if (text) setSubtitleCues((cues) => [...cues, { start: packet.timestamp / 1_000_000, end: packet.timestamp / 1_000_000 + Math.max(packet.duration / 1_000_000, 3), text }])
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
  }

  function seek(value: number) {
    const next = Math.max(0, Math.min(value, duration || value))
    clockRef.current = { value: next, anchor: performance.now() / 1000 }
    setCurrentTime(next)
    setSubtitleCues([])
    engineRef.current?.reset()
    workerRef.current?.postMessage({ type: 'seek', time: next } satisfies DemuxRequest)
  }

  function selectTrack(kind: 'audio' | 'subtitle', id: number | null) {
    if (kind === 'audio') { setAudioTrackId(id || undefined); audioTrackRef.current = id || undefined }
    else { setSubtitleTrackId(id); subtitleTrackRef.current = id; setSubtitleCues([]) }
    if (id !== null) workerRef.current?.postMessage({ type: 'select-track', kind, trackId: id } satisfies DemuxRequest)
  }

  function toggleFullscreen() {
    const element = canvasRef.current?.closest('.player-frame')
    if (!element) return
    if (document.fullscreenElement) void document.exitFullscreen()
    else void element.requestFullscreen()
  }

  return (
    <div className="player-page">
      <header className="player-topbar">
        <button className="back-button" onClick={onExit}><ArrowLeft size={18} /> <span>返回媒体库</span></button>
        <div className="player-title" title={label}>{label}</div>
        <div className="player-topbar-right"><span className="status-dot"><i /> {progress}</span></div>
      </header>
      <main className="player-layout">
        <section className="player-column">
          <div className="player-frame">
            <canvas ref={canvasRef} className="video-canvas" aria-label="视频画面" />
            {!metadata && !error && <div className="player-loading"><span className="spinner" /><strong>{progress}</strong></div>}
            {error && <div className="player-error"><strong>无法播放此媒体</strong><span>{error}</span><button className="secondary-button" onClick={() => window.location.reload()}>重新读取</button></div>}
            {cue && <div className="subtitle-overlay">{cue.text.split('\n').map((line) => <span key={line}>{line}</span>)}</div>}
            <div className="player-controls">
              <button className="control-button" title={playing ? '暂停' : '播放'} aria-label={playing ? '暂停' : '播放'} onClick={togglePlayback}>{playing ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}</button>
              <span className="time-readout">{formatTime(currentTime)}</span>
              <input className="seek-slider" type="range" min="0" max={duration || 100} step="0.1" value={Math.min(currentTime, duration || 100)} onChange={(event) => seek(Number(event.target.value))} aria-label="播放进度" />
              <span className="time-readout">{formatTime(duration)}</span>
              <button className="control-button" title={muted ? '取消静音' : '静音'} aria-label={muted ? '取消静音' : '静音'} onClick={() => { const next = !muted; setMuted(next); engineRef.current?.setVolume(next ? 0 : volume) }}>{muted ? <VolumeX size={19} /> : <Volume2 size={19} />}</button>
              <input className="volume-slider" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { const next = Number(event.target.value); setVolume(next); setMuted(false); engineRef.current?.setVolume(next) }} aria-label="音量" />
              <button className={`control-button ${subtitleEnabled ? 'is-active' : ''}`} title="字幕" aria-label="字幕" onClick={() => setSubtitleEnabled(!subtitleEnabled)}><Captions size={19} /></button>
              <button className="control-button" title="设置" aria-label="设置" onClick={() => setShowSettings(!showSettings)}><Gauge size={18} /></button>
              <button className="control-button" title="全屏" aria-label="全屏" onClick={toggleFullscreen}><Expand size={18} /></button>
            </div>
            {showSettings && <SettingsPanel rate={rate} setRate={(next) => { setRate(next); engineRef.current?.setPlaybackRate(next) }} audioTracks={audioTracks} subtitleTracks={subtitleTracks} audioTrackId={audioTrackId} subtitleTrackId={subtitleTrackId} selectTrack={selectTrack} />}
          </div>
          <div className="player-status-line"><span>{engineStatus}</span><span>当前时间 {formatTime(currentTime)}</span></div>
        </section>
        <aside className="track-panel">
          <div className="panel-heading"><span>媒体信息</span><span className="panel-kicker">MKV</span></div>
          <h1>{label}</h1>
          {!metadata ? <p className="muted">正在解析 Header、Tracks 和 Cues…</p> : <>
            {probe && <div className="probe-grid"><Probe label="CORS" value={probe.cors === 'ok' ? '允许' : '阻断'} good={probe.cors === 'ok'} /><Probe label="Range" value={probe.acceptsRanges ? '206' : '不支持'} good={probe.acceptsRanges} /><Probe label="HTTP" value={String(probe.status || '--')} good={(probe.status || 0) >= 200 && (probe.status || 0) < 400} /></div>}
            <div className="track-summary">{videoTracks.map((track) => <div className="track-row" key={track.id}><span className="track-kind">VIDEO</span><strong>{trackLabel(track)}</strong></div>)}{audioTracks.map((track) => <div className="track-row" key={track.id}><span className="track-kind">AUDIO</span><strong>{trackLabel(track)}</strong></div>)}{subtitleTracks.map((track) => <div className="track-row" key={track.id}><span className="track-kind">TEXT</span><strong>{trackLabel(track)}</strong></div>)}</div>
            <div className="track-selects"><TrackSelect label="音频" value={audioTrackId} options={audioTracks} onChange={(id) => selectTrack('audio', id)} /><TrackSelect label="字幕" value={subtitleTrackId || ''} options={subtitleTracks} onChange={(id) => selectTrack('subtitle', id || null)} /></div>
          </>}
          <div className="engine-note"><span className="status-dot"><i /></span><div><strong>客户端解码</strong><p>字节不会离开此设备。视频帧由 WebCodecs 输出。</p></div></div>
        </aside>
      </main>
    </div>
  )
}

function SettingsPanel({ rate, setRate, audioTracks, subtitleTracks, audioTrackId, subtitleTrackId, selectTrack }: { rate: number; setRate: (value: number) => void; audioTracks: TrackInfo[]; subtitleTracks: TrackInfo[]; audioTrackId?: number; subtitleTrackId: number | null; selectTrack: (kind: 'audio' | 'subtitle', id: number | null) => void }) {
  return <div className="settings-panel"><label>播放速度<select value={rate} onChange={(event) => setRate(Number(event.target.value))}>{[0.5, 0.75, 1, 1.25, 1.5, 2].map((value) => <option value={value} key={value}>{value}×</option>)}</select></label><label>音频轨<select value={audioTrackId || ''} onChange={(event) => selectTrack('audio', Number(event.target.value) || null)}><option value="">自动</option>{audioTracks.map((track) => <option value={track.id} key={track.id}>{trackLabel(track)}</option>)}</select></label><label>字幕轨<select value={subtitleTrackId || ''} onChange={(event) => selectTrack('subtitle', Number(event.target.value) || null)}><option value="">关闭</option>{subtitleTracks.map((track) => <option value={track.id} key={track.id}>{trackLabel(track)}</option>)}</select></label></div>
}

function TrackSelect({ label, value, options, onChange }: { label: string; value: number | string | undefined; options: TrackInfo[]; onChange: (id: number | null) => void }) {
  return <label className="compact-select"><span>{label}</span><span className="select-wrap"><select value={value ?? ''} onChange={(event) => onChange(Number(event.target.value) || null)}><option value="">未选择</option>{options.map((track) => <option value={track.id} key={track.id}>{track.language || track.name || track.codecId}</option>)}</select><ChevronDown size={15} /></span></label>
}

function Probe({ label, value, good }: { label: string; value: string; good: boolean }) {
  return <span className={`probe-chip ${good ? 'is-good' : 'is-bad'}`}><small>{label}</small><strong>{value}</strong></span>
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '00:00'
  const total = Math.floor(value)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
