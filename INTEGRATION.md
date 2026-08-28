# MX Player Pro — 接入文档

MX Player Pro 是纯客户端 Matroska 播放器。浏览器通过 HTTP Range 按需读取 MKV，在 TypeScript Web Worker 中解封装，再用 WebCodecs 解码。服务器不转码、不代理、不上传媒体。

演示站点：<https://player.freeanime.org>

仓库：<https://github.com/Maishan-Inc/MX-Player-Pro>

## 运行前提

| 前提 | 说明 |
| --- | --- |
| ES module | CDN 接入必须使用 `<script type="module">`，不提供 `window.MXPlayer` 形式的 UMD/IIFE 版本。 |
| 播放器 CSS | HTML 必须加载 `mx-player.css`；构建工具项目应导入 `mx-player-pro/style.css`。 |
| WebCodecs | 建议 Chrome/Edge 94+ 或 Safari 16.4+。Firefox 的 WebCodecs 支持情况取决于版本和配置。 |
| CORS + Range | 远程 MKV 必须允许网页来源跨域读取，并正确响应 HTTP Range。 |

## 一、jsDelivr

生产接入请固定到不可变的 `sdk-v0.2.8` 标签，确保 JS 与 CSS 来自同一次构建：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player.css">
<div id="mse" style="width:100%;aspect-ratio:16/9"></div>

<script type="module">
  import { MXPlayer } from 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
    localPlayback: true,
    autoplay: false,
    volume: 0.85,
  })

  player.on('ready', ({ duration, tracks }) => {
    console.log(`时长 ${duration.toFixed(1)}s，共 ${tracks.length} 条轨道`)
    player.play()
  })
  player.on('error', ({ message }) => console.error(message))
</script>
```

完整文件清单：

```text
https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player.js
https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player.css
https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player-react.js
https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player-vue.js
https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player-worker.js
```

> 不要用 `@latest` 或浮动的 `@cdn` 作为生产依赖；升级时请同时替换 JS 与 CSS 的 `sdk-v<version>` 标签。

### 缓存与更新时机

jsDelivr 会缓存 `@cdn` 这类分支地址，所以新发布不会立刻可见。`Publish SDK` workflow 在推完产物后会自动调用 jsDelivr 的清理接口，正常情况下发布完成即生效，不需要手动刷新。

如果碰上清理失败（workflow 日志里会有 warning），可以自己访问一次清理地址：

```text
https://purge.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/mx-player.js
```

浏览器端的强缓存另算：本地调试时用硬性重新加载，或临时加一个查询串绕开。

### 需要长期锁定某个版本时

发布流程默认保留当前版本，workflow 会在更新 `@cdn` 的同时，额外打一个不可变的 `sdk-v<version>` 标签。这个标签之后不会被任何新发布覆盖或删除，可以放心长期引用：

```html
<script type="module">
  import { MXPlayer } from 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player.js'
</script>
```

如需仅更新浮动的 `@cdn`，可以在 workflow 中关闭保留版本；生产接入仍建议使用不可变标签。

### 为什么跨域 SDK 不再触发 Worker 同源错误

浏览器通常不允许页面直接执行：

```js
new Worker('https://另一个域名/demux.worker.js', { type: 'module' })
```

MX Player Pro 的默认构建已把 Worker 程序内联到 `mx-player.js`。模块从 CDN 下载后，播放器在当前页面创建 Blob URL 并启动 Worker，不再请求 CDN 上的独立 Worker 入口，因此不会出现 `Failed to construct 'Worker'` 的跨域创建错误。

这与媒体文件的 CORS 是两件不同的事：Worker 能创建，不代表网页一定能读取远程 MKV；媒体服务器仍须允许 CORS 和 Range。

### 严格 CSP：使用同源 `workerUrl`

如果站点配置了 CSP，并且 `worker-src` 不允许 `blob:`，请把发布包中的 `mx-player-worker.js` 复制到站点自己的静态目录：

```js
const player = new MXPlayer({
  playerElm: '#mse',
  url: 'https://example.com/video.mkv',
  workerUrl: '/static/mx-player/mx-player-worker.js',
})
```

对应策略至少需要允许该同源 Worker，例如：

```http
Content-Security-Policy: worker-src 'self'; script-src 'self' https://cdn.jsdelivr.net
```

默认模式使用 Blob Worker 时，策略应允许 `worker-src 'self' blob:`。

## 二、GitHub Pages / 自托管

演示站点同步提供最新版 SDK：

```html
<link rel="stylesheet" href="https://player.freeanime.org/sdk/mx-player.css">
<div id="mse" style="aspect-ratio:16/9"></div>
<script type="module">
  import { MXPlayer } from 'https://player.freeanime.org/sdk/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
  })
