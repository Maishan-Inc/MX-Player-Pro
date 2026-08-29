import type { MediaFormat, SourceDescriptor } from '../types'

/**
 * Cloud-drive direct links (Quark and similar) serve extensionless progressive MP4
 * over signed URLs. The CDN supports Range but never sends CORS headers, so the
 * fetch-based MKV demuxer can never read the header; the native <video> backend
 * needs no CORS and plays these fine.
 */
const NATIVE_DIRECT_LINK_HOSTS = /(?:^|\.)drive\.quark\.cn$/i

export function normalizeMediaFormat(source: SourceDescriptor, fallback: MediaFormat = 'auto'): MediaFormat {
  if (source.kind === 'file') {
    console.log('[MX Player] normalizeMediaFormat: file source → mkv')
    return 'mkv'
  }
  const requested = source.format ?? fallback
  if (requested !== 'auto') {
    console.log(`[MX Player] normalizeMediaFormat: explicit format=${requested}`)
    return requested
  }
  // Signed playlists commonly append query/hash parameters; some CDNs also use
  // extensionless paths while retaining `m3u8` in a query parameter.
  const url = source.url
  const isHls = /(?:\.m3u8(?:$|[?#&])|[?&#=_-]m3u8(?:$|[&#])|mpegurl)/i.test(url)
  const isNative = /\.(?:mp4|webm|ogv|ogg)(?:$|[?#&])/i.test(url)
  let isDirectLink = false
  try { isDirectLink = NATIVE_DIRECT_LINK_HOSTS.test(new URL(url).hostname) } catch { /* unparsable URL: keep false */ }
  console.log(`[MX Player] normalizeMediaFormat: url="${url.slice(0, 80)}..." isHls=${isHls} isNative=${isNative} isDirectLink=${isDirectLink}`)
  if (isHls) return 'hls'
  if (isNative || isDirectLink) return 'native'
  console.log('[MX Player] normalizeMediaFormat: fallback → mkv')
  return 'mkv'
}

export function normalizeHlsUrl(url: string): string {
  return url.trim()
}

export const detectMediaFormat = normalizeMediaFormat
