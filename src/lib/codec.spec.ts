import { describe, expect, it } from 'vitest'
import { codecForTrack, trackLabel } from './codec'

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
})
