export interface SubtitleCue {
  start: number
  end: number
  text: string
}

function parseTimestamp(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{3})$/)
  if (!match) return null
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000
}

export function parseSrt(input: string): SubtitleCue[] {
  const normalized = input.replace(/^\uFEFF/, '').replace(/\r/g, '')
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

export function activeCue(cues: SubtitleCue[], time: number): SubtitleCue | null {
  return cues.find((cue) => time >= cue.start && time < cue.end) || null
}
