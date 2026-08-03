import type { TrackInfo } from '../types'

export function codecForTrack(track: TrackInfo): string | null {
  if (track.codecId === 'V_MPEG4/ISO/AVC') return avcCodec(track.codecPrivate) || 'avc1.640028'
  if (track.codecId === 'V_MPEGH/ISO/HEVC') return 'hvc1.1.6.L150.B0'
  if (track.codecId === 'A_AAC') return 'mp4a.40.2'
  return null
}

function avcCodec(codecPrivate?: ArrayBuffer): string | null {
  if (!codecPrivate || codecPrivate.byteLength < 4) return null
  const bytes = new Uint8Array(codecPrivate)
  if (bytes[0] !== 1 || bytes.length < 4) return null
  return `avc1.${[bytes[1], bytes[2], bytes[3]].map((byte) => byte.toString(16).padStart(2, '0')).join('')}`
}

export function trackLabel(track: TrackInfo): string {
  const language = track.language && track.language !== 'und' ? ` · ${track.language}` : ''
  const name = track.name ? ` · ${track.name}` : ''
  if (track.kind === 'video') return `${track.width || '?'}×${track.height || '?'} · ${track.codec || track.codecId}`
  if (track.kind === 'audio') return `${track.codec || track.codecId} · ${track.channels || 2}ch${language}${name}`
  return `${track.codecId}${language}${name}`
}
