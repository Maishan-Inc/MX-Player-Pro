export function concat(...parts: Array<Uint8Array | number[]>): Uint8Array<ArrayBuffer> {
  const arrays = parts.map((part) => part instanceof Uint8Array ? part : new Uint8Array(part))
  const total = arrays.reduce((sum, part) => sum + part.length, 0)
  const result = new Uint8Array(total)
  let offset = 0
  for (const part of arrays) { result.set(part, offset); offset += part.length }
  return result
}

/** Encode an EBML unsigned vint. `length` forces a wider-than-minimal encoding. */
export function vintBytes(value: number, options: { length?: number; unknown?: boolean } = {}): Uint8Array {
  if (options.unknown) {
    const length = options.length ?? 1
    const bytes = new Uint8Array(length).fill(0xff)
    bytes[0] = (0x100 >> length) | ((1 << (8 - length)) - 1)
    return bytes
  }
  let length = options.length ?? 1
  if (options.length === undefined) {
    // A value of all-ones for its width means "unknown", so it needs one more byte.
    while (length <= 8 && value >= 2 ** (7 * length) - 1) length += 1
  }
  const bytes = new Uint8Array(length)
  let remaining = value
  for (let index = length - 1; index >= 0; index -= 1) {
    bytes[index] = remaining % 256
    remaining = Math.floor(remaining / 256)
  }
  bytes[0] |= 0x80 >> (length - 1)
  return bytes
}

/** EBML IDs already carry their marker bits, so emit their significant bytes big-endian. */
export function idBytes(id: number): Uint8Array {
  const length = id <= 0xff ? 1 : id <= 0xffff ? 2 : id <= 0xffffff ? 3 : 4
  const bytes = new Uint8Array(length)
  let remaining = id
  for (let index = length - 1; index >= 0; index -= 1) {
    bytes[index] = remaining % 256
    remaining = Math.floor(remaining / 256)
  }
  return bytes
}

export function el(id: number, payload: Uint8Array | number[]): Uint8Array<ArrayBuffer> {
  const body = payload instanceof Uint8Array ? payload : new Uint8Array(payload)
  return concat(idBytes(id), vintBytes(body.length), body)
}

/** Emit an element whose declared size deliberately disagrees with its payload. */
export function elWithDeclaredSize(id: number, payload: Uint8Array | number[], declaredSize: number): Uint8Array<ArrayBuffer> {
  const body = payload instanceof Uint8Array ? payload : new Uint8Array(payload)
  return concat(idBytes(id), vintBytes(declaredSize), body)
}

export function elUnknownSize(id: number, payload: Uint8Array | number[]): Uint8Array<ArrayBuffer> {
  const body = payload instanceof Uint8Array ? payload : new Uint8Array(payload)
  return concat(idBytes(id), vintBytes(0, { unknown: true }), body)
}

export function uintEl(id: number, value: number, width?: number): Uint8Array<ArrayBuffer> {
  const length = width ?? Math.max(1, Math.ceil(Math.max(1, value).toString(16).length / 2))
  const bytes = new Uint8Array(length)
  let remaining = value
  for (let index = length - 1; index >= 0; index -= 1) {
    bytes[index] = remaining % 256
    remaining = Math.floor(remaining / 256)
  }
  return el(id, bytes)
}

export function floatEl(id: number, value: number, width: 4 | 8 = 8): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(width)
  const view = new DataView(bytes.buffer)
  if (width === 4) view.setFloat32(0, value)
  else view.setFloat64(0, value)
  return el(id, bytes)
}

export function stringEl(id: number, value: string): Uint8Array<ArrayBuffer> {
  return el(id, new TextEncoder().encode(value))
}

function blockHeader(track: number, relativeTime: number, flags: number): Uint8Array<ArrayBuffer> {
  const rel = relativeTime < 0 ? relativeTime + 0x10000 : relativeTime
  return concat(vintBytes(track), [(rel >> 8) & 0xff, rel & 0xff, flags])
}

export const ID_SIMPLE_BLOCK = 0xa3
export const ID_BLOCK = 0xa1
export const ID_BLOCK_GROUP = 0xa0
export const ID_REFERENCE_BLOCK = 0xfb
export const ID_BLOCK_DURATION = 0x9b
export const ID_CLUSTER = 0x1f43b675
export const ID_TIMECODE = 0xe7

export function simpleBlock(track: number, relativeTime: number, flags: number, payload: Uint8Array | number[]): Uint8Array<ArrayBuffer> {
  return el(ID_SIMPLE_BLOCK, concat(blockHeader(track, relativeTime, flags), payload))
}

/** Raw block body without the element wrapper, for direct parseBlock tests. */
export function blockBody(track: number, relativeTime: number, flags: number, payload: Uint8Array | number[]): Uint8Array<ArrayBuffer> {
  return concat(blockHeader(track, relativeTime, flags), payload)
}

export function xiphLacedBody(track: number, relativeTime: number, frames: Array<Uint8Array | number[]>): Uint8Array<ArrayBuffer> {
  const bodies = frames.map((frame) => frame instanceof Uint8Array ? frame : new Uint8Array(frame))
  const sizeBytes: number[] = []
  for (const body of bodies.slice(0, -1)) {
    let remaining = body.length
    while (remaining >= 0xff) { sizeBytes.push(0xff); remaining -= 0xff }
    sizeBytes.push(remaining)
  }
  return concat(blockHeader(track, relativeTime, 0x02), [bodies.length - 1], sizeBytes, ...bodies)
}

export function fixedLacedBody(track: number, relativeTime: number, frames: Array<Uint8Array | number[]>): Uint8Array<ArrayBuffer> {
  const bodies = frames.map((frame) => frame instanceof Uint8Array ? frame : new Uint8Array(frame))
  return concat(blockHeader(track, relativeTime, 0x04), [bodies.length - 1], ...bodies)
}

/** Signed EBML lacing delta: range-shifted by 2^(7 * length - 1) - 1. */
function signedVintBytes(value: number): Uint8Array {
  let length = 1
  while (length <= 8) {
    const shift = 2 ** (7 * length - 1) - 1
    const encoded = value + shift
    if (encoded >= 0 && encoded < 2 ** (7 * length) - 1) return vintBytes(encoded, { length })
    length += 1
  }
  throw new Error('signed vint out of range')
}

export function ebmlLacedBody(track: number, relativeTime: number, frames: Array<Uint8Array | number[]>): Uint8Array<ArrayBuffer> {
  const bodies = frames.map((frame) => frame instanceof Uint8Array ? frame : new Uint8Array(frame))
  const sizes: Uint8Array[] = [vintBytes(bodies[0].length)]
  for (let index = 1; index < bodies.length - 1; index += 1) {
    sizes.push(signedVintBytes(bodies[index].length - bodies[index - 1].length))
  }
  return concat(blockHeader(track, relativeTime, 0x06), [bodies.length - 1], ...sizes, ...bodies)
}

export function cluster(timecode: number, blocks: Uint8Array[]): Uint8Array<ArrayBuffer> {
  return el(ID_CLUSTER, concat(uintEl(ID_TIMECODE, timecode), ...blocks))
}
