import { describe, expect, it } from 'vitest'
import { MatroskaParser, type MediaReader } from './ebml'
import {
  ID_CLUSTER, cluster, concat, el, elWithDeclaredSize, floatEl, idBytes,
  simpleBlock, stringEl, uintEl,
} from './__fixtures__/ebml-writer'

const ID = {
  ebmlHeader: 0x1a45dfa3, segment: 0x18538067, info: 0x1549a966,
  timecodeScale: 0x2ad7b1, duration: 0x4489, tracks: 0x1654ae6b,
  trackEntry: 0xae, trackNumber: 0xd7, trackType: 0x83, codecId: 0x86,
  codecPrivate: 0x63a2, video: 0xe0, pixelWidth: 0xb0, pixelHeight: 0xba,
  cues: 0x1c53bb6b, cuePoint: 0xbb, cueTime: 0xb3, cueTrackPositions: 0xb7,
  cueTrack: 0xf7, cueClusterPosition: 0xf1, seekHead: 0x114d9b74,
  seek: 0x4dbb, seekId: 0x53ab, seekPosition: 0x53ac, void: 0xec, tags: 0x1254c367,
}

/** Counts reads so window-alignment and cache behaviour can be asserted. */
class FakeReader implements MediaReader {
  readonly calls: Array<{ offset: number; length: number }> = []
  windowCalls = 0
  constructor(private readonly bytes: Uint8Array<ArrayBuffer>, private readonly chunkSize = 8 * 1024 * 1024) {}

  async probe() {
    return { size: this.bytes.length, contentType: 'video/x-matroska', acceptsRanges: true, status: 200, cors: 'ok' as const }
  }

  async read(offset: number, length: number): Promise<Uint8Array<ArrayBuffer>> {
    this.calls.push({ offset, length })
    return this.bytes.slice(offset, offset + length)
  }

  async readWindow(offset: number, minLength: number) {
    this.windowCalls += 1
    const base = Math.floor(offset / this.chunkSize) * this.chunkSize
    const needed = offset - base + minLength
    const length = Math.max(this.chunkSize, needed)
    const bytes = await this.read(base, length)
    return { bytes, base }
  }

  get totalSize() { return this.bytes.length }
}

const videoTrack = el(ID.trackEntry, concat(
  uintEl(ID.trackNumber, 1),
  uintEl(ID.trackType, 1),
  stringEl(ID.codecId, 'V_MPEG4/ISO/AVC'),
  el(ID.codecPrivate, [1, 0x64, 0, 0x28]),
  el(ID.video, concat(uintEl(ID.pixelWidth, 1920), uintEl(ID.pixelHeight, 1080))),
))

function buildFile(options: {
  clusters: Uint8Array[]
  durationTicks?: number
  timecodeScale?: number
  extraBetween?: Uint8Array
  trailing?: Uint8Array
} ): Uint8Array<ArrayBuffer> {
  const info = el(ID.info, concat(
    uintEl(ID.timecodeScale, options.timecodeScale ?? 1_000_000, 4),
    ...(options.durationTicks ? [floatEl(ID.duration, options.durationTicks)] : []),
  ))
  const tracks = el(ID.tracks, videoTrack)
  const body = concat(
    info,
    tracks,
    ...options.clusters.flatMap((item, index) => index === 1 && options.extraBetween ? [options.extraBetween, item] : [item]),
    options.trailing ?? new Uint8Array(),
  )
  return concat(el(ID.ebmlHeader, [0x42, 0x86, 0x81, 0x01]), el(ID.segment, body))
}

function payload(size: number, fillValue: number): number[] {
  return new Array(size).fill(fillValue)
}

