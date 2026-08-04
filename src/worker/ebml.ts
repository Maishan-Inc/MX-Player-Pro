import { codecForTrack } from '../lib/codec'
import { parseBlock } from './ebml-block'
import {
  element, firstElementAllowTruncated, floatValue, text, unsigned, walk, copyBytes, type Element,
} from './ebml-elements'
import type { MKVPacket, PlaybackMetadata, ProbeInfo, TrackInfo, TrackKind } from '../types'
import type { RustDemuxerRuntime } from './wasm-runtime'

/**
 * Reads are declared as ArrayBuffer-backed (never SharedArrayBuffer) so packet
 * payloads sliced out of them satisfy BufferSource for the WebCodecs chunk types.
 */
export interface MediaReader {
  probe(): Promise<ProbeInfo>
  read(offset: number, length: number): Promise<Uint8Array<ArrayBuffer>>
  readWindow(offset: number, minLength: number): Promise<{ bytes: Uint8Array<ArrayBuffer>; base: number }>
  readonly totalSize: number | null
}
interface CuePoint { time: number; offset: number; track: number }

const ID = {
  segment: 0x18538067, info: 0x1549a966, timecodeScale: 0x2ad7b1, duration: 0x4489,
  tracks: 0x1654ae6b, trackEntry: 0xae, trackNumber: 0xd7, trackType: 0x83,
  codecId: 0x86, codecPrivate: 0x63a2, language: 0x22b59c, name: 0x536e,
  defaultDuration: 0x23e383,
  video: 0xe0, pixelWidth: 0xb0, pixelHeight: 0xba, audio: 0xe1,
  samplingFrequency: 0xb5, channels: 0x9f,
  cues: 0x1c53bb6b, cuePoint: 0xbb, cueTime: 0xb3, cueTrackPositions: 0xb7,
  cueTrack: 0xf7, cueClusterPosition: 0xf1, cueRelativePosition: 0xf0,
  seekHead: 0x114d9b74, seek: 0x4dbb, seekId: 0x53ab, seekPosition: 0x53ac,
  cluster: 0x1f43b675, timecode: 0xe7, simpleBlock: 0xa3, blockGroup: 0xa0,
  block: 0xa1, blockDuration: 0x9b, referenceBlock: 0xfb,
}

const CLUSTER_CHILDREN = new Set([
  ID.timecode, 0x5854 /* SilentTracks */, 0xa7 /* Position */, 0xab /* PrevSize */,
  ID.simpleBlock, ID.blockGroup, 0xaf /* EncryptedBlock */,
])

const HEADER_WINDOWS = [1024 * 1024, 4 * 1024 * 1024, 16 * 1024 * 1024]
const CLUSTER_PROBE = 64 * 1024
const MAX_UNBOUNDED_CLUSTER = 64 * 1024 * 1024

