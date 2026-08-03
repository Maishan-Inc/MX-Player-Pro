# MX-Player Pro 纯客户端 MKV 播放器设计

日期：2026-08-03
状态：已确认，待实施计划

## 1. 目标与范围

本项目提供一个可部署到 GitHub Pages 和 Cloudflare Pages 的纯静态 MKV 播放器。服务器只托管前端资源；浏览器直接读取本地文件或云端可下载 URL，不执行转码、封装、索引或代理。

首个 MVP 的验收范围：

- 本地 `.mkv` 文件与云端直接下载型 URL。
- HTTP Range 分片读取；本地文件通过 `File.slice()` 使用相同抽象。
- Rust `wasm-bindgen` Matroska 解封装运行在 Web Worker 中。
- H.264 视频、AAC 音频和 SRT 字幕。
- WebCodecs `VideoDecoder`/`AudioDecoder`，Canvas 视频渲染和 AudioContext 音频输出。
- 基础 Cue/顺序 Seek、暂停、音量、倍速、全屏、音轨/字幕选择。
- MXAnime-CMS MX-Player 风格的黑白主题和移动端布局。
- GitHub Actions 构建检查、Pages 产物和开源 Draft Release。

首版明确不包含 ASS/SSA、PGS/VobSub、HDR/WebGPU 优化和 FFmpeg.wasm 回退；这些作为后续阶段的扩展点。

## 2. 设计原则

- 解析和解封装完全在 Worker 中完成，UI 线程不读取 MKV 字节。
- 解码使用浏览器 WebCodecs，优先硬件加速。
- 依赖边界清晰：输入读取、容器解析、轨道管理、解码渲染和字幕互相独立。
- 资源不上传；URL 和本地播放位置只保存在浏览器 `localStorage`。
- 不绕过浏览器同源安全策略，不提供服务器代理。

## 3. 系统架构

### 3.1 输入与 RangeLoader

`MediaSource` 统一描述两种输入：

```ts
type SourceDescriptor =
  | { kind: 'file'; file: File }
  | { kind: 'url'; url: string; headers?: Record<string, string> }
```

云端 URL 必须指向可直接下载 MKV 的资源，可包含查询参数。加载器先尝试 `HEAD` 获取大小和 `Accept-Ranges`，然后用 `GET` + `Range: bytes=start-end` 读取 4--8 MiB 分片。响应必须是可读取的 `206 Partial Content`，并包含可解析的 `Content-Range`；不满足时返回诊断错误。

远程 URL 还必须允许前端来源的 CORS。由于项目是纯静态部署，页面无法为第三方资源补充 CORS；UI 要把 CORS、Range、响应类型和状态码分别展示给用户。

### 3.2 DemuxWorker 与 Rust WASM

Worker 初始化后加载 Rust `wasm-bindgen` 模块，解析 EBML Header、Info、Tracks、Cues、Cluster、SimpleBlock 和 BlockGroup。解析器不依赖 DOM，只接收读取请求的字节响应并输出标准化数据。

```ts
interface MKVPacket {
  trackId: number
  timestamp: number
  duration: number
  key: boolean
  data: Uint8Array
}

interface TrackInfo {
  id: number
  kind: 'video' | 'audio' | 'subtitle'
  codecId: string
  codecPrivate?: ArrayBuffer
  language?: string
  name?: string
  width?: number
  height?: number
  frameRate?: number
  sampleRate?: number
  channels?: number
}
```

Worker 与主线程使用显式消息协议：

```ts
type DemuxRequest =
  | { type: 'init'; source: SourceDescriptor }
  | { type: 'read'; offset: number; length: number }
  | { type: 'seek'; time: number }
  | { type: 'select-track'; kind: TrackInfo['kind']; trackId: number }
  | { type: 'close' }

type DemuxEvent =
  | { type: 'metadata'; tracks: TrackInfo[]; duration: number }
  | { type: 'packets'; packets: MKVPacket[] }
  | { type: 'progress'; phase: string; value: number }
  | { type: 'error'; code: string; message: string }
  | { type: 'eof' }
```

Packet 的 `data` 使用 Transferable `ArrayBuffer` 传输，避免复制。Worker 负责预读和队列水位，不创建解码器。

### 3.3 TrackManager

TrackManager 选择一个视频、一个音频和可选字幕轨，保存解码配置，并将 Matroska CodecID 映射到 WebCodecs 配置。例如：

