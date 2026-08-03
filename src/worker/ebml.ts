import { RangeLoader } from '../lib/range-loader'
import { codecForTrack } from '../lib/codec'
import type { MKVPacket, PlaybackMetadata, TrackInfo, TrackKind } from '../types'
import type { RustDemuxerRuntime } from './wasm-runtime'

interface Element { id: number; data: number; size: number; end: number }
interface CuePoint { time: number; position: number }

const ID = {
  segment: 0x18538067, info: 0x1549a966, timecodeScale: 0x2ad7b1, duration: 0x4489,
  tracks: 0x1654ae6b, trackEntry: 0xae, trackNumber: 0xd7, trackType: 0x83,
  codecId: 0x86, codecPrivate: 0x63a2, language: 0x22b59c, name: 0x536e,
  video: 0xe0, pixelWidth: 0xb0, pixelHeight: 0xba, audio: 0xe1,
  samplingFrequency: 0xb5, channels: 0x9f, cues: 0x1c53bb6b, cuePoint: 0xbb,
  cueTime: 0xb3, cueTrackPositions: 0xb7, cueTrack: 0xf7, cueClusterPosition: 0xf1,
  cluster: 0x1f43b675, timecode: 0xe7, simpleBlock: 0xa3, blockGroup: 0xa0,
  block: 0xa1, blockDuration: 0x9b,
}

function vint(bytes: Uint8Array, offset: number): { length: number; value: number; unknown: boolean } | null {
  if (offset >= bytes.length) return null
  const first = bytes[offset]
  let mask = 0x80
  let length = 1
  while (length <= 8 && !(first & mask)) { mask >>= 1; length += 1 }
  if (length > 8 || offset + length > bytes.length) return null
  let value = first & (mask - 1)
  for (let index = 1; index < length; index += 1) value = value * 256 + bytes[offset + index]
  const unknown = value === (2 ** (7 * length) - 1)
  return { length, value, unknown }
}

function element(bytes: Uint8Array, offset: number): Element | null {
  if (offset >= bytes.length) return null
  const first = bytes[offset]
  let mask = 0x80
  let idLength = 1
  while (idLength <= 4 && !(first & mask)) { mask >>= 1; idLength += 1 }
  if (idLength > 4 || offset + idLength >= bytes.length) return null
  let id = 0
  for (let index = 0; index < idLength; index += 1) id = id * 256 + bytes[offset + index]
  const size = vint(bytes, offset + idLength)
  if (!size) return null
  const data = offset + idLength + size.length
  const resolvedSize = size.unknown ? bytes.length - data : Math.min(size.value, bytes.length - data)
  return { id, data, size: resolvedSize, end: data + resolvedSize }
}

function walk(bytes: Uint8Array, start: number, end: number, visit: (item: Element) => void) {
  let offset = start
  while (offset < end) {
    const item = element(bytes, offset)
    if (!item || item.end <= offset) break
    visit(item)
    offset = item.end
  }
}

function firstElement(bytes: Uint8Array, start: number, end: number, id: number): Element | null {
  let found: Element | null = null
  walk(bytes, start, end, (item) => { if (!found && item.id === id) found = item })
  return found
}

function unsigned(bytes: Uint8Array, item: Element): number {
  let value = 0
  for (let index = item.data; index < item.end; index += 1) value = value * 256 + bytes[index]
  return value
}

function signed16(bytes: Uint8Array, offset: number): number {
  const value = (bytes[offset] << 8) | bytes[offset + 1]
  return value & 0x8000 ? value - 0x10000 : value
}

function text(bytes: Uint8Array, item: Element): string {
  return new TextDecoder().decode(bytes.subarray(item.data, item.end)).replace(/\0+$/, '')
}

function floatValue(bytes: Uint8Array, item: Element): number {
  const view = new DataView(bytes.buffer, bytes.byteOffset + item.data, item.size)
  if (item.size === 4) return view.getFloat32(0)
  if (item.size === 8) return view.getFloat64(0)
  return unsigned(bytes, item)
}

function copyBytes(bytes: Uint8Array, item: Element): ArrayBuffer {
  return bytes.slice(item.data, item.end).buffer
}

