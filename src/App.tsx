import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, Cloud, FileVideo, GitBranch, Moon, Sun } from 'lucide-react'
import type { SourceDescriptor } from './types'
import PlayerSurface from './components/PlayerSurface'

const RECENT_URL_KEY = 'mx-player-pro:recent-url'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('mx-player-pro:theme') as 'dark' | 'light') || 'dark')
  const [url, setUrl] = useState(() => localStorage.getItem(RECENT_URL_KEY) || '')
  const [file, setFile] = useState<File | null>(null)
  const [source, setSource] = useState<SourceDescriptor | null>(null)
  const [sourceName, setSourceName] = useState('')
  const [inputError, setInputError] = useState('')
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('mx-player-pro:theme', theme)
  }, [theme])

  const canStart = Boolean(file || url.trim())
  const sourceLabel = useMemo(() => file?.name || url.trim() || '未选择媒体', [file, url])

  function acceptFile(nextFile: File | undefined) {
    if (!nextFile) return
    if (!nextFile.name.toLowerCase().endsWith('.mkv') && nextFile.type !== 'video/x-matroska') {
      setInputError('请选择 Matroska MKV 文件。')
      return
    }
    setFile(nextFile)
    setUrl('')
    setInputError('')
  }

  function startPlayback() {
    const normalizedUrl = url.trim()
    if (!file && !normalizedUrl) {
      setInputError('请选择本地文件或输入云端 MKV 下载 URL。')
      return
    }
    if (!file && !/^https?:\/\//i.test(normalizedUrl)) {
      setInputError('云端地址必须以 http:// 或 https:// 开头。')
      return
    }
    const nextSource: SourceDescriptor = file ? { kind: 'file', file } : { kind: 'url', url: normalizedUrl }
    if (!file) localStorage.setItem(RECENT_URL_KEY, normalizedUrl)
    setSource(nextSource)
    setSourceName(file?.name || normalizedUrl)
    setInputError('')
  }

  if (source) return <PlayerSurface source={source} label={sourceName} onExit={() => setSource(null)} />

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="." aria-label="MX Player Pro">
          <span className="brand-mark">MX</span>
          <span>PLAYER <em>PRO</em></span>
        </a>
        <div className="topbar-actions">
          <span className="status-dot"><i /> 纯客户端</span>
          <button className="icon-button" title="切换主题" aria-label="切换主题" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="icon-button" title="GitHub" aria-label="GitHub" href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={18} /></a>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-copy">
          <p className="eyebrow">LOCAL-FIRST / WEB CODECS</p>
          <h1>把 MKV 留在你的设备上。</h1>
          <p className="hero-subtitle">浏览器直接读取媒体，Rust WASM 解封装，WebCodecs 硬件解码。服务器只负责托管页面。</p>
        </section>

        <section className="ingest-grid" aria-label="选择媒体来源">
          <label className={`drop-zone ${dragging ? 'is-dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files[0]) }}>
            <input type="file" accept=".mkv,video/x-matroska" onChange={(event) => acceptFile(event.target.files?.[0])} />
            <span className="drop-icon"><FileVideo size={26} /></span>
            <strong>{file ? file.name : '拖入 MKV 文件'}</strong>
            <span>{file ? `${formatBytes(file.size)} · 已就绪` : '或点击选择本地文件'}</span>
          </label>
          <div className="url-panel">
            <div className="panel-heading"><Cloud size={17} /><span>云端下载 URL</span></div>
            <input value={url} onChange={(event) => { setUrl(event.target.value); setFile(null); setInputError('') }} placeholder="https://media.example.com/video.mkv" inputMode="url" />
            <p className="field-hint">资源需支持 CORS、HTTP Range 和 206 Partial Content。</p>
          </div>
        </section>

        {inputError && <p className="input-error" role="alert">{inputError}</p>}
        <div className="start-row">
          <button className="primary-button" disabled={!canStart} onClick={startPlayback}>检查并播放 <ArrowRight size={17} /></button>
          {canStart && <span className="selected-source"><Check size={15} /> {sourceLabel}</span>}
        </div>

        <section className="feature-strip" aria-label="播放器能力">
          <Feature title="Range 读取" text="按需请求，不把长片一次性下载。" />
          <Feature title="硬件解码" text="VideoDecoder 与 AudioDecoder。" />
          <Feature title="零上传" text="文件和链接只在本机处理。" />
        </section>
      </main>
      <footer className="site-footer"><span>MX Player Pro · MIT License</span><span>H.264 / AAC / SRT MVP</span></footer>
    </div>
  )
}

function Feature({ title, text }: { title: string; text: string }) {
  return <div className="feature-item"><strong>{title}</strong><span>{text}</span></div>
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
}
