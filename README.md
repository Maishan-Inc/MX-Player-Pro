# MX Player Pro

纯客户端 Matroska 播放器：浏览器通过 HTTP Range 读取 MKV，在 Worker 中解封装，再使用 WebCodecs 解码。服务器只需要托管静态文件，不进行转码、封装、索引或代理。

演示站点：<https://player.freeanime.org>

## 在你的网页中使用

播放器可作为 SDK 引入，支持原生 JS、Vue 3 与 React：

```html
<div id="mse" style="width:100%;aspect-ratio:16/9"></div>

<script type="module">
  import { MXPlayer } from 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#mse',
    url: 'https://example.com/video.mkv',
    wasmBaseUrl: 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/wasm/',
  })
</script>
```

完整接入方式（jsDelivr、GitHub Pages 自托管、npm，以及 Vue / React 组件与 API 参考）见 **[INTEGRATION.md](./INTEGRATION.md)**。

> SDK 只提供 ES module 格式。播放器依赖 `new Worker(..., { type: 'module' })` 与动态 `import()`，二者在经典脚本中都不工作，因此没有 UMD 版本，必须使用 `<script type="module">`。

## 功能

- 选择本地 `.mkv` 文件，或输入指向 MKV 的云端下载 URL。
- Rust `wasm-bindgen` 解封装边界、Worker 消息通道和 TypeScript EBML 开发解析器。
- H.264 视频、AAC 音频、SRT 字幕 MVP。
- Canvas 视频渲染、AudioContext 输出、基础 Seek/音量/倍速/全屏。
- GitHub Pages 和 Cloudflare Pages 静态部署。

## 云端 URL 要求

云端资源必须允许当前页面来源的 CORS，并支持 `GET` 的 `Range` 请求，返回 `206 Partial Content` 与 `Content-Range`。页面不会代理请求，也不会上传视频。若资源服务器无法开启这些响应头，浏览器安全策略会阻止纯客户端读取。

## 开发

```bash
pnpm install
pnpm build:wasm
pnpm dev
```

本机未安装 `wasm-pack` 时，`build:wasm` 会保留 TypeScript 解析器以便开发 UI；CI 和正式构建应安装 `wasm-pack` 并生成 `public/wasm/` 产物。

```bash
pnpm test
pnpm build
```

构建 SDK 产物（输出到 `dist-lib/`，含 WASM 与 `package.json`）：

```bash
pnpm build:lib
```

## 部署

`pnpm build` 输出 `dist/`。首次使用 GitHub Pages 时，请在仓库 `Settings > Pages > Build and deployment` 将 Source 设置为 `GitHub Actions`，然后重新运行 workflow；后续 push 到 `main` 会自动发布 Pages artifact。若尚未启用 Pages，workflow 会保留构建结果并给出 warning，不会把 CI 标记为失败。Cloudflare Pages 可直接选择该目录手动上传。应用使用相对资源路径，适用于仓库子路径。

## 发布

推送 `v*` tag 或手动运行 `Draft Release` workflow，会构建静态产物并使用 `GITHUB_TOKEN` 创建 GitHub Draft Release。

同一个 tag 也会触发 `Publish SDK` workflow，把 `dist-lib/` 推送到独立的 `cdn` 分支 —— jsDelivr 的 `/gh/` 路径直接读取 git 树，产物必须在仓库里才能被 CDN 分发。该分支是孤儿分支，不会污染 `main` 的历史。

仓库以 MIT License 发布。
