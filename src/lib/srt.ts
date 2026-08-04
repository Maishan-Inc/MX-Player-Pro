export interface SubtitleCue {
  start: number
  end: number
  text: string
}

function parseTimestamp(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{2,3})$/)
  if (!match) return null
  const fraction = match[4].length === 2 ? Number(match[4]) / 100 : Number(match[4]) / 1000
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + fraction
}

const BOM = /^﻿/

export function parseSrt(input: string): SubtitleCue[] {
  const normalized = input.replace(BOM, '').replace(/\r/g, '')
  return normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) => {
      const lines = block.split('\n')
      const timeLineIndex = lines.findIndex((line) => line.includes('-->'))
      if (timeLineIndex < 0) return []
      const [startText, endText] = lines[timeLineIndex].split('-->').map((part) => part.trim().split(' ')[0])
      const start = parseTimestamp(startText)
      const end = parseTimestamp(endText)
      if (start === null || end === null || end <= start) return []
      return [{ start, end, text: lines.slice(timeLineIndex + 1).join('\n').trim() }]
    })
}

/**
 * Strip ASS/SSA inline styling down to readable text.
 *
 * Drops override blocks (`{\pos(..)}`, `{\fad(..)}`, karaoke timings), unescapes the
 * `\N` / `\n` / `\h` sequences, and removes drawing commands. Styling, positioning and
 * effects are intentionally discarded — full fidelity would require libass.
 */
export function stripAssMarkup(value: string): string {
  return value
    // A drawing block (\p1 ... \p0) carries vector shapes, not text.
    .replace(/\{[^}]*\\p[1-9][^}]*\}[^{]*/g, '')
    .replace(/\{[^}]*\}/g, '')
    .replace(/\\N/gi, '\n')
    .replace(/\\h/gi, ' ')
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim()
}

/**
 * Parse the body of a Matroska ASS block.
 *
 * Matroska stores only the Dialogue fields after the timing columns, comma separated:
 * `ReadOrder,Layer,Style,Name,MarginL,MarginR,MarginV,Effect,Text`. Timing comes from
 * the block timestamp, so the first eight fields are skipped and the rest — which may
 * itself contain commas — is the text.
 */
export function parseAssBlock(payload: string): string {
  const trimmed = payload.replace(BOM, '').trim()
  if (!trimmed) return ''
  // A full "Dialogue:" line appears when reading a standalone .ass file rather than a
  // Matroska block; there the text is the tenth field.
  const dialogue = trimmed.match(/^Dialogue:\s*(.*)$/is)
  const fields = (dialogue ? dialogue[1] : trimmed).split(',')
  const skip = dialogue ? 9 : 8
  const text = fields.length > skip ? fields.slice(skip).join(',') : trimmed
  return stripAssMarkup(text)
}

export function activeCue(cues: SubtitleCue[], time: number): SubtitleCue | null {
  return cues.find((cue) => time >= cue.start && time < cue.end) || null
}
