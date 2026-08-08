import { describe, expect, it } from 'vitest'
import { codecDisplayName, codecForTrack, descriptionForTrack, isAssSubtitle, isTextSubtitle, trackLabel } from './codec'

/** hvcC header: version, profile_space/tier/profile_idc, compat flags, constraints, level. */
function hvcC(options: { profileSpace?: number; tier?: number; profileIdc: number; compat: number; constraints: number[]; level: number }): ArrayBuffer {
  const bytes = new Uint8Array(23)
  bytes[0] = 1
  bytes[1] = ((options.profileSpace ?? 0) << 6) | ((options.tier ?? 0) << 5) | options.profileIdc
  new DataView(bytes.buffer).setUint32(2, options.compat)
  bytes.set(options.constraints, 6)
  bytes[12] = options.level
  return bytes.buffer
}

describe('codec mapping', () => {
  it('derives avc1 from AVC CodecPrivate', () => {
    const track = { id: 1, kind: 'video' as const, codecId: 'V_MPEG4/ISO/AVC', codecPrivate: new Uint8Array([1, 0x64, 0, 0x28]).buffer, width: 1920, height: 1080 }
    expect(codecForTrack(track)).toBe('avc1.640028')
    expect(trackLabel({ ...track, codec: codecForTrack(track) || undefined })).toContain('1920×1080')
  })

  it('maps AAC and subtitle tracks', () => {
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_AAC' })).toBe('mp4a.40.2')
    expect(codecForTrack({ id: 3, kind: 'subtitle', codecId: 'S_TEXT/UTF8' })).toBeNull()
  })

  // Only AAC was mapped, so a FLAC track produced no codec string, the AudioDecoder
  // was never created and the file played silently with no error shown.
  it('maps the audio codecs WebCodecs can decode', () => {
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_FLAC' })).toBe('flac')
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_OPUS' })).toBe('opus')
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_VORBIS' })).toBe('vorbis')
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_MPEG/L3' })).toBe('mp3')
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_AC3' })).toBe('ac-3')
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_EAC3' })).toBe('ec-3')
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'a_flac' })).toBe('flac')
  })

  it('leaves codecs WebCodecs cannot decode unmapped', () => {
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_TRUEHD' })).toBeNull()
    expect(codecForTrack({ id: 2, kind: 'audio', codecId: 'A_DTS' })).toBeNull()
  })

  // Matroska muxers differ on whether CodecPrivate includes the fLaC magic and
  // metadata-block header; every form must become a valid WebCodecs description.
  it('normalises FLAC CodecPrivate to a fLaC-prefixed header', () => {
    const magic = [0x66, 0x4c, 0x61, 0x43]
    const blockHeader = [0x80, 0, 0, 0x22]
    const streamInfo = new Array(34).fill(0x11)
    const withMagic = new Uint8Array([...magic, ...blockHeader, ...streamInfo]).buffer
    expect(new Uint8Array(descriptionForTrack({ id: 2, kind: 'audio', codecId: 'A_FLAC', codecPrivate: withMagic }) as ArrayBuffer))
      .toEqual(new Uint8Array([...magic, ...blockHeader, ...streamInfo]))
    expect(new Uint8Array(descriptionForTrack({ id: 2, kind: 'audio', codecId: 'A_FLAC', codecPrivate: new Uint8Array(streamInfo).buffer }) as ArrayBuffer))
      .toEqual(new Uint8Array([...magic, ...blockHeader, ...streamInfo]))
    expect(new Uint8Array(descriptionForTrack({ id: 2, kind: 'audio', codecId: 'A_FLAC', codecPrivate: new Uint8Array([...blockHeader, ...streamInfo]).buffer }) as ArrayBuffer))
      .toEqual(new Uint8Array([...magic, ...blockHeader, ...streamInfo]))
    // A muxer may include fLaC but omit only the block header.
    expect(new Uint8Array(descriptionForTrack({ id: 2, kind: 'audio', codecId: 'A_FLAC', codecPrivate: new Uint8Array([...magic, ...streamInfo]).buffer }) as ArrayBuffer))
      .toEqual(new Uint8Array([...magic, ...blockHeader, ...streamInfo]))
  })

  // MP3 takes no description, and Chrome rejects a config that carries one.
  it('drops the description for codecs that must not carry one', () => {
    expect(descriptionForTrack({ id: 2, kind: 'audio', codecId: 'A_MPEG/L3', codecPrivate: new Uint8Array([1, 2]).buffer })).toBeUndefined()
    expect(descriptionForTrack({ id: 1, kind: 'video', codecId: 'V_MPEG4/ISO/AVC', codecPrivate: new Uint8Array([1, 0x64, 0, 0x28]).buffer })).toBeDefined()
  })

  // Every HEVC track was declared as Main 8-bit level 5.0, so a Main 10 stream was
  // handed to a decoder configured for 8 bit and decoded as a broken picture.
  it('derives the HEVC profile, level and tier from hvcC', () => {
    const main = { id: 1, kind: 'video' as const, codecId: 'V_MPEGH/ISO/HEVC', width: 1920, height: 1080 }
    expect(codecForTrack({ ...main, codecPrivate: hvcC({ profileIdc: 1, compat: 0x60000000, constraints: [0xb0, 0, 0, 0, 0, 0], level: 150 }) }))
      .toBe('hvc1.1.6.L150.B0')
    expect(codecForTrack({ ...main, codecPrivate: hvcC({ profileIdc: 2, compat: 0x60000000, constraints: [0x90, 0, 0, 0, 0, 0], level: 120 }) }))
      .toBe('hvc1.2.6.L120.90')
    // High tier prints H, and a non-zero profile space prints its letter.
    expect(codecForTrack({ ...main, codecPrivate: hvcC({ tier: 1, profileIdc: 2, compat: 0x60000000, constraints: [0, 0, 0, 0, 0, 0], level: 153 }) }))
      .toBe('hvc1.2.6.H153')
    expect(codecForTrack({ ...main, codecPrivate: hvcC({ profileSpace: 1, profileIdc: 4, compat: 0x08000000, constraints: [0xb0, 0, 0, 0, 0, 0], level: 93 }) }))
      .toBe('hvc1.A4.10.L93.B0')
  })

  it('falls back to Main when HEVC CodecPrivate is missing or truncated', () => {
    expect(codecForTrack({ id: 1, kind: 'video', codecId: 'V_MPEGH/ISO/HEVC' })).toBe('hvc1.1.6.L150.B0')
    expect(codecForTrack({ id: 1, kind: 'video', codecId: 'V_MPEGH/ISO/HEVC', codecPrivate: new Uint8Array([1, 1, 0x60]).buffer })).toBe('hvc1.1.6.L150.B0')
  })

  it('uses readable names for common video and audio codecs', () => {
    expect(codecDisplayName({ id: 1, kind: 'video', codecId: 'V_MPEGH/ISO/HEVC' })).toBe('H.265/HEVC')
    expect(codecDisplayName({ id: 2, kind: 'video', codecId: 'V_MPEG4/ISO/AVC' })).toBe('H.264/AVC')
    expect(codecDisplayName({ id: 3, kind: 'audio', codecId: 'A_AAC' })).toBe('AAC')
    expect(trackLabel({ id: 3, kind: 'audio', codecId: 'A_AAC', channels: 2 })).toContain('AAC · 2ch')
  })
})

describe('subtitle track classification', () => {
  const subtitle = (codecId: string) => ({ id: 4, kind: 'subtitle' as const, codecId })

  // Anime releases ship ASS almost exclusively; only allowing S_TEXT/UTF8 hid the
  // track from the menu entirely.
  it('accepts SRT and ASS/SSA as renderable text', () => {
    expect(isTextSubtitle(subtitle('S_TEXT/UTF8'))).toBe(true)
    expect(isTextSubtitle(subtitle('S_TEXT/ASS'))).toBe(true)
    expect(isTextSubtitle(subtitle('S_TEXT/SSA'))).toBe(true)
    expect(isTextSubtitle(subtitle('s_text/ass'))).toBe(true)
  })

  it('rejects bitmap subtitle tracks', () => {
    expect(isTextSubtitle(subtitle('S_HDMV/PGS'))).toBe(false)
    expect(isTextSubtitle(subtitle('S_VOBSUB'))).toBe(false)
  })

  it('distinguishes ASS from SRT so the right parser runs', () => {
    expect(isAssSubtitle(subtitle('S_TEXT/ASS'))).toBe(true)
    expect(isAssSubtitle(subtitle('S_TEXT/UTF8'))).toBe(false)
  })
})