function parseTrack(bytes: Uint8Array, item: Element): TrackInfo | null {
  let id = 0
  let type = 0
  let codecId = ''
  let codecPrivate: ArrayBuffer | undefined
  let language: string | undefined
  let name: string | undefined
  let width: number | undefined
  let height: number | undefined
  let sampleRate: number | undefined
  let channels: number | undefined
  walk(bytes, item.data, item.end, (child) => {
    if (child.id === ID.trackNumber) id = unsigned(bytes, child)
    else if (child.id === ID.trackType) type = unsigned(bytes, child)
    else if (child.id === ID.codecId) codecId = text(bytes, child)
    else if (child.id === ID.codecPrivate) codecPrivate = copyBytes(bytes, child)
    else if (child.id === ID.language) language = text(bytes, child)
    else if (child.id === ID.name) name = text(bytes, child)
    else if (child.id === ID.video) walk(bytes, child.data, child.end, (video) => {
      if (video.id === ID.pixelWidth) width = unsigned(bytes, video)
      if (video.id === ID.pixelHeight) height = unsigned(bytes, video)
    })
    else if (child.id === ID.audio) walk(bytes, child.data, child.end, (audio) => {
      if (audio.id === ID.samplingFrequency) sampleRate = Math.round(floatValue(bytes, audio))
      if (audio.id === ID.channels) channels = unsigned(bytes, audio)
    })
  })
  const kind: TrackKind | null = type === 1 ? 'video' : type === 2 ? 'audio' : type === 17 ? 'subtitle' : null
  if (!id || !kind || !codecId) return null
  const track: TrackInfo = { id, kind, codecId, codecPrivate, language, name, width, height, sampleRate, channels }
  track.codec = codecForTrack(track) || undefined
  return track
}

function parseBlock(bytes: Uint8Array, item: Element, clusterTime: number, timecodeScale: number, trackIds: Set<number>, keyDefault: boolean): MKVPacket[] {
  if (item.size < 4) return []
  const trackVint = vint(bytes, item.data)
  if (!trackVint || item.data + trackVint.length + 3 > item.end) return []
  const trackId = trackVint.value
  if (!trackIds.has(trackId)) return []
  const relative = signed16(bytes, item.data + trackVint.length)
  const flags = bytes[item.data + trackVint.length + 2]
  const payloadOffset = item.data + trackVint.length + 3
  const lacing = (flags & 0x06) >> 1
  if (lacing !== 0) return []
  return [{
    trackId,
    timestamp: Math.round((clusterTime + relative) * timecodeScale / 1000),
    duration: 0,
    key: keyDefault || Boolean(flags & 0x80),
    data: bytes.slice(payloadOffset, item.end) as Uint8Array<ArrayBuffer>,
  }]
}

export class MatroskaParser {
  private readonly loader: RangeLoader
  private readonly selected = new Set<number>()
  private metadata: PlaybackMetadata | null = null
  private cues: CuePoint[] = []
  private clusters: number[] = []
  private nextCluster = 0
  private segmentData = 0
  private initialBytes: Uint8Array<ArrayBufferLike> = new Uint8Array()

  private readonly wasm: RustDemuxerRuntime

  constructor(loader: RangeLoader, wasm: RustDemuxerRuntime = { available: false }) {
    this.loader = loader
    this.wasm = wasm
  }

  async init(): Promise<PlaybackMetadata> {
    const probe = await this.loader.probe()
    if (probe.cors === 'blocked') throw new Error(`CORS_BLOCKED:${probe.message || ''}`)
    const bytes = await this.loader.read(0, Math.min(probe.size || 32 * 1024 * 1024, 32 * 1024 * 1024))
    this.initialBytes = bytes
    if (this.wasm.available && this.wasm.probe && !this.wasm.probe(bytes)) throw new Error('WASM_EBML_PROBE_FAILED')
    const segment = firstElement(bytes, 0, bytes.length, ID.segment)
    if (!segment) throw new Error('MKV_SEGMENT_NOT_FOUND')
    this.segmentData = segment.data
    let scale = 1_000_000
    let durationTicks = 0
    const tracks: TrackInfo[] = []
    walk(bytes, segment.data, segment.end, (item) => {
      if (item.id === ID.info) walk(bytes, item.data, item.end, (child) => {
        if (child.id === ID.timecodeScale) scale = unsigned(bytes, child)
        if (child.id === ID.duration) durationTicks = floatValue(bytes, child)
      })
      if (item.id === ID.tracks) walk(bytes, item.data, item.end, (entry) => {
        if (entry.id === ID.trackEntry) {
          const track = parseTrack(bytes, entry)
          if (track) { tracks.push(track); this.selected.add(track.id) }
        }
      })
      if (item.id === ID.cues) this.parseCues(bytes, item)
    })
    this.clusters = this.findClusters(bytes)
    this.metadata = { tracks, duration: durationTicks ? durationTicks * scale / 1_000_000 : 0, timecodeScale: scale }
    if (!tracks.length) throw new Error('MKV_TRACKS_NOT_FOUND')
    return this.metadata
  }

