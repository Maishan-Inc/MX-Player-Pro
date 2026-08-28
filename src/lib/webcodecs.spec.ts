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

class StubAudioContext {
  currentTime = 0
  destination = {}
  createGain() { return { gain: { value: 1 }, connect() {} } }
  createBuffer(_channels: number, frames: number, sampleRate: number) {
    return { duration: frames / sampleRate, copyToChannel() {} }
  }
  createBufferSource() {
    return { playbackRate: { value: 1 }, connect() {}, start() {}, stop() {}, onended: null as (() => void) | null }
  }
  resume() { return Promise.resolve() }
  suspend() { return Promise.resolve() }
  close() { return Promise.resolve() }
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

  it('reconfigures the audio decoder when switching tracks', async () => {
    stubGlobals()
    const statuses: EngineStatus[] = []
    const engine = new WebCodecsEngine(canvas(), (status) => statuses.push(status))
    const flac = { id: 2, kind: 'audio' as const, codecId: 'A_FLAC', codec: 'flac', channels: 2 }
    const ac3 = { id: 3, kind: 'audio' as const, codecId: 'A_AC3', codec: 'ac-3', channels: 2 }
    await engine.configure(videoTrack, flac)
    await engine.configureAudio(ac3)
    expect(StubDecoder.configs.map((config) => config.codec)).toEqual(['avc1.640028', 'flac', 'ac-3'])
    expect(statuses[statuses.length - 1]).toEqual({ videoReady: true, audioReady: true, error: undefined })
    engine.close()
  })

  it('disables an audio track whose decoder never emits PCM within the deadline', async () => {
    stubGlobals()
    const statuses: EngineStatus[] = []
    const engine = new WebCodecsEngine(canvas(), (status) => statuses.push(status))
    await engine.configure(videoTrack, { id: 2, kind: 'audio', codecId: 'A_FLAC', codec: 'flac', channels: 2 })
    const internal = engine as unknown as {
      playing: boolean
      audioWaitSince: number
      tick: () => void
    }
    internal.playing = true
    engine.seekTo(30)
    engine.enqueue({ trackId: 1, timestamp: 30_000_000, duration: 33_000, key: true, data: new Uint8Array(4) }, 1, 2)
    engine.enqueue({ trackId: 2, timestamp: 30_000_000, duration: 21_000, key: true, data: new Uint8Array(4) }, 1, 2)
    // The batch is fed to the (stub) decoder, which never emits output.
    internal.tick()
    // ...and the prime deadline expires with the decoder silent.
    internal.audioWaitSince = performance.now() - 6000
    internal.tick()
    expect(statuses[statuses.length - 1]).toEqual({
      videoReady: true,
      audioReady: false,
      error: 'DECODER_ERROR_AUDIO:音频轨没有解码输出',
    })
    engine.close()
  })

  // A seek to an unbuffered position makes the demux worker spend seconds on range
  // fetches before the first batch arrives. The prime deadline must run from the
  // moment the decoder is actually given work, not from the seek itself: otherwise
  // the liveness check fires in the same tick that feeds the decoder, ahead of its
  // asynchronous first output, and the track is disabled right after a slow seek.
  it('does not kill the audio track while a slow seek is still priming', async () => {
    stubGlobals()
    vi.stubGlobal('AudioContext', StubAudioContext)
    const statuses: EngineStatus[] = []
    const engine = new WebCodecsEngine(canvas(), (status) => statuses.push(status))
    await engine.configure(videoTrack, { id: 2, kind: 'audio', codecId: 'A_FLAC', codec: 'flac', channels: 2 })
    const internal = engine as unknown as {
      playing: boolean
      audioWaitSince: number
      tick: () => void
      onAudioData: (data: unknown) => void
      audioPrimed: boolean
    }
    internal.playing = true
    engine.seekTo(30)
    // Simulate the seek fetch having taken six seconds: the deadline has already
    // expired by the time the first packets arrive.
    internal.audioWaitSince = performance.now() - 6000
    engine.enqueue({ trackId: 1, timestamp: 30_000_000, duration: 33_000, key: true, data: new Uint8Array(4) }, 1, 2)
    engine.enqueue({ trackId: 2, timestamp: 30_000_000, duration: 21_000, key: true, data: new Uint8Array(4) }, 1, 2)
    internal.tick()
    expect(statuses[statuses.length - 1]?.error).toBeUndefined()
    // The decoder's asynchronous output lands right after and must schedule cleanly.
    internal.onAudioData({
      numberOfFrames: 1024,
      numberOfChannels: 2,
      sampleRate: 48_000,
      timestamp: 30_000_000,
      copyTo: () => {},
      close: vi.fn(),
    })
    expect(internal.audioPrimed).toBe(true)
    expect(statuses[statuses.length - 1]?.error).toBeUndefined()
    engine.close()
  })

  it('drops a PCM block and releases the audio clock when sample conversion fails', async () => {
    stubGlobals()
    vi.stubGlobal('AudioContext', StubAudioContext)
    const statuses: EngineStatus[] = []
    const engine = new WebCodecsEngine(canvas(), (status) => statuses.push(status))
    await engine.configure(videoTrack, { id: 2, kind: 'audio', codecId: 'A_FLAC', codec: 'flac', channels: 2 })
    const internal = engine as unknown as {
      playing: boolean
      audioWaitSince: number
      ensureAudioContext: () => AudioContext | null
      onAudioData: (data: unknown) => void
    }
    internal.playing = true
    internal.audioWaitSince = performance.now()
    internal.ensureAudioContext()
    const data = {
      numberOfFrames: 1024,
      numberOfChannels: 2,
      sampleRate: 48_000,
      timestamp: 0,
      copyTo: () => { throw new Error('sample format conversion failed') },
      close: vi.fn(),
    }
    internal.onAudioData(data)
    expect(data.close).toHaveBeenCalled()
    expect(statuses[statuses.length - 1]).toEqual({
      videoReady: true,
      audioReady: false,
      error: 'DECODER_ERROR_AUDIO:sample format conversion failed',
    })
    engine.close()
  })
})
