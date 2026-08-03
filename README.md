# MX Player Pro

纯客户端 Matroska 播放器：浏览器通过 HTTP Range 读取 MKV，在 Worker 中解封装，再使用 WebCodecs 解码。服务器只需要托管静态文件，不进行转码、封装、索引或代理。

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

## 部署

`pnpm build` 输出 `dist/`。首次使用 GitHub Pages 时，请在仓库 `Settings > Pages > Build and deployment` 将 Source 设置为 `GitHub Actions`，然后重新运行 workflow；后续 push 到 `main` 会自动发布 Pages artifact。若尚未启用 Pages，workflow 会保留构建结果并给出 warning，不会把 CI 标记为失败。Cloudflare Pages 可直接选择该目录手动上传。应用使用相对资源路径，适用于仓库子路径。

## 发布

推送 `v*` tag 或手动运行 `Draft Release` workflow，会构建静态产物并使用 `GITHUB_TOKEN` 创建 GitHub Draft Release。仓库以 MIT License 发布。
