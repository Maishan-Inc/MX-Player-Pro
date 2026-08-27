# MX Player Pro m3u8/HLS 播放支持开发设计

日期：2026-08-27  
状态：方案确认后实施

## 1. 背景

当前播放器只支持 Matroska（MKV）文件：页面通过 HTTP Range 或本地 File 读取字节，在 Worker 中解析 EBML，再使用 WebCodecs 解码并绘制到 Canvas。

m3u8 不是一种视频容器，而是 HLS 播放列表。它可能引用 MPEG-TS 或 fragmented MP4 分片，也可能是 master playlist、直播 playlist、加密密钥和 WebVTT 字幕。它不能直接交给当前 `RangeLoader` 或 `MatroskaParser` 处理。

本次改造在保留 MKV 播放链路的同时，增加 HLS 播放后端。两条后端共享现有控制界面、SDK 方法和事件模型。

## 2. 目标

1. 支持远程 `.m3u8` URL 的 HLS VOD 和直播播放。
2. Safari/iOS 使用原生 HLS，Chrome、Edge、Firefox 和 Android Chrome 使用 `hls.js` + MSE。
3. 支持 master playlist 的自动清晰度切换和手动清晰度选择。
4. 支持 HLS 音频轨和 WebVTT 字幕轨的基础切换。
5. 复用当前播放器的播放、暂停、Seek、音量、倍速、全屏、剧场模式、统计和事件 API。
6. 保证现有 MKV 行为、字幕样式、SDK 接入方式和构建产物不回归。
7. 统一处理网络错误、媒体错误、CORS 错误和播放器销毁时的资源释放。

## 3. 非目标

- 第一版不实现 DRM（FairPlay、Widevine、PlayReady）和许可证服务器协议。
- 第一版不在浏览器中使用 FFmpeg/WASM 转码。
- 第一版只保证远程 m3u8 URL，不承诺本地 m3u8 File；本地 playlist 的相对分片解析另行设计。
- 不改变 MKV 的 Worker、EBML、WebCodecs 和字幕实现。
- 不在播放器部署服务器上代理媒体。playlist、分片、密钥和字幕仍由浏览器直连源站。
- 不保证浏览器支持的编码范围之外的 HEVC、AV1、AC-3 等编码；实际能力由浏览器和设备决定。

## 4. 方案选择

### 4.1 推荐：原生 HLS + hls.js fallback

HLS 后端以 `HTMLVideoElement` 为输出目标：

```text
HLS URL
  |
  +-- Safari/iOS: <video src="...m3u8">
  |
  +-- MSE 浏览器: hls.js -> MediaSource -> <video>
                                      |
                                      +-> 当前控制栏和状态事件
```

原生 HLS 适用于 Safari、iPhone 和 iPad；其他浏览器通过 hls.js 解析 playlist、下载分片并复用浏览器的 MSE 解码能力。该方案不需要重新实现 TS/fMP4 解复用，也不影响现有 MKV WebCodecs 内核。

### 4.2 不采用：FFmpeg/WASM 浏览器转码

FFmpeg/WASM 会显著增加包体积、内存占用和启动时间，还需要自行维护分片下载、时间戳、直播窗口和音视频同步。除非未来必须支持浏览器原生能力之外的编码，否则不采用。

### 4.3 服务端转码作为后续兜底

如果产品以后需要 DRM、特殊编码、鉴权代理或统一转码，可以增加服务端 HLS 转发/转码服务。但它属于部署架构变化，不纳入本次客户端改造。

## 5. 公开 API 设计

### 5.1 来源类型

在 `src/types.ts` 增加格式字段，保持现有 `{ kind: 'url', url }` 调用兼容：

```ts
export type MediaFormat = 'auto' | 'mkv' | 'hls'

export type SourceDescriptor =
  | { kind: 'file'; file: File; format?: 'mkv' }
  | { kind: 'url'; url: string; format?: MediaFormat }
```

`format` 省略时使用自动识别；业务方知道 URL 是 HLS 时建议显式传 `format: 'hls'`，避免无扩展名或签名 URL 误判。

### 5.2 播放器选项

在 `MXPlayerOptions`、React props 和 Vue props 增加：

```ts
format?: MediaFormat
hls?: {
  lowLatencyMode?: boolean
  withCredentials?: boolean
  maxBufferLength?: number
}
```

`MXPlayerOptions.format` 只影响构造时的 `url`；`SourceDescriptor.format` 优先级更高，供 `load()` 换源使用。

