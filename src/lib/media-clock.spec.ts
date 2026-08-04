import { describe, expect, it } from 'vitest'
import { AudioAnchoredClock, MasterClock, MonotonicClock } from './media-clock'

function controllableNow() {
  const state = { value: 0 }
  return { state, now: () => state.value }
}

describe('MonotonicClock', () => {
  it('advances with the injected wall clock only while running', () => {
    const { state, now } = controllableNow()
    const clock = new MonotonicClock(now)
    expect(clock.currentTime).toBe(0)
    state.value = 1000
    expect(clock.currentTime).toBe(0)
    clock.start()
    state.value = 3000
    expect(clock.currentTime).toBeCloseTo(2)
  })

  it('freezes on stop and resumes without a jump', () => {
    const { state, now } = controllableNow()
    const clock = new MonotonicClock(now)
    clock.start()
    state.value = 2000
    clock.stop()
    expect(clock.currentTime).toBeCloseTo(2)
    state.value = 10_000
    expect(clock.currentTime).toBeCloseTo(2)
    clock.start()
    state.value = 11_000
    expect(clock.currentTime).toBeCloseTo(3)
  })

  it('scales elapsed time by the rate without applying it retroactively', () => {
    const { state, now } = controllableNow()
    const clock = new MonotonicClock(now)
    clock.start()
    state.value = 2000
    clock.setRate(2)
    expect(clock.currentTime).toBeCloseTo(2)
    state.value = 3000
    expect(clock.currentTime).toBeCloseTo(4)
  })

  it('lands exactly on the requested time after reset', () => {
    const { state, now } = controllableNow()
    const clock = new MonotonicClock(now)
    clock.start()
    state.value = 5000
    clock.reset(42)
    expect(clock.currentTime).toBeCloseTo(42)
  })
})

describe('AudioAnchoredClock', () => {
  it('interpolates inside a scheduled span', () => {
    const context = { value: 0 }
    const clock = new AudioAnchoredClock(() => context.value)
    clock.addSpan({ startAt: 10, endAt: 12, mediaStart: 100, rate: 1 })
    context.value = 11
    expect(clock.currentTime).toBeCloseTo(101)
  })

  it('holds at the last span end during an underrun instead of running ahead', () => {
    const context = { value: 0 }
    const clock = new AudioAnchoredClock(() => context.value)
    clock.addSpan({ startAt: 10, endAt: 12, mediaStart: 100, rate: 1 })
    context.value = 30
    expect(clock.currentTime).toBeCloseTo(102)
  })

  it('freezes when the audio context time freezes', () => {
    const context = { value: 11 }
    const clock = new AudioAnchoredClock(() => context.value)
    clock.addSpan({ startAt: 10, endAt: 12, mediaStart: 100, rate: 1 })
    expect(clock.currentTime).toBeCloseTo(101)
    expect(clock.currentTime).toBeCloseTo(101)
  })

  it('scales media time by the span rate', () => {
    const context = { value: 0 }
    const clock = new AudioAnchoredClock(() => context.value)
    clock.addSpan({ startAt: 0, endAt: 1, mediaStart: 0, rate: 2 })
    context.value = 0.5
    expect(clock.currentTime).toBeCloseTo(1)
  })

  it('holds at the seek target after reset until audio primes', () => {
    const context = { value: 5 }
    const clock = new AudioAnchoredClock(() => context.value)
    clock.addSpan({ startAt: 0, endAt: 1, mediaStart: 0, rate: 1 })
    clock.reset(30)
    expect(clock.primed).toBe(false)
    expect(clock.currentTime).toBeCloseTo(30)
  })

  it('prunes spans that are well behind the playhead', () => {
    const context = { value: 100 }
    const clock = new AudioAnchoredClock(() => context.value)
    clock.addSpan({ startAt: 0, endAt: 1, mediaStart: 0, rate: 1 })
    clock.addSpan({ startAt: 99, endAt: 101, mediaStart: 50, rate: 1 })
    clock.prune()
    expect(clock.currentTime).toBeCloseTo(51)
  })

  it('keeps the last span through a long underrun so it stays primed', () => {
    const context = { value: 0 }
    const clock = new AudioAnchoredClock(() => context.value)
    clock.addSpan({ startAt: 0, endAt: 2, mediaStart: 10, rate: 1 })
    // A 30 second stall: every span is older than the prune window.
    context.value = 32
    clock.prune()
    expect(clock.primed).toBe(true)
    expect(clock.currentTime).toBeCloseTo(12)
  })
})

describe('MasterClock', () => {
  it('holds time until audio primes so video cannot run ahead of it', () => {
    const { state, now } = controllableNow()
    const context = { value: 0 }
    const monotonic = new MonotonicClock(now)
    const audio = new AudioAnchoredClock(() => context.value)
    const master = new MasterClock(monotonic, audio)

    master.start()
    // Wall time passes, but with an audio track the audio context is the authority.
    state.value = 1000
    expect(master.currentTime).toBeCloseTo(0)

    context.value = 0.5
    audio.addSpan({ startAt: 0, endAt: 2, mediaStart: 0, rate: 1 })
    expect(master.currentTime).toBeCloseTo(0.5)
  })

  it('runs on the wall clock when there is no audio track', () => {
    const { state, now } = controllableNow()
    const master = new MasterClock(new MonotonicClock(now))
    master.start()
    state.value = 1500
    expect(master.currentTime).toBeCloseTo(1.5)
  })

  it('re-anchors the monotonic fallback so losing audio does not jump', () => {
    const { state, now } = controllableNow()
    const context = { value: 0 }
    const monotonic = new MonotonicClock(now)
    const audio = new AudioAnchoredClock(() => context.value)
    const master = new MasterClock(monotonic, audio)

    master.start()
    state.value = 30_000
    audio.addSpan({ startAt: 0, endAt: 2, mediaStart: 0, rate: 1 })
    context.value = 1
    expect(master.currentTime).toBeCloseTo(1)
    expect(monotonic.currentTime).toBeCloseTo(1)
  })

  it('reports audio time once it is ahead of the monotonic value', () => {
    const { now } = controllableNow()
    const context = { value: 1 }
    const master = new MasterClock(new MonotonicClock(now), new AudioAnchoredClock(() => context.value))
    master.audio?.addSpan({ startAt: 0, endAt: 10, mediaStart: 0, rate: 1 })
    expect(master.currentTime).toBeCloseTo(1)
    context.value = 4
    expect(master.currentTime).toBeCloseTo(4)
  })

  it('freezes on hold and continues from there without wall-clock drift', () => {
    const { state, now } = controllableNow()
    const master = new MasterClock(new MonotonicClock(now))
    master.start()
    state.value = 2000
    master.hold()
    expect(master.currentTime).toBeCloseTo(2)
    // Ten seconds of rebuffering must not advance the readout.
    state.value = 12_000
    expect(master.currentTime).toBeCloseTo(2)
    master.resume()
    state.value = 13_000
    expect(master.currentTime).toBeCloseTo(3)
  })

  it('resets both clocks to the seek target', () => {
    const { now } = controllableNow()
    const context = { value: 3 }
    const master = new MasterClock(new MonotonicClock(now), new AudioAnchoredClock(() => context.value))
    master.audio?.addSpan({ startAt: 0, endAt: 10, mediaStart: 0, rate: 1 })
    master.reset(77)
    expect(master.currentTime).toBeCloseTo(77)
  })
})
