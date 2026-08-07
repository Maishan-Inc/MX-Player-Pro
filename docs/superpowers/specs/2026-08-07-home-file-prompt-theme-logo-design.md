# 首页文件提示与双主题 Logo 设计

## 目标

调整演示首页的两个视觉区域：

1. 把空播放器中央的 `MX PLAYER PRO` 纯文字替换为清晰的文件选择提示。
2. 顶部合作品牌区域根据深浅主题使用真正对应的 Maishan Logo 图片。

本次不修改播放器播放内核、在线实操、SDK API 或字幕布局。

## 空播放器提示

保留现有 `<label>`、隐藏文件输入框、单个 MKV 文件选择和拖拽处理逻辑，仅替换中央可见内容。

中央提示采用 Lucide `FileUp` 图标，结构为：

- 文件上传图标。
- 主文案：`拖入 MKV 文件`。
- 次文案：`或点击选择文件`。

整个黑色视频区域仍可点击，点击后打开系统的单文件选择窗口；继续只接受 `.mkv` 和 `video/x-matroska`。拖入文件时沿用现有校验和播放入口。

默认、悬停和拖拽状态继续使用当前黑色视频画布。悬停时图标、边框与提示文字增强；拖拽进入时保留现有轻微缩放，并让上传图标获得更明显的强调。移动端缩小图标和字号，但保留两行提示。

## 深浅主题 Logo

保留现有 `public/brands/maishan-on-dark.png` 作为深色主题资源。

把用户提供的 `C:\Users\Administrator\Desktop\MAISHAN-hei-logo.png` 复制为：

```text
public/brands/maishan-on-light.png
```

`SiteHeader` 根据现有 `theme` prop 直接选择资源：

- `dark`：`maishan-on-dark.png`
- `light`：`maishan-on-light.png`

删除浅色主题对 Logo 使用 `filter: invert(1)` 的规则，避免颜色、边缘和透明度被滤镜改变。Logo 的尺寸、链接、替代文字和移动端布局保持不变。

## 可访问性

- 文件区域继续由关联的文件输入框提供原生键盘与点击行为。
- `FileUp` 图标为装饰元素，设置 `aria-hidden="true"`。
- `<label>` 的 `aria-label` 更新为能够说明“拖入或点击选择 MKV 文件”。
- Maishan 图片继续使用 `alt="Maishan Inc."`。

## 验证

- 点击空播放器区域能打开单文件选择窗口。
- 拖入有效 MKV 仍进入播放器，非 MKV 仍显示原有错误。
- 深色主题显示白色 Maishan Logo，浅色主题显示用户提供的黑色 Logo。
- 桌面和移动端提示均不溢出播放器区域。
- `pnpm lint`、`pnpm test` 和 `pnpm build` 通过。
- 不改变 `.subtitle-overlay` 的 `12%` 位置基准、`4.6cqh` 字号或任何字幕设置逻辑。
