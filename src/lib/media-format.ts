import type { MediaFormat, SourceDescriptor } from '../types'

export function normalizeMediaFormat(source: SourceDescriptor, fallback: MediaFormat = 'auto'): MediaFormat {
  if (source.kind === 'file') return 'mkv'
  const requested = source.format ?? fallback
  if (requested !== 'auto') return requested
  // Signed playlists commonly append query/hash parameters; some CDNs also use
  // extensionless paths while retaining `m3u8` in a query parameter.
  if (/(?:\.m3u8(?:$|[?#&])|[?&#=_-]m3u8(?:$|[&#])|mpegurl)/i.test(source.url)) return 'hls'
  if (/\.(?:mp4|webm|ogv|ogg)(?:$|[?#&])/i.test(source.url)) return 'native'
  return 'mkv'
}

export function normalizeHlsUrl(url: string): string {
  return url.trim()
}

export const detectMediaFormat = normalizeMediaFormat
