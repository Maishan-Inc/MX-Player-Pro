import { VIDEO_QUEUE_TARGET } from './frame-queue'

/** Watermarks are media-seconds ahead of the clock, so they behave the same at 24fps and 60fps. */
export const BUFFER_LOW_WATER = 2.0
export const BUFFER_HIGH_WATER = 5.0
export const PAUSED_PREFETCH = 1.5
export const DECODE_QUEUE_HIGH = 8
export const AUDIO_HORIZON = 1.0

export interface PressureState {
  bufferedAhead: number
  frameQueueLength: number
  decodeQueueSize: number
  audioHorizonAhead: number
  playing: boolean
  eof: boolean
  inFlight: boolean
}

export function shouldRequestMore(state: PressureState): boolean {
  if (state.inFlight || state.eof) return false
  if (state.frameQueueLength >= VIDEO_QUEUE_TARGET) return false
  if (state.decodeQueueSize >= DECODE_QUEUE_HIGH) return false
  if (state.audioHorizonAhead >= AUDIO_HORIZON) return false
  // Paused still prefetches a little so play() has data ready; the clock is frozen
  // while paused, so bufferedAhead stays put and the fill stops on its own.
  return state.bufferedAhead < (state.playing ? BUFFER_HIGH_WATER : PAUSED_PREFETCH)
}
