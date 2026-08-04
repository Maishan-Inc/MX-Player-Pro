export interface Element {
  id: number
  data: number
  size: number
  end: number
  unknownSize: boolean
  truncated: boolean
}

export interface WalkResult {
  complete: boolean
  consumed: number
}

export interface Vint {
  length: number
  value: number
  unknown: boolean
}

export function vint(bytes: Uint8Array, offset: number): Vint | null {
  if (offset >= bytes.length) return null
  const first = bytes[offset]
  if (first === 0) return null
  let mask = 0x80
  let length = 1
  while (length <= 8 && !(first & mask)) { mask >>= 1; length += 1 }
  if (length > 8 || offset + length > bytes.length) return null
  let value = first & (mask - 1)
  let allOnes = value === mask - 1
  for (let index = 1; index < length; index += 1) {
    const byte = bytes[offset + index]
    value = value * 256 + byte
    if (byte !== 0xff) allOnes = false
  }
  // An all-ones payload means "unknown size" and is never a usable magnitude, so
  // it must be reported before the safe-integer guard: the legitimate 8-byte
  // unknown vint is 2^56 - 1, which would otherwise be rejected as too large.
  if (allOnes) return { length, value, unknown: true }
  if (!Number.isSafeInteger(value)) return null
  return { length, value, unknown: false }
}

export function element(bytes: Uint8Array, offset: number): Element | null {
  if (offset < 0 || offset >= bytes.length) return null
  const first = bytes[offset]
  if (first === 0) return null
  let mask = 0x80
  let idLength = 1
  while (idLength <= 4 && !(first & mask)) { mask >>= 1; idLength += 1 }
  if (idLength > 4 || offset + idLength >= bytes.length) return null
  let id = 0
  for (let index = 0; index < idLength; index += 1) id = id * 256 + bytes[offset + index]
  const size = vint(bytes, offset + idLength)
  if (!size) return null
  const data = offset + idLength + size.length
  if (size.unknown) return { id, data, size: -1, end: bytes.length, unknownSize: true, truncated: false }
  if (!Number.isSafeInteger(data + size.value)) return null
  const end = data + size.value
  return { id, data, size: size.value, end, unknownSize: false, truncated: end > bytes.length }
}

export function walk(bytes: Uint8Array, start: number, end: number, visit: (item: Element) => void): WalkResult {
  let offset = start
  const limit = Math.min(end, bytes.length)
  while (offset < limit) {
    const item = element(bytes, offset)
    if (!item) return { complete: false, consumed: offset }
    if (item.truncated || item.end > limit) return { complete: false, consumed: offset }
    if (item.end <= offset) return { complete: false, consumed: offset }
    visit(item)
    offset = item.end
  }
  return { complete: offset === limit, consumed: offset }
}

export function firstElement(bytes: Uint8Array, start: number, end: number, id: number): Element | null {
  let found: Element | null = null
  walk(bytes, start, end, (item) => { if (!found && item.id === id) found = item })
  return found
}

/**
 * Find a top-level element by id, tolerating a payload that extends past the buffer.
 * Needed for Segment (and any element read through a partial window): its declared
 * size covers most of the file, so a truncation-skipping walk would never yield it.
 * Scanning cannot continue past a truncated element, so this stops there.
 */
export function firstElementAllowTruncated(bytes: Uint8Array, start: number, end: number, id: number): Element | null {
  let offset = start
  const limit = Math.min(end, bytes.length)
  while (offset < limit) {
    const item = element(bytes, offset)
    if (!item) return null
    if (item.id === id) return item
    if (item.truncated || item.unknownSize || item.end <= offset) return null
    offset = item.end
  }
  return null
}

export function unsigned(bytes: Uint8Array, item: Element): number {
  let value = 0
  for (let index = item.data; index < Math.min(item.end, bytes.length); index += 1) value = value * 256 + bytes[index]
  return value
}

export function signed16(bytes: Uint8Array, offset: number): number {
  const value = (bytes[offset] << 8) | bytes[offset + 1]
  return value & 0x8000 ? value - 0x10000 : value
}

export function text(bytes: Uint8Array, item: Element): string {
  return new TextDecoder().decode(bytes.subarray(item.data, Math.min(item.end, bytes.length))).replace(/\0+$/, '')
}

export function floatValue(bytes: Uint8Array, item: Element): number {
  if (item.end > bytes.length) return 0
  const view = new DataView(bytes.buffer, bytes.byteOffset + item.data, item.size)
  if (item.size === 4) return view.getFloat32(0)
  if (item.size === 8) return view.getFloat64(0)
  return unsigned(bytes, item)
}

export function copyBytes(bytes: Uint8Array<ArrayBuffer>, item: Element): ArrayBuffer {
  return bytes.slice(item.data, Math.min(item.end, bytes.length)).buffer
}
