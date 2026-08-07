import { MatroskaParser } from './ebml'
import { RangeLoader } from '../lib/range-loader'
import type { DemuxEvent, DemuxRequest, TrackKind } from '../types'

let parser: MatroskaParser | null = null
let ready = false

function post(event: DemuxEvent) {
  if (event.type === 'packets') {
    const transfers = event.packets.map((packet) => packet.data.buffer)
    self.postMessage(event, transfers)
  } else self.postMessage(event)
}

self.onmessage = async (message: MessageEvent<DemuxRequest>) => {
  const request = message.data
  const epoch = 'epoch' in request ? request.epoch : 0
  try {
    if (request.type === 'init') {
      ready = false
      const loader = new RangeLoader(request.source)
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
    if (request.type === 'seek') {
      post({ type: 'progress', phase: '定位关键帧', value: 0.2 })
      post({ type: 'packets', packets: await parser.packetsFor(request.time), epoch })
    } else if (request.type === 'next') {
      const packets = await parser.next()
      if (packets.length) post({ type: 'packets', packets, epoch })
      else post({ type: 'eof', epoch })
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
      post({ type: 'eof', epoch })
    }
  } catch (error) {
    post({ type: 'error', code: error instanceof Error ? error.message.split(':')[0] : 'DEMUX_ERROR', message: error instanceof Error ? error.message : 'Matroska 解析失败' })
  }
}
