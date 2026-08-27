import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, ChevronDown, Cloud, Cpu, FileUp, Globe2, Moon, ScanLine, Sparkles, Sun } from 'lucide-react'
import type { SourceDescriptor } from './types'
import PlayerSurface from './components/PlayerSurface'
import IntegrationSection from './components/IntegrationSection'
import Playground from './components/Playground'
import ShaderBackground from './components/ShaderBackground'

const RECENT_URL_KEY = 'mx-player-pro:recent-url'
const GITHUB_URL = 'https://github.com/Maishan-Inc/MX-Player-Pro'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('mx-player-pro:theme') as 'dark' | 'light') || 'dark')
  const [url, setUrl] = useState(() => localStorage.getItem(RECENT_URL_KEY) || '')
  const [urlFormat, setUrlFormat] = useState<'auto' | 'mkv' | 'hls' | 'native'>('auto')
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
      setInputError('请输入云端 MKV、HLS (.m3u8) 或 MP4/WebM URL。')
      return
    }
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      setInputError('云端地址必须以 http:// 或 https:// 开头。')
      return
    }
    localStorage.setItem(RECENT_URL_KEY, normalizedUrl)
    const format = urlFormat === 'auto' && /(?:m3u8|mpegurl)/i.test(normalizedUrl) ? 'hls' : urlFormat
    beginPlayback({ kind: 'url', url: normalizedUrl, format }, normalizedUrl)
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
            aria-label="拖入 MKV 文件或点击选择文件"
          >
            <input type="file" accept=".mkv,video/x-matroska" onChange={(event) => acceptFile(event.target.files?.[0])} />
            <span className="empty-player-prompt">
              <span className="empty-player-icon" aria-hidden="true"><FileUp size={34} strokeWidth={1.65} /></span>
              <strong id="player-heading" className="empty-player-title">拖入 MKV 文件</strong>
              <span className="empty-player-copy">或点击选择文件</span>
            </span>
          </label>
          <form className="url-form" onSubmit={(event) => { event.preventDefault(); startUrlPlayback() }}>
            <Cloud size={18} aria-hidden="true" />
            <input
              value={url}
              onChange={(event) => { setUrl(event.target.value); setInputError('') }}
              placeholder="https://media.example.com/video.mkv 或 master.m3u8"
              inputMode="url"
              aria-label="媒体 URL"
            />
            <select className="url-format-select" value={urlFormat} onChange={(event) => setUrlFormat(event.target.value as 'auto' | 'mkv' | 'hls' | 'native')} aria-label="媒体格式">
              <option value="auto">自动</option>
              <option value="hls">HLS</option>
              <option value="native">MP4/WebM</option>
              <option value="mkv">MKV</option>
            </select>
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
          <Feature title="Worker 解封装" text="TypeScript Matroska 解析器在独立线程运行。" />
          <Feature title="字幕渲染" text="SRT 与 ASS 文本轨道，字号、位置可调。" />
          <Feature title="多轨切换" text="视频、音频、字幕轨道随时切换。" />
        </section>

        <WhyChoose />

        <IntegrationSection onOpenPlayground={onOpenPlayground} />

        <HowItWorks />

        <FAQ />

        <MXMaxPromo />
      </main>
      <footer className="site-footer">Powered by MXPlayer Pro v{__APP_VERSION__} © 2026 Maishan Inc. · MIT License</footer>
    </div>
  )
}

