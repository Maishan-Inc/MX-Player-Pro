import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { DemuxEvent, DemuxRequest } from '../types'

/**
 * Drives the worker's message loop directly. The two behaviours locked in here are the
 * ones that used to freeze playback after repeated dragging of the progress bar:
 * overlapping requests must not interleave over the parser's cursor, and an empty batch
 * must not be reported as end-of-stream unless the parser really reached the end.
 */

/** Records entry/exit of every parser call so overlap is detectable. */
const trace: string[] = []
let active = 0
let overlapped = false

/**
 * Yield across several microtasks, the way a real range read does. If the worker ever
 * stops serialising, a second handler runs inside this window and `overlapped` trips.
 */
async function work(label: string): Promise<void> {
  active += 1
  if (active > 1) overlapped = true
  trace.push(`enter:${label}`)
  for (let turn = 0; turn < 4; turn += 1) await Promise.resolve()
  active -= 1
  trace.push(`exit:${label}`)
}

const parserState = { endOfStream: false, nextResult: [] as unknown[] }

vi.mock('./ebml', () => ({
  MatroskaParser: class {
    get endOfStream() { return parserState.endOfStream }
    async init() {
      await work('init')
      return { tracks: [{ id: 1, kind: 'video', codecId: 'V_MPEG4/ISO/AVC' }], duration: 10, timecodeScale: 1_000_000 }
    }
    async packetsFor(time: number) {
      await work(`packetsFor:${time}`)
      return parserState.nextResult
    }
    async next() {
      await work('next')
      return parserState.nextResult
    }
    select() { /* not exercised here */ }
  },
}))

vi.mock('../lib/range-loader', () => ({
  RangeLoader: class { get probeInfo() { return { status: 200, cors: 'ok' } } },
}))

let posted: DemuxEvent[] = []
let deliver: (request: DemuxRequest) => void

/** Run the microtask queue out so the worker's request chain reaches idle. */
async function settle() {
  for (let turn = 0; turn < 200; turn += 1) await Promise.resolve()
}

beforeEach(async () => {
  trace.length = 0
  active = 0
  overlapped = false
  posted = []
  parserState.endOfStream = false
  parserState.nextResult = []
  const fakeSelf = {
    onmessage: null as ((event: MessageEvent<DemuxRequest>) => void) | null,
    postMessage: (event: DemuxEvent) => { posted.push(event) },
  }
  ;(globalThis as unknown as { self: unknown }).self = fakeSelf
  vi.resetModules()
  await import('./demux.worker')
  deliver = (request) => fakeSelf.onmessage?.({ data: request } as MessageEvent<DemuxRequest>)
})

afterEach(() => {
  delete (globalThis as unknown as { self?: unknown }).self
})

async function initWorker() {
  parserState.nextResult = [{ trackId: 1, timestamp: 0, data: new Uint8Array(1), key: true, duration: 0 }]
  deliver({ type: 'init', source: { kind: 'url', url: 'x' } } as unknown as DemuxRequest)
  await settle()
  trace.length = 0
  posted = []
}

describe('demux worker message loop', () => {
  it('serialises overlapping requests so a seek cannot race an in-flight next', async () => {
    await initWorker()

    // Exactly the sequence a drag produces: the fill loop already asked for more when
    // the seek lands, so both requests are queued in the worker at once.
    deliver({ type: 'next', epoch: 0 } as DemuxRequest)
    deliver({ type: 'seek', time: 42, epoch: 1 } as DemuxRequest)
    await settle()

    expect(overlapped).toBe(false)
    // The superseded next is skipped outright rather than spending range reads on a
    // position the viewer already dragged past.
    expect(trace).toEqual(['enter:packetsFor:42', 'exit:packetsFor:42'])
  })

  it('never lets two parser calls overlap across a burst of drags', async () => {
    await initWorker()

    deliver({ type: 'next', epoch: 0 } as DemuxRequest)
    deliver({ type: 'seek', time: 10, epoch: 1 } as DemuxRequest)
    deliver({ type: 'seek', time: 30, epoch: 2 } as DemuxRequest)
    deliver({ type: 'seek', time: 55, epoch: 3 } as DemuxRequest)
    await settle()

    expect(overlapped).toBe(false)
  })

  it('always answers the newest epoch so the fill loop never stays in flight', async () => {
    await initWorker()

    deliver({ type: 'next', epoch: 0 } as DemuxRequest)
    deliver({ type: 'seek', time: 10, epoch: 1 } as DemuxRequest)
    deliver({ type: 'seek', time: 55, epoch: 2 } as DemuxRequest)
    await settle()

    const replies = posted.filter((event) => event.type === 'packets' || event.type === 'eof')
    expect(replies).toHaveLength(1)
    expect(replies[0]).toMatchObject({ type: 'packets', epoch: 2 })
  })

  it('reports an empty batch as a retry, not as end of stream', async () => {
    await initWorker()
    parserState.nextResult = []
    parserState.endOfStream = false

    deliver({ type: 'next', epoch: 0 } as DemuxRequest)
    await settle()

    // eof latches the main thread's fill loop for the rest of the session, so it may
    // only be sent when the parser actually walked off the end of the segment.
    expect(posted.some((event) => event.type === 'eof')).toBe(false)
    expect(posted).toContainEqual({ type: 'packets', packets: [], epoch: 0 })
  })

  it('still reports end of stream once the parser has run out', async () => {
    await initWorker()
    parserState.nextResult = []
    parserState.endOfStream = true

    deliver({ type: 'next', epoch: 0 } as DemuxRequest)
    await settle()

    expect(posted).toContainEqual({ type: 'eof', epoch: 0 })
  })
})