describe('MatroskaParser metadata', () => {
  // Regression: duration is in TimecodeScale units, so seconds = ticks * scale / 1e9.
  // The old code divided by 1e6 and reported milliseconds as seconds.
  it('converts Duration to seconds using the timecode scale', async () => {
    const file = buildFile({ clusters: [cluster(0, [simpleBlock(1, 0, 0x80, [1])])], durationTicks: 120_000 })
    const parser = new MatroskaParser(new FakeReader(file))
    const metadata = await parser.init()
    expect(metadata.duration).toBeCloseTo(120)
  })

  it('converts Duration at a non-default timecode scale', async () => {
    const file = buildFile({
      clusters: [cluster(0, [simpleBlock(1, 0, 0x80, [1])])],
      durationTicks: 1_200_000, timecodeScale: 100_000,
    })
    const parser = new MatroskaParser(new FakeReader(file))
    expect((await parser.init()).duration).toBeCloseTo(120)
  })

  it('reports zero when Duration is absent', async () => {
    const file = buildFile({ clusters: [cluster(0, [simpleBlock(1, 0, 0x80, [1])])] })
    const parser = new MatroskaParser(new FakeReader(file))
    expect((await parser.init()).duration).toBe(0)
  })

  it('parses track metadata and codec mapping', async () => {
    const file = buildFile({ clusters: [cluster(0, [simpleBlock(1, 0, 0x80, [1])])] })
    const parser = new MatroskaParser(new FakeReader(file))
    const metadata = await parser.init()
    expect(metadata.tracks).toHaveLength(1)
    expect(metadata.tracks[0]).toMatchObject({ id: 1, kind: 'video', width: 1920, height: 1080, codec: 'avc1.640028' })
  })

  // In a real file Segment's declared size spans nearly the whole file, so it is
  // always truncated relative to the header window init() reads first.
  it('initialises when Segment extends far past the header window', async () => {
    const header = concat(
      el(ID.info, uintEl(ID.timecodeScale, 1_000_000, 4)),
      el(ID.tracks, videoTrack),
    )
    const body = concat(header, cluster(0, [simpleBlock(1, 0, 0x80, payload(64, 1))]))
    // Declare a Segment far larger than the bytes actually present.
    const file = concat(
      el(ID.ebmlHeader, [0x42, 0x86, 0x81, 0x01]),
      elWithDeclaredSize(ID.segment, body, body.length + 900_000_000),
    )

    const parser = new MatroskaParser(new FakeReader(file))
    const metadata = await parser.init()
    expect(metadata.tracks).toHaveLength(1)
    const packets = await parser.next()
    expect(packets[0].data.length).toBe(64)
  })
})

describe('MatroskaParser cluster walk', () => {
  it('walks every cluster and preserves exact payload lengths', async () => {
    const file = buildFile({
      clusters: [
        cluster(0, [simpleBlock(1, 0, 0x80, payload(120, 1))]),
        cluster(100, [simpleBlock(1, 0, 0x00, payload(340, 2))]),
        cluster(200, [simpleBlock(1, 0, 0x00, payload(90, 3))]),
      ],
    })
    const parser = new MatroskaParser(new FakeReader(file))
    await parser.init()

    const lengths: number[] = []
    for (let round = 0; round < 3; round += 1) {
      const packets = await parser.next()
      packets.forEach((packet) => lengths.push(packet.data.length))
    }
    expect(lengths).toEqual([120, 340, 90])
    expect(await parser.next()).toEqual([])
    expect(parser.endOfStream).toBe(true)
  })

  it('carries keyframe flags through from the block parser', async () => {
    const file = buildFile({
      clusters: [cluster(0, [simpleBlock(1, 0, 0x80, [1]), simpleBlock(1, 1, 0x00, [2])])],
    })
    const parser = new MatroskaParser(new FakeReader(file))
    await parser.init()
    const packets = await parser.next()
    expect(packets.map((packet) => packet.key)).toEqual([true, false])
  })

  // Regression for the byte-scan class of bug: cluster discovery is structural now,
  // so a cluster ID appearing inside a block payload must not start a cluster.
  it('ignores a cluster ID embedded in block payload data', async () => {
    const embedded = Array.from(idBytes(ID_CLUSTER))
    const file = buildFile({
      clusters: [
        cluster(0, [simpleBlock(1, 0, 0x80, [...embedded, ...embedded, 7, 7])]),
        cluster(100, [simpleBlock(1, 0, 0x00, payload(20, 5))]),
      ],
    })
    const parser = new MatroskaParser(new FakeReader(file))
    await parser.init()
    const first = await parser.next()
    expect(first).toHaveLength(1)
    expect(first[0].data.length).toBe(embedded.length * 2 + 2)
    const second = await parser.next()
    expect(second[0].data.length).toBe(20)
    expect(await parser.next()).toEqual([])
  })

  it('skips non-cluster top-level elements between clusters', async () => {
    const file = buildFile({
      clusters: [
        cluster(0, [simpleBlock(1, 0, 0x80, payload(10, 1))]),
        cluster(100, [simpleBlock(1, 0, 0x00, payload(30, 2))]),
      ],
      extraBetween: el(ID.void, payload(64, 0)),
      trailing: el(ID.tags, payload(16, 0)),
    })
    const parser = new MatroskaParser(new FakeReader(file))
    await parser.init()
    expect((await parser.next())[0].data.length).toBe(10)
    expect((await parser.next())[0].data.length).toBe(30)
    expect(await parser.next()).toEqual([])
  })

  // Regression for the reported "Decoder error": a cluster declaring more bytes than
  // the file holds must not emit a short final block.
  it('reports truncation instead of emitting a clipped block', async () => {
    const good = cluster(0, [simpleBlock(1, 0, 0x80, payload(40, 1))])
    const brokenBody = concat(uintEl(0xe7, 100), simpleBlock(1, 0, 0x00, payload(20, 9)))
    const broken = elWithDeclaredSize(ID_CLUSTER, brokenBody, brokenBody.length + 5000)
    const file = buildFile({ clusters: [good, broken] })

    const parser = new MatroskaParser(new FakeReader(file))
    await parser.init()
    expect((await parser.next())[0].data.length).toBe(40)
    const tail = await parser.next()
    // Complete leading blocks may still be emitted, but never a clipped payload.
    tail.forEach((packet) => expect(packet.data.length).toBe(20))
    expect(parser.endOfStream).toBe(true)
  })

  it('reuses one aligned window read for clusters in the same chunk', async () => {
    const file = buildFile({
      clusters: [
        cluster(0, [simpleBlock(1, 0, 0x80, payload(10, 1))]),
        cluster(100, [simpleBlock(1, 0, 0x00, payload(10, 2))]),
        cluster(200, [simpleBlock(1, 0, 0x00, payload(10, 3))]),
      ],
    })
    const reader = new FakeReader(file)
    const parser = new MatroskaParser(reader)
    await parser.init()
    const before = reader.calls.length
    await parser.next()
    await parser.next()
    await parser.next()
    const clusterReads = reader.calls.slice(before)
    // Every cluster lives inside the same aligned window, so they all resolve to
    // the same read request rather than one read per cluster offset.
    expect(new Set(clusterReads.map((call) => `${call.offset}:${call.length}`)).size).toBe(1)
  })
})