- `V_MPEG4/ISO/AVC` -> `avc1.*`，根据 CodecPrivate 生成 description 或 Annex-B 转换配置。
- `V_MPEGH/ISO/HEVC` -> `hvc1.*`，只在 `isConfigSupported()` 成功时启用。
- `A_AAC` -> `mp4a.40.2`，使用 CodecPrivate 的 AudioSpecificConfig。
- `S_TEXT/UTF8` -> SRT 字幕轨。

切换视频或音频轨时暂停解码、清空待处理队列、重新配置对应解码器并从最近关键帧恢复。字幕切换只影响 overlay。

### 3.4 解码与渲染

主线程启动 `VideoDecoder` 和 `AudioDecoder`，并在配置前调用 `isConfigSupported()`。视频输出 `VideoFrame` 后绘制到 Canvas，完成后立即 `close()`。音频输出转换为 AudioData，写入 AudioWorklet 或 AudioContext 播放队列。

音频时钟作为主时钟：视频帧按媒体时间戳与 `AudioContext.currentTime` 比较，允许小范围丢帧或等待，避免长期漂移。没有可用音频时使用显式单调时钟播放视频。

### 3.5 字幕

MVP 解析 `S_TEXT/UTF8` 为带起止时间的 cue，使用绝对定位的透明 HTML overlay，独立于 Canvas。ASS/SSA 和图形字幕轨显示为不可用，不影响音视频播放。

## 4. 页面和交互

首页包含本地文件拖拽/选择区和云端 URL 输入区。URL 输入支持下载型链接和查询参数，开始前展示文件大小、CORS、Range、Content-Type 检查结果。成功解析后显示轨道摘要，再进入播放器工作区。

播放器沿用 MX-Player 的纯黑/纯白变量和紧凑控制栏，包含播放/暂停、进度、音量、倍速、全屏、画中画（浏览器支持时）、音轨和字幕选择、诊断信息。桌面端支持键盘操作，移动端控制栏不溢出。

公开控制接口：

```ts
play(): Promise<void>
pause(): void
seek(time: number): Promise<void>
setVolume(value: number): void
setPlaybackRate(value: number): void
selectAudioTrack(trackId: number): void
selectSubtitleTrack(trackId: number | null): void
```

## 5. 错误、性能与兼容性

- 启动检测 `VideoDecoder`、`AudioDecoder`、`VideoFrame`、`OffscreenCanvas` 等能力。
- 解码配置不通过 `isConfigSupported()` 时，轨道显示不可用并说明编解码器。
- Range/CORS/HTML 响应、损坏 EBML、WASM panic、无关键帧和解码器错误均使用稳定错误代码。
- Range 默认 8 MiB，维护两个预取窗口；消费过的 Cluster 和 VideoFrame/AudioData 及时释放。
- 解码队列采用低水位/高水位，避免长视频一次性载入；Seek 优先 Cues，缺失时顺序扫描并缓存 Cluster 索引。
- 目标是 1080p H.264 播放时内存不随时长线性增长；不支持硬件解码时提示性能风险。

## 6. 测试与验收

TypeScript 测试覆盖 Range 合并/重试、URL 探测、Codec 映射、SRT 时间轴和 Worker 消息。Rust 测试覆盖 EBML Header/Tracks、Block、Cues 与 H.264/AAC CodecPrivate。浏览器集成测试使用小型 H.264/AAC/SRT fixture，验证导入、轨道列表、播放、暂停、Seek、字幕切换和错误态。

MVP 验收必须在 Chromium 最新稳定版完成：导入本地 MKV、输入云端下载 URL、显示轨道信息、流畅播放 1080p H.264/AAC、拖动 Seek、开关 SRT。跨域资源若未提供 CORS/Range 时，必须出现可理解的诊断提示。

## 7. 部署与开源发布

项目只生成静态 `dist`，不包含服务端代码。GitHub Pages 工作流发布构建 artifact；Cloudflare Pages 使用同一 `dist` 手动上传。SPA 使用相对资源路径，并提供 Pages 路由回退策略。

仓库包含 MIT `LICENSE`、README、贡献指南、隐私说明和浏览器兼容矩阵。GitHub Actions 在 PR/push 执行 lint、测试、Rust WASM 构建和 `pnpm build`。手动 `workflow_dispatch` 或版本 tag 触发发布任务，打包 `dist` 与 WASM 产物，生成变更摘要并使用 `GITHUB_TOKEN` 创建 Draft Release。

## 8. 后续阶段

1. 音频队列与 A/V 同步稳定化。
2. Cues/Cluster 索引缓存和大文件 Seek 优化。
3. ASS/SSA、PGS/VobSub 字幕支持。
4. WebGPU、HDR 色彩空间、性能面板和更完善的兼容回退。
