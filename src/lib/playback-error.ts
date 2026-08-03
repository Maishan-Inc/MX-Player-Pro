const CORS_GUIDANCE = '媒体服务器拒绝网页跨域读取。直接下载可用不代表网页可以读取响应；请为媒体响应配置 Access-Control-Allow-Origin，并允许 GET、HEAD、OPTIONS，暴露 Content-Length、Content-Range、Accept-Ranges。'

export function explainPlaybackError(message: string) {
  if (/^CORS_BLOCKED(?:$|:)/i.test(message)) return CORS_GUIDANCE
  if (/^RANGE_HTTP_401(?:$|:)/i.test(message)) return '媒体地址返回 401 Unauthorized，签名或访问凭证无效。请重新生成直链。'
  if (/^RANGE_HTTP_403(?:$|:)/i.test(message)) return '媒体地址返回 403 Forbidden，当前来源没有读取权限。'
  if (/^RANGE_UNSUPPORTED(?:$|:)/i.test(message)) return '媒体服务器没有返回 206 Partial Content，无法按需定位读取。'
  return message
}
