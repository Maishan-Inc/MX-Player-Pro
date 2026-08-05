# MX Player Pro — 接入文档

纯客户端 Matroska 播放器。浏览器通过 HTTP Range 按需读取 MKV，在 Worker 中解封装，再用 WebCodecs 硬件解码。服务器只托管静态文件，不转码、不代理、不上传。

演示站点：<https://player.freeanime.org>
仓库：<https://github.com/Maishan-Inc/MX-Player-Pro>

---

## 运行前提

在写代码之前，这三条决定了播放器能不能跑起来：

| 前提 | 说明 |
| --- | --- |
| **必须用 `<script type="module">`** | 播放器内部依赖 `new Worker(..., { type: 'module' })` 和动态 `import()`。这两者在经典脚本里都不工作，因此**不提供** UMD/IIFE 版本，`<script src="...">` 直接引入 + `window.MXPlayer` 的写法用不了。 |
| **浏览器需支持 WebCodecs** | Chrome / Edge 94+，Safari 16.4+。Firefox 目前不支持 `VideoDecoder`，播放器会报解码器不可用。 |
| **远端资源需支持 CORS + Range** | 见下方「云端资源要求」。这是最常见的接入失败原因。 |

---

## 一、CDN 引入（jsDelivr）

最快的方式，无需构建工具。

```html
<div id="mse" style="width: 100%; aspect-ratio: 16/9;"></div>

<script type="module">
  import { MXPlayer } from 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
    localPlayback: true,   // 允许把本地 .mkv 拖进容器播放
    autoplay: false,
    // 从 CDN 引入时必须指定，否则 Worker 会去你自己的域名下找 WASM 而 404
    wasmBaseUrl: 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/wasm/',
  })

  player.on('ready', ({ duration, tracks }) => {
    console.log(`时长 ${duration}s，共 ${tracks.length} 条轨道`)
    player.play()
  })
  player.on('error', ({ message }) => console.error(message))
</script>
```

### 锁定版本

`@cdn` 指向最新构建。生产环境建议锁到具体 tag，避免上游更新影响线上：

```js
import { MXPlayer } from 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@v1.0.0/mx-player.js'
```

> **`wasmBaseUrl` 为什么必填？**
> Worker 需要加载 Rust 解封装器 `mkv_demuxer.js`。默认它按当前页面的 origin 去找，从 CDN 引入时那是**你的**域名，请求会 404，播放器会静默退回较慢的 TypeScript 解析器。指向 CDN 上的 `wasm/` 目录即可。

---

## 二、GitHub Pages 自托管

如果你不想依赖第三方 CDN，SDK 已随演示站点一起部署：

```html
<script type="module">
  import { MXPlayer } from 'https://player.freeanime.org/sdk/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
    wasmBaseUrl: 'https://player.freeanime.org/sdk/wasm/',
  })
</script>
```

也可以把 `dist-lib/` 整个目录拷到自己服务器的任意路径下，两个 URL 相应替换即可。

> **不能用 `raw.githubusercontent.com` 直接引入。**
> 它以 `text/plain` 返回 JS，浏览器会因 MIME 类型不符拒绝当模块执行。要走原始文件必须经过 jsDelivr 这类会修正 Content-Type 的 CDN。

---

## 三、npm / 构建工具

```bash
npm install github:Maishan-Inc/MX-Player-Pro#cdn
```

`#cdn` 分支存放的是 CI 预构建好的产物，安装时不需要 Rust 工具链，也不会在你的机器上跑构建。锁定版本用 `#v1.0.0`。

### 原生 JS / TypeScript

```ts
import { MXPlayer } from 'mx-player-pro'

const player = new MXPlayer({
  playerElm: '#mse',
  url: 'https://example.com/video.mkv',
})
```

通过打包器引入时 **不需要** `wasmBaseUrl`：Vite / webpack 会自行处理 Worker 与 WASM 的路径。

### Vue 3

