import { describe, expect, it } from 'vitest'
import { activeCue, parseAssBlock, parseSrt, stripAssMarkup } from './srt'

describe('SRT parser', () => {
  it('parses comma timestamps and multiline text', () => {
    const cues = parseSrt('1\n00:00:01,000 --> 00:00:03,500\n第一行\n第二行')
    expect(cues).toEqual([{ start: 1, end: 3.5, text: '第一行\n第二行' }])
    expect(activeCue(cues, 2)?.text).toBe('第一行\n第二行')
  })

  it('ignores malformed blocks', () => {
    expect(parseSrt('bad\nno timing\n\n2\n00:01:00 --> 00:00:59\nreverse')).toEqual([])
  })
})

describe('ASS markup', () => {
  it('removes override blocks and keeps the text', () => {
    expect(stripAssMarkup('{\\an8}{\\fad(200,200)}你好世界')).toBe('你好世界')
  })

  it('converts line break and hard space escapes', () => {
    expect(stripAssMarkup('第一行\\N第二行')).toBe('第一行\n第二行')
    expect(stripAssMarkup('a\\hb')).toBe('a b')
  })

  it('drops vector drawing blocks rather than printing their coordinates', () => {
    expect(stripAssMarkup('{\\p1}m 0 0 l 100 0 100 100{\\p0}')).toBe('')
  })

  it('strips karaoke timings inside a single override block', () => {
    expect(stripAssMarkup('{\\k50}ka{\\k30}ra{\\k40}oke')).toBe('karaoke')
  })
})

describe('ASS Matroska blocks', () => {
  // Matroska stores only the fields after the timing columns, so the text is
  // everything past the eighth comma.
  it('takes the text after the eight leading fields', () => {
    expect(parseAssBlock('0,0,Default,,0,0,0,,你好')).toBe('你好')
  })

  it('keeps commas that belong to the text', () => {
    expect(parseAssBlock('1,0,Default,Name,0,0,0,,Hello, world, again')).toBe('Hello, world, again')
  })

  it('strips override tags from the text field', () => {
    expect(parseAssBlock('2,0,Sign,,0,0,0,,{\\pos(10,20)}招牌')).toBe('招牌')
  })

  it('handles a full Dialogue line from a standalone .ass file', () => {
    expect(parseAssBlock('Dialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,字幕')).toBe('字幕')
  })

  it('returns empty for a blank payload', () => {
    expect(parseAssBlock('   ')).toBe('')
  })
})