</script>
```

也可以把 `dist-lib/` 放到自己的静态目录。默认 Blob Worker 不要求额外文件；只有严格 CSP 使用 `workerUrl` 时才需要同时部署 `mx-player-worker.js`。

不要用 `raw.githubusercontent.com` 直接作为模块入口。它常以 `text/plain` 返回 JavaScript，浏览器会因 MIME 类型不符拒绝执行。

## 三、npm / 构建工具

生产环境请安装不可变的 `sdk-v0.2.8` 标签，确保 JS、CSS 与 Worker 来自同一次构建：

```bash
npm install github:Maishan-Inc/MX-Player-Pro#sdk-v0.2.8
```

npm 会把解析到的 commit 写进 lockfile，所以安装结果本身是可复现的；升级时请同时更新 SDK 标签与 CSS。

### 原生 JavaScript / TypeScript

```ts
import { MXPlayer } from 'mx-player-pro'
import 'mx-player-pro/style.css'

const player = new MXPlayer({
  playerElm: '#mse',
  url: 'https://example.com/video.mkv',
})
```

### React

React 入口把 React 与 ReactDOM 作为 peer dependency，不会在已有 React 应用里再创建嵌套 root：

```tsx
import { useRef } from 'react'
import { MXPlayerReact, type MXPlayerHandle } from 'mx-player-pro/react'
import 'mx-player-pro/style.css'

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
      <button onClick={() => playerRef.current?.toggle()}>播放 / 暂停</button>
      <button onClick={() => playerRef.current?.seek(90)}>跳到 1:30</button>
    </>
  )
}
```

### Vue 3

```vue
<template>
  <MxPlayer
    ref="playerRef"
    fluid
    url="https://example.com/video.mkv"
    local-playback
    @ready="onReady"
    @error="onError"
  />
  <button @click="playerRef?.toggle()">播放 / 暂停</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MxPlayer } from 'mx-player-pro/vue'
import 'mx-player-pro/style.css'

const playerRef = ref<InstanceType<typeof MxPlayer> | null>(null)
const onReady = ({ duration }: { duration: number }) => console.log(duration)
const onError = ({ message }: { message: string }) => console.error(message)
</script>
```

## API

### 构造选项

| 选项 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `playerElm` | `string \| HTMLElement` | — | 必填，播放器容器。 |
| `url` | `string` | — | 远程 MKV 地址，与 `file` 二选一。 |
| `file` | `File` | — | 本地 MKV 文件。 |
| `label` | `string` | 自动推导 | 播放器标题。 |
| `localPlayback` | `boolean` | `false` | 允许把本地 MKV 拖到播放器。 |
| `autoplay` | `boolean` | `false` | 元数据就绪后自动播放，仍受浏览器策略限制。 |
| `volume` | `number` | `0.85` | 初始音量，范围 0–1。 |
| `muted` | `boolean` | `false` | 初始静音。 |
| `workerUrl` | `string \| URL` | — | CSP 禁止 Blob Worker 时使用的宿主同源 Worker 地址。 |
| `onNext` | `() => void` | — | 提供后显示下一集按钮。 |
| `qualities` | `{ id, label }[]` | `[]` | 宿主提供的清晰度选项。 |
| `selectedQuality` | `string` | `auto` | 当前清晰度 ID。 |
| `onQualityChange` | `(id) => void` | — | 清晰度选择回调，实际换源由宿主处理。 |
| `danmaku` | `object` | — | 可选弹幕显示/输入入口，数据与渲染由宿主负责。 |
| `onTheaterChange` | `(enabled) => void` | — | 剧场模式变化通知。 |
| `wasmBaseUrl` | `string` | — | 已废弃；0.x 仅保留类型兼容，当前不会加载 WASM。 |

### 方法

```ts
await player.load({ kind: 'url', url })
await player.load({ kind: 'file', file })
player.play()
player.pause()
player.toggle()
player.seek(90)
player.setVolume(0.5)
player.setMuted(true)
player.setPlaybackRate(1.5)
player.requestFullscreen()
await player.requestPictureInPicture()
player.getState()
player.tracks
player.destroy()
```

`load()` 会保留已挂载的播放器界面和用户字幕设置，并为新来源重启解析/解码链路。`destroy()` 会终止 Worker、关闭解码器、释放画中画流并卸载界面。

### 状态

```ts
player.getState()
// {
//   ready, playing, currentTime, duration,
//   volume, muted, playbackRate,
//   bufferedAhead, stalled, error
// }
```

### 事件

```ts
player.on('ready', ({ tracks, duration }) => {})
player.on('play', () => {})
player.on('pause', () => {})
player.on('timeupdate', ({ currentTime, duration }) => {})
player.on('ended', () => {})
player.on('error', ({ message }) => {})
player.on('theaterchange', ({ enabled }) => {})
player.on('qualitychange', ({ qualityId }) => {})
player.on('danmakuchange', ({ visible }) => {})

