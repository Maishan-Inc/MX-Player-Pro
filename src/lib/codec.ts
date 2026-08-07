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

const HUMAN_CODEC_NAMES: Record<string, string> = {
  'V_MPEGH/ISO/HEVC': 'H.265/HEVC',
  'V_MPEG4/ISO/AVC': 'H.264/AVC',
  V_AV1: 'AV1',
  V_VP9: 'VP9',
  V_VP8: 'VP8',
  V_MPEG2: 'MPEG-2',
  V_MPEG1: 'MPEG-1',
  A_AAC: 'AAC',
  A_OPUS: 'Opus',
  A_AC3: 'AC-3',
  'A_AC-3': 'AC-3',
  A_EAC3: 'E-AC-3',
  'A_E-AC-3': 'E-AC-3',
  'A_MPEG/L3': 'MP3',
  'A_MPEG/L2': 'MP2',
  A_VORBIS: 'Vorbis',
  A_TRUEHD: 'TrueHD',
  A_FLAC: 'FLAC',
  A_ALAC: 'ALAC',
  A_AC4: 'AC-4',
  'A_PCM/INT/LIT': 'PCM',
  'A_PCM/INT/BIG': 'PCM',
  'A_PCM/FLOAT/IEEE': 'PCM',
  'S_TEXT/UTF8': 'UTF-8',
  'S_TEXT/ASCII': 'ASCII',
  'S_TEXT/ASS': 'ASS',
  'S_TEXT/SSA': 'SSA',
  S_ASS: 'ASS',
  S_SSA: 'SSA',
}

export function codecDisplayName(track: TrackInfo): string {
  const codecId = track.codecId.toUpperCase()
  const knownName = HUMAN_CODEC_NAMES[codecId]
  if (knownName) return knownName
  const fallback = track.codec || track.codecId
  return fallback
    .replace(/^[VAS]_/, '')
    .replace(/\/ISO\//g, '/')
    .replace(/_/g, ' ')
}

export function trackLabel(track: TrackInfo): string {
  const language = track.language && track.language !== 'und' ? ` · ${track.language}` : ''
  const name = track.name ? ` · ${track.name}` : ''
  if (track.kind === 'video') return `${track.width || '?'}×${track.height || '?'} · ${codecDisplayName(track)}`
  if (track.kind === 'audio') return `${codecDisplayName(track)} · ${track.channels || 2}ch${language}${name}`
  return `${codecDisplayName(track)}${language}${name}`
}

/** Text subtitle codecs we can render. Bitmap tracks (PGS, VobSub) are excluded. */
const TEXT_SUBTITLE_CODECS = new Set(['S_TEXT/UTF8', 'S_TEXT/ASCII', 'S_TEXT/ASS', 'S_TEXT/SSA', 'S_ASS', 'S_SSA'])

export function isTextSubtitle(track: TrackInfo): boolean {
  return track.kind === 'subtitle' && TEXT_SUBTITLE_CODECS.has(track.codecId.toUpperCase())
}

export function isAssSubtitle(track: TrackInfo): boolean {
  const id = track.codecId.toUpperCase()
  return id === 'S_TEXT/ASS' || id === 'S_TEXT/SSA' || id === 'S_ASS' || id === 'S_SSA'
}
