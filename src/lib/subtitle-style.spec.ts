import { describe, expect, it, beforeEach } from 'vitest'
import {
  DEFAULT_SUBTITLE_STYLE, SUBTITLE_FONTS, clampOffset, clampScale, fontStack,
  loadSubtitleStyle, normalizeSubtitleStyle, saveSubtitleStyle, subtitleStyleScope,
} from './subtitle-style'

/** The suite runs in Node, so back the storage calls with a minimal in-memory shim. */
function installStorage() {
  const entries = new Map<string, string>()
  const storage = {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => { entries.set(key, value) },
    removeItem: (key: string) => { entries.delete(key) },
    clear: () => entries.clear(),
    key: (index: number) => Array.from(entries.keys())[index] ?? null,
    get length() { return entries.size },
  }
  Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true, writable: true })
  return storage
}

describe('subtitle style clamping', () => {
  it('keeps size and position inside the usable range', () => {
    expect(clampScale(9)).toBe(2.4)
    expect(clampScale(0.1)).toBe(0.6)
    expect(clampOffset(999)).toBe(40)
    expect(clampOffset(-999)).toBe(-10)
  })

  // Repeated +0.1 steps on a float otherwise drift into 1.2000000000000002 and
  // render as "120.00000000000001%" in the readout.
  it('rounds size to one decimal so stepping does not drift', () => {
    let scale = 1
    for (let step = 0; step < 5; step += 1) scale = clampScale(scale + 0.1)
    expect(scale).toBe(1.5)
  })

  it('falls back to defaults for junk values', () => {
    expect(clampScale(Number.NaN)).toBe(DEFAULT_SUBTITLE_STYLE.scale)
    expect(normalizeSubtitleStyle({ font: 'nonexistent' }).font).toBe(DEFAULT_SUBTITLE_STYLE.font)
    expect(normalizeSubtitleStyle(null)).toEqual(DEFAULT_SUBTITLE_STYLE)
  })

  it('resolves a font stack for every listed font, and for unknown ids', () => {
    SUBTITLE_FONTS.forEach((font) => expect(fontStack(font.id)).toBe(font.stack))
    expect(fontStack('nonexistent')).toBe(SUBTITLE_FONTS[0].stack)
  })
})

describe('per-host caching', () => {
  beforeEach(() => installStorage())

  // The scope is the host, not the full URL: two episodes from one site share
  // the tuning, and a different site does not inherit it.
  it('scopes by hostname and keeps local files separate', () => {
    expect(subtitleStyleScope({ kind: 'url', url: 'https://media.example.com/a/ep1.mkv' })).toBe('media.example.com')
    expect(subtitleStyleScope({ kind: 'url', url: 'https://media.example.com/b/ep2.mkv' })).toBe('media.example.com')
    expect(subtitleStyleScope({ kind: 'file', file: { name: 'x.mkv' } as File })).toBe('local-file')
    expect(subtitleStyleScope({ kind: 'url', url: 'not a url' })).toBe('unknown-host')
  })

  it('round-trips a saved style and isolates hosts', () => {
    saveSubtitleStyle('a.example', { font: 'serif', scale: 1.6, offset: 12 })
    expect(loadSubtitleStyle('a.example')).toEqual({ font: 'serif', scale: 1.6, offset: 12 })
    expect(loadSubtitleStyle('b.example')).toEqual(DEFAULT_SUBTITLE_STYLE)
  })

  it('sanitizes out-of-range and corrupt cached values', () => {
    saveSubtitleStyle('c.example', { font: 'sans', scale: 99, offset: -99 })
    expect(loadSubtitleStyle('c.example')).toEqual({ font: 'sans', scale: 2.4, offset: -10 })
    localStorage.setItem('mx-player-pro:subtitle-style:d.example', '{ not json')
    expect(loadSubtitleStyle('d.example')).toEqual(DEFAULT_SUBTITLE_STYLE)
  })
})
