import type { SourceDescriptor } from '../types'

export interface SubtitleFont {
  id: string
  label: string
  stack: string
}

export interface SubtitleStyle {
  /** Font id from SUBTITLE_FONTS; an unknown id falls back to the first entry. */
  font: string
  /** Multiplier applied to the responsive base font size. */
  scale: number
  /** Vertical shift in percent of the frame height; positive moves the line up. */
  offset: number
}

/**
 * Each stack keeps a CJK family ahead of the generic fallback: an anime release is
 * usually subtitled in Chinese, and the Latin-only defaults render it in whatever
 * the platform picks, which is rarely the intended look.
 */
export const SUBTITLE_FONTS: SubtitleFont[] = [
  { id: 'system', label: '系统默认', stack: 'system-ui, -apple-system, "Segoe UI", sans-serif' },
  { id: 'sans', label: '黑体', stack: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif' },
  { id: 'serif', label: '宋体', stack: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", SimSun, Georgia, serif' },
  { id: 'kai', label: '楷体', stack: '"Kaiti SC", STKaiti, KaiTi, "Noto Serif SC", serif' },
  { id: 'rounded', label: '圆体', stack: '"Yuanti SC", STYuanti, "Hiragino Maru Gothic ProN", Quicksand, sans-serif' },
  { id: 'mono', label: '等宽', stack: 'ui-monospace, SFMono-Regular, Consolas, "Noto Sans Mono CJK SC", monospace' },
]

export const DEFAULT_SUBTITLE_STYLE: SubtitleStyle = { font: 'system', scale: 1, offset: 0 }

export const SCALE_RANGE = { min: 0.6, max: 2.4, step: 0.1 }
/** Below zero slides under the controls bar, which auto-hides, so a little is useful. */
export const OFFSET_RANGE = { min: -10, max: 40, step: 1 }

const STORAGE_PREFIX = 'mx-player-pro:subtitle-style:'

export function fontStack(id: string) {
  return (SUBTITLE_FONTS.find((font) => font.id === id) || SUBTITLE_FONTS[0]).stack
}

export function clampScale(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_SUBTITLE_STYLE.scale
  // One decimal keeps repeated +/- steps from drifting into 1.2000000000000002.
  return Math.round(Math.min(SCALE_RANGE.max, Math.max(SCALE_RANGE.min, value)) * 10) / 10
}

export function clampOffset(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_SUBTITLE_STYLE.offset
  return Math.round(Math.min(OFFSET_RANGE.max, Math.max(OFFSET_RANGE.min, value)))
}

export function normalizeSubtitleStyle(value: Partial<SubtitleStyle> | null | undefined): SubtitleStyle {
  const font = SUBTITLE_FONTS.some((entry) => entry.id === value?.font) ? value!.font! : DEFAULT_SUBTITLE_STYLE.font
  return { font, scale: clampScale(Number(value?.scale)), offset: clampOffset(Number(value?.offset)) }
}

/**
 * Settings are cached per playback host, so tuning done for one site does not follow
 * the viewer to the next one. Local files share a single scope; they have no host.
 */
export function subtitleStyleScope(source: SourceDescriptor) {
  if (source.kind === 'file') return 'local-file'
  try { return new URL(source.url).hostname || 'unknown-host' } catch { return 'unknown-host' }
}

export function loadSubtitleStyle(scope: string): SubtitleStyle {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + scope)
    if (!raw) return { ...DEFAULT_SUBTITLE_STYLE }
    return normalizeSubtitleStyle(JSON.parse(raw) as Partial<SubtitleStyle>)
  } catch {
    // Disabled storage or hand-edited JSON must not take the player down with it.
    return { ...DEFAULT_SUBTITLE_STYLE }
  }
}

export function saveSubtitleStyle(scope: string, style: SubtitleStyle) {
  try {
    localStorage.setItem(STORAGE_PREFIX + scope, JSON.stringify(normalizeSubtitleStyle(style)))
  } catch {
    // Persistence is a convenience; a full or blocked quota is not worth surfacing.
  }
}