  async packetsFor(time = 0): Promise<MKVPacket[]> {
    if (!this.metadata) throw new Error('DEMUX_NOT_INITIALIZED')
    const clusterIndex = this.findClusterIndex(time)
    this.nextCluster = clusterIndex
    const packets: MKVPacket[] = []
    const trackIds = new Set(this.selected)
    for (let count = 0; count < 3 && this.nextCluster < this.clusters.length; count += 1) {
      const cluster = await this.readCluster(this.clusters[this.nextCluster], trackIds)
      packets.push(...cluster)
      this.nextCluster += 1
    }
    return packets.sort((left, right) => left.timestamp - right.timestamp)
  }

  async next(): Promise<MKVPacket[]> {
    if (!this.metadata || this.nextCluster >= this.clusters.length) return []
    const packets = await this.readCluster(this.clusters[this.nextCluster], new Set(this.selected))
    this.nextCluster += 1
    return packets
  }

  select(kind: TrackKind, trackId: number) {
    const track = this.metadata?.tracks.find((candidate) => candidate.id === trackId && candidate.kind === kind)
    if (!track) return
    this.metadata?.tracks.filter((candidate) => candidate.kind === kind).forEach((candidate) => this.selected.delete(candidate.id))
    this.selected.add(trackId)
  }

  private parseCues(bytes: Uint8Array, item: Element) {
    walk(bytes, item.data, item.end, (point) => {
      if (point.id !== ID.cuePoint) return
      let time = 0
      let position = 0
      walk(bytes, point.data, point.end, (child) => {
        if (child.id === ID.cueTime) time = unsigned(bytes, child)
        if (child.id === ID.cueTrackPositions) walk(bytes, child.data, child.end, (positionItem) => {
          if (positionItem.id === ID.cueTrack) position = unsigned(bytes, positionItem)
          if (positionItem.id === ID.cueClusterPosition && !position) position = unsigned(bytes, positionItem)
        })
      })
      if (position) this.cues.push({ time, position: this.segmentData + position })
    })
  }

  private findClusters(bytes: Uint8Array): number[] {
    const result: number[] = []
    for (let index = this.segmentData; index + 4 < bytes.length; index += 1) {
      if (bytes[index] === 0x1f && bytes[index + 1] === 0x43 && bytes[index + 2] === 0xb6 && bytes[index + 3] === 0x75) result.push(index)
    }
    return [...new Set(result)].sort((left, right) => left - right)
  }

  private findClusterIndex(time: number): number {
    const cueIndex = this.cues.findIndex((cue, index) => {
      const next = this.cues[index + 1]
      return cue.time <= time && (!next || next.time > time)
    })
    if (cueIndex >= 0) {
      const position = this.cues[cueIndex].position
      const clusterIndex = this.clusters.findIndex((cluster) => cluster >= position)
      if (clusterIndex >= 0) return clusterIndex
    }
    return Math.max(0, Math.floor(time / 10))
  }

  private async readCluster(offset: number, trackIds: Set<number>): Promise<MKVPacket[]> {
    const bytes = offset < this.initialBytes.length ? this.initialBytes : await this.loader.readChunk(offset)
    const cluster = element(bytes, offset < this.initialBytes.length ? offset : 0)
    if (!cluster) return []
    let clusterTime = 0
    const packets: MKVPacket[] = []
    walk(bytes, cluster.data, cluster.end, (item) => {
      if (item.id === ID.timecode) clusterTime = unsigned(bytes, item)
      if (item.id === ID.simpleBlock) packets.push(...parseBlock(bytes, item, clusterTime, this.metadata?.timecodeScale || 1_000_000, trackIds, true))
      if (item.id === ID.blockGroup) walk(bytes, item.data, item.end, (child) => {
        if (child.id === ID.block) packets.push(...parseBlock(bytes, child, clusterTime, this.metadata?.timecodeScale || 1_000_000, trackIds, false))
      })
    })
    return packets
  }
}
