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
})