player.off('play', handler)
```

## 云端资源要求

### CORS

媒体服务器应返回类似：

```http
Access-Control-Allow-Origin: https://your-site.example
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Expose-Headers: Content-Length, Content-Range, Accept-Ranges
```

开发阶段可使用 `Access-Control-Allow-Origin: *`，但带 Cookie/Authorization 的请求不能与通配来源凭据混用。Chrome/Edge 142+ 对公网网页访问私网地址使用“本地网络访问”站点权限，不再要求旧版 Private Network Access 的 `Access-Control-Allow-Private-Network` 响应头。播放器会先从页面主线程发一个无正文的 `HEAD` 直连请求来触发权限提示，再启动 Worker。

播放器不会通过服务器代理媒体。授权请求和 `RangeLoader` 的分片请求都直接使用传入的 `url`；私网响应只会在当前浏览器进程内从页面主线程交给解封装 Worker。部署站点只负责提供 HTML、脚本和样式，不会接收媒体正文。

### Range

对请求：

```http
Range: bytes=0-1048575
```

服务器应返回 `206 Partial Content`、`Content-Range` 和正确的 `Content-Length`。如果服务器忽略 Range 并返回整个文件，首帧和 Seek 会明显变慢，超大文件也可能超过浏览器内存兜底限制。

## 常见错误

### `Failed to construct 'Worker'`

旧版 SDK 会直接从 CDN 创建远端 Worker，浏览器在创建阶段因入口不同源而拒绝。升级到包含内联 Worker 的版本。若新版错误信息指出 CSP 禁止 `blob:`，请同源部署 `mx-player-worker.js` 并传入 `workerUrl`。

### 媒体请求被 CORS 拒绝或一直转圈

在 DevTools Network 检查 MKV 请求是否返回 `206`，以及响应是否包含允许当前页面来源的 `Access-Control-Allow-Origin`。Worker 同源问题修复后，媒体 CORS 仍必须由媒体服务器配置。

### 解码器不可用

确认浏览器支持 WebCodecs，并确认轨道编码映射受支持。视频支持 H.264/AVC 与 HEVC；音频支持 AAC、FLAC、Opus、Vorbis、MP3，以及浏览器自身支持时的 AC-3/E-AC-3。

音频轨无法解码时不会影响视频画面，播放器会在状态里给出具体原因（编码不受支持，或浏览器拒绝该配置）。实际可用范围取决于浏览器：例如 AC-3/E-AC-3 只在部分平台的 Chrome/Edge 上可用。

### `MIME type "text/plain"`

不要使用 `raw.githubusercontent.com` 作为浏览器模块入口，改用 jsDelivr 或自托管。

## 许可

MIT License · © 2026 Maishan Inc.
# HLS / MP4 / WebM 接入

将远程 `.m3u8` 地址作为 `url` 传入，并可使用 `format: 'hls'` 显式指定格式。Safari/iOS 使用原生 HLS，其他支持 MediaSource 的浏览器使用内置 hls.js。服务器需对 playlist、分片、密钥及字幕响应统一返回 `Access-Control-Allow-Origin`；使用 Cookie 时不能使用 `*`。

普通 MP4/WebM URL 使用浏览器原生 `<video>` 管线；HLS 轨道通过 `getTracks()` 暴露，清晰度通过现有 `qualities`/`qualitychange` API 选择。第一版不支持 DRM、本地 m3u8 文件和浏览器不支持的 HEVC/AV1/AC-3 编码。
