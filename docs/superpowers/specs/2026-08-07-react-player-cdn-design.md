# MX Player Pro React 播放器与 CDN 自包含发布设计

## 1. 目标

本次改造同时解决播放器体验与开发者接入问题：

1. 参考 `D:\Github\MXAnime-CMS\web\src\components\player` 和 `watch-page.css`，使用 React 尽可能复刻内置 MX Player 的视觉与通用交互。
2. 保留当前 TypeScript Matroska 解封装、Web Worker、WebCodecs、Canvas 和 AudioContext 播放内核。
3. 让开发者可以直接通过 jsDelivr、GitHub Pages 或 npm 使用播放器，不需要另外复制 Worker 或 WASM 文件。
4. 修复在线实操中跨域 Worker 无法创建的问题。
5. 同步更新首页参考示例、在线实操初始代码、README、INTEGRATION 和页面说明，确保它们描述当前真实实现。
6. 当前字幕的位置、偏移算法、缩放算法和持久化行为必须保持不变。

## 2. 非目标

- 不引入 Vue 或 Video.js 作为播放内核。
- 不引入服务端转码、代理或媒体上传。
- 不实现依赖 MXAnime-CMS 后端才能工作的业务接口；下一集、清晰度和弹幕只提供可选宿主接口。
- 不修改字幕基准位置、字幕偏移范围、容器单位或现有字幕设置存储键。
- 不承诺 `raw.githubusercontent.com` 可作为浏览器模块入口；推荐 jsDelivr 或 GitHub Pages。

## 3. 已确认的根因

线上 `@cdn` 产物把 Worker 输出为独立的 `assets/demux.worker-*.js`。已发布版本还使用了根相对路径 `/assets/...`，因此 URL 被解析成 `https://cdn.jsdelivr.net/assets/...`，丢失 GitHub 仓库前缀。即使改回相对路径，网页从 jsDelivr 创建远端 Worker 时仍会受到 Worker 入口同源限制。

`wasmBaseUrl` 无法修复该错误，因为浏览器在加载 WASM 前就已经拒绝创建 Worker。

当前 Rust/WASM 模块只提供版本、EBML 魔数探测和一个未进入主要解析流程的 VINT 工具。Tracks、Cues、Cluster、Block、Seek 和字幕解析实际由 TypeScript `MatroskaParser` 完成。因此移除 WASM 不改变当前核心播放能力。

## 4. 总体架构

```text
宿主页面 / React 应用
        |
        v
React MX Player UI
        |
        v
MXPlayer 播放控制器
        |
        +--> 内联 Blob Web Worker --> TypeScript MatroskaParser --> HTTP Range / 本地 File
        |
        +--> WebCodecs --> Canvas + AudioContext
        |
        +--> 原有字幕时间轴与字幕覆盖层
```

播放内核和 UI 使用明确接口通信。UI 不直接解析 MKV，Worker 不依赖 React 或 DOM，字幕继续由媒体时钟驱动。

## 5. React UI 复刻范围

默认的 `new MXPlayer(...)` 自动挂载完整播放器 UI，不再要求普通开发者自己编写控制栏。React 实现以下 MXAnime-CMS 通用体验：

- 黑色播放画布和底部渐变控制层。
- 分层进度条、已播放与缓冲状态、拖动 Seek。
- 播放/暂停、静音、音量、时间显示和全屏。
- 画中画、剧场模式、倍速、音轨与字幕轨选择。
- 设置菜单、播放统计、关于面板和右键菜单。
- 等待、缓冲和播放失败覆盖层。
- 桌面键盘操作、控制栏自动隐藏和移动端紧凑布局。
- 可选的下一集、清晰度和弹幕入口；宿主未提供配置或回调时不渲染。

CMS 专属的 API 数据、用户权限、弹幕提交和剧集路由不复制到播放器仓库。

## 6. 字幕冻结约束

字幕属于本次改造的回归保护区：

- 保留 `.subtitle-overlay` 当前 `bottom: calc(12% + var(--subtitle-offset, 0%))` 基准。
- 保留 `4.6cqh` 字号基准、容器查询单位、左右边距和文本阴影。
- 保留 `clampOffset`、`clampScale`、字体选择和按播放来源保存设置的逻辑。
- 保留字幕编辑时的拖动、缩放和暂停行为。
- UI 重构只能调整控件层级，不得改变字幕层的可见位置。

