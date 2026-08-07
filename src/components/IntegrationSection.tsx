import { Fragment, useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

// 生产示例锁定不可变 SDK tag；@cdn 与 Pages 只用于体验最新构建。
const CDN_BASE = `https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v${__APP_VERSION__}`
const CDN_LATEST_BASE = 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn'
const PAGES_BASE = 'https://player.freeanime.org/sdk'
const NPM_INSTALL = `npm install github:Maishan-Inc/MX-Player-Pro#sdk-v${__APP_VERSION__}`

/**
 * 前两个 tab 从 CDN 直接引 ES module，后三个走 npm 安装。两组之间加分隔符，
 * 安装命令只列一次，放在这一组的右侧。
 */
const NPM_TAB_IDS = new Set(['js', 'react', 'vue'])

interface Snippet {
  id: string
  label: string
  lang: string
  code: string
}

const SNIPPETS: Snippet[] = [
  {
    id: 'html',
    label: 'HTML (jsDelivr)',
    lang: 'html',
    code: `<link rel="stylesheet" href="${CDN_BASE}/mx-player.css">
<div id="mse" style="aspect-ratio:16/9"></div>

<script type="module">
  // 生产环境锁定不可变 sdk-v 标签；体验最新版可改用：
  // ${CDN_LATEST_BASE}/mx-player.js
  import { MXPlayer } from '${CDN_BASE}/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
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
    code: `<link rel="stylesheet" href="${PAGES_BASE}/mx-player.css">
<div id="mse" style="aspect-ratio:16/9"></div>

<script type="module">
  // 跟随站点最新一次部署，不带版本号。
  import { MXPlayer } from '${PAGES_BASE}/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
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
    code: `import { MXPlayer } from 'mx-player-pro'
import 'mx-player-pro/style.css'

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
    code: `import { useRef } from 'react'
import { MXPlayerReact, type MXPlayerHandle } from 'mx-player-pro/react'
import 'mx-player-pro/style.css'

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
import 'mx-player-pro/style.css'

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
          <div className="integration-tabgroup">
            <div className="integration-tabs" role="tablist" aria-label="接入方式">
              {SNIPPETS.map((snippet, index) => {
                const startsNpmGroup = index > 0
                  && NPM_TAB_IDS.has(snippet.id)
                  && !NPM_TAB_IDS.has(SNIPPETS[index - 1].id)
                return (
                  <Fragment key={snippet.id}>
                    {startsNpmGroup && <span className="integration-tab-sep" aria-hidden="true" />}
                    <button
                      role="tab"
                      id={`tab-${snippet.id}`}
                      aria-selected={snippet.id === activeId}
                      aria-controls={`panel-${snippet.id}`}
                      className={snippet.id === activeId ? 'is-active' : ''}
                      onClick={() => setActiveId(snippet.id)}
                    >
                      {snippet.label}
                    </button>
                  </Fragment>
                )
              })}
            </div>
            <code className="integration-npm">{NPM_INSTALL}</code>
          </div>
          <button className="integration-try" onClick={onOpenPlayground}>
            <Terminal size={13} aria-hidden="true" /> 在线实操
          </button>
        </div>

        <div className="integration-code">
          <div className="integration-code-head">
            <span>{active.lang}</span>
            <button onClick={copyActive} aria-label="复制代码">
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          {/* 五段代码全部渲染并重叠在同一个网格格子里，容器高度取最长那段，
              切 tab 不会跳动。未选中的用 visibility 隐藏，仍然占位。 */}
          <div className="integration-code-stack">
            {SNIPPETS.map((snippet) => (
              <pre
                key={snippet.id}
                role="tabpanel"
                id={`panel-${snippet.id}`}
                aria-labelledby={`tab-${snippet.id}`}
                aria-hidden={snippet.id === activeId ? undefined : true}
                className={snippet.id === activeId ? 'is-active' : ''}
              ><code>{snippet.code}</code></pre>
            ))}
          </div>
        </div>
      </div>

      <p className="integration-note">
        需要 Chrome/Edge 94+ 或 Safari 16.4+（WebCodecs）。远端 MKV 须开启 CORS 并支持 Range 请求。当前版本 v{__APP_VERSION__}；生产环境使用不可变 <code>@sdk-v{__APP_VERSION__}</code>，<code>@cdn</code> 仅用于体验最新版。
      </p>
    </section>
  )
}
