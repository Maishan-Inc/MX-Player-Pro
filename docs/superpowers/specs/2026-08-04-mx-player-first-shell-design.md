# MX Player First-Screen Shell and Subtitle Controls

日期：2026-08-04  
状态：已确认设计，待实现

## 1. 目标

将 MX-Player-Pro 的默认入口改成播放器优先的工作界面，复用现有 Worker、Matroska 解析器、RangeLoader 和 WebCodecs 解码链路。页面需要让用户打开后即可拖入本地 MKV 或粘贴远程 MKV 地址，不再先经过营销型 Hero 或独立媒体信息侧栏。

## 2. 页面结构

顶部导航从左到右包含 Freeanime 链接（`https://freeanime.org`）、Limitless Search 链接（`https://search.freeanime.org`）；右侧组合品牌标识 `FREEANIME.ORG ×` 与 `maishan-on-dark.png`，最右侧为 MX-Player-Pro GitHub 链接（`https://github.com/Maishan-Inc/MX-Player-Pro`）。

主内容以大尺寸、居中的播放器框为第一视觉入口。未加载媒体时播放器框是可拖放区域，拖入 `.mkv` 文件后立即创建本地源并开始解析；保留文件选择按钮作为辅助入口。播放器下方放置远程 URL 输入和播放动作，支持 Enter 提交，并保留 URL 校验与最近地址保存。

播放器下方展示三项简短能力说明：Range 按需读取、VideoDecoder/AudioDecoder 硬件解码、文件和链接仅在本机处理。底部版权固定为：`Powered by MXPlayer Pro © 2026 Maishan Inc. · MIT License`。

播放状态下移除右侧媒体信息面板，播放器使用横向空间；诊断和媒体信息通过右键菜单的统计弹窗访问。

## 3. 播放器交互

播放器控制栏沿用当前 WebCodecs 控制实现，并补齐 MXAnime-CMS 默认 MxPlayer 的交互语义：

- 单击播放器表面播放/暂停，双击播放器表面切换全屏。
- 空格播放/暂停，左右方向键与 J/L 快进后退，M 静音，F 全屏，上下方向键调节音量。
- 桌面右键和移动端长按打开定位在播放器边界内的自定义菜单，Escape 关闭，方向键在菜单项间移动。
- 菜单提供“播放器统计”和“关于 MX Player”。统计弹窗展示当前源、HTTP/CORS/Range 探测、轨道和解码器状态；关于弹窗展示版本和本地解码说明。
- 保留设置、字幕、剧场模式、全屏、音量和倍速控制；不引入弹幕或服务端统计功能。

## 4. 内嵌字幕分析与选择

metadata 阶段按 `TrackInfo` 分析字幕轨道的轨道号、语言、名称和 CodecID，并在字幕按钮或设置菜单中显示可读标签。字幕选择项包含“关闭”和所有可用内嵌字幕轨；当前只支持 Matroska `S_TEXT/UTF8` 字幕，其他字幕 CodecID 显示为不可用或不加入可选列表。

选择字幕时向 Worker 发送 `select-track`，清空旧 cue 和渲染状态，只接受当前字幕轨的数据。cue 按媒体时间戳显示在 Canvas 上方，字幕开关和轨道选择不会重置视频解码器。未选择字幕时不显示字幕 overlay。

## 5. 组件与数据流

- `App` 负责播放器优先首页、拖放/文件选择、URL 输入、品牌导航和能力说明。
- `PlayerSurface` 负责播放器渲染、控制栏、右键菜单、统计/关于弹窗、字幕选择和源生命周期；播放后不再渲染右侧媒体信息栏。
- `RangeLoader`、`MatroskaParser`、`demux.worker`、`WebCodecsEngine` 保持现有边界。字幕只通过现有 `MKVPacket` 数据流进入主线程。
- 品牌位图复制到 `public/brands/maishan-on-dark.png`，使用静态 `/brands/maishan-on-dark.png` 路径，不依赖 MXAnime-CMS 运行时。

## 6. 错误与兼容

拖入非 MKV 文件时在播放器外显示输入错误，不启动 Worker。URL 必须是 HTTP(S)；CORS、HTTP 错误、Range 探测和 MKV/解码错误继续显示在播放器错误层，并可从统计弹窗查看详细信息。无字幕轨时隐藏字幕选择入口；无 WebCodecs 时保留当前能力提示。

页面在桌面端保持播放器居中并限制最大宽度，移动端播放器全宽、控制栏不溢出，顶部导航和品牌在窄屏下允许折叠/换行但不遮挡 GitHub 入口。

## 7. 测试与验收

- TypeScript 检查、现有单元测试和生产构建必须通过。
- 新增字幕轨标签/选择状态测试，以及拖放本地文件和 URL Enter 提交流程的组件级测试（若当前测试环境无法渲染 Worker，则测试消息和状态边界）。
- 手工验收：空首页可见大播放器；拖入 MKV 可直接进入解析；URL Enter 可开始播放；字幕菜单列出内嵌轨并可关闭/切换；右键菜单可打开统计和关于；顶部三个外链与组合 Logo 正确；底部版权文本准确。
