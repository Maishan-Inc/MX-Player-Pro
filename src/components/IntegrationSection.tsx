import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

// 两个 CDN 通道：jsDelivr 读 cdn 分支（可锁版本），Pages 跟随最新一次部署。
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn'
const PAGES_BASE = 'https://player.freeanime.org/sdk'
const NPM_INSTALL = 'npm install github:Maishan-Inc/MX-Player-Pro#cdn'

interface Snippet {
  id: string
  label: string
  lang: string
  install?: string
  code: string
}

const SNIPPETS: Snippet[] = [
  {
    id: 'html',
    label: 'HTML (jsDelivr)',
    lang: 'html',
    code: `<div id="mse" style="aspect-ratio:16/9"></div>

<script type="module">
  // @cdn 取最新；换成 @v1.1.0 可锁定版本。
  import { MXPlayer } from '${CDN_BASE}/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
    // 从 CDN 引入时必须指定，否则 Worker 会在你自己的域名下找 WASM。
    wasmBaseUrl: '${CDN_BASE}/wasm/',
    volume: 0.85,
  })

  player.on('ready', ({ duration, tracks }) => {
    console.log(\`时长 \${duration.toFixed(1)}s，共 \${tracks.length} 条轨道\`)
    player.play()
  })
  player.on('error', ({ message }) => console.error(message))
</script>`,
  },
  {
    id: 'pages',
    label: 'HTML (Pages)',
    lang: 'html',
    code: `<div id="mse" style="aspect-ratio:16/9"></div>

<script type="module">
  // 跟随站点最新一次部署，不带版本号。
  import { MXPlayer } from '${PAGES_BASE}/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    wasmBaseUrl: '${PAGES_BASE}/wasm/',
    localPlayback: true,
  })

  // localPlayback 打开后，把 .mkv 拖到容器上即可播放。
  player.on('ready', () => player.play())
</script>`,
  },
  {
    id: 'js',
    label: 'JavaScript',
    lang: 'javascript',
    install: NPM_INSTALL,
    code: `import { MXPlayer } from 'mx-player-pro'

const player = new MXPlayer({
  playerElm: '#mse',
  url: 'https://example.com/video.mkv',
  localPlayback: true,
})

player.on('ready', ({ duration, tracks }) => {
  console.log(duration, tracks.length)
  player.play()
})
player.on('timeupdate', ({ currentTime }) => {
  progressBar.style.width = \`\${(currentTime / player.getState().duration) * 100}%\`
})
player.on('error', ({ message }) => console.error(message))

// 命令式 API
player.seek(90)
player.setVolume(0.5)
player.toggle()

// 卸载时释放 Worker 与解码器
window.addEventListener('beforeunload', () => player.destroy())`,
  },
  {
    id: 'react',
    label: 'React',
    lang: 'tsx',
    install: NPM_INSTALL,
    code: `import { useRef } from 'react'
import { MXPlayerReact, type MXPlayerHandle } from 'mx-player-pro/react'

export function Player() {
  const ref = useRef<MXPlayerHandle>(null)

  return (
    <>
      <MXPlayerReact
        ref={ref}
        fluid
        localPlayback
        url="https://example.com/video.mkv"
        onReady={({ duration }) => console.log(duration)}
        onError={({ message }) => console.error(message)}
      />
      <button onClick={() => ref.current?.toggle()}>播放 / 暂停</button>
      <button onClick={() => ref.current?.seek(90)}>跳到 1:30</button>
    </>
  )
}`,
  },
  {
    id: 'vue',
    label: 'Vue 3',
    lang: 'vue',
    install: NPM_INSTALL,
    code: `<template>
  <MxPlayer
    ref="player"
    fluid
    local-playback
    url="https://example.com/video.mkv"
    @ready="onReady"
    @error="onError"
  />
  <button @click="player?.toggle()">播放 / 暂停</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MxPlayer } from 'mx-player-pro/vue'

const player = ref<InstanceType<typeof MxPlayer> | null>(null)

const onReady = (payload: { duration: number }) => console.log(payload.duration)
const onError = (payload: { message: string }) => console.error(payload.message)
</script>`,
  },
]

export default function IntegrationSection({ onOpenPlayground }: { onOpenPlayground: () => void }) {
  const [activeId, setActiveId] = useState(SNIPPETS[0].id)
  const [copied, setCopied] = useState(false)
  const active = SNIPPETS.find((snippet) => snippet.id === activeId) ?? SNIPPETS[0]

  async function copyActive() {
    try {
      await navigator.clipboard.writeText(active.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard 在非安全上下文不可用；代码仍可手动选中
    }
  }

  return (
    <section className="integration" aria-labelledby="integration-heading">
      <div className="integration-intro">
        <h2 id="integration-heading">嵌入你自己的网页</h2>
        <p>
          几行代码即可接入。播放器以 ES module 分发，支持原生 JS、React 与 Vue 3。
          完整 API 见 <a href="https://github.com/Maishan-Inc/MX-Player-Pro/blob/main/INTEGRATION.md" target="_blank" rel="noreferrer">接入文档</a>。
        </p>
      </div>

      <div className="integration-panel">
        <div className="integration-tabbar">
          <div className="integration-tabs" role="tablist" aria-label="接入方式">
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                role="tab"
                id={`tab-${snippet.id}`}
                aria-selected={snippet.id === activeId}
                aria-controls={`panel-${snippet.id}`}
                className={snippet.id === activeId ? 'is-active' : ''}
                onClick={() => setActiveId(snippet.id)}
              >
                {snippet.label}
              </button>
            ))}
          </div>
          <button className="integration-try" onClick={onOpenPlayground}>
            <Terminal size={13} aria-hidden="true" /> 在线实操
          </button>
        </div>

        <div
          className="integration-code"
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
        >
          {active.install && <div className="integration-install"><code>{active.install}</code></div>}
          <div className="integration-code-head">
            <span>{active.lang}</span>
            <button onClick={copyActive} aria-label="复制代码">
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          <pre><code>{active.code}</code></pre>
        </div>
      </div>
    </section>
  )
}
