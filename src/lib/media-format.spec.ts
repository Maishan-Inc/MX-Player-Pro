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
  it('routes cloud-drive direct links to the native backend', () => {
    // Extensionless signed Quark URLs serve progressive MP4 without CORS headers.
    expect(detectMediaFormat({ kind: 'url', url: 'https://video-play-p-zb.drive.quark.cn/QPwBVFHV/1640540970/d4e0b25adcf24154a7f90f8d84edffad6630d8f8/6630d8f8e7d267e1ad90483cbc95108e7d643559?flag=ho&auth_key=1788014459-615678-10800-abc' })).toBe('native')
    expect(detectMediaFormat({ kind: 'url', url: 'https://drive.quark.cn/1/2?auth_key=x' })).toBe('native')
    // Lookalike hosts embedded in the path or as a suffix must not match.
    expect(detectMediaFormat({ kind: 'url', url: 'https://evil.example/drive.quark.cn/fake' })).toBe('mkv')
    // An explicit format still wins.
    expect(normalizeMediaFormat({ kind: 'url', url: 'https://drive.quark.cn/1?auth_key=x', format: 'mkv' })).toBe('mkv')
  })
})
