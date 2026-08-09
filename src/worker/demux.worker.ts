import { MatroskaParser } from './ebml'
import { RangeLoader } from '../lib/range-loader'
import { createDirectFetchClient } from '../lib/direct-media'
import type { DemuxEvent, DemuxRequest, TrackKind } from '../types'

let parser: MatroskaParser | null = null
let ready = false
let fetchClient: ReturnType<typeof createDirectFetchClient> | null = null
/**
 * Highest epoch the main thread has issued. Anything below it was superseded by a
 * later seek, and its reply would be discarded on arrival anyway.
 */
let latestEpoch = 0
/**
 * Requests are handled one at a time. Every handler awaits range reads, so two
 * overlapping invocations would interleave across those awaits while sharing the
 * parser's cursor and end-of-stream flag: a `next` resuming after a `seek` wrote its
 * own cursor back over the freshly resolved one and could latch end-of-stream, which
 * wedged the main thread's fill loop with an empty buffer until the next drag.
 */
let pending: Promise<void> = Promise.resolve()

function post(event: DemuxEvent) {
  if (event.type === 'packets') {
    const transfers = event.packets.map((packet) => packet.data.buffer)
    self.postMessage(event, transfers)
  } else self.postMessage(event)
}

self.onmessage = (message: MessageEvent<DemuxRequest>) => {
  const request = message.data
  // Recorded on arrival, not when the handler runs. Requests are handled one at a
  // time, so a queued request would otherwise never see the newer epochs sitting
  // behind it and could never tell that it had been superseded.
  if (request.type === 'init') latestEpoch = 0
  else if ('epoch' in request && request.epoch > latestEpoch) latestEpoch = request.epoch
  // A throw inside post() must not break the chain for every later request.
  pending = pending.then(() => handle(request)).catch(() => undefined)
}

async function handle(request: DemuxRequest): Promise<void> {
  const epoch = 'epoch' in request ? request.epoch : 0
  try {
    if (request.type === 'init') {
      ready = false
      fetchClient?.close()
      fetchClient = request.fetchPort ? createDirectFetchClient(request.fetchPort) : null
      const loader = new RangeLoader(request.source, undefined, fetchClient?.fetch)
      parser = new MatroskaParser(loader)
      post({ type: 'progress', phase: '加载 TypeScript 解封装器', value: 0.08 })
      post({ type: 'progress', phase: '读取 Matroska 头部', value: 0.1 })
      const metadata = await parser.init()
      post({ type: 'metadata', metadata, probe: loader.probeInfo })
      post({ type: 'progress', phase: '解析首个 Cluster', value: 0.35 })
      const packets = await parser.packetsFor(0)
      ready = true
      post({ type: 'packets', packets, epoch: 0 })
      return
    }
    // init() is asynchronous, so the main thread's fill loop can ask for packets
    // before the parser exists. That is an ordinary race, not a fatal error: reply
    // with an empty batch and let the caller ask again.
    if (!parser || !ready) {
      if (request.type === 'next' || request.type === 'seek' || request.type === 'select-track') {
        post({ type: 'packets', packets: [], epoch })
      }
      return
    }
    // Spending range reads on a position the viewer has already dragged past only
    // delays the batch they are waiting for. The superseding request still replies,
    // so the main thread's in-flight flag is cleared either way.
    if (epoch < latestEpoch && (request.type === 'next' || request.type === 'seek')) return
    if (request.type === 'seek') {
      post({ type: 'progress', phase: '定位关键帧', value: 0.2 })
      post({ type: 'packets', packets: await parser.packetsFor(request.time), epoch })
    } else if (request.type === 'next') {
      const packets = await parser.next()
      if (packets.length) post({ type: 'packets', packets, epoch })
      // An empty batch is only the end of the file when the parser actually walked off
      // the end. Reporting eof for a transient empty read latches the main thread's eof
      // flag, which stops its fill loop for the rest of the session; an empty batch
      // just asks it to try again.
      else if (parser.endOfStream) post({ type: 'eof', epoch })
      else post({ type: 'packets', packets: [], epoch })
    } else if (request.type === 'select-track') {
      // Subtitle tracks are always demuxed, so switching one is purely a UI change
      // and must not rewind the cursor — doing so replayed audio that had already
      // been scheduled and dragged the media clock backwards.
      parser.select(request.kind as TrackKind, request.trackId)
      if (request.kind === 'subtitle') post({ type: 'packets', packets: [], epoch })
      else post({ type: 'packets', packets: await parser.packetsFor(request.time), epoch })
    } else if (request.type === 'close') {
      parser = null
      ready = false
      fetchClient?.close()
      fetchClient = null
      post({ type: 'eof', epoch })
    }
  } catch (error) {
    post({ type: 'error', code: error instanceof Error ? error.message.split(':')[0] : 'DEMUX_ERROR', message: error instanceof Error ? error.message : 'Matroska 解析失败' })
  }
}
