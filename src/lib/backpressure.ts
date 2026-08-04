import { VIDEO_QUEUE_TARGET } from './frame-queue'

/**
 * Read-ahead target in media seconds. Encoded packets are cheap to hold, so this is
 * bounded by memory rather than by decoder capacity.
 */
export const BUFFER_TARGET_SECONDS = 20
export const BUFFER_MAX_BYTES = 96 * 1024 * 1024
/** Paused still prefetches enough that play() starts instantly. */
export const PAUSED_PREFETCH = 3
/** Enter rebuffering below this, leave it above STALL_EXIT — never the same value. */
export const STALL_ENTER = 0.2
export const STALL_EXIT = 1.5
/** Decoder-side gates. These throttle feeding the decoders, never the network. */
export const DECODE_QUEUE_HIGH = 8
export const AUDIO_HORIZON = 1.0

export interface PressureState {
  bufferedAhead: number
  bufferedBytes: number
  playing: boolean
  eof: boolean
  inFlight: boolean
}

/** True when the demuxer should be asked for another batch of packets. */
export function shouldRequestMore(state: PressureState): boolean {
  if (state.inFlight || state.eof) return false
  if (state.bufferedBytes >= BUFFER_MAX_BYTES) return false
  return state.bufferedAhead < (state.playing ? BUFFER_TARGET_SECONDS : PAUSED_PREFETCH)
}

export interface DecodePressure {
  decodeQueueSize: number
  frameQueueLength: number
  audioHorizonAhead: number
}

/**
 * True when a decoder has room for another packet. Separate from shouldRequestMore:
 * a full decoder must not stop the network from reading ahead, which is what
 * previously pinned the read-ahead to about one second.
 */
export function canFeedVideo(state: DecodePressure): boolean {
  return state.decodeQueueSize < DECODE_QUEUE_HIGH && state.frameQueueLength < VIDEO_QUEUE_TARGET
}

export function canFeedAudio(state: DecodePressure): boolean {
  return state.decodeQueueSize < DECODE_QUEUE_HIGH && state.audioHorizonAhead < AUDIO_HORIZON
}
