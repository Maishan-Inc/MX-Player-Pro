import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Ban, Copy, Check, Moon, Play, RotateCcw, Sun } from 'lucide-react'
import STARTER_CODE from './playground-starter.html?raw'
import { tokenize } from '../lib/highlight'

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'system'

interface LogEntry {
  id: number
  level: LogLevel
  text: string
  time: string
  /** 连续重复的同一条消息折叠成一行，右侧显示次数。 */
  repeat: number
}

/** 控制台只保留最近这么多条，长时间播放的 timeupdate 不会把内存吃满。 */
const LOG_LIMIT = 400
const MESSAGE_MARK = 'mx-playground'
const MIN_PANE = 18
const MAX_PANE = 82

/**
 * 注入到预览文档里的桥接脚本。它是普通脚本，一定先于示例代码里的 module 执行，
 * 所以示例代码写 console.log 就够了，不必知道 playground 的存在。
 */
const CONSOLE_BRIDGE = `
(function () {
  var MARK = ${JSON.stringify(MESSAGE_MARK)}
  function post(level, text) {
    try { parent.postMessage({ mark: MARK, level: level, text: text }, '*') } catch (error) {}
  }
  function format(value, depth) {
    if (typeof value === 'string') return value
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'
    if (value instanceof Error) return value.name + ': ' + value.message
    if (typeof value !== 'object') return String(value)
    if (typeof Element !== 'undefined' && value instanceof Element) {
      return '<' + value.tagName.toLowerCase() + (value.id ? '#' + value.id : '') + '>'
    }
    if (depth > 2) return Array.isArray(value) ? '[…]' : '{…}'
    try {
      if (Array.isArray(value)) {
        var head = value.slice(0, 10).map(function (item) { return format(item, depth + 1) })
        return '[' + head.join(', ') + (value.length > 10 ? ', …' : '') + ']'
      }
      var keys = Object.keys(value)
      var body = keys.slice(0, 10).map(function (key) { return key + ': ' + format(value[key], depth + 1) })
      return '{ ' + body.join(', ') + (keys.length > 10 ? ', …' : '') + ' }'
    } catch (error) { return String(value) }
  }
  function join(args) {
    return Array.prototype.slice.call(args).map(function (item) { return format(item, 0) }).join(' ')
  }
  var levels = { log: 'log', info: 'info', debug: 'log', warn: 'warn', error: 'error' }
  Object.keys(levels).forEach(function (name) {
    var original = console[name]
    console[name] = function () {
      post(levels[name], join(arguments))
      if (original) original.apply(console, arguments)
    }
  })
  window.addEventListener('error', function (event) {
    post('error', event.message + (event.lineno ? ' (' + event.lineno + ':' + event.colno + ')' : ''))
  })
  window.addEventListener('unhandledrejection', function (event) {
    post('error', format(event.reason, 0))
  })
  window.addEventListener('message', function (event) {
    var data = event.data
    if (data && data.mark === MARK && data.theme) document.documentElement.dataset.theme = data.theme
  })
})()
`

