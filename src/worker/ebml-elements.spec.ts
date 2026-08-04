import { describe, expect, it } from 'vitest'
import { element, firstElement, firstElementAllowTruncated, vint, walk } from './ebml-elements'
import { concat, el, elUnknownSize, elWithDeclaredSize, idBytes, uintEl, vintBytes } from './__fixtures__/ebml-writer'

describe('vint', () => {
  it('decodes single and multi byte widths', () => {
    expect(vint(new Uint8Array([0x81]), 0)).toMatchObject({ length: 1, value: 1 })
    expect(vint(new Uint8Array([0x40, 0x7f]), 0)).toMatchObject({ length: 2, value: 127 })
    expect(vint(vintBytes(300), 0)).toMatchObject({ value: 300 })
  })

  it('flags all-ones values as unknown size', () => {
    expect(vint(new Uint8Array([0xff]), 0)?.unknown).toBe(true)
    expect(vint(new Uint8Array([0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]), 0)?.unknown).toBe(true)
    expect(vint(vintBytes(1), 0)?.unknown).toBe(false)
  })

  it('rejects a width that runs past the buffer', () => {
    expect(vint(new Uint8Array([0x40]), 0)).toBeNull()
    expect(vint(new Uint8Array([0x00]), 0)).toBeNull()
  })
})

describe('element size and truncation boundary', () => {
  it('reports an exact end when the declared size fits', () => {
    const bytes = el(0xa3, [1, 2, 3, 4])
    const item = element(bytes, 0)
    expect(item).toMatchObject({ id: 0xa3, size: 4, truncated: false, unknownSize: false })
    expect(item?.end).toBe(bytes.length)
  })

  // Regression for the reported "Decoder error": the old element() clamped the
  // declared size to the available bytes, so a cluster straddling the read window
  // was parsed as a short block and a partial frame reached the decoder.
  it('keeps the declared size and marks truncation when the payload is short', () => {
    const bytes = elWithDeclaredSize(0xa3, [1, 2, 3], 9)
    const item = element(bytes, 0)
    expect(item?.size).toBe(9)
    expect(item?.truncated).toBe(true)
    expect(item?.end).toBeGreaterThan(bytes.length)
  })

  it('distinguishes an incomplete header from a truncated payload', () => {
    // Header cut off mid size-vint: we cannot even learn the declared size.
    expect(element(concat(idBytes(0xa3), [0x40]), 0)).toBeNull()
    expect(element(elWithDeclaredSize(0xa3, [], 4), 0)?.truncated).toBe(true)
  })

  it('flags unknown-size elements without marking them truncated', () => {
    const item = element(elUnknownSize(0x1f43b675, [1, 2, 3]), 0)
    expect(item).toMatchObject({ unknownSize: true, truncated: false, size: -1 })
  })

  it('reads a 4-byte id with an 8-byte size', () => {
    const bytes = concat(idBytes(0x1f43b675), vintBytes(2, { length: 8 }), [7, 8])
    expect(element(bytes, 0)).toMatchObject({ id: 0x1f43b675, size: 2, truncated: false })
  })

  it('rejects a size beyond the safe integer range', () => {
    const bytes = concat(idBytes(0xa3), [0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe])
    expect(element(bytes, 0)).toBeNull()
  })
})

describe('walk', () => {
  it('visits a complete sibling chain in order', () => {
    const bytes = concat(uintEl(0xe7, 5), el(0xa3, [1, 2]), el(0xa3, [3, 4]))
    const ids: number[] = []
    const result = walk(bytes, 0, bytes.length, (item) => ids.push(item.id))
    expect(ids).toEqual([0xe7, 0xa3, 0xa3])
    expect(result).toMatchObject({ complete: true, consumed: bytes.length })
  })

  it('stops at a truncated child without visiting it', () => {
    const good = el(0xa3, [1, 2])
    const bytes = concat(good, elWithDeclaredSize(0xa3, [9], 20))
    const ids: number[] = []
    const result = walk(bytes, 0, bytes.length, (item) => ids.push(item.id))
    expect(ids).toEqual([0xa3])
    expect(result.complete).toBe(false)
    expect(result.consumed).toBe(good.length)
  })
})

describe('firstElementAllowTruncated', () => {
  // Segment declares a size covering nearly the whole file, so inside a header
  // window it is legitimately truncated. A truncation-skipping walk would never
  // return it, which made init() fail with MKV_SEGMENT_NOT_FOUND on every real file.
  it('finds a Segment whose declared size exceeds the header window', () => {
    const header = el(0x1a45dfa3, [0x42, 0x86, 0x81, 0x01])
    const bytes = concat(header, elWithDeclaredSize(0x18538067, [1, 2, 3, 4], 50_000_000))

    expect(firstElement(bytes, 0, bytes.length, 0x18538067)).toBeNull()
    const segment = firstElementAllowTruncated(bytes, 0, bytes.length, 0x18538067)
    expect(segment).toMatchObject({ id: 0x18538067, truncated: true })
    expect(segment?.size).toBe(50_000_000)
  })

  it('skips complete leading elements to reach the target', () => {
    const bytes = concat(el(0xec, [0, 0]), uintEl(0xe7, 7), el(0xa3, [5]))
    expect(firstElementAllowTruncated(bytes, 0, bytes.length, 0xa3)?.id).toBe(0xa3)
  })

  it('returns null when the target does not appear before a truncated element', () => {
    const bytes = concat(elWithDeclaredSize(0xec, [1], 900), el(0xa3, [5]))
    expect(firstElementAllowTruncated(bytes, 0, bytes.length, 0xa3)).toBeNull()
  })
})