第一版不直接暴露完整 `HlsConfig`，避免把内部依赖类型泄露到公共 API。确有需要的配置通过上述稳定字段提供。

使用示例：

```ts
const player = new MXPlayer({
  playerElm: '#player',
  url: 'https://media.example.com/series/master.m3u8',
  format: 'hls',
  autoplay: false,
})

await player.load({
  kind: 'url',
  url: 'https://media.example.com/live/index.m3u8',
  format: 'hls',
})
```

React：

```tsx
<MXPlayerReact
  url="https://media.example.com/master.m3u8"
  format="hls"
  hls={{ lowLatencyMode: true }}
/>
```

### 5.3 兼容性约束

- `file` 来源仍只接受 MKV；拖放校验继续拒绝 m3u8 文件。
- 现有 `play`, `pause`, `toggle`, `seek`, `setVolume`, `setMuted`, `setPlaybackRate`, `getState` 和事件名称保持不变。
- `getTracks()` 对 HLS 返回播放器能识别的音频、视频和字幕轨道；轨道 ID 在当前来源生命周期内稳定即可，不要求与 MKV 轨道号相同。

## 6. 内部架构

### 6.1 播放后端接口

新增 `src/lib/playback-backend.ts`，定义 UI 所需的最小后端接口：

```ts
export type BackendKind = 'mkv' | 'hls'

export interface BackendSnapshot {
  ready: boolean
  playing: boolean
  currentTime: number
  duration: number
  bufferedStart: number
  bufferedEnd: number
  bufferedAhead: number
  stalled: boolean
  live: boolean
}

export interface PlaybackBackend {
  readonly kind: BackendKind
  load(source: SourceDescriptor): Promise<void>
  play(): Promise<void>
  pause(): void
  seek(time: number): void
  setVolume(value: number): void
  setMuted(value: boolean): void
  setPlaybackRate(rate: number): void
  getSnapshot(): BackendSnapshot
  getTracks(): TrackInfo[]
  requestPictureInPicture(): Promise<void>
  destroy(): void
}
```

现有 Worker/`WebCodecsEngine` 逻辑可先由 MKV 适配器包装；HLS 使用新建的 `HlsBackend`。`PlayerSurface` 只依赖后端接口，不再直接假定一定存在 Canvas、Worker 或 WebCodecs。

### 6.2 后端选择

新增 `src/lib/media-format.ts`：

1. 显式 `source.format` 不为 `auto` 时直接采用。
2. 去除 URL 的 query/hash 后检查 `.m3u8` 后缀。
3. 可选地对允许 CORS 的 URL 做 HEAD，并识别 `application/vnd.apple.mpegurl`、`application/x-mpegURL`。
4. 无法确认时回退到 MKV，保持现有 URL 行为。

不应为了格式识别先下载完整 playlist；HLS 后端本身会负责实际加载。显式 `format: 'hls'` 是无扩展名 URL 的可靠路径。

### 6.3 PlayerSurface 渲染

保留 Canvas，并增加 HLS Video 元素：

```tsx
<canvas ref={canvasRef} className={`video-canvas ${backendKind === 'mkv' ? '' : 'is-hidden'}`} />
<video
  ref={hlsVideoRef}
  className={`video-element ${backendKind === 'hls' ? '' : 'is-hidden'}`}
  playsInline
  preload="auto"
/>
```

两种元素共享同一个 `.player-frame` 和覆盖层。HLS 不应把 Video 绘制到 Canvas，否则会失去浏览器原生媒体管线、硬件解码和原生 HLS 能力。

新增 CSS：

```css
.video-element { display: block; width: 100%; height: 100%; object-fit: contain; background: #000; }
.video-element.is-hidden, .video-canvas.is-hidden { display: none; }
```

## 7. HlsBackend 详细设计

### 7.1 初始化策略

`HlsBackend` 接收一个由 `PlayerSurface` 创建的 `<video>` 元素和 HLS 选项。

```ts
const nativeHls = video.canPlayType('application/vnd.apple.mpegurl') !== ''
const mseSupported = typeof MediaSource !== 'undefined' && Hls.isSupported()
```

选择顺序：

1. 原生 HLS 可用时设置 `video.src = url`，监听标准媒体事件。
2. 否则使用 `new Hls(config)`，调用 `attachMedia(video)` 和 `loadSource(url)`。
3. 两者均不可用时抛出 `HLS_UNSUPPORTED`。

