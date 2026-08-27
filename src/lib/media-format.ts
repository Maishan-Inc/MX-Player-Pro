import type { MediaFormat, SourceDescriptor } from '../types'

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
  console.log(`[MX Player] normalizeMediaFormat: url="${url.slice(0, 80)}..." isHls=${isHls} isNative=${isNative}`)
  if (isHls) return 'hls'
  if (isNative) return 'native'
  console.log('[MX Player] normalizeMediaFormat: fallback → mkv')
  return 'mkv'
}

export function normalizeHlsUrl(url: string): string {
  return url.trim()
}

export const detectMediaFormat = normalizeMediaFormat
