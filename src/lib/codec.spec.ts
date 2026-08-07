import { describe, expect, it } from 'vitest'
import { codecDisplayName, codecForTrack, isAssSubtitle, isTextSubtitle, trackLabel } from './codec'

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
