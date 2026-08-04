import { describe, expect, it } from 'vitest'
import {
  AUDIO_HORIZON, BUFFER_MAX_BYTES, BUFFER_TARGET_SECONDS, DECODE_QUEUE_HIGH,
  PAUSED_PREFETCH, canFeedAudio, canFeedVideo, shouldRequestMore, type PressureState,
} from './backpressure'
import { VIDEO_QUEUE_TARGET } from './frame-queue'

function state(overrides: Partial<PressureState> = {}): PressureState {
  return {
    bufferedAhead: 0,
    bufferedBytes: 0,
    playing: true,
    eof: false,
    inFlight: false,
    ...overrides,
  }
}

describe('shouldRequestMore', () => {
  it('fills all the way to the read-ahead target without oscillating', () => {
    expect(shouldRequestMore(state({ bufferedAhead: 1 }))).toBe(true)
    expect(shouldRequestMore(state({ bufferedAhead: BUFFER_TARGET_SECONDS - 0.1 }))).toBe(true)
    expect(shouldRequestMore(state({ bufferedAhead: BUFFER_TARGET_SECONDS }))).toBe(false)
  })

  it('prefetches a little while paused and then stops', () => {
    expect(shouldRequestMore(state({ playing: false, bufferedAhead: 0 }))).toBe(true)
    expect(shouldRequestMore(state({ playing: false, bufferedAhead: PAUSED_PREFETCH }))).toBe(false)
  })

  it('never requests while a request is in flight or at eof', () => {
    expect(shouldRequestMore(state({ inFlight: true }))).toBe(false)
    expect(shouldRequestMore(state({ eof: true }))).toBe(false)
  })

  it('stops on the byte ceiling even when the buffer is short in seconds', () => {
    expect(shouldRequestMore(state({ bufferedAhead: 0, bufferedBytes: BUFFER_MAX_BYTES }))).toBe(false)
  })

  it('ignores decoder state: a busy decoder must not stall the network', () => {
    // The decode queue and frame queue are drained by pumpDecoders, not by the
    // demuxer, so they have no say in whether more packets are fetched.
    expect(shouldRequestMore(state({ bufferedAhead: 0 }))).toBe(true)
  })
})

describe('decoder feed gates', () => {
  it('stops feeding video once the decoder or the frame queue is full', () => {
    const base = { decodeQueueSize: 0, frameQueueLength: 0, audioHorizonAhead: 0 }
    expect(canFeedVideo(base)).toBe(true)
    expect(canFeedVideo({ ...base, decodeQueueSize: DECODE_QUEUE_HIGH })).toBe(false)
    expect(canFeedVideo({ ...base, frameQueueLength: VIDEO_QUEUE_TARGET })).toBe(false)
  })

  it('stops feeding audio once the scheduling horizon is reached', () => {
    const base = { decodeQueueSize: 0, frameQueueLength: 0, audioHorizonAhead: 0 }
    expect(canFeedAudio(base)).toBe(true)
    expect(canFeedAudio({ ...base, audioHorizonAhead: AUDIO_HORIZON })).toBe(false)
    expect(canFeedAudio({ ...base, decodeQueueSize: DECODE_QUEUE_HIGH })).toBe(false)
  })
})
