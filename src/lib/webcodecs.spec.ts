import { afterEach, describe, expect, it, vi } from 'vitest'
import { WebCodecsEngine, type EngineStatus } from './webcodecs'
import type { TrackInfo } from '../types'

/**
 * Minimal WebCodecs stand-ins. Only configure() is exercised here: it is the step
 * that decides whether each track gets a decoder and what the UI is told about the
 * ones that do not.
 */
class StubDecoder {
  static supported = true
  static configs: Array<Record<string, unknown>> = []
  decodeQueueSize = 0
  configure(config: Record<string, unknown>) { StubDecoder.configs.push(config) }
  decode() {}
  reset() {}
  close() {}
  async flush() {}
  static async isConfigSupported() { return { supported: StubDecoder.supported } }
}

function stubGlobals(options: { audioSupported?: boolean } = {}) {
  class Audio extends StubDecoder {
    static supported = options.audioSupported ?? true
    static async isConfigSupported() { return { supported: Audio.supported } }
  }
  Object.assign(globalThis, {
    VideoDecoder: StubDecoder,
    AudioDecoder: Audio,
    EncodedVideoChunk: class {},
    EncodedAudioChunk: class {},
  })
}

function canvas(): HTMLCanvasElement {
  return { width: 0, height: 0, getContext: () => ({ drawImage() {} }) } as unknown as HTMLCanvasElement
}

async function configure(video: TrackInfo | undefined, audio: TrackInfo | undefined) {
  const statuses: EngineStatus[] = []
  const engine = new WebCodecsEngine(canvas(), (status) => statuses.push(status))
  await engine.configure(video, audio)
  engine.close()
  return statuses
}

const videoTrack: TrackInfo = {
  id: 1, kind: 'video', codecId: 'V_MPEG4/ISO/AVC', codec: 'avc1.640028', width: 1920, height: 1080,
}

afterEach(() => {
  StubDecoder.configs = []
  StubDecoder.supported = true
  vi.unstubAllGlobals()
})

describe('WebCodecsEngine.configure', () => {
  // A FLAC track used to reach here with no codec string, take no branch at all and
  // leave the player silent with nothing in the status line explaining it.
  it('reports why an unmappable audio track produced no sound', async () => {
    stubGlobals()
    const statuses = await configure(videoTrack, { id: 2, kind: 'audio', codecId: 'A_TRUEHD', channels: 2 })
    const final = statuses[statuses.length - 1]
    expect(final.audioReady).toBe(false)
    expect(final.videoReady).toBe(true)
    expect(final.error).toBe('DECODER_UNSUPPORTED_AUDIO:TrueHD')
  })

  // The reason has to survive to the last status: an earlier call carrying it was
  // overwritten by the summary status that always followed.
  it('keeps the rejection reason on the final status', async () => {
    stubGlobals({ audioSupported: false })
    const statuses = await configure(videoTrack, { id: 2, kind: 'audio', codecId: 'A_AC3', codec: 'ac-3', channels: 6 })
    const final = statuses[statuses.length - 1]
    expect(final.error).toBe('DECODER_UNSUPPORTED_AUDIO:ac-3')
  })

  it('configures both decoders and reports no error for supported tracks', async () => {
    stubGlobals()
    const flac = new Uint8Array([0x66, 0x4c, 0x61, 0x43, 0x80, 0, 0, 0x22]).buffer
    const statuses = await configure(videoTrack, { id: 2, kind: 'audio', codecId: 'A_FLAC', codec: 'flac', codecPrivate: flac, sampleRate: 48_000, channels: 2 })
    const final = statuses[statuses.length - 1]
    expect(final).toEqual({ videoReady: true, audioReady: true, error: undefined })
    expect(StubDecoder.configs.map((config) => config.codec)).toContain('flac')
  })

  // mp3 takes no description and Chrome rejects a config that carries one.
  it('omits the description for codecs that must not carry one', async () => {
    stubGlobals()
    await configure(undefined, { id: 2, kind: 'audio', codecId: 'A_MPEG/L3', codec: 'mp3', codecPrivate: new Uint8Array([1, 2]).buffer, channels: 2 })
    const config = StubDecoder.configs.find((item) => item.codec === 'mp3')
    expect(config?.description).toBeUndefined()
  })
})
