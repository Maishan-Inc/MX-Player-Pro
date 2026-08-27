import { describe, expect, it } from 'vitest'
import { isAppleHlsPlatform } from './hls-backend'

describe('native HLS platform detection', () => {
  it('rejects Chromium even when canPlayType says maybe', () => {
    expect(isAppleHlsPlatform({ userAgent: 'Mozilla/5.0 Chrome/151.0.0.0 Safari/537.36', vendor: 'Google Inc.', maxTouchPoints: 0 })).toBe(false)
  })
  it('accepts Safari on macOS', () => {
    expect(isAppleHlsPlatform({ userAgent: 'Mozilla/5.0 Macintosh Intel Mac OS X 14_0 Safari/617.1', vendor: 'Apple Computer, Inc.', maxTouchPoints: 0 })).toBe(true)
  })
  it('accepts WebKit browsers on iOS', () => {
    expect(isAppleHlsPlatform({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) CriOS/151 Mobile/15E148 Safari/604.1', vendor: 'Google Inc.', maxTouchPoints: 5 })).toBe(true)
  })
})
