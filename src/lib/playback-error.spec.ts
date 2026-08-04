import { describe, expect, it } from 'vitest'
import { explainPlaybackError } from './playback-error'

describe('playback error explanation', () => {
  it('turns a CORS fetch failure into actionable server guidance', () => {
    const message = explainPlaybackError('CORS_BLOCKED:Failed to fetch')

    expect(message).toContain('Access-Control-Allow-Origin')
    expect(message).toContain('Content-Range')
    expect(message).toContain('直接下载')
  })

  it('keeps unrelated decoder errors intact', () => {
    expect(explainPlaybackError('VideoDecoder configure failed')).toBe('VideoDecoder configure failed')
  })

  it('explains Range and auth failures', () => {
    expect(explainPlaybackError('RANGE_HTTP_401')).toContain('401')
    expect(explainPlaybackError('RANGE_HTTP_403')).toContain('403')
    expect(explainPlaybackError('RANGE_UNSUPPORTED')).toContain('206')
  })

  // Regression for the reported symptom: Chrome's DOMException message is the bare
  // English string "Decoder error", which used to reach the overlay verbatim.
  it('turns a raw decoder error into actionable Chinese text', () => {
    const message = explainPlaybackError('DECODER_ERROR_VIDEO:Decoder error')

    expect(message).not.toContain('Decoder error')
    expect(message).toContain('视频解码失败')
    expect(message).toContain('后退 5 秒')
  })

  it('notes that an audio failure leaves video playable', () => {
    expect(explainPlaybackError('DECODER_ERROR_AUDIO:oops')).toContain('已继续播放视频')
  })

  it('interpolates the codec name for unsupported video', () => {
    expect(explainPlaybackError('DECODER_UNSUPPORTED_VIDEO:hvc1.1.6.L150.B0')).toContain('hvc1.1.6.L150.B0')
  })

  it('explains truncated and malformed containers', () => {
    expect(explainPlaybackError('MKV_CLUSTER_TRUNCATED')).toContain('下载不完整')
    expect(explainPlaybackError('MKV_CLUSTER_UNBOUNDED')).toContain('结构异常')
    expect(explainPlaybackError('MKV_SEGMENT_NOT_FOUND')).toContain('Segment')
  })
})