测试将对字幕样式变量和关键 CSS 声明建立回归断言，并验证相同设置在窗口与全屏中的位置一致。

## 7. CDN 与 Worker 设计

### 7.1 默认：内联 Worker

SDK 构建时把 Worker 程序内联到 JavaScript 产物。运行时由宿主页面创建 Blob URL，再通过 `new Worker(blobUrl, { type: 'module' })` 启动。Worker 不再从 `cdn.jsdelivr.net/assets/` 加载，因此 SDK 可以作为跨域 ES Module 使用。

默认产物不得包含对 `assets/demux.worker-*.js` 的运行时引用。

### 7.2 CSP 回退

部分网站会通过 CSP 禁止 `worker-src blob:`。SDK 增加可选 `workerUrl`：

```ts
new MXPlayer({
  playerElm: '#player',
  url: 'https://example.com/video.mkv',
  workerUrl: '/static/mx-player/demux.worker.js',
})
```

未提供 `workerUrl` 时使用内联 Worker；提供后使用宿主指定的同源 Worker。Worker 创建失败时给出明确错误，指出 CSP 与 `workerUrl` 两种处理方式。

### 7.3 发布入口

发布至少提供：

- `mx-player.js`：普通开发者使用的完整独立版，包含 React UI 运行时和内联 Worker。
- `mx-player.css`：播放器 UI 样式。
- `mx-player-react.js`：React 项目适配器，React/ReactDOM 作为 peer dependency，避免重复打包。
- `mx-player-vue.js`：保留现有 Vue 适配器兼容性，但内部仍使用统一播放器核心，不复制 CMS Vue 实现。

推荐 URL：

```text
https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/mx-player.js
https://player.freeanime.org/sdk/mx-player.js
```

发布流程继续把 `dist-lib` 放入 `cdn` 分支。每个正式版本还要在该产物提交上创建不可变的 `sdk-v<version>` tag，例如 `sdk-v1.2.0`；生产文档使用 `@sdk-v1.2.0`，只把长期可变的 `@cdn` 用于体验最新版。

## 8. WASM 移除与兼容

删除以下实际依赖：

- Rust `mkv-demuxer` crate 和 `wasm-bindgen` 产物。
- `wasm-runtime.ts` 与 Worker 中的动态 WASM 导入。
- `build:wasm`、`wasm-pack` CI 步骤、`dist-lib/wasm` 复制和产物校验。
- 页面中不准确的“Rust/WASM 完整解封装”描述。

EBML 魔数检查由 TypeScript 实现。为减少现有接入代码的立即破坏，`wasmBaseUrl` 在整个 1.x 版本继续作为已废弃、无效果的可选参数存在，在下一次主版本升级时删除；文档和新示例不再展示它。

## 9. 普通 JavaScript 与框架接入

普通网页使用 jsDelivr 的 ES Module 和 CSS：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/mx-player.css">
<div id="player" style="width:100%;aspect-ratio:16/9"></div>
<script type="module">
  import { MXPlayer } from 'https://cdn.jsdelivr.net/gh/Maishan-Inc/MX-Player-Pro@cdn/mx-player.js'

  const player = new MXPlayer({
    playerElm: '#player',
    url: 'https://example.com/video.mkv',
  })