describe('MatroskaParser cues', () => {
  function cuesElement(points: Array<{ time: number; track: number; position: number }>) {
    return el(ID.cues, concat(...points.map((point) => el(ID.cuePoint, concat(
      uintEl(ID.cueTime, point.time, 2),
      // CueTrack precedes CueClusterPosition, which is what defeated the old parser.
      el(ID.cueTrackPositions, concat(uintEl(ID.cueTrack, point.track), uintEl(ID.cueClusterPosition, point.position, 4))),
    )))))
  }

  it('reads CueClusterPosition even though CueTrack comes first', async () => {
    const clusters = [
      cluster(0, [simpleBlock(1, 0, 0x80, payload(10, 1))]),
      cluster(1000, [simpleBlock(1, 0, 0x80, payload(20, 2))]),
    ]
    const header = concat(
      el(ID.info, uintEl(ID.timecodeScale, 1_000_000, 4)),
      el(ID.tracks, videoTrack),
    )
    // CueClusterPosition uses a fixed 4-byte width, so the encoded Cues length does
    // not depend on the position values and can be measured before filling them in.
    const placeholder = cuesElement([{ time: 0, track: 1, position: 0 }, { time: 1000, track: 1, position: 0 }])
    const cluster0 = header.length + placeholder.length
    const cluster1 = cluster0 + clusters[0].length
    const cues = cuesElement([
      { time: 0, track: 1, position: cluster0 },
      { time: 1000, track: 1, position: cluster1 },
    ])
    expect(cues.length).toBe(placeholder.length)

    const body = concat(header, cues, ...clusters)
    const file = concat(el(ID.ebmlHeader, [0x42, 0x86, 0x81, 0x01]), el(ID.segment, body))

    const parser = new MatroskaParser(new FakeReader(file))
    await parser.init()

    // Behavioural assertion: seeking to 1s must land on the second cluster. With the
    // old parser every cue collapsed to segmentData+1, so this returned cluster 0.
    const atOneSecond = await parser.packetsFor(1)
    expect(atOneSecond).toHaveLength(1)
    expect(atOneSecond[0].data.length).toBe(20)

    const atStart = await parser.packetsFor(0)
    expect(atStart[0].data.length).toBe(10)
  })

  it('falls back to the first cluster when cues are missing', async () => {
    const file = buildFile({ clusters: [cluster(0, [simpleBlock(1, 0, 0x80, [1])])] })
    const parser = new MatroskaParser(new FakeReader(file))
    await parser.init()
    expect(Number.isFinite(parser.resolveSeekOffset(99))).toBe(true)
  })
})
