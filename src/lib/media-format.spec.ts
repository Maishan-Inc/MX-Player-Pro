import { describe, expect, it } from 'vitest'
import { detectMediaFormat, normalizeMediaFormat } from './media-format'

describe('media format detection', () => {
  it('honors explicit source format', () => {
    expect(normalizeMediaFormat({ kind: 'url', url: 'https://x/video.bin', format: 'hls' })).toBe('hls')
    expect(normalizeMediaFormat({ kind: 'url', url: 'https://x/master.m3u8', format: 'mkv' })).toBe('mkv')
  })
  it('detects m3u8 suffix without query or hash', () => {
    expect(detectMediaFormat({ kind: 'url', url: 'https://x/master.M3U8?token=1#v' })).toBe('hls')
    expect(detectMediaFormat({ kind: 'url', url: 'https://x/video.mkv?token=1' })).toBe('mkv')
    expect(detectMediaFormat({ kind: 'url', url: 'https://x/stream?format=m3u8&token=1' })).toBe('hls')
    expect(detectMediaFormat({ kind: 'url', url: 'https://x/video.mp4?token=1' })).toBe('native')
    expect(detectMediaFormat({ kind: 'url', url: 'https://x/video.webm' })).toBe('native')
  })
  it('keeps files on the MKV backend', () => {
    const file = new File([], 'playlist.m3u8', { type: 'application/vnd.apple.mpegurl' })
    expect(normalizeMediaFormat({ kind: 'file', file })).toBe('mkv')
  })
})