hls.js 作为生产依赖加入 `package.json`。standalone SDK 需要将其打入 `mx-player.js`，React/Vue 入口与 standalone 保持相同运行时行为。第一版采用静态 import，避免 CDN 用户还需自行解析动态 chunk；后续再评估按需加载。

### 7.2 hls.js 配置

默认配置：

```ts
{
  enableWorker: true,
  lowLatencyMode: options.lowLatencyMode ?? false,
  backBufferLength: 90,
  maxBufferLength: options.maxBufferLength ?? 30,
  xhrSetup(xhr) {
    xhr.withCredentials = options.withCredentials ?? false
  }
}
```

`lowLatencyMode` 只建议用于直播。不要默认打开，VOD 使用普通 buffer 策略更稳定。

### 7.3 标准媒体事件映射

| Video 事件 | 后端事件/状态 |
| --- | --- |
| `loadedmetadata` | `ready`，读取 duration、video/audio 轨道 |
| `canplay` | ready 保持，清除 loading 状态 |
| `playing` | `play`，`stalled = false` |
| `pause` | `pause` |
| `timeupdate` | `timeupdate` |
| `progress`、`durationchange` | 更新缓冲和 duration |
| `waiting`、`stalled` | `stalled = true` |
| `canplay`、`playing` | `stalled = false` |
| `ended` | VOD 发送 `ended`；直播不应因短暂窗口变化误报 |
| `error` | 转换为 `HLS_MEDIA_ERROR` 并交给统一错误解释器 |

缓冲计算使用 `video.buffered` 中包含当前时间的 TimeRange；直播时 `bufferedAhead` 仍表示距离当前播放点的秒数。

### 7.4 hls.js 事件映射

- `MANIFEST_PARSED`：建立视频、音频和字幕轨道，触发 ready。
- `LEVEL_LOADED`：更新 live/VOD、目标延迟和 seekable 范围。
- `LEVEL_SWITCHED`：同步清晰度状态并触发 `qualitychange`。
- `AUDIO_TRACKS_UPDATED`：更新音频轨道列表。
- `SUBTITLE_TRACKS_UPDATED`：更新 WebVTT 字幕列表。
- `ERROR`：按 `fatal`、`NETWORK_ERROR`、`MEDIA_ERROR` 分类处理。

### 7.5 错误恢复

```ts
if (data.fatal) {
  switch (data.type) {
    case Hls.ErrorTypes.NETWORK_ERROR:
      hls.startLoad()
      break
    case Hls.ErrorTypes.MEDIA_ERROR:
      hls.recoverMediaError()
      break
    default:
      fail('HLS_FATAL_ERROR')
  }
}
```

只允许有限次数的自动恢复，避免网络异常时无限循环。建议单次来源最多恢复 3 次；超过次数显示重试按钮。销毁或换源后必须取消重试定时器并调用 `hls.destroy()`。

## 8. 直播与时间轴

### 8.1 VOD

- 使用有限 `video.duration`。
- 进度条范围为 `0..duration`。
- 播放到末尾发送 `ended`。
- 支持按时间跳转和进度预览。

### 8.2 直播

- `duration` 对外可返回 `Infinity` 或 0，但 UI 不显示伪造的总时长。
- Seek 只允许落在 `video.seekable.start(0)..video.seekable.end(last)`。
- 进度条显示直播窗口，不使用普通 VOD 百分比算法。
- 不显示“播放完成”；断线时进入 stalled 状态并尝试恢复。
- 直播延迟、追赶直播边缘和 DVR 窗口属于后续增强，不在 MVP 中增加复杂控制。

`MXPlayerState.duration` 仍保持 number 类型；UI 的 `formatTime` 必须能处理非有限值并显示 `LIVE`。

## 9. 清晰度、音频和字幕

### 9.1 清晰度

hls.js 的 `levels` 映射到现有 `qualities` UI：

- `auto` 对应 `currentLevel = -1`。
- 手动选择对应 level index。
- 原生 HLS 无法统一读取所有设备的 level 列表时，隐藏手动清晰度菜单或只显示自动。

### 9.2 音频轨

hls.js 使用 `audioTrack` 切换；原生 HLS 使用 `video.audioTracks`（浏览器支持时）。如果浏览器没有暴露音频轨列表，播放器仍播放默认轨，但不显示切换菜单。

### 9.3 WebVTT 字幕

