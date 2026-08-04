import { describe, expect, it } from 'vitest'
import { AUDIO_HORIZON, DECODE_QUEUE_HIGH, PAUSED_PREFETCH, shouldRequestMore, type PressureState } from './backpressure'

function state(overrides: Partial<PressureState> = {}): PressureState {
  return {
    bufferedAhead: 0,
    frameQueueLength: 0,
    decodeQueueSize: 0,
    audioHorizonAhead: 0,
    playing: true,
    eof: false,
    inFlight: false,
    ...overrides,
  }
}

describe('shouldRequestMore', () => {
  it('requests more while below the high watermark', () => {
    expect(shouldRequestMore(state({ bufferedAhead: 1 }))).toBe(true)
  })

  it('stops requesting above the high watermark', () => {
    expect(shouldRequestMore(state({ bufferedAhead: 6 }))).toBe(false)
  })

  it('does not oscillate between the watermarks', () => {
    // Between low and high the answer must stay true so the buffer fills to high
    // rather than toggling every tick.
    expect(shouldRequestMore(state({ bufferedAhead: 3 }))).toBe(true)
    expect(shouldRequestMore(state({ bufferedAhead: 4.9 }))).toBe(true)
    expect(shouldRequestMore(state({ bufferedAhead: 5 }))).toBe(false)
  })

  it('prefetches a little while paused and then stops', () => {
    expect(shouldRequestMore(state({ playing: false, bufferedAhead: 0 }))).toBe(true)
    expect(shouldRequestMore(state({ playing: false, bufferedAhead: PAUSED_PREFETCH }))).toBe(false)
  })

  it('never requests while a request is in flight or at eof', () => {
    expect(shouldRequestMore(state({ inFlight: true }))).toBe(false)
    expect(shouldRequestMore(state({ eof: true }))).toBe(false)
  })

  it('respects the decoder queue ceiling even when starved', () => {
    expect(shouldRequestMore(state({ bufferedAhead: 0, decodeQueueSize: DECODE_QUEUE_HIGH }))).toBe(false)
  })

  it('respects the audio scheduling horizon', () => {
    expect(shouldRequestMore(state({ bufferedAhead: 0, audioHorizonAhead: AUDIO_HORIZON }))).toBe(false)
  })

  it('stops when the frame queue is already at target depth', () => {
    expect(shouldRequestMore(state({ bufferedAhead: 0, frameQueueLength: 6 }))).toBe(false)
  })
})
