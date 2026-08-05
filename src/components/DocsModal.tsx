import { X, Copy, Check } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DocsModalProps {
  onClose: () => void
}

export default function DocsModal({ onClose }: DocsModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    // 弹层自己滚动，锁住背后的页面
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  async function copyCode(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1800)
    } catch {
      // clipboard 在非安全上下文里不可用，静默失败即可，代码本身仍可手选
    }
  }

  return (
    <div className="docs-overlay" role="dialog" aria-modal="true" aria-label="接入文档" onClick={onClose}>
      <div className="docs-dialog" onClick={(event) => event.stopPropagation()}>
        <header className="docs-header">
          <h2>接入文档</h2>
          <button className="docs-close" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </header>

        <div className="docs-body">
          <section className="docs-section">
            <h3>前提条件</h3>
            <ul className="docs-list">
              <li><strong>必须用 <code>&lt;script type="module"&gt;</code></strong> — 播放器依赖 ES module Worker 与动态 import，经典脚本不支持</li>
              <li><strong>浏览器需支持 WebCodecs</strong> — Chrome/Edge 94+，Safari 16.4+（Firefox 暂不支持）</li>
              <li><strong>远端资源需支持 CORS + Range 请求</strong> — 返回 <code>206 Partial Content</code> 与跨域响应头</li>
            </ul>
          </section>

          <section className="docs-section">
            <h3>1. CDN 引入（jsDelivr）</h3>
            <p className="docs-desc">最快的方式，无需构建工具。</p>
            <CodeBlock
              id="cdn"
              language="html"
              code={`<div id="mse" style="width: 100%; aspect-ratio: 16/9;"></div>

<script type="module">
  import { MXPlayer } from 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
    localPlayback: true,
    autoplay: false,
    wasmBaseUrl: 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/wasm/',
  })

  player.on('ready', ({ duration }) => {
    console.log(\`时长 \${duration}s\`)
    player.play()
  })
</script>`}
              onCopy={copyCode}
              copied={copiedId === 'cdn'}
            />
            <p className="docs-note"><strong>注意：</strong><code>wasmBaseUrl</code> 必须指向 CDN 的 <code>wasm/</code> 目录，否则 Worker 会 404 并退回较慢的 TS 解析器。</p>
          </section>

          <section className="docs-section">
            <h3>2. GitHub Pages 自托管</h3>
            <p className="docs-desc">SDK 已随演示站点一起部署。</p>
            <CodeBlock
              id="gh-pages"
              language="html"
              code={`<script type="module">
  import { MXPlayer } from 'https://player.freeanime.org/sdk/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
    wasmBaseUrl: 'https://player.freeanime.org/sdk/wasm/',
  })
</script>`}
              onCopy={copyCode}
              copied={copiedId === 'gh-pages'}
            />
          </section>

          <section className="docs-section">
            <h3>3. npm（构建工具）</h3>
            <CodeBlock
              id="npm-install"
              language="bash"
              code="npm install github:Maishan-Inc/MX-Player-Pro#cdn"
              onCopy={copyCode}
              copied={copiedId === 'npm-install'}
            />
            <p className="docs-desc"><code>#cdn</code> 分支存放预构建产物，安装时不需要 Rust 工具链。</p>

            <h4>原生 JS / TypeScript</h4>
            <CodeBlock
              id="npm-js"
              language="typescript"
              code={`import { MXPlayer } from 'mx-player-pro'

const player = new MXPlayer({
  playerElm: '#mse',
  url: 'https://example.com/video.mkv',
})
// 通过打包器引入时不需要 wasmBaseUrl`}
              onCopy={copyCode}
              copied={copiedId === 'npm-js'}
            />

            <h4>Vue 3</h4>
            <CodeBlock
              id="npm-vue"
              language="vue"
              code={`<template>
  <MxPlayer
    ref="playerRef"
    :fluid="true"
    url="https://example.com/video.mkv"
    :local-playback="true"
    @ready="onReady"
  />
  <button @click="playerRef?.play()">播放</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MxPlayer } from 'mx-player-pro/vue'

const playerRef = ref()
const onReady = ({ duration }) => console.log('时长', duration)
</script>`}
              onCopy={copyCode}
              copied={copiedId === 'npm-vue'}
            />

            <h4>React</h4>
            <CodeBlock
              id="npm-react"
              language="tsx"
              code={`import { useRef } from 'react'
import { MXPlayerReact, type MXPlayerHandle } from 'mx-player-pro/react'

export function Demo() {
  const playerRef = useRef<MXPlayerHandle>(null)

  return (
    <>
      <MXPlayerReact
        ref={playerRef}
        fluid
        url="https://example.com/video.mkv"
        localPlayback
        onReady={({ duration }) => console.log('时长', duration)}
      />
      <button onClick={() => playerRef.current?.play()}>播放</button>
    </>
  )
}`}
              onCopy={copyCode}
              copied={copiedId === 'npm-react'}
            />
          </section>

          <section className="docs-section">
            <h3>API 参考</h3>
            <p className="docs-desc">完整 API 文档见仓库 <a href="https://github.com/Maishan-Inc/MX-Player-Pro/blob/main/INTEGRATION.md" target="_blank" rel="noreferrer">INTEGRATION.md</a>。</p>
          </section>
        </div>
      </div>
    </div>
  )
}

interface CodeBlockProps {
  id: string
  language: string
  code: string
  onCopy: (id: string, code: string) => void
  copied: boolean
}

function CodeBlock({ id, language, code, onCopy, copied }: CodeBlockProps) {
  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{language}</span>
        <button
          className="code-copy"
          onClick={() => onCopy(id, code)}
          aria-label="复制代码"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}