第一版读取 hls.js 的 subtitle tracks，并通过 `video.textTracks` 或转换后的 cue 驱动现有 `.subtitle-overlay`。字幕格式只承诺 WebVTT；SRT/ASS 仍由 MKV 内嵌字幕路径处理。

HLS 字幕不得复用 Matroska 的 `select-track` Worker 请求。切换只在 HLS 后端完成，并清理旧的 TextTrack/cue 监听器。

## 10. PlayerSurface 状态改造

当前 `PlayerSurface` 需要从“创建 Worker”改为“创建后端”：

1. source 变化时递增 epoch，销毁旧后端。
2. 根据格式选择 `MkvBackend` 或 `HlsBackend`。
3. 将后端事件转换为现有 React state 和 SDK 回调。
4. 控制方法统一调用 `backendRef.current`。
5. 仅 MKV 后端创建 Worker、WebCodecsEngine 和 Canvas pump。
6. HLS 后端使用标准媒体时钟，不运行 MKV 的 `pump()`。
7. 销毁时释放 hls.js、Video src、MediaSource、Worker、AudioContext、Canvas captureStream 和定时器。

字幕菜单、统计面板和控制栏的字段应根据 `backend.kind` 显示：HLS 不显示 MKV EBML/Range 专属信息，统计中展示 HLS 模式、live 状态、当前 level 和缓冲范围。

## 11. 错误模型

在 `src/lib/playback-error.ts` 增加：

- `HLS_UNSUPPORTED`：当前浏览器不支持原生 HLS 或 MSE。
- `HLS_MANIFEST_ERROR`：playlist 无法读取或格式无效。
- `HLS_NETWORK_ERROR`：playlist/分片/密钥请求失败。
- `HLS_MEDIA_ERROR`：分片编码或浏览器解码失败。
- `HLS_CORS_BLOCKED`：playlist 或分片被 CORS 拦截。
- `HLS_FATAL_ERROR`：自动恢复失败。

错误提示需要区分“SDK/Worker 跨域”和“媒体资源 CORS”。HLS 的每个分片、密钥和字幕 URL 都可能触发 CORS，不能只检查主 m3u8 响应。

## 12. 服务端接入要求

媒体服务器必须对 playlist、分片、字幕和密钥统一配置 CORS。典型响应：

```http
Access-Control-Allow-Origin: https://your-site.example
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Allow-Credentials: true
```

使用 Cookie 时不能使用 `Access-Control-Allow-Origin: *`。带自定义 Authorization header 的方案可能触发 OPTIONS 预检，源站必须正确响应预检请求。

还需确认：

- m3u8 的 `Content-Type` 为 `application/vnd.apple.mpegurl` 或 `application/x-mpegURL`。
- 分片 MIME 类型正确（`video/mp2t` 或 `video/mp4`）。
- 签名 URL 在 playlist 引用的分片和密钥上仍然有效。
- HTTPS 页面不要加载 HTTP playlist 或分片，避免混合内容阻止。
- 直播 playlist 的刷新请求不能被过短缓存时间或 CDN 错误缓存破坏。

## 13. 文件改动清单

预计涉及以下文件：

| 文件 | 改动 |
| --- | --- |
| `src/types.ts` | `MediaFormat`、来源格式字段、HLS 轨道元数据 |
| `src/player-api.ts` | `format`、`hls` 选项类型 |
| `src/lib/media-format.ts` | 格式识别和 URL 规范化 |
| `src/lib/playback-backend.ts` | 后端接口和公共快照类型 |
| `src/lib/mkv-backend.ts` | 包装现有 Worker/WebCodecs 播放逻辑 |
| `src/lib/hls-backend.ts` | 原生 HLS、hls.js、事件和恢复策略 |
| `src/components/PlayerSurface.tsx` | 后端选择、Video 元素、统一控制和状态 |
| `src/player.css` | HLS Video 元素和直播进度样式 |
| `src/react/MXPlayerReact.tsx` | 透传 `format`、`hls` |
| `src/sdk/MXPlayer.ts` | 构造和 `load()` 传递格式配置 |
| `src/vue/MxPlayer.ts` | Vue props 与监听同步 |
| `src/lib/playback-error.ts` | HLS 错误解释 |
| `vite.config.ts`、`package.json` | hls.js 依赖和 SDK 构建配置 |
| `README.md`、`INTEGRATION.md` | HLS 接入、CORS、浏览器兼容和 DRM 边界 |
| `docs/superpowers/specs/...` | 本设计和后续实施记录 |

