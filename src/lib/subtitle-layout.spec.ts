import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const styleSheets = [
  readFileSync(new URL('../styles.css', import.meta.url), 'utf8'),
  readFileSync(new URL('../player.css', import.meta.url), 'utf8'),
]

describe('subtitle layout regression', () => {
  it('keeps the existing position and container-relative scale', () => {
    for (const styles of styleSheets) {
      expect(styles).toMatch(/\.subtitle-overlay\s*\{[^}]*bottom:\s*calc\(12% \+ var\(--subtitle-offset, 0%\)\)/s)
      expect(styles).toMatch(/\.subtitle-overlay\s*\{[^}]*font-size:\s*calc\(4\.6cqh \* var\(--subtitle-scale, 1\)\)/s)
    }
  })

  it('keeps the mobile subtitle declarations identical to the desktop baseline', () => {
    for (const styles of styleSheets) {
      expect(styles).toMatch(/@media \(max-width: 760px\)[\s\S]*?\.subtitle-overlay\s*\{\s*bottom:\s*calc\(12% \+ var\(--subtitle-offset, 0%\)\);\s*font-size:\s*calc\(4\.6cqh \* var\(--subtitle-scale, 1\)\);\s*\}/)
    }
  })

  it('keeps edit mode compact with centered vertical resize handles', () => {
    for (const styles of styleSheets) {
      expect(styles).toMatch(/\.subtitle-overlay\.is-editing\s*\{[^}]*width:\s*fit-content;[^}]*max-width:\s*min\(52%, 360px\);[^}]*padding:\s*4px 8px/s)
      expect(styles).toMatch(/\.subtitle-handle\.is-top\s*\{[^}]*top:\s*-4px/s)
      expect(styles).toMatch(/\.subtitle-handle\.is-bottom\s*\{[^}]*bottom:\s*-4px/s)
    }
  })
})
