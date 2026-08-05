import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ChevronDown, Moon, Play, RotateCcw, Sun } from 'lucide-react'

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn'

const STARTER_CODE = `<div id="mse" style="aspect-ratio:16/9;background:#000"></div>
<p id="log">拖入 MKV 文件开始播放，或者点击容器选择文件。</p>

<script type="module">
  import { MXPlayer } from '${CDN_BASE}/mx-player.js'

  const log = document.getElementById('log')

  const player = new MXPlayer({
    playerElm: '#mse',
    wasmBaseUrl: '${CDN_BASE}/wasm/',
    localPlayback: true,
    volume: 0.85,
  })

  player.on('ready', ({ duration, tracks }) => {
    log.textContent = \`就绪：\${duration.toFixed(1)}s · \${tracks.length} 条轨道\`
    player.play()
  })
  player.on('timeupdate', ({ currentTime }) => {
    log.textContent = \`播放中 \${currentTime.toFixed(1)}s\`
  })
  player.on('error', ({ message }) => {
    log.textContent = '错误：' + message
  })
</script>
`

interface QA { q: string; a: string }

const FAQ: QA[] = [
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

export default function Playground({
  theme, onToggleTheme, onExit,
}: { theme: 'dark' | 'light'; onToggleTheme: () => void; onExit: () => void }) {
  const [code, setCode] = useState(STARTER_CODE)
  // 只有点“运行”才更新，编辑过程中不会不断重建 iframe。
  const [running, setRunning] = useState(STARTER_CODE)
  const [runId, setRunId] = useState(0)
  const [openQa, setOpenQa] = useState<number | null>(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const dirty = code !== running

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onExit()
      // Ctrl/Cmd + Enter 运行，和常见在线编辑器一致。
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        run()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  function run() {
    setRunning(code)
    setRunId((id) => id + 1)
  }

  function reset() {
    setCode(STARTER_CODE)
    setRunning(STARTER_CODE)
    setRunId((id) => id + 1)
  }

  /** Tab 键插入两个空格，而不是把焦点移出编辑器。 */
  function onEditorKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Tab') return
    event.preventDefault()
    const el = event.currentTarget
    const { selectionStart, selectionEnd, value } = el
    const next = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`
    setCode(next)
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = selectionStart + 2
    })
  }

  // 每次运行换 key，强制 React 重建 iframe，旧文档的 Worker 和解码器随之释放。
  const frame = useMemo(() => (
    <iframe
      key={runId}
      className="playground-frame"
      title="运行结果"
      srcDoc={running}
      // allow-scripts 不配 allow-same-origin：文档处于独立的不透明源，
      // 拿不到父页面的 DOM、cookie 与 localStorage。
      sandbox="allow-scripts"
      allow="fullscreen; autoplay"
    />
  ), [running, runId])

  return (
    <div className="app-shell playground-page">
      <header className="topbar playground-topbar">
        <button className="back-button" onClick={onExit}>
          <ArrowLeft size={16} aria-hidden="true" /> <span>返回首页</span>
        </button>
        <strong className="playground-title">在线实操</strong>
        <div className="topbar-actions">
          <button className="icon-button" title="切换主题" aria-label="切换主题" onClick={onToggleTheme}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      <main className="playground-main">
        <section className="playground-split">
          <div className="playground-pane">
            <div className="playground-pane-head">
              <span>编辑器</span>
              <div className="playground-pane-actions">
                <button className="ghost-button" onClick={reset} title="恢复初始代码">
                  <RotateCcw size={13} aria-hidden="true" /> 重置
                </button>
                <button className={`run-button ${dirty ? 'is-dirty' : ''}`} onClick={run}>
                  <Play size={13} aria-hidden="true" /> 运行
                  <kbd>Ctrl↵</kbd>
                </button>
              </div>
            </div>
            <textarea
              ref={textareaRef}
              className="playground-editor"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onKeyDown={onEditorKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="代码编辑器"
            />
          </div>

          <div className="playground-pane">
            <div className="playground-pane-head">
              <span>运行结果</span>
              {dirty && <em className="playground-stale">代码已改动，点运行刷新</em>}
            </div>
            <div className="playground-output">{frame}</div>
          </div>
        </section>

        <section className="qa" aria-labelledby="qa-heading">
          <h2 id="qa-heading">常见问题</h2>
          <div className="qa-list">
            {FAQ.map((item, index) => {
              const open = openQa === index
              return (
                <div className={`qa-item ${open ? 'is-open' : ''}`} key={item.q}>
                  <button
                    className="qa-question"
                    aria-expanded={open}
                    aria-controls={`qa-panel-${index}`}
                    onClick={() => setOpenQa(open ? null : index)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown className="qa-chevron" size={16} aria-hidden="true" />
                  </button>
                  {/* grid-template-rows 0fr→1fr 让高度过渡不需要测量内容。
                      折叠态用 visibility:hidden 移出无障碍树，同时保留过渡。 */}
                  <div className="qa-answer" id={`qa-panel-${index}`} role="region">
                    <p>{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer">Powered by MXPlayer Pro v{__APP_VERSION__} © 2026 Maishan Inc. · MIT License</footer>
    </div>
  )
}
