import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Cloud, GitBranch, Moon, Play, Sun } from 'lucide-react'
import type { SourceDescriptor } from './types'
import PlayerSurface from './components/PlayerSurface'

const RECENT_URL_KEY = 'mx-player-pro:recent-url'
const GITHUB_URL = 'https://github.com/Maishan-Inc/MX-Player-Pro'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('mx-player-pro:theme') as 'dark' | 'light') || 'dark')
  const [url, setUrl] = useState(() => localStorage.getItem(RECENT_URL_KEY) || '')
  const [source, setSource] = useState<SourceDescriptor | null>(null)
  const [sourceName, setSourceName] = useState('')
  const [inputError, setInputError] = useState('')
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('mx-player-pro:theme', theme)
  }, [theme])

  const canStart = Boolean(url.trim())
  const sourceLabel = useMemo(() => url.trim() || '未选择媒体', [url])

  function acceptFile(nextFile: File | undefined) {
    if (!nextFile) return
    if (!nextFile.name.toLowerCase().endsWith('.mkv') && nextFile.type !== 'video/x-matroska') {
      setInputError('请选择 Matroska MKV 文件。')
      return
    }
    beginPlayback({ kind: 'file', file: nextFile }, nextFile.name)
  }

  function startUrlPlayback() {
    const normalizedUrl = url.trim()
    if (!normalizedUrl) {
      setInputError('请输入云端 MKV 下载 URL。')
      return
    }
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      setInputError('云端地址必须以 http:// 或 https:// 开头。')
      return
    }
    localStorage.setItem(RECENT_URL_KEY, normalizedUrl)
    beginPlayback({ kind: 'url', url: normalizedUrl }, normalizedUrl)
  }

  function beginPlayback(nextSource: SourceDescriptor, label: string) {
    setSource(nextSource)
    setSourceName(label)
    setInputError('')
  }

  if (source) return <PlayerSurface source={source} label={sourceName} onExit={() => setSource(null)} />

  return (
    <div className="app-shell">
      <SiteHeader theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main className="home-main">
        <section className="player-launcher" aria-labelledby="player-heading">
          <div className="launcher-heading">
            <p className="eyebrow">MX PLAYER PRO</p>
            <h1 id="player-heading">随时播放你的 MKV。</h1>
            <p>拖入本地文件，或粘贴一个可下载的媒体地址。</p>
          </div>
          <label
            className={`home-player-frame ${dragging ? 'is-dragging' : ''}`}
            onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files[0]) }}
          >
            <input type="file" accept=".mkv,video/x-matroska" onChange={(event) => acceptFile(event.target.files?.[0])} />
            <span className="empty-player-icon"><Play size={25} fill="currentColor" /></span>
            <strong>{dragging ? '松开即可开始播放' : '拖入 MKV 文件'}</strong>
            <span>或点击选择本地文件</span>
          </label>
          <form className="url-form" onSubmit={(event) => { event.preventDefault(); startUrlPlayback() }}>
            <Cloud size={18} aria-hidden="true" />
            <input
              value={url}
              onChange={(event) => { setUrl(event.target.value); setInputError('') }}
              placeholder="https://media.example.com/video.mkv"
              inputMode="url"
              aria-label="MKV 下载 URL"
            />
            <button type="submit" disabled={!canStart} className="primary-button">
              播放 <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
          {inputError && <p className="input-error" role="alert">{inputError}</p>}
          {canStart && <p className="selected-source">最近地址：{sourceLabel}</p>}
        </section>

        <section className="feature-strip" aria-label="播放器能力">
          <Feature title="Range 读取" text="按需请求，不把长片一次性下载。" />
          <Feature title="硬件解码" text="VideoDecoder 与 AudioDecoder。" />
          <Feature title="零上传" text="文件和链接只在本机处理。" />
        </section>
      </main>
      <footer className="site-footer">Powered by MXPlayer Pro © 2026 Maishan Inc. · MIT License</footer>
    </div>
  )
}

function SiteHeader({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  return (
    <header className="topbar">
      <nav className="topbar-nav" aria-label="外部链接">
        <a href="https://freeanime.org" target="_blank" rel="noreferrer">Freeanime <ArrowUpRight size={13} aria-hidden="true" /></a>
        <a href="https://search.freeanime.org" target="_blank" rel="noreferrer">Limitless Search <ArrowUpRight size={13} aria-hidden="true" /></a>
      </nav>
      <div className="topbar-actions">
        <a className="collaboration-logo" href="https://freeanime.org" target="_blank" rel="noreferrer" aria-label="FREEANIME.ORG 与 Maishan Inc.">
          <span className="freeanime-wordmark"><span>FREE</span><strong>ANIME</strong><span>.ORG</span></span>
          <span className="brand-times" aria-hidden="true">×</span>
          <img src={`${import.meta.env.BASE_URL}brands/maishan-on-dark.png`} alt="Maishan Inc." />
        </a>
        <button className="icon-button" title="切换主题" aria-label="切换主题" onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <a className="github-link" title="GitHub" aria-label="GitHub" href={GITHUB_URL} target="_blank" rel="noreferrer"><GitBranch size={16} /><span>GitHub</span></a>
      </div>
    </header>
  )
}

function Feature({ title, text }: { title: string; text: string }) {
  return <div className="feature-item"><strong>{title}</strong><span>{text}</span></div>
}
