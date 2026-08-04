import { signed16, vint, type Element } from './ebml-elements'
import type { MKVPacket } from '../types'

export interface BlockContext {
  clusterTime: number
  timecodeScale: number
  trackIds: Set<number>
  defaultDurations?: Map<number, number>
  blockDurationTicks?: number
  kind: 'simple' | 'group'
  groupHasReference?: boolean
}

/**
 * Xiph sizes are a run of 0xFF bytes terminated by a byte below 0xFF.
 * The last frame is implicit, so only frameCount - 1 sizes are stored.
 */
function xiphSizes(bytes: Uint8Array, start: number, end: number, count: number): { sizes: number[]; offset: number } | null {
  const sizes: number[] = []
  let offset = start
  for (let index = 0; index < count; index += 1) {
    let size = 0
    for (;;) {
      if (offset >= end) return null
      const byte = bytes[offset]
      offset += 1
      size += byte
      if (byte !== 0xff) break
    }
    sizes.push(size)
  }
  return { sizes, offset }
}

/**
 * EBML lacing stores the first size as an unsigned vint and every following one
 * as a signed delta, range-shifted by 2^(7 * length - 1) - 1.
 */
function ebmlSizes(bytes: Uint8Array, start: number, end: number, count: number): { sizes: number[]; offset: number } | null {
  const sizes: number[] = []
  let offset = start
  const first = vint(bytes, offset)
  if (!first || offset + first.length > end) return null
  offset += first.length
  sizes.push(first.value)
  for (let index = 1; index < count; index += 1) {
    const delta = vint(bytes, offset)
    if (!delta || offset + delta.length > end) return null
    offset += delta.length
    const shift = 2 ** (7 * delta.length - 1) - 1
    const size = sizes[sizes.length - 1] + (delta.value - shift)
    if (size < 0) return null
    sizes.push(size)
  }
  return { sizes, offset }
}

export function parseBlock(bytes: Uint8Array, item: Element, context: BlockContext): MKVPacket[] {
  const end = Math.min(item.end, bytes.length)
  if (end - item.data < 4) return []
  const trackVint = vint(bytes, item.data)
  if (!trackVint || item.data + trackVint.length + 3 > end) return []
  const trackId = trackVint.value
  if (!context.trackIds.has(trackId)) return []

  const relative = signed16(bytes, item.data + trackVint.length)
  const flags = bytes[item.data + trackVint.length + 2]
  const payloadStart = item.data + trackVint.length + 3
  const lacing = (flags & 0x06) >> 1

  // A SimpleBlock carries the keyframe flag in bit 0x80. In a BlockGroup that bit
  // is reserved, and the block is a keyframe only when no ReferenceBlock is present.
  const key = context.kind === 'simple' ? Boolean(flags & 0x80) : !context.groupHasReference

  const baseTimestamp = Math.round((context.clusterTime + relative) * context.timecodeScale / 1000)
  const defaultDurationNs = context.defaultDurations?.get(trackId)
  const blockDurationUs = context.blockDurationTicks === undefined
    ? undefined
    : Math.round(context.blockDurationTicks * context.timecodeScale / 1000)

  if (lacing === 0) {
    const duration = defaultDurationNs !== undefined
      ? Math.round(defaultDurationNs / 1000)
      : blockDurationUs ?? 0
    return [{
      trackId,
      timestamp: baseTimestamp,
      duration,
      key,
      data: bytes.slice(payloadStart, end) as Uint8Array<ArrayBuffer>,
    }]
  }

  if (payloadStart >= end) return []
  const frameCount = bytes[payloadStart] + 1
  if (frameCount < 1) return []
  let offset = payloadStart + 1
  let sizes: number[]

  if (lacing === 2) {
    const remaining = end - offset
    if (remaining <= 0 || remaining % frameCount !== 0) return []
    sizes = new Array<number>(frameCount).fill(remaining / frameCount)
  } else {
    const parsed = lacing === 1
      ? xiphSizes(bytes, offset, end, frameCount - 1)
      : ebmlSizes(bytes, offset, end, frameCount - 1)
    if (!parsed) return []
    offset = parsed.offset
    const total = parsed.sizes.reduce((sum, size) => sum + size, 0)
    const remaining = end - offset
    if (total > remaining) return []
    sizes = [...parsed.sizes, remaining - total]
  }

  if (sizes.some((size) => size < 0)) return []
  const frameDurationUs = defaultDurationNs !== undefined
    ? Math.round(defaultDurationNs / 1000)
    : blockDurationUs !== undefined
      ? Math.round(blockDurationUs / frameCount)
      : 0

  const packets: MKVPacket[] = []
  for (let index = 0; index < sizes.length; index += 1) {
    const size = sizes[index]
    if (offset + size > end) return []
    packets.push({
      trackId,
      timestamp: baseTimestamp + index * frameDurationUs,
      duration: frameDurationUs,
      key,
      // Each packet must own a distinct ArrayBuffer: the worker puts every
      // packet.data.buffer into one postMessage transfer list, and duplicate or
      // overlapping buffers there throw DataCloneError.
      data: bytes.slice(offset, offset + size) as Uint8Array<ArrayBuffer>,
    })
    offset += size
  }
  return packets
}