export default function Playground({
  theme, onToggleTheme, onExit,
}: { theme: 'dark' | 'light'; onToggleTheme: () => void; onExit: () => void }) {
  const [code, setCode] = useState(STARTER_CODE)
  /**
   * 只有点“运行”才更新。文档在这一刻就整份拼好 —— 主题也一并烘进去，之后站点换
   * 主题只发 postMessage，不动 srcDoc，播放不会被打断。
   */
  const [preview, setPreview] = useState(() => ({ id: 0, code: STARTER_CODE, doc: buildDocument(STARTER_CODE, theme) }))
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [copied, setCopied] = useState(false)
  /** 两条分隔线的位置，按百分比存，拖动时直接改这两个数。 */
  const [columnSplit, setColumnSplit] = useState(50)
  const [rowSplit, setRowSplit] = useState(62)

  const frameRef = useRef<HTMLIFrameElement>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLPreElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)
  const consoleRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef(code)
  const themeRef = useRef(theme)
  const logSeq = useRef(0)
  /** 用户往上翻看历史时不要把他拽回底部。 */
  const stickToBottom = useRef(true)

  codeRef.current = code
  themeRef.current = theme
  const dirty = code !== preview.code
  const tokens = useMemo(() => tokenize(code), [code])
  const lineCount = useMemo(() => code.split('\n').length, [code])
  const errorCount = logs.reduce((total, entry) => total + (entry.level === 'error' ? entry.repeat : 0), 0)

  const append = useCallback((level: LogLevel, text: string) => {
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    setLogs((current) => {
      const last = current[current.length - 1]
      if (last && last.level === level && last.text === text) {
        return [...current.slice(0, -1), { ...last, repeat: last.repeat + 1, time }]
      }
      logSeq.current += 1
      const next = [...current, { id: logSeq.current, level, text, time, repeat: 1 }]
      return next.length > LOG_LIMIT ? next.slice(next.length - LOG_LIMIT) : next
    })
  }, [])

  const run = useCallback(() => {
    setLogs([])
    stickToBottom.current = true
    setPreview((current) => ({
      id: current.id + 1,
      code: codeRef.current,
      doc: buildDocument(codeRef.current, themeRef.current),
    }))
  }, [])

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data as { mark?: string; level?: LogLevel; text?: string } | null
      if (!data || data.mark !== MESSAGE_MARK || typeof data.text !== 'string') return
      if (event.source !== frameRef.current?.contentWindow) return
      const level = data.level ?? 'log'
      append(level, data.text)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [append])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        run()
        return
      }
      // Esc 只在焦点不在编辑器里时返回，免得写代码写到一半被弹出去。
      if (event.key === 'Escape' && event.target !== editorRef.current) onExit()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [run, onExit])

  // 站点主题切换后，预览文档跟着换，但不重启播放器。
  useEffect(() => {
    frameRef.current?.contentWindow?.postMessage({ mark: MESSAGE_MARK, theme }, '*')
  }, [theme, preview.id])

  useEffect(() => {
    const body = consoleRef.current
    if (body && stickToBottom.current) body.scrollTop = body.scrollHeight
  }, [logs])

  function reset() {
    setCode(STARTER_CODE)
    setLogs([])
    setPreview((current) => ({
      id: current.id + 1,
      code: STARTER_CODE,
      doc: buildDocument(STARTER_CODE, themeRef.current),
    }))
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard 在非安全上下文不可用；代码仍可手动选中
    }
  }

  /** 高亮层和行号跟着 textarea 滚，三层必须保持像素对齐。 */
  function syncScroll() {
    const editor = editorRef.current
    if (!editor) return
    if (highlightRef.current) {
      highlightRef.current.scrollTop = editor.scrollTop
      highlightRef.current.scrollLeft = editor.scrollLeft
    }
    if (gutterRef.current) gutterRef.current.scrollTop = editor.scrollTop
  }

  /** Tab 键插入两个空格，而不是把焦点移出编辑器。 */
  function onEditorKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Tab') return
    event.preventDefault()
    const element = event.currentTarget
    const { selectionStart, selectionEnd, value } = element
    setCode(`${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`)
    requestAnimationFrame(() => {
      element.selectionStart = element.selectionEnd = selectionStart + 2
    })
  }

  /** 拖动分隔线。用指针捕获，指针滑到 iframe 上面也不会丢事件。 */
  function startDrag(axis: 'column' | 'row', event: React.PointerEvent<HTMLDivElement>) {
    const handle = event.currentTarget
    const container = handle.parentElement
    if (!container) return
    handle.setPointerCapture(event.pointerId)
    handle.classList.add('is-dragging')

    function onMove(moveEvent: PointerEvent) {
      const box = container!.getBoundingClientRect()
      const ratio = axis === 'column'
        ? (moveEvent.clientX - box.left) / box.width
        : (moveEvent.clientY - box.top) / box.height
      resize(axis, ratio * 100)
    }
    function onUp() {
      handle.classList.remove('is-dragging')
      handle.removeEventListener('pointermove', onMove)
      handle.removeEventListener('pointerup', onUp)
    }
    handle.addEventListener('pointermove', onMove)
    handle.addEventListener('pointerup', onUp)
  }

  function resize(axis: 'column' | 'row', percent: number) {
    const next = Math.min(MAX_PANE, Math.max(MIN_PANE, percent))
    if (axis === 'column') setColumnSplit(next)
    else setRowSplit(next)
  }

  /** 分隔线也能用方向键调，键盘用户不必去够那 6px 宽的热区。 */
  function onSplitKeyDown(axis: 'column' | 'row', event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = axis === 'column' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown']
    const index = keys.indexOf(event.key)
    if (index === -1) return
    event.preventDefault()
    const current = axis === 'column' ? columnSplit : rowSplit
    resize(axis, current + (index === 0 ? -4 : 4))
  }

  // 每次运行换 key，强制 React 重建 iframe，旧文档的 Worker 和解码器随之释放。
  const frame = useMemo(() => (
    <iframe
      key={preview.id}
      ref={frameRef}
      className="playground-frame"
      title="运行结果"
      srcDoc={preview.doc}
      /**
       * 不给 allow-same-origin：预览文档始终处于独立的不透明源，拿不到本站的
       * DOM、cookie 与 localStorage。SDK 的默认 Worker 已内联为 Blob，因此不需要
       * 为了播放器而放宽沙箱；严格 CSP 若禁止 worker-src blob:，播放器会提示改用
       * 宿主同源的 workerUrl。
       */
      sandbox="allow-scripts allow-forms allow-modals"
      allow="fullscreen; autoplay"
    />
  ), [preview.id, preview.doc])

  return (
    <div className="app-shell playground-page">
      <header className="topbar playground-topbar">
        <button className="back-button" onClick={onExit}>
          <ArrowLeft size={16} aria-hidden="true" /> <span>返回首页</span>
        </button>
        <strong className="playground-title">在线实操</strong>
        <div className="topbar-actions">
          <span className="playground-version">v{__APP_VERSION__}</span>
          <button className="icon-button" title="切换主题" aria-label="切换主题" onClick={onToggleTheme}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      <main
        className="playground-main"
        style={{ '--pg-left': `${columnSplit}fr`, '--pg-right': `${100 - columnSplit}fr` } as React.CSSProperties}
      >
        <section className="playground-pane">
          <div className="playground-pane-head">
            <span>编辑器</span>
            <div className="playground-pane-actions">
              <button className="ghost-button" onClick={copyCode} title="复制全部代码">
                {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                {copied ? '已复制' : '复制'}
              </button>
              <button className="ghost-button" onClick={reset} title="恢复初始代码">
                <RotateCcw size={13} aria-hidden="true" /> 重置
              </button>
              <button className={`run-button ${dirty ? 'is-dirty' : ''}`} onClick={run}>
                <Play size={13} aria-hidden="true" /> 运行
                <kbd>Ctrl↵</kbd>
              </button>
            </div>
          </div>

          <div className="playground-editor">
            <div className="playground-gutter" ref={gutterRef} aria-hidden="true">
              {Array.from({ length: lineCount }, (_, index) => <span key={index}>{index + 1}</span>)}
            </div>
            {/* 高亮层垫在下面，textarea 透明字压在上面，两层字形完全同尺寸。 */}
            <div className="playground-code">
              <pre className="playground-highlight" ref={highlightRef} aria-hidden="true"><code>
                {tokens.map((token, index) => (
                  token.kind === 'plain'
                    ? token.value
                    : <span className={`tok-${token.kind}`} key={index}>{token.value}</span>
                ))}
              </code></pre>
              <textarea
                ref={editorRef}
                value={code}
                onChange={(event) => setCode(event.target.value)}
                onKeyDown={onEditorKeyDown}
                onScroll={syncScroll}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="代码编辑器"
              />
            </div>
          </div>
        </section>

        <div
          className="playground-split is-column"
          role="separator"
          aria-orientation="vertical"
          aria-label="调整编辑器宽度"
          tabIndex={0}
          onPointerDown={(event) => startDrag('column', event)}
          onKeyDown={(event) => onSplitKeyDown('column', event)}
        />

        <div
          className="playground-right"
          style={{ '--pg-top': `${rowSplit}fr`, '--pg-bottom': `${100 - rowSplit}fr` } as React.CSSProperties}
        >
          <section className="playground-pane">
            <div className="playground-pane-head">
              <span>播放器</span>
              {dirty && <em className="playground-stale">代码已改动，点运行刷新</em>}
            </div>
            <div className="playground-output">{frame}</div>
          </section>

          <div
            className="playground-split is-row"
            role="separator"
            aria-orientation="horizontal"
            aria-label="调整播放器高度"
            tabIndex={0}
            onPointerDown={(event) => startDrag('row', event)}
            onKeyDown={(event) => onSplitKeyDown('row', event)}
          />

          <section className="playground-pane">
            <div className="playground-pane-head">
              <span>控制台</span>
              <div className="playground-pane-actions">
                {errorCount > 0 && <em className="playground-errors">{errorCount} 条错误</em>}
                <button className="ghost-button" onClick={() => setLogs([])} title="清空控制台">
                  <Ban size={13} aria-hidden="true" /> 清空
                </button>
              </div>
            </div>

            <div
              className="playground-console"
              ref={consoleRef}
              onScroll={(event) => {
                const element = event.currentTarget
                stickToBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 24
              }}
            >
              {logs.length === 0
                ? <p className="playground-console-empty">播放器的事件、轨道信息与错误都会打在这里。</p>
                : logs.map((entry) => (
                  <div className={`playground-log is-${entry.level}`} key={entry.id}>
                    <time>{entry.time}</time>
                    <span className="playground-log-text">{entry.text}</span>
                    {entry.repeat > 1 && <em>×{entry.repeat}</em>}
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

/**
 * 把编辑器里的 HTML 包成可运行的文档：注入控制台桥接，并把当前主题写进
 * <html data-theme>，示例代码的样式表据此选深浅色。
 */
function buildDocument(code: string, theme: 'dark' | 'light'): string {
  const injected = `<script>${CONSOLE_BRIDGE}</script>`
    + `<script>document.documentElement.dataset.theme = ${JSON.stringify(theme)}</script>`

  // 桥接必须排在示例代码的 module 之前，否则头几条日志会漏掉。
  const head = /<head[^>]*>/i.exec(code)
  if (head) return splice(code, head.index + head[0].length, injected)

  const html = /<html[^>]*>/i.exec(code)
  if (html) return splice(code, html.index + html[0].length, injected)

  const doctype = /^\s*<!doctype[^>]*>/i.exec(code)
  if (doctype) return splice(code, doctype[0].length, injected)

  return injected + code
}

function splice(source: string, at: number, insert: string): string {
  return source.slice(0, at) + insert + source.slice(at)
}