不修改 `src/worker/ebml.ts`、`src/worker/demux.worker.ts` 和现有 MKV parser，除非适配器抽取需要移动代码。

## 14. 测试计划

### 14.1 单元测试

- `media-format.spec.ts`：显式格式、大小写扩展名、query/hash、无扩展名回退。
- `hls-backend.spec.ts`：原生 HLS 分支、hls.js 分支、媒体事件、缓冲计算、直播 duration、销毁和重复换源。
- 错误映射：manifest、network、media、CORS、fatal recovery。
- 清晰度映射：auto、level label、level 切换事件。
- 轨道映射：视频、音频、WebVTT 字幕。
- 现有所有 MKV、WebCodecs、字幕和 RangeLoader 测试必须继续通过。

### 14.2 浏览器集成测试

准备最小测试源：

1. VOD master playlist，包含 H.264/AAC 和多清晰度。
2. MPEG-TS 分片 VOD。
3. fMP4 分片 VOD。
4. 直播 playlist，支持窗口刷新和短暂断网恢复。
5. 带 WebVTT 字幕和多个音频轨的 master playlist。
6. 故意缺少 CORS、失效签名和无效分片的错误源。

测试矩阵：

| 浏览器 | 预期后端 |
| --- | --- |
| Safari macOS | 原生 HLS |
| iOS Safari | 原生 HLS |
| Chrome/Edge | hls.js + MSE |
| Firefox | hls.js + MSE（以实际版本能力为准） |
| Android Chrome | hls.js + MSE |

每个浏览器至少验证加载、播放、暂停、Seek、缓冲、清晰度切换、全屏、Picture-in-Picture、换源和销毁。

### 14.3 构建检查

执行：

```bash
pnpm test
pnpm lint
pnpm build
pnpm build:lib
```

检查 standalone 产物可直接从 CDN ES Module 导入，hls.js 不产生未发布的动态 chunk；React/Vue 入口不出现裸依赖错误；`dist-lib` 中仍生成 `mx-player.js`、`mx-player-react.js`、`mx-player-vue.js`、`mx-player-worker.js` 和 `mx-player.css`。

## 15. 实施阶段与验收标准

### 阶段一：MVP 播放链路

- 支持远程 HLS VOD。
- 原生 HLS 与 hls.js fallback 正常工作。
- 现有控制栏和 SDK 方法可用。
- MKV 全量回归通过。

### 阶段二：直播与清晰度

- 支持直播 playlist 刷新、stalled 状态和网络恢复。
- 支持 master playlist 清晰度菜单。
- 统计面板区分 HLS/VOD/live 和缓冲范围。

### 阶段三：轨道与文档

- 支持音频轨和 WebVTT 字幕轨。
- React、Vue、原生 JS 的示例和类型同步。
- README/INTEGRATION 写明 CORS、编码、浏览器和 DRM 限制。

### 完成标准

- 传入 `.m3u8` 或 `format: 'hls'` 后不再启动 MKV Worker。
- HLS 播放不依赖 WebCodecs 或 Canvas 解码路径。
- 换源、销毁和重复挂载无 Worker、hls.js、MediaSource 或事件监听泄漏。
- VOD 的 `ready/timeupdate/ended` 和直播的 `ready/timeupdate/stalled` 语义稳定。
- 清晰度选择不破坏播放位置；网络错误经过有限次数恢复后给出可操作错误。
- Safari/iOS、Chrome/Edge、Firefox 的目标测试通过。
- 现有 MKV 功能、字幕样式和公开 API 不回归。

## 16. 发布与回滚

`hls.js` 首次加入属于运行时能力扩展，但不会改变现有 MKV URL 的解析选择。发布前先在演示站点增加一个固定的 HLS 测试地址，观察 standalone CDN 包体积和错误率。

建议使用小版本发布，保留旧 SDK tag。若 HLS 后端出现问题，可通过 `format: 'mkv'` 强制旧链路，或回滚 CDN 分支到上一版本；现有 MKV 用户不需要更改调用代码。

## 17. 后续增强

- 低延迟 HLS 的 live edge、追赶播放和延迟显示。
- EME/DRM 适配和许可证回调。
- 本地 m3u8 File 与相对 URI 解析。
- 可选动态加载 hls.js，降低只播放 MKV 用户的首屏包体积。
- 服务端代理/鉴权适配器，但必须明确数据隐私和部署边界。