```vue
<template>
  <MxPlayer
    ref="playerRef"
    :fluid="true"
    url="https://example.com/video.mkv"
    :local-playback="true"
    @ready="onReady"
    @timeupdate="onTimeUpdate"
    @error="onError"
  />
  <button @click="playerRef?.play()">播放</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MxPlayer } from 'mx-player-pro/vue'

const playerRef = ref()
const onReady = ({ duration }) => console.log('时长', duration)
const onTimeUpdate = ({ currentTime }) => console.log(currentTime)
const onError = ({ message }) => console.error(message)
</script>
```

### React

```tsx
import { useRef } from 'react'
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
        onError={({ message }) => console.error(message)}
      />
      <button onClick={() => playerRef.current?.play()}>播放</button>
    </>
  )
}
```

---

## API

### 构造选项

| 选项 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `playerElm` | `string \| HTMLElement` | — | **必填**。容器选择器或元素 |
| `url` | `string` | — | 云端 MKV 地址，需支持 CORS 与 Range |
| `file` | `File` | — | 本地文件，与 `url` 二选一 |
| `localPlayback` | `boolean` | `false` | 允许拖拽本地 `.mkv` 到容器播放 |
| `autoplay` | `boolean` | `false` | 元数据就绪后自动播放 |
| `volume` | `number` | `0.85` | 初始音量 0–1 |
| `muted` | `boolean` | `false` | 初始静音 |
| `wasmBaseUrl` | `string` | — | `mkv_demuxer.js` 所在目录，CDN 引入时必填 |

> `autoplay` 受浏览器自动播放策略限制，通常需要同时设置 `muted: true` 才会生效。

### 方法

```ts
player.play()
player.pause()
player.toggle()
player.seek(seconds)
player.setVolume(0.5)         // 0–1
player.setMuted(true)
player.setPlaybackRate(1.5)   // 0.25–4
player.requestFullscreen()
player.load({ kind: 'url', url })    // 换源，复用已有实例
player.load({ kind: 'file', file })
player.getState()
player.tracks                 // TrackInfo[]
player.destroy()              // 释放 Worker、解码器与 DOM
```

`getState()` 返回：

```ts
{
  playing: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  bufferedAhead: number   // 已缓冲秒数
  stalled: boolean        // 是否正在重新缓冲
  error: string | null
}
```

### 事件

```ts
player.on('ready',      ({ tracks, duration }) => {})
player.on('play',       () => {})
player.on('pause',      () => {})
player.on('timeupdate', ({ currentTime, duration }) => {})
player.on('ended',      () => {})
player.on('error',      ({ message }) => {})

player.off('play', handler)
```

`error` 只在**视频**管线失败时触发。音频单独解码失败不会中断播放，文件仍然可看。

---

## 云端资源要求

远端 MKV 必须满足两点，否则浏览器安全策略会阻止纯客户端读取：

**1. 允许跨域**

```
Access-Control-Allow-Origin: https://your-site.com
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Expose-Headers: Content-Length, Content-Range, Accept-Ranges
```

**2. 支持 Range 请求**，对 `Range: bytes=0-1048575` 返回 `206 Partial Content` 与 `Content-Range`。

> 「浏览器里能直接下载」不等于「网页能读取」。直接下载不经过 CORS 检查，跨域读取会。这是最常见的接入失败原因。
>
> 服务器若忽略 `Range` 返回完整响应，播放器会把整个文件读入内存作为兜底（上限 512 MB），首帧会明显变慢。

---

## 常见问题

**播放器一直转圈 / 报跨域错误**
按上一节检查响应头。打开 DevTools Network，确认媒体请求返回 `206` 且带 `Access-Control-Allow-Origin`。

**控制台提示解码器不可用**
浏览器不支持 WebCodecs 或该编码。目前支持 H.264 视频 + AAC 音频；Firefox 尚不支持 `VideoDecoder`。

**从 CDN 引入后播放变慢**
多半是 `wasmBaseUrl` 没配，退回了 TypeScript 解析器。检查 Network 里 `mkv_demuxer.js` 是否 404。

**`Failed to load module script ... MIME type "text/plain"`**
用了 `raw.githubusercontent.com`。改用 jsDelivr 或自托管。

---

## 许可

MIT License · © 2026 Maishan Inc.
