# MX Player Pro

纯客户端 Matroska 播放器：浏览器通过 HTTP Range 读取 MKV，在 Web Worker 中用 TypeScript 解封装，再交给 WebCodecs 解码。服务器只需要托管静态文件，不进行转码、封装、索引、代理或上传。

演示站点：<https://player.freeanime.org>

## 在网页中使用

播放器默认挂载完整的 React 控制界面。示例固定到不可变的 `sdk-v0.2.8` 标签，确保 JS 与 CSS 来自同一次构建：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player.css">
<div id="mse" style="width:100%;aspect-ratio:16/9"></div>

<script type="module">
  import { MXPlayer } from 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@sdk-v0.2.8/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
    volume: 0.85,
  })

  player.on('ready', () => player.play())
  player.on('error', ({ message }) => console.error(message))
</script>
```

GitHub Pages 入口同样是最新版：`https://player.freeanime.org/sdk/mx-player.js` 与 `mx-player.css`。

> 不要用 `@latest` 或浮动的 `@cdn` 作为生产依赖；升级时请同时替换 JS 与 CSS 的 `sdk-v<version>` 标签。

完整接入方式、React/Vue 组件和 API 参考见 [INTEGRATION.md](./INTEGRATION.md)。

> SDK 以 ES module 分发，必须使用 `<script type="module">`。`raw.githubusercontent.com` 返回的 MIME 类型不适合作为浏览器模块入口，请使用 jsDelivr、GitHub Pages 或自行托管。

## Worker、WebCodecs 与 WASM

WebCodecs 负责解码 H.264、HEVC、AAC、FLAC、Opus、Vorbis、MP3 以及浏览器支持的 AC-3/E-AC-3 压缩轨道，但不负责读取 MKV 容器。播放器先在 Worker 中解析 EBML、Tracks、Clusters 和 Blocks，再把轨道数据交给 WebCodecs。

默认 SDK 已把 Worker 内联到 `mx-player.js`，运行时从当前页面创建 Blob Worker。因此网页可以从 jsDelivr 跨域导入 SDK，不会再执行跨域的 `new Worker('https://cdn.jsdelivr.net/...')`。当前播放链路不依赖 Rust 或 WASM，也不需要配置 `wasmBaseUrl`。

若站点 CSP 禁止 `worker-src blob:`，请把发布包中的 `mx-player-worker.js` 部署到站点同源目录，再配置：

```js
const player = new MXPlayer({
  playerElm: '#mse',
  url,
  workerUrl: '/static/mx-player-worker.js',
})
```

## 功能

- 完整播放器界面：进度、音量、倍速、轨道、全屏、画中画、剧场、统计、设置与右键菜单。
- 选择本地 `.mkv` 文件，或播放支持 CORS 与 Range 的远程 MKV。
- TypeScript Matroska 解析器运行于独立 Worker，默认无需额外 Worker/WASM 请求。
- WebCodecs 视频/音频解码、Canvas 视频渲染与 AudioContext 音频时钟。
- SRT 与 ASS 文本字幕、字幕轨切换、字体/缩放/垂直位置设置。
- 原生 JavaScript、React 和 Vue 3 接入入口。

## 云端 URL 要求

远程资源必须允许当前页面来源的 CORS，并支持 `GET` Range 请求，返回 `206 Partial Content` 与 `Content-Range`。页面不会代理请求：播放时浏览器直接向你输入的媒体 URL 发起 Range 请求，媒体字节不会经过演示站点或播放器部署服务器。浏览器可以直接下载某个 URL，并不代表网页 JavaScript 有权限跨域读取它。

公网 HTTPS 页面首次读取 `http://192.168.x.x` 等局域网地址时，Chrome/Edge 会询问是否允许“本地网络访问”。播放器先在页面主线程向原始 URL 发一个无正文的 `HEAD` 请求来触发授权；授权后，页面主线程继续向同一原始 URL 读取 Range，并只在当前浏览器进程内把响应交给解封装 Worker。部署站点不会接收媒体正文。若用户拒绝授权，请在地址栏的站点权限中重新允许。旧版浏览器若仍按混合内容规则阻止请求，请给媒体服务启用 HTTPS，或在局域网 HTTP 页面打开播放器。

## 开发

```bash
pnpm install
pnpm dev
```

验证与构建：

```bash
pnpm test
pnpm lint
pnpm build
pnpm build:lib
```

`pnpm build` 输出演示站点到 `dist/`。`pnpm build:lib` 输出以下 SDK 文件到 `dist-lib/`：

- `mx-player.js`：包含 React 运行时和内联 Worker 的完整独立版。
- `mx-player-react.js`：React peer dependency 版。
- `mx-player-vue.js`：Vue 3 兼容适配器。
- `mx-player-worker.js`：严格 CSP 站点可自行同源部署的 Worker。
- `mx-player.css`：三种播放器入口共用的样式。

## 发布

`Publish SDK` workflow 把 `dist-lib/` 推送到 `cdn` 分支，jsDelivr 直接读取这棵 Git 树。发布结束后 workflow 会自动清理 jsDelivr 缓存，`@cdn` 立即生效，不需要手动去 purge。

发布流程默认保留当前版本：除了更新 `@cdn`，还会额外打一个不可变的 `sdk-v<version>` 标签，作为可长期引用的锚点。这个标签之后不会被任何新发布覆盖或删除。

仓库以 MIT License 发布。
# HLS / m3u8

远程 HLS 播放列表可直接传入 `url`，播放器会按浏览器能力选择 Safari 原生 HLS 或 `hls.js` + MSE：

```ts
const player = new MXPlayer({
  playerElm: '#player',
  url: 'https://media.example.com/master.m3u8',
  format: 'hls',
  hls: { lowLatencyMode: false },
})
```

`format` 支持 `auto`、`mkv`、`hls`、`native`，省略时会根据 `.m3u8`、`.mp4`、`.webm` 后缀自动识别。普通 MP4/WebM 走浏览器原生 `<video>`；HLS 的 playlist、分片、密钥和 WebVTT 字幕都由浏览器直连源站，必须统一配置 CORS。本版本不包含 DRM、FFmpeg/WASM 转码或本地 m3u8 文件解析。
