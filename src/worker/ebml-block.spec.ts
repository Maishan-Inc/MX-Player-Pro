import { describe, expect, it } from 'vitest'
import { element } from './ebml-elements'
import { parseBlock, type BlockContext } from './ebml-block'
import {
  ID_SIMPLE_BLOCK, blockBody, ebmlLacedBody, el, fixedLacedBody, xiphLacedBody,
} from './__fixtures__/ebml-writer'

const TRACKS = new Set([1])

function parse(body: Uint8Array, overrides: Partial<BlockContext> = {}) {
  const bytes = el(ID_SIMPLE_BLOCK, body)
  const item = element(bytes, 0)
  if (!item) throw new Error('fixture did not parse')
  return parseBlock(bytes, item, {
    clusterTime: 0, timecodeScale: 1_000_000, trackIds: TRACKS, kind: 'simple', ...overrides,
  })
}

describe('keyframe semantics', () => {
  it('reads the keyframe flag from a SimpleBlock', () => {
    expect(parse(blockBody(1, 0, 0x80, [1, 2, 3]))[0].key).toBe(true)
  })

  // Regression: readCluster used to pass keyDefault=true for every SimpleBlock, so
  // `keyDefault || (flags & 0x80)` was a tautology and delta frames were labelled
  // keyframes. That defeats post-seek keyframe discipline in the decoder.
  it('treats a SimpleBlock without the flag as a delta frame', () => {
    expect(parse(blockBody(1, 0, 0x00, [1, 2, 3]))[0].key).toBe(false)
  })

  it('treats a BlockGroup without ReferenceBlock as a keyframe', () => {
    const packets = parse(blockBody(1, 0, 0x00, [1, 2, 3]), { kind: 'group', groupHasReference: false })
    expect(packets[0].key).toBe(true)
  })

  it('treats a BlockGroup with ReferenceBlock as a delta frame', () => {
    const packets = parse(blockBody(1, 0, 0x80, [1, 2, 3]), { kind: 'group', groupHasReference: true })
    expect(packets[0].key).toBe(false)
  })

  it('parses a block whose invisible flag is set', () => {
    expect(parse(blockBody(1, 0, 0x88, [1, 2, 3]))).toHaveLength(1)
  })

  it('ignores blocks for unselected tracks', () => {
    expect(parse(blockBody(9, 0, 0x80, [1, 2, 3]))).toEqual([])
  })
})

describe('timestamps', () => {
  it('scales the cluster-relative timecode to microseconds', () => {
    const packets = parse(blockBody(1, 40, 0x80, [1]), { clusterTime: 1000 })
    expect(packets[0].timestamp).toBe(1_040_000)
  })

  it('handles a negative relative timecode', () => {
    const packets = parse(blockBody(1, -20, 0x80, [1]), { clusterTime: 100 })
    expect(packets[0].timestamp).toBe(80_000)
  })

  it('fills duration from BlockDuration when present', () => {
    const packets = parse(blockBody(1, 0, 0x80, [1]), { blockDurationTicks: 42 })
    expect(packets[0].duration).toBe(42_000)
  })

  // Subtitle tracks carry a per-cue BlockDuration inside a BlockGroup. Letting a
  // track-level DefaultDuration win gave every cue the same wrong on-screen time.
  it('prefers BlockDuration over DefaultDuration', () => {
    const packets = parse(blockBody(1, 0, 0x80, [1]), {
      blockDurationTicks: 42,
      defaultDurations: new Map([[1, 20_000_000]]),
    })
    expect(packets[0].duration).toBe(42_000)
  })

  it('uses DefaultDuration when the block declares none', () => {
    const packets = parse(blockBody(1, 0, 0x80, [1]), {
      defaultDurations: new Map([[1, 20_000_000]]),
    })
    expect(packets[0].duration).toBe(20_000)
  })
})

describe('lacing', () => {
  it('returns one packet with an identical payload when unlaced', () => {
    const packets = parse(blockBody(1, 0, 0x80, [9, 8, 7, 6]))
    expect(packets).toHaveLength(1)
    expect(Array.from(packets[0].data)).toEqual([9, 8, 7, 6])
  })

  it('splits Xiph lacing, including a 300-byte size run', () => {
    const big = new Uint8Array(300).fill(3)
    const packets = parse(xiphLacedBody(1, 0, [big, new Uint8Array([1, 1]), new Uint8Array([2, 2, 2])]))
    expect(packets.map((packet) => packet.data.length)).toEqual([300, 2, 3])
    expect(Array.from(packets[1].data)).toEqual([1, 1])
  })

  it('splits fixed lacing into equal frames', () => {
    const packets = parse(fixedLacedBody(1, 0, [[1, 1], [2, 2], [3, 3]]))
    expect(packets.map((packet) => packet.data.length)).toEqual([2, 2, 2])
    expect(Array.from(packets[2].data)).toEqual([3, 3])
  })

  it('rejects fixed lacing that does not divide evenly, without throwing', () => {
    const body = fixedLacedBody(1, 0, [[1, 1], [2, 2]])
    const trimmed = body.subarray(0, body.length - 1)
    expect(parse(trimmed)).toEqual([])
  })

  it('splits EBML lacing with positive and negative deltas', () => {
    const packets = parse(ebmlLacedBody(1, 0, [
      new Uint8Array(10).fill(1), new Uint8Array(4).fill(2), new Uint8Array(7).fill(3),
    ]))
    expect(packets.map((packet) => packet.data.length)).toEqual([10, 4, 7])
    expect(Array.from(packets[1].data)).toEqual([2, 2, 2, 2])
  })

  it('spaces laced frames by DefaultDuration', () => {
    const packets = parse(fixedLacedBody(1, 0, [[1, 1], [2, 2], [3, 3]]), {
      defaultDurations: new Map([[1, 20_000_000]]),
    })
    expect(packets.map((packet) => packet.timestamp)).toEqual([0, 20_000, 40_000])
  })

  it('splits BlockDuration across laced frames', () => {
    const packets = parse(fixedLacedBody(1, 0, [[1, 1], [2, 2]]), { blockDurationTicks: 40 })
    expect(packets.map((packet) => packet.timestamp)).toEqual([0, 20_000])
  })

  it('shares one timestamp when no duration hint exists', () => {
    const packets = parse(fixedLacedBody(1, 0, [[1, 1], [2, 2]]))
    expect(packets.map((packet) => packet.timestamp)).toEqual([0, 0])
  })

  // The worker transfers every packet.data.buffer in a single postMessage transfer
  // list; duplicate or overlapping buffers there throw DataCloneError.
  it('gives every laced packet its own ArrayBuffer', () => {
    const packets = parse(fixedLacedBody(1, 0, [[1, 1], [2, 2], [3, 3]]))
    const buffers = packets.map((packet) => packet.data.buffer)
    expect(new Set(buffers).size).toBe(packets.length)
    expect(buffers.every((buffer) => buffer.byteLength === 2)).toBe(true)
  })

  it('rejects laced sizes that run past the block end', () => {
    const body = xiphLacedBody(1, 0, [new Uint8Array(200).fill(1), new Uint8Array([2])])
    const trimmed = body.subarray(0, body.length - 150)
    expect(parse(trimmed)).toEqual([])
  })
})