function WhyChoose() {
  const reasons = [
    {
      title: '为 MKV 而生',
      text: '不转码、不重封装。浏览器原生 <video> 不认 Matroska，我们直接在前端解封装，把轨道喂给硬件解码器。',
    },
    {
      title: '内嵌字幕直出',
      text: 'MKV 里的 SRT 与 ASS 文本轨道随片解析并渲染，不需要单独挂载外挂字幕文件。',
    },
    {
      title: '最前沿的 Web 音视频栈',
      text: 'WebCodecs + TypeScript Matroska 解析器 + Web Worker + Range 流式读取，全部跑在标准浏览器 API 上，无插件、无 Flash、无服务端转码。',
    },
    {
      title: '端到端本地处理',
      text: '文件和链接都只在你的浏览器里流转，没有中转服务器，也没有任何上传。',
    },
  ]

  return (
    <section className="why-choose" aria-labelledby="why-heading">
      <div className="why-intro">
        <h2 id="why-heading">为什么选择 MX Player Pro</h2>
        <p>
          MX Player Pro 是 MX Player 的衍生作品，专为在浏览器中播放原生 MKV 视频、
          并完整展示内嵌字幕而生。它采用了目前 Web 音视频领域最前沿的技术组合，
          在不依赖任何服务端转码的前提下达到接近本地播放器的表现。
        </p>
      </div>
      <div className="why-grid">
        {reasons.map((reason) => (
          <article className="why-card" key={reason.title}>
            <strong>{reason.title}</strong>
            <span>{reason.text}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Range 按需取流',
      text: '远端 MKV 用 HTTP Range 分片拉取，只取播放位置附近需要的字节；本地文件走 File API 逐片读取。长片不会被一次性下载，拖动进度条也只补拉缺失的片段。',
    },
    {
      step: '02',
      title: 'Worker 解封装',
      text: 'TypeScript Matroska 解析器运行在独立 Web Worker 里。解析 EBML 结构、切分 SimpleBlock、还原时间戳全部离开主线程；Worker 已内联到 SDK，不再额外下载 WASM 或远端 Worker 文件。',
    },
    {
      step: '03',
      title: 'WebCodecs 硬件解码',
      text: '解出的裸流交给 VideoDecoder 与 AudioDecoder，由浏览器直接调用 GPU 硬件解码器处理 H.264/HEVC 与 AAC。没有 JS 软解，CPU 占用和功耗都远低于纯脚本方案。',
    },
    {
      step: '04',
      title: '合成与字幕渲染',
      text: '解码帧按时间戳投递到 canvas，音频经 AudioContext 对齐播放时钟；SRT/ASS 文本轨道在同一时间轴上渲染，字号与位置可调。',
    },
  ]

  return (
    <section className="how-it-works" aria-labelledby="how-heading">
      <div className="how-intro">
        <h2 id="how-heading">如何运作</h2>
        <p>从一个 URL 到画面上的一帧，播放器在你的浏览器里走完四步，全程没有服务端参与。</p>
      </div>
      <ol className="how-steps">
        {steps.map((item) => (
          <li className="how-step" key={item.step}>
            <span className="how-step-index" aria-hidden="true">{item.step}</span>
            <div className="how-step-body">
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function FAQ() {
  const [openQa, setOpenQa] = useState<number | null>(0)
  const items = [
    {
      q: '为什么从 jsDelivr 引入不会再触发 Worker 同源限制？',
      a: '浏览器禁止网页直接用 new Worker() 启动另一个来源的脚本。MX Player Pro 会把 Worker 程序随 SDK 一起下载，再在当前页面创建 Blob URL，因此 Worker 属于页面自己的执行上下文，不会请求 cdn.jsdelivr.net 上的独立 Worker 文件。若站点 CSP 禁止 worker-src blob:，可把发布包中的 Worker 文件部署到本站并配置 workerUrl。',
    },
    {
      q: '已经使用 WebCodecs，为什么还需要 Worker？需要 WASM 吗？',
      a: 'WebCodecs 负责解码 H.264、HEVC、AAC、FLAC、Opus、Vorbis、MP3 和浏览器支持的 AC-3/E-AC-3 轨道，但它不认识 MKV 容器。播放器仍要先解析 EBML、Tracks、Cluster 和 Block，再把裸流交给 WebCodecs。这个解封装过程由 TypeScript 在 Worker 中完成；当前实现不依赖 WASM，旧的 wasmBaseUrl 仅为 1.x 类型兼容保留且不会生效。',
    },
    {
      q: '远端 MKV 有什么要求？',
      a: '两点：响应头必须允许跨域（Access-Control-Allow-Origin），且支持 HTTP Range 请求（Accept-Ranges: bytes）。播放器靠 Range 按需取片段，服务端若整片返回 200 而不是 206，长片会被一次性拉下来。',
    },
    {
      q: '支持哪些编码？',
      a: '当前版本支持 H.264/AVC、H.265/HEVC 视频，以及 AAC、FLAC、Opus、Vorbis、MP3 和浏览器支持的 AC-3/E-AC-3 音频。浏览器不支持当前音轨时，自动模式会尝试下一条可用音轨，视频仍可播放。VP9、AV1 等视频编码暂未映射。',
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

function MXMaxPromo() {
  return (
    <section className="mxmax-promo" aria-labelledby="mxmax-heading">
      <div className="mxmax-promo-grid" aria-hidden="true">
        {Array.from({ length: 192 }, (_, index) => {
          const column = index % 16
          const row = Math.floor(index / 16)
          return <i key={index} data-tone={index % 6} style={{ '--tile-delay': `${-(column * 0.13 + row * 0.07)}s`, '--tile-offset': `${(row % 3) * 3}px` } as React.CSSProperties} />
        })}
      </div>
      <div className="mxmax-promo-scan" aria-hidden="true" />
      <div className="mxmax-promo-content">
        <div className="mxmax-promo-kicker"><Sparkles size={15} aria-hidden="true" /> 正在开发</div>
        <h2 id="mxmax-heading">MX Player Max</h2>
        <p className="mxmax-promo-lead">我们正在开发 MX Player Max</p>
        <p className="mxmax-promo-copy">这是一个可以在浏览器播放任意视频文件，并支持 AI 超分辨率与 AI 插帧的 Web3 播放器。</p>
        <div className="mxmax-promo-capabilities" aria-label="MX Player Max 能力">
          <span><Globe2 size={15} aria-hidden="true" /> 任意视频文件</span>
          <span><Cpu size={15} aria-hidden="true" /> AI 超分辨率</span>
          <span><ScanLine size={15} aria-hidden="true" /> AI 插帧</span>
        </div>
      </div>
      <div className="mxmax-promo-mark" aria-hidden="true">MAX<span>·</span>LAB</div>
    </section>
  )
}

function SiteHeader({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const maishanLogo = theme === 'light' ? 'maishan-on-light.png' : 'maishan-on-dark.png'
  return (
    <header className="topbar">
      <a className="collaboration-logo" href="https://freeanime.org" target="_blank" rel="noreferrer" aria-label="FREEANIME.ORG 与 Maishan Inc.">
        <span className="freeanime-wordmark"><span>FREE</span><strong>ANIME</strong><span>.ORG</span></span>
        <span className="brand-times" aria-hidden="true">×</span>
        <img src={`${import.meta.env.BASE_URL}brands/${maishanLogo}`} alt="Maishan Inc." />
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
