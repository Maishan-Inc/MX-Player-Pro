import { describe, expect, it } from 'vitest'
import { activeCue, parseSrt } from './srt'

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