</script>
```

React 项目使用 `mx-player-react.js`，Vue 项目继续使用兼容适配器。三个入口共享相同播放控制器、错误模型和 Worker 工厂。

## 10. 在线实操与参考示例

在线实操初始代码改为最新的完整 UI 用法，并删除手写控制栏与 `wasmBaseUrl`。它应直接演示 jsDelivr 引入，以验证真实的第三方跨域接入场景。

在线实操保持隔离 sandbox。内联 Blob Worker 必须在该环境中通过浏览器集成测试；如果浏览器或 CSP 阻止 Blob Worker，控制台显示可操作错误，而不是建议切换到错误的 CDN Worker 路径。

同步更新：

- `src/components/playground-starter.html`
- `src/components/Playground.tsx` 中的 Worker 错误提示与同源开关逻辑
- `src/components/IntegrationSection.tsx`
- 首页功能介绍和 FAQ
- `README.md`
- `INTEGRATION.md`

所有示例使用同一套参数与推荐 URL，避免首页、在线实操和文档互相矛盾。

## 11. 错误处理

- Worker 创建失败：区分 Blob CSP、显式 `workerUrl` 404 和浏览器不支持模块 Worker。
- 媒体读取失败：继续区分 CORS、Range、401、403 和无效 MKV。
- WebCodecs 不支持：明确提示浏览器兼容性。
- 可选 CMS 功能没有宿主配置时自动隐藏，不产生控制台错误。
- UI 异常不得阻止 Worker、解码器和 Blob URL 在销毁时释放。

## 12. 测试与验收

### 12.1 单元与组件测试

- Worker 工厂默认生成 Blob Worker，传入 `workerUrl` 时使用显式地址。
- TypeScript EBML 探测替代现有 WASM 探测。
- React 控制栏、设置、统计、右键菜单和可选按钮的显示逻辑。
- 键盘、自动隐藏、画中画、剧场和全屏状态同步。
- 字幕关键 CSS、偏移和持久化行为回归。

### 12.2 构建产物检查

- `mx-player.js` 可从跨域 ES Module 加载。
- 默认产物不引用外部 `assets/demux.worker-*.js` 或 `wasm/`。
- `mx-player.css` 和框架适配器进入 `dist-lib`。
- 发布工作流不再安装 Rust 或 wasm-pack。

### 12.3 浏览器集成验证

- 从与页面不同的本地测试源加载 SDK，播放最小 MKV fixture。
- 在在线实操等价的 sandboxed `srcDoc` iframe 中创建 Worker。
- 验证播放、暂停、Seek、音量、全屏、画中画、剧场、设置和销毁。
- 验证字幕在窗口、剧场和全屏切换前后位置不变。
- 验证真实远程媒体仍需要 CORS 和 HTTP Range；这与 SDK/Worker 跨域是不同限制。

最终至少运行：

```bash
pnpm test
pnpm lint
pnpm build
pnpm build:lib
```

## 13. 完成标准

- `new MXPlayer(...)` 默认显示完整 React 播放器 UI。
- jsDelivr 示例不再触发跨域 Worker 错误。
- 开发者无需部署 WASM 或 Worker 文件即可使用默认模式。
- CSP 严格站点可以使用 `workerUrl`。
- 在线实操、参考示例、README、INTEGRATION 与实际 API 一致。
- MXAnime-CMS 中可独立复用的大多数播放器交互已由 React 实现。
- 当前字幕位置和用户已有字幕设置完全保持。

## 14. 演示站点修复补充（2026-08-07）

演示站点的 React 控制层继续采用 CMS 的交互顺序：底部渐变内先放独立、全宽进度条，再放左右控制行。进度条保留已播放/已缓冲两层，并通过与媒体 URL 同源的静音预览 `<video>` 在桌面鼠标悬停时显示目标时间画面；预览不可用时显示时间卡，不影响主播放器。

音量滑块使用显式轨道和已用部分绘制，颜色通过播放器的深浅主题变量提供，避免浏览器原生 range 在透明背景下不可见。移动端继续隐藏音量滑块和进度预览。

在线实操必须引用包含内联 Blob Worker 的 SDK 构建版本。构建验收除检查 `mx-player.js` 不含外置 Worker 入口外，还检查演示 iframe 不再请求 `assets/demux.worker-*.js`；只有显式 `workerUrl` 才允许加载宿主提供的同源 Worker。

## 15. 字幕编辑与轨道摘要补充（2026-08-07）

字幕选择/字体菜单和字幕位置/大小编辑态采用不同的关闭策略：前者在播放器空白处或页面外点击时收起，后者保持锁定，只有“完成”或字幕按钮退出。编辑态使用短示例文本、较窄的自适应线框和上下拖柄，并把低于上半区的初始位置提升后再允许拖动；拖动结果继续写入原有字幕样式存储。

播放器状态栏右侧显示实际视频与音频 codec 摘要，例如 `H.265/HEVC · AAC · 2ch`，不再显示无差别的“视频 · 音频”。未知轨道使用原始 Matroska codec id 作为回退文本。
