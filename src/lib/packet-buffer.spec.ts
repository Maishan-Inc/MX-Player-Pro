import { describe, expect, it } from 'vitest'
import { PacketBuffer } from './packet-buffer'
import type { MKVPacket } from '../types'

function packet(timestampSeconds: number, bytes = 4): MKVPacket {
  return {
    trackId: 1,
    timestamp: Math.round(timestampSeconds * 1_000_000),
    duration: 0,
    key: true,
    data: new Uint8Array(bytes) as Uint8Array<ArrayBuffer>,
  }
}

function buffer(...kinds: Array<'video' | 'audio'>) {
  const instance = new PacketBuffer()
  kinds.forEach((kind) => instance.setActive(kind, true))
  return instance
}

describe('PacketBuffer horizon', () => {
  it('reports the minimum end across active tracks', () => {
    const buffered = buffer('video', 'audio')
    buffered.push('video', packet(5))
    expect(buffered.bufferedEnd).toBe(Number.NEGATIVE_INFINITY)
    buffered.push('audio', packet(3))
    expect(buffered.bufferedEnd).toBeCloseTo(3)
  })

  it('ignores tracks that are not active', () => {
    const buffered = buffer('video')
    buffered.push('video', packet(5))
    buffered.push('audio', packet(1))
    expect(buffered.bufferedEnd).toBeCloseTo(5)
  })

  it('keeps counting packets that were already handed to a decoder', () => {
    const buffered = buffer('video')
    buffered.push('video', packet(2))
    buffered.shift('video')
    expect(buffered.pending('video')).toBe(0)
    expect(buffered.bufferedEnd).toBeCloseTo(2)
  })

  it('takes the highest timestamp, not the last one, so B-frames do not shrink it', () => {
    const buffered = buffer('video')
    // Decode order for I P B B is 0, 4, 2, 3.
    ;[0, 4, 2, 3].forEach((time) => buffered.push('video', packet(time)))
    expect(buffered.bufferedEnd).toBeCloseTo(4)
  })

  it('never reports a negative read-ahead', () => {
    const buffered = buffer('video')
    buffered.push('video', packet(2))
    expect(buffered.bufferedAhead(5)).toBe(0)
    expect(buffered.bufferedAhead(1)).toBeCloseTo(1)
  })
})

describe('PacketBuffer accounting', () => {
  it('tracks bytes across push, shift and clear', () => {
    const buffered = buffer('video', 'audio')
    buffered.push('video', packet(0, 100))
    buffered.push('audio', packet(0, 40))
    expect(buffered.byteLength).toBe(140)
    buffered.shift('video')
    expect(buffered.byteLength).toBe(40)
    buffered.clear()
    expect(buffered.byteLength).toBe(0)
    expect(buffered.bufferedEnd).toBe(Number.NEGATIVE_INFINITY)
  })

  it('drops a track and its bytes when it is deactivated', () => {
    const buffered = buffer('video', 'audio')
    buffered.push('audio', packet(1, 64))
    buffered.setActive('audio', false)
    expect(buffered.byteLength).toBe(0)
    expect(buffered.pending('audio')).toBe(0)
    // A failed audio decoder must not pin the horizon at negative infinity forever.
    buffered.push('video', packet(7))
    expect(buffered.bufferedEnd).toBeCloseTo(7)
  })

  it('refuses packets for an inactive track', () => {
    const buffered = buffer('video')
    buffered.push('audio', packet(1))
    expect(buffered.pending('audio')).toBe(0)
    expect(buffered.byteLength).toBe(0)
  })
})