function parseTrack(bytes: Uint8Array<ArrayBuffer>, item: Element): TrackInfo | null {
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
  let defaultDurationNs: number | undefined
  walk(bytes, item.data, item.end, (child) => {
    if (child.id === ID.trackNumber) id = unsigned(bytes, child)
    else if (child.id === ID.trackType) type = unsigned(bytes, child)
    else if (child.id === ID.codecId) codecId = text(bytes, child)
    else if (child.id === ID.codecPrivate) codecPrivate = copyBytes(bytes, child)
    else if (child.id === ID.language) language = text(bytes, child)
    else if (child.id === ID.name) name = text(bytes, child)
    else if (child.id === ID.defaultDuration) defaultDurationNs = unsigned(bytes, child)
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
  const track: TrackInfo = { id, kind, codecId, codecPrivate, language, name, width, height, sampleRate, channels, defaultDurationNs }
  track.codec = codecForTrack(track) || undefined
  return track
}

export interface ClusterRead {
  packets: MKVPacket[]
  nextOffset: number
  truncated: boolean
}

export class MatroskaParser {
  private readonly loader: MediaReader
  private readonly selected = new Set<number>()
  private metadata: PlaybackMetadata | null = null
  private cues: CuePoint[] = []
  private clusterIndex: Array<{ offset: number; time: number }> = []
  private defaultDurations = new Map<number, number>()
  private segmentDataStart = 0
  private segmentEnd = Infinity
  private firstClusterOffset = 0
  private cursor = 0
  private atEnd = false
  private readonly wasm: RustDemuxerRuntime

  constructor(loader: MediaReader, wasm: RustDemuxerRuntime = { available: false }) {
    this.loader = loader
    this.wasm = wasm
  }

  get endOfStream(): boolean { return this.atEnd }

  async init(): Promise<PlaybackMetadata> {
    const probe = await this.loader.probe()
    if (probe.cors === 'blocked') throw new Error(`CORS_BLOCKED:${probe.message || ''}`)

    const total = probe.size ?? this.loader.totalSize ?? HEADER_WINDOWS[HEADER_WINDOWS.length - 1]
    let bytes: Uint8Array<ArrayBuffer> = new Uint8Array()
    let segment: Element | null = null
    let sawTracks = false

    // Grow the header window until Segment + Tracks are readable and the first
    // Cluster is located. Most files resolve on the 1 MB read.
    for (const window of HEADER_WINDOWS) {
      bytes = await this.loader.read(0, Math.min(window, total))
      if (this.wasm.available && this.wasm.probe && !this.wasm.probe(bytes)) throw new Error('WASM_EBML_PROBE_FAILED')
      // Segment's declared size spans nearly the whole file, so it is legitimately
      // truncated inside a header window and must be looked up tolerantly.
      segment = firstElementAllowTruncated(bytes, 0, bytes.length, ID.segment)
      if (!segment) {
        if (!element(bytes, 0)) throw new Error('MKV_SEGMENT_NOT_FOUND')
        if (bytes.length >= total) throw new Error('MKV_SEGMENT_NOT_FOUND')
        continue
      }
      sawTracks = Boolean(firstElementAllowTruncated(bytes, segment.data, Math.min(segment.end, bytes.length), ID.tracks)?.truncated === false)
      if (sawTracks || bytes.length >= total) break
    }
    if (!segment) throw new Error('MKV_SEGMENT_NOT_FOUND')

    this.segmentDataStart = segment.data
    this.segmentEnd = segment.unknownSize
      ? (this.loader.totalSize ?? total)
      : Math.min(segment.data + segment.size, this.loader.totalSize ?? Infinity)

    // Pass 1: Info and Tracks. Cues need timecodeScale, so they wait for pass 2.
    let scale = 1_000_000
    let durationTicks = 0
    const tracks: TrackInfo[] = []
    let cuesElement: Element | null = null
    let seekHead: Element | null = null

    walk(bytes, segment.data, Math.min(segment.end, bytes.length), (item) => {
      if (item.id === ID.info) walk(bytes, item.data, item.end, (child) => {
        if (child.id === ID.timecodeScale) scale = unsigned(bytes, child)
        if (child.id === ID.duration) durationTicks = floatValue(bytes, child)
      })
      else if (item.id === ID.tracks) walk(bytes, item.data, item.end, (entry) => {
        if (entry.id === ID.trackEntry) {
          const track = parseTrack(bytes, entry)
          if (track) { tracks.push(track); this.selected.add(track.id) }
        }
      })
      else if (item.id === ID.cues) cuesElement = item
      else if (item.id === ID.seekHead) seekHead = item
    })

    if (!tracks.length) throw new Error('MKV_TRACKS_NOT_FOUND')
    this.defaultDurations = new Map(
      tracks.filter((track) => track.defaultDurationNs).map((track) => [track.id, track.defaultDurationNs as number]),
    )

    // Duration is expressed in TimecodeScale units: seconds = ticks * scale / 1e9.
    this.metadata = {
      tracks,
      duration: durationTicks ? durationTicks * scale / 1_000_000_000 : 0,
      timecodeScale: scale,
    }

    // Pass 2: Cues, now that timecodeScale is known.
    if (cuesElement) this.parseCues(bytes, cuesElement, scale)
    else if (seekHead) await this.loadCuesViaSeekHead(bytes, seekHead, scale)

    // Locating the first Cluster may have to read past the header window, so it runs
    // after metadata exists (it opportunistically parses a Cues it steps over).
    const firstCluster = await this.locateFirstCluster(bytes, segment)
    if (firstCluster < 0) throw new Error('MKV_NO_CLUSTER')
    this.firstClusterOffset = firstCluster
    this.cursor = firstCluster
    this.atEnd = false

    return this.metadata
  }

  /**
   * Find the first Cluster by following top-level declared sizes, reading forward as
   * needed. Elements between Tracks and the first Cluster are routinely larger than
   * the header window — Attachments carrying subtitle fonts or cover art especially —
   * and skipping one only requires its declared size, not its contents.
   */
  private async locateFirstCluster(headerBytes: Uint8Array<ArrayBuffer>, segment: Element): Promise<number> {
    let bytes: Uint8Array<ArrayBuffer> = headerBytes
    let base = 0
    let offset = segment.data
    let guard = 0

    while (offset < this.segmentEnd && guard < 4096) {
      guard += 1
      // Re-window whenever the next element header is not fully in the buffer.
      if (offset < base || offset - base + 16 > bytes.length) {
        const window = await this.loader.readWindow(offset, CLUSTER_PROBE)
        bytes = window.bytes
        base = window.base
        if (offset - base >= bytes.length) return -1
      }
      const item = element(bytes, offset - base)
      if (!item) return -1
      if (item.id === ID.cluster) return offset
      // An unknown-size non-Cluster element cannot be stepped over safely.
      if (item.unknownSize) return -1
      if (item.id === ID.cues && !this.cues.length && !item.truncated) {
        this.parseCues(bytes, item, this.metadata?.timecodeScale ?? 1_000_000)
      }
      const next = base + item.end
      if (next <= offset) return -1
      offset = next
    }
    return -1
  }

  private async loadCuesViaSeekHead(bytes: Uint8Array, seekHead: Element, scale: number): Promise<void> {
    let cuesPosition = -1
    walk(bytes, seekHead.data, seekHead.end, (entry) => {
      if (entry.id !== ID.seek) return
      let id = 0
      let position = -1
      walk(bytes, entry.data, entry.end, (child) => {
        if (child.id === ID.seekId) id = unsigned(bytes, child)
        if (child.id === ID.seekPosition) position = unsigned(bytes, child)
      })
      if (id === ID.cues && position >= 0) cuesPosition = position
    })
    if (cuesPosition < 0) return
    const absolute = this.segmentDataStart + cuesPosition
    try {
      const { bytes: window, base } = await this.loader.readWindow(absolute, CLUSTER_PROBE)
      const header = element(window, absolute - base)
      if (!header || header.id !== ID.cues) return
      const needed = header.end - (absolute - base)
      const full = header.truncated
        ? await this.loader.readWindow(absolute, needed)
        : { bytes: window, base }
      const item = element(full.bytes, absolute - full.base)
      if (item && item.id === ID.cues && !item.truncated) this.parseCues(full.bytes, item, scale)
    } catch {
      // Cues are an optimisation; sequential seek still works without them.
    }
  }

  private parseCues(bytes: Uint8Array, item: Element, scale: number): void {
    const cues: CuePoint[] = []
    walk(bytes, item.data, Math.min(item.end, bytes.length), (point) => {
      if (point.id !== ID.cuePoint) return
      let time = 0
      walk(bytes, point.data, point.end, (child) => {
        if (child.id === ID.cueTime) time = unsigned(bytes, child)
        if (child.id === ID.cueTrackPositions) {
          // Track and cluster position are separate fields. The old code wrote
          // CueTrack into `position`, and since CueTrack precedes
          // CueClusterPosition and is never zero, the real position was never read.
          let track = 0
          let clusterPosition = -1
          walk(bytes, child.data, child.end, (field) => {
            if (field.id === ID.cueTrack) track = unsigned(bytes, field)
            if (field.id === ID.cueClusterPosition) clusterPosition = unsigned(bytes, field)
          })
          if (clusterPosition >= 0) {
            cues.push({ time: time * scale / 1_000_000_000, offset: this.segmentDataStart + clusterPosition, track })
          }
        }
      })
    })
    this.cues = cues.sort((left, right) => left.time - right.time)
  }

  resolveSeekOffset(seconds: number): number {
    const videoTrack = this.metadata?.tracks.find((track) => track.kind === 'video')
    const preferred = videoTrack ? this.cues.filter((cue) => cue.track === videoTrack.id) : []
    const pool = preferred.length ? preferred : this.cues
    let chosen = -1
    for (const cue of pool) {
      if (cue.time <= seconds) chosen = cue.offset
      else break
    }
    if (chosen >= 0) return chosen
    let fallback = -1
    for (const entry of this.clusterIndex) {
      if (entry.time <= seconds) fallback = entry.offset
      else break
    }
    return fallback >= 0 ? fallback : this.firstClusterOffset
  }

  async packetsFor(time = 0): Promise<MKVPacket[]> {
    if (!this.metadata) throw new Error('DEMUX_NOT_INITIALIZED')
    this.cursor = this.resolveSeekOffset(time)
    this.atEnd = false
    return this.next()
  }

  async next(): Promise<MKVPacket[]> {
    if (!this.metadata) throw new Error('DEMUX_NOT_INITIALIZED')
    while (!this.atEnd && this.cursor < this.segmentEnd) {
      const result = await this.readClusterAt(this.cursor)
      // A malformed element that does not advance the cursor would loop forever.
      if (result.nextOffset <= this.cursor) { this.atEnd = true; break }
      this.cursor = result.nextOffset
      if (this.cursor >= this.segmentEnd) this.atEnd = true
      if (result.packets.length) return result.packets.sort((left, right) => left.timestamp - right.timestamp)
      if (result.truncated) break
    }
    this.atEnd = true
    return []
  }

  select(kind: TrackKind, trackId: number): void {
    const track = this.metadata?.tracks.find((candidate) => candidate.id === trackId && candidate.kind === kind)
    if (!track) return
    this.metadata?.tracks.filter((candidate) => candidate.kind === kind).forEach((candidate) => this.selected.delete(candidate.id))
    this.selected.add(trackId)
  }

  /**
   * Read one top-level element at `offset`. A cluster is only parsed once the whole
   * declared extent is buffered, so a block payload can never be cut short — that
   * truncation was what fed partial frames to the decoder.
   */
  private async readClusterAt(offset: number): Promise<ClusterRead> {
    let { bytes, base } = await this.loader.readWindow(offset, CLUSTER_PROBE)
    let local = offset - base
    const header = element(bytes, local)
    if (!header) throw new Error('MKV_CLUSTER_HEADER_INVALID')

    if (header.id !== ID.cluster) {
      // Cues, Tags, Chapters, Void: skip by declared size and keep walking.
      if (header.unknownSize) return { packets: [], nextOffset: this.segmentEnd, truncated: false }
      return { packets: [], nextOffset: base + header.end, truncated: false }
    }

    if (header.unknownSize) return this.readUnboundedCluster(offset)

    const total = (header.data - local) + header.size
    if (offset + total > this.segmentEnd) {
      // Declared length runs past the end of the file: emit whatever leading blocks
      // are complete, then stop rather than handing a partial frame to the decoder.
      const available = Math.min(bytes.length - local, Math.max(0, this.segmentEnd - offset))
      const packets = this.parseClusterBody(bytes, local, local + available, offset)
      return { packets, nextOffset: this.segmentEnd, truncated: true }
    }

    if (total > bytes.length - local) {
      const grown = await this.loader.readWindow(offset, total)
      bytes = grown.bytes
      base = grown.base
      local = offset - base
      if (total > bytes.length - local) {
        const available = Math.max(0, bytes.length - local)
        const packets = this.parseClusterBody(bytes, local, local + available, offset)
        return { packets, nextOffset: this.segmentEnd, truncated: true }
      }
    }

    const packets = this.parseClusterBody(bytes, local, local + total, offset)
    return { packets, nextOffset: offset + total, truncated: false }
  }

  /** Unknown-size cluster: children run until an id that is not a legal cluster child. */
  private async readUnboundedCluster(offset: number): Promise<ClusterRead> {
    let length = CLUSTER_PROBE
    for (;;) {
      const { bytes, base } = await this.loader.readWindow(offset, length)
      const local = offset - base
      const header = element(bytes, local)
      if (!header) throw new Error('MKV_CLUSTER_HEADER_INVALID')
      let scan = header.data
      let boundary = -1
      let ranOut = false
      while (scan < bytes.length) {
        const child = element(bytes, scan)
        if (!child) { ranOut = true; break }
        if (!CLUSTER_CHILDREN.has(child.id)) { boundary = scan; break }
        if (child.truncated) { ranOut = true; break }
        scan = child.end
      }
      if (boundary < 0 && ranOut && bytes.length - local >= length && length < MAX_UNBOUNDED_CLUSTER) {
        length *= 4
        continue
      }
      const end = boundary >= 0 ? boundary : Math.min(scan, bytes.length)
      if (boundary < 0 && length >= MAX_UNBOUNDED_CLUSTER) throw new Error('MKV_CLUSTER_UNBOUNDED')
      const packets = this.parseClusterBody(bytes, local, end, offset)
      return { packets, nextOffset: base + end, truncated: false }
    }
  }

  private parseClusterBody(bytes: Uint8Array<ArrayBuffer>, start: number, end: number, absoluteOffset: number): MKVPacket[] {
    const header = element(bytes, start)
    if (!header) return []
    let clusterTime = 0
    const packets: MKVPacket[] = []
    const trackIds = new Set(this.selected)
    const scale = this.metadata?.timecodeScale || 1_000_000

    walk(bytes, header.data, Math.min(end, bytes.length), (item) => {
      if (item.id === ID.timecode) {
        clusterTime = unsigned(bytes, item)
        this.recordCluster(absoluteOffset, clusterTime * scale / 1_000_000_000)
        return
      }
      if (item.id === ID.simpleBlock) {
        packets.push(...parseBlock(bytes, item, {
          clusterTime, timecodeScale: scale, trackIds, kind: 'simple',
          defaultDurations: this.defaultDurations,
        }))
        return
      }
      if (item.id === ID.blockGroup) {
        // ReferenceBlock may follow Block, so collect the group's context first.
        let groupHasReference = false
        let blockDurationTicks: number | undefined
        walk(bytes, item.data, item.end, (child) => {
          if (child.id === ID.referenceBlock) groupHasReference = true
          if (child.id === ID.blockDuration) blockDurationTicks = unsigned(bytes, child)
        })
        walk(bytes, item.data, item.end, (child) => {
          if (child.id !== ID.block) return
          packets.push(...parseBlock(bytes, child, {
            clusterTime, timecodeScale: scale, trackIds, kind: 'group',
            groupHasReference, blockDurationTicks, defaultDurations: this.defaultDurations,
          }))
        })
      }
    })
    return packets
  }

  private recordCluster(offset: number, time: number): void {
    if (this.clusterIndex.some((entry) => entry.offset === offset)) return
    this.clusterIndex.push({ offset, time })
    this.clusterIndex.sort((left, right) => left.offset - right.offset)
  }
}
