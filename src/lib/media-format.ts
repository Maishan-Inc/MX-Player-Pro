import type { MediaFormat, SourceDescriptor } from '../types'

export function normalizeMediaFormat(source: SourceDescriptor, fallback: MediaFormat = 'auto'): MediaFormat {
  if (source.kind === 'file') return 'mkv'
  const requested = source.format ?? fallback
  if (requested !== 'auto') return requested
  const clean = source.url.split(/[?#]/, 1)[0]
  return /\.m3u8$/i.test(clean) ? 'hls' : 'mkv'
}

export function normalizeHlsUrl(url: string): string {
  return url.trim()
}

export const detectMediaFormat = normalizeMediaFormat
