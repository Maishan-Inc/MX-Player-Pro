const CORS_GUIDANCE = '媒体服务器拒绝网页跨域读取。直接下载可用不代表网页可以读取响应；请为媒体响应配置 Access-Control-Allow-Origin，并允许 GET、HEAD、OPTIONS，暴露 Content-Length、Content-Range、Accept-Ranges。'

const MESSAGES: Array<[RegExp, string | ((detail: string) => string)]> = [
  [/^CORS_BLOCKED(?:$|:)/i, CORS_GUIDANCE],
  [/^RANGE_HTTP_401(?:$|:)/i, '媒体地址返回 401 Unauthorized，签名或访问凭证无效。请重新生成直链。'],
  [/^RANGE_HTTP_403(?:$|:)/i, '媒体地址返回 403 Forbidden，当前来源没有读取权限。'],
  [/^RANGE_UNSUPPORTED(?:$|:)/i, '媒体服务器没有返回 206 Partial Content，无法按需定位读取。'],
  [/^DECODER_ERROR_VIDEO(?:$|:)/i, '视频解码失败。当前文件的这一段数据可能已损坏，或浏览器不支持该视频配置。可尝试后退 5 秒继续播放；若整段都无法播放，请换用其他文件验证。'],
  [/^DECODER_ERROR_AUDIO(?:$|:)/i, '音频解码失败，已继续播放视频。可在设置中切换其他音频轨。'],
  [/^DECODER_UNSUPPORTED_VIDEO(?:$|:)/i, (detail) => `当前浏览器不支持该视频编码${detail ? `（${detail}）` : ''}。请使用最新版 Chrome 或 Edge，或改用 H.264 文件。`],
  [/^DECODER_UNSUPPORTED_AUDIO(?:$|:)/i, (detail) => `当前浏览器不支持该音频编码${detail ? `（${detail}）` : ''}，视频仍可播放。`],
  [/^MKV_CLUSTER_TRUNCATED(?:$|:)/i, '文件在此处意外结束，可能下载不完整。请重新下载完整文件后再播放。'],
  [/^MKV_CLUSTER_UNBOUNDED(?:$|:)/i, '文件结构异常（Cluster 长度未声明且过大），无法安全解析。'],
  [/^MKV_CLUSTER_HEADER_INVALID(?:$|:)/i, '读取到无法识别的 Cluster 结构，文件可能已损坏。'],
  [/^MKV_NO_KEYFRAME(?:$|:)/i, '该位置附近找不到关键帧，无法开始解码。请尝试从头播放或改选其他时间点。'],
  [/^MKV_NO_CLUSTER(?:$|:)/i, '文件中没有找到可播放的 Cluster 数据。'],
  [/^MKV_SEGMENT_NOT_FOUND(?:$|:)/i, '不是有效的 Matroska 文件：找不到 Segment 结构。'],
  [/^MKV_TRACKS_NOT_FOUND(?:$|:)/i, '文件中没有找到任何音视频轨道信息。'],
  [/^MKV_EBML_HEADER_INVALID(?:$|:)/i, '文件头不是有效的 EBML/Matroska 结构，请确认这是 MKV 文件。'],
  [/^WORKER_CREATE_FAILED(?:$|:)/i, '解封装 Worker 创建失败。若站点的内容安全策略禁止 blob: Worker，请在播放器配置中提供同源 workerUrl。'],
]

export function explainPlaybackError(message: string) {
  for (const [pattern, replacement] of MESSAGES) {
    if (!pattern.test(message)) continue
    if (typeof replacement === 'string') return replacement
    const detail = message.slice(message.indexOf(':') + 1).trim()
    return replacement(message.includes(':') ? detail : '')
  }
  return message
}
