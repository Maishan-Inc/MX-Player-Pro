import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, ChevronDown, Cloud, Moon, Sun } from 'lucide-react'
import type { SourceDescriptor } from './types'
import PlayerSurface from './components/PlayerSurface'
import IntegrationSection from './components/IntegrationSection'
import Playground from './components/Playground'

const RECENT_URL_KEY = 'mx-player-pro:recent-url'
const GITHUB_URL = 'https://github.com/Maishan-Inc/MX-Player-Pro'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('mx-player-pro:theme') as 'dark' | 'light') || 'dark')
  const [url, setUrl] = useState(() => localStorage.getItem(RECENT_URL_KEY) || '')
  const [source, setSource] = useState<SourceDescriptor | null>(null)
  const [sourceName, setSourceName] = useState('')
  const [inputError, setInputError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [playgroundOpen, setPlaygroundOpen] = useState(false)

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
  if (playgroundOpen) {
    return (
      <Playground
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onExit={() => setPlaygroundOpen(false)}
      />
    )
  }

  const onOpenPlayground = () => setPlaygroundOpen(true)

  return (
    <div className="app-shell">
      <SiteHeader
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
          <Feature title="硬件解码" text="VideoDecoder 与 AudioDecoder 直连 GPU。" />
          <Feature title="零上传" text="文件和链接只在本机处理。" />
          <Feature title="WASM 解封装" text="Rust 编译的 Matroska 解析器跑在 Worker 里。" />
          <Feature title="字幕渲染" text="SRT 与 ASS 文本轨道，字号、位置可调。" />
          <Feature title="多轨切换" text="视频、音频、字幕轨道随时切换。" />
        </section>

        <IntegrationSection onOpenPlayground={onOpenPlayground} />

        <section className="how-it-works" aria-labelledby="how-heading">
          <h2 id="how-heading">如何运作</h2>
          <p className="how-requirements">需要 Chrome/Edge 94+ 或 Safari 16.4+（WebCodecs）。远端 MKV 须开启 CORS 并支持 Range 请求。当前版本 v{__APP_VERSION__}；jsDelivr 路径把 <code>@cdn</code> 换成 <code>@v{__APP_VERSION__}</code> 即可锁定版本。</p>
          <div className="how-frameworks">
            <div className="framework-list">
              <span>JavaScript</span>
              <span className="separator" aria-hidden="true">|</span>
              <span>React</span>
              <span className="separator" aria-hidden="true">|</span>
              <span>Vue 3</span>
            </div>
            <code className="install-cmd">npm install github:Maishan-Inc/MX-Player-Pro#cdn</code>
          </div>
        </section>

        <FAQ />
      </main>
      <footer className="site-footer">Powered by MXPlayer Pro v{__APP_VERSION__} © 2026 Maishan Inc. · MIT License</footer>
    </div>
  )
}

function FAQ() {
  const [openQa, setOpenQa] = useState<number | null>(0)
  const items = [
    {
      q: '为什么必须传 wasmBaseUrl？',
      a: '解封装 Worker 用相对路径加载 mkv_demuxer.js。从 CDN 引入时，这个相对路径会落到你自己的域名下并 404，播放器会静默退回较慢的 TypeScript 解析器。显式指定 wasmBaseUrl 指向 CDN 的 wasm/ 目录即可。',
    },
    {
      q: '远端 MKV 有什么要求？',
      a: '两点：响应头必须允许跨域（Access-Control-Allow-Origin），且支持 HTTP Range 请求（Accept-Ranges: bytes）。播放器靠 Range 按需取片段，服务端若整片返回 200 而不是 206，长片会被一次性拉下来。',
    },
    {
      q: '支持哪些编码？',
      a: '当前版本支持 H.264/AVC、H.265/HEVC 视频和 AAC 音频。其他编码（VP9、AV1、Opus、Vorbis 等）取决于浏览器的 WebCodecs 实现，但播放器尚未添加映射。不支持的音频轨会被跳过，视频仍可播放。',
    },
    {
      q: '本地文件会被上传吗？',
      a: '不会。文件通过 File API 在本机读取，逐片喂给 Worker 解封装，全过程没有任何网络请求。远端 URL 同理，只有你的浏览器直接向该地址发 Range 请求。',
    },
    {
      q: '换源要重新 new 一个实例吗？',
      a: '不需要，调用 player.load({ kind: "url", url }) 即可。重建实例会丢掉已缓存的分片，也要重新启动 Worker 和解码器。React 与 Vue 封装内部也是这么做的。',
    },
    {
      q: '播放器占用的资源怎么释放？',
      a: '调用 player.destroy()，它会终止 Worker、关闭解码器、移除事件监听并删掉 canvas。React/Vue 组件在卸载时自动调用，原生 JS 需要自己在页面卸载或组件销毁时调用。',
    },
  ]

  return (
    <section className="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">常见问题</h2>
      <div className="faq-list">
        {items.map((item, index) => {
          const open = openQa === index
          return (
            <div className={`faq-item ${open ? 'is-open' : ''}`} key={item.q}>
              <button
                className="faq-question"
                aria-expanded={open}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenQa(open ? null : index)}
              >
                <span>{item.q}</span>
                <ChevronDown className={`faq-chevron ${open ? 'is-open' : ''}`} size={16} aria-hidden="true" />
              </button>
              <div className="faq-answer" id={`faq-panel-${index}`} role="region">
                <p>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function SiteHeader({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
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
