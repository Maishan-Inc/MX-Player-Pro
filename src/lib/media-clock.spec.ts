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
})

describe('MasterClock', () => {
  it('uses the monotonic clock until audio primes, without jumping backward', () => {
    const { state, now } = controllableNow()
    const context = { value: 0 }
    const monotonic = new MonotonicClock(now)
    const audio = new AudioAnchoredClock(() => context.value)
    const master = new MasterClock(monotonic, audio)

    master.start()
    state.value = 1000
    expect(master.currentTime).toBeCloseTo(1)

    // Audio primes slightly behind: the reported time must not move backward.
    context.value = 0.5
    audio.addSpan({ startAt: 0, endAt: 2, mediaStart: 0, rate: 1 })
    expect(master.currentTime).toBeGreaterThanOrEqual(1)
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

  it('resets both clocks to the seek target', () => {
    const { now } = controllableNow()
    const context = { value: 3 }
    const master = new MasterClock(new MonotonicClock(now), new AudioAnchoredClock(() => context.value))
    master.audio?.addSpan({ startAt: 0, endAt: 10, mediaStart: 0, rate: 1 })
    master.reset(77)
    expect(master.currentTime).toBeCloseTo(77)
  })
})
