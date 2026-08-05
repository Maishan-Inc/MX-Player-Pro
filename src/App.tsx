import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Cloud, Code2, Moon, Sun } from 'lucide-react'
import type { SourceDescriptor } from './types'
import PlayerSurface from './components/PlayerSurface'
import DocsModal from './components/DocsModal'

const RECENT_URL_KEY = 'mx-player-pro:recent-url'
const GITHUB_URL = 'https://github.com/Maishan-Inc/MX-Player-Pro'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('mx-player-pro:theme') as 'dark' | 'light') || 'dark')
  const [url, setUrl] = useState(() => localStorage.getItem(RECENT_URL_KEY) || '')
  const [source, setSource] = useState<SourceDescriptor | null>(null)
  const [sourceName, setSourceName] = useState('')
  const [inputError, setInputError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('mx-player-pro:theme', theme)
  }, [theme])

  const canStart = Boolean(url.trim())
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
      <SiteHeader
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onOpenDocs={() => setDocsOpen(true)}
      />
      <main className="home-main">
        <section className="player-launcher" aria-labelledby="player-heading">
          <label
            className={`home-player-frame ${dragging ? 'is-dragging' : ''}`}
            onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files[0]) }}
            aria-label="MX PLAYER PRO 播放器"
          >
            <input type="file" accept=".mkv,video/x-matroska" onChange={(event) => acceptFile(event.target.files?.[0])} />
            <strong id="player-heading" className="empty-player-title">MX PLAYER PRO</strong>
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
        </section>

        <section className="feature-strip" aria-label="播放器能力">
          <Feature title="Range 读取" text="按需请求，不把长片一次性下载。" />
          <Feature title="硬件解码" text="VideoDecoder 与 AudioDecoder。" />
          <Feature title="零上传" text="文件和链接只在本机处理。" />
        </section>
      </main>
      <footer className="site-footer">Powered by MXPlayer Pro © 2026 Maishan Inc. · MIT License</footer>
      {docsOpen && <DocsModal onClose={() => setDocsOpen(false)} />}
    </div>
  )
}

function SiteHeader({ theme, onToggleTheme, onOpenDocs }: { theme: 'dark' | 'light'; onToggleTheme: () => void; onOpenDocs: () => void }) {
  return (
    <header className="topbar">
      <a className="collaboration-logo" href="https://freeanime.org" target="_blank" rel="noreferrer" aria-label="FREEANIME.ORG 与 Maishan Inc.">
        <span className="freeanime-wordmark"><span>FREE</span><strong>ANIME</strong><span>.ORG</span></span>
        <span className="brand-times" aria-hidden="true">×</span>
        <img src={`${import.meta.env.BASE_URL}brands/maishan-on-dark.png`} alt="Maishan Inc." />
      </a>
      <nav className="topbar-nav" aria-label="外部链接">
        <a href="https://freeanime.org" target="_blank" rel="noreferrer">Freeanime <ArrowUpRight size={13} aria-hidden="true" /></a>
        <a href="https://search.freeanime.org" target="_blank" rel="noreferrer">Limitless Search <ArrowUpRight size={13} aria-hidden="true" /></a>
      </nav>
      <div className="topbar-actions">
        <button className="docs-trigger" onClick={onOpenDocs} title="接入文档" aria-label="接入文档">
          <Code2 size={14} aria-hidden="true" /><span>接入文档</span>
        </button>
        <button className="icon-button" title="切换主题" aria-label="切换主题" onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <a className="github-link" title="GitHub" aria-label="GitHub" href={GITHUB_URL} target="_blank" rel="noreferrer"><GithubMark /><span>GitHub</span></a>
      </div>
    </header>
  )
}

function GithubMark() {
  return <svg className="github-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17a4.6 4.6 0 0 1 1.23 3.22c0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /></svg>
}

function Feature({ title, text }: { title: string; text: string }) {
  return <div className="feature-item"><strong>{title}</strong><span>{text}</span></div>
}
