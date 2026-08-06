import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Moon, Play, RotateCcw, Sun } from 'lucide-react'

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

export default function Playground({
  theme, onToggleTheme, onExit,
}: { theme: 'dark' | 'light'; onToggleTheme: () => void; onExit: () => void }) {
  const [code, setCode] = useState(STARTER_CODE)
  // 只有点”运行”才更新，编辑过程中不会不断重建 iframe。
  const [running, setRunning] = useState(STARTER_CODE)
  const [runId, setRunId] = useState(0)
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
      </main>

      <footer className="site-footer">Powered by MXPlayer Pro v{__APP_VERSION__} © 2026 Maishan Inc. · MIT License</footer>
    </div>
  )
}
