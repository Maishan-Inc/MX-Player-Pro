import type { TrackInfo } from '../types'

/** Audio codecs WebCodecs can decode, keyed by Matroska CodecID. */
const AUDIO_CODECS: Record<string, string> = {
  A_AAC: 'mp4a.40.2',
  A_FLAC: 'flac',
  A_OPUS: 'opus',
  A_VORBIS: 'vorbis',
  'A_MPEG/L3': 'mp3',
  A_AC3: 'ac-3',
  'A_AC-3': 'ac-3',
  A_EAC3: 'ec-3',
  'A_E-AC-3': 'ec-3',
}

/** Codecs whose AudioDecoderConfig must not carry a description. */
const NO_DESCRIPTION = new Set(['mp3', 'ac-3', 'ec-3'])

export function codecForTrack(track: TrackInfo): string | null {
  const codecId = track.codecId.toUpperCase()
  if (codecId === 'V_MPEG4/ISO/AVC') return avcCodec(track.codecPrivate) || 'avc1.640028'
  if (codecId === 'V_MPEGH/ISO/HEVC') return hevcCodec(track.codecPrivate) || 'hvc1.1.6.L150.B0'
  return AUDIO_CODECS[codecId] ?? null
}

/**
 * Bytes for the decoder's `description`. Matroska CodecPrivate is already the right
 * shape for AVC (avcC), HEVC (hvcC), AAC (AudioSpecificConfig), Opus (OpusHead) and
 * Vorbis (xiph-laced setup headers), so only the exceptions are handled here.
 */
export function descriptionForTrack(track: TrackInfo): ArrayBuffer | undefined {
  const codec = track.codec ?? codecForTrack(track)
  if (codec && NO_DESCRIPTION.has(codec)) return undefined
  if (codec === 'flac') return flacDescription(track.codecPrivate)
  return track.codecPrivate
}

/**
 * The WebCodecs FLAC registration requires the description to be a FLAC stream
 * header: the `fLaC` magic followed by metadata blocks. Muxers that store only the
 * blocks get the magic — and, for a bare 34-byte STREAMINFO, its block header — added
 * back, because without them the decoder rejects the config and the file plays silent.
 */
function flacDescription(codecPrivate?: ArrayBuffer): ArrayBuffer | undefined {
  if (!codecPrivate || codecPrivate.byteLength < 4) return codecPrivate
  const bytes = new Uint8Array(codecPrivate)
  if (bytes[0] === 0x66 && bytes[1] === 0x4c && bytes[2] === 0x61 && bytes[3] === 0x43) return codecPrivate
  const magic = [0x66, 0x4c, 0x61, 0x43]
  // A bare STREAMINFO payload is 34 bytes and carries no block header of its own.
  const header = bytes.length === 34 ? [0x80, 0x00, 0x00, 0x22] : []
  const out = new Uint8Array(magic.length + header.length + bytes.length)
  out.set(magic, 0)
  out.set(header, magic.length)
  out.set(bytes, magic.length + header.length)
  return out.buffer
}

function avcCodec(codecPrivate?: ArrayBuffer): string | null {
  if (!codecPrivate || codecPrivate.byteLength < 4) return null
  const bytes = new Uint8Array(codecPrivate)
  if (bytes[0] !== 1 || bytes.length < 4) return null
  return `avc1.${[bytes[1], bytes[2], bytes[3]].map((byte) => byte.toString(16).padStart(2, '0')).join('')}`
}

/**
 * Build the codec string from hvcC (ISO/IEC 14496-15 §8.3.3.1, string form Annex E).
 * The old hardcoded `hvc1.1.6.L150.B0` claimed Main 8-bit level 5.0 for every file,
 * so a Main 10 stream was configured as 8-bit and decoded into a broken picture.
 */
function hevcCodec(codecPrivate?: ArrayBuffer): string | null {
  if (!codecPrivate || codecPrivate.byteLength < 13) return null
  const bytes = new Uint8Array(codecPrivate)
  if (bytes[0] !== 1) return null

  const profileSpace = (bytes[1] & 0xc0) >> 6
  const tier = (bytes[1] & 0x20) >> 5
  const profileIdc = bytes[1] & 0x1f
  const compatibility = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(2)

  const parts = [
    `${['', 'A', 'B', 'C'][profileSpace]}${profileIdc}`,
    // Annex E prints the compatibility flags reversed, so the flag for profile 1 is
    // the least significant bit.
    reverseBits32(compatibility).toString(16),
    `${tier ? 'H' : 'L'}${bytes[12]}`,
  ]

  // Six constraint bytes, with trailing zero bytes omitted.
  const constraints = Array.from(bytes.subarray(6, 12))
  while (constraints.length && constraints[constraints.length - 1] === 0) constraints.pop()
  parts.push(...constraints.map((byte) => byte.toString(16).toUpperCase().padStart(2, '0')))

  return `hvc1.${parts.join('.')}`
}

function reverseBits32(value: number): number {
  let reversed = 0
  for (let bit = 0; bit < 32; bit += 1) reversed = (reversed << 1) | ((value >>> bit) & 1)
  return reversed >>> 0
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
