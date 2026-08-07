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
})
