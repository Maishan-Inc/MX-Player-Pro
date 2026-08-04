import { describe, expect, it } from 'vitest'
import { FrameQueue, VIDEO_QUEUE_HIGH } from './frame-queue'

class FakeFrame {
  closed = 0
  constructor(readonly timestamp: number) {}
  close() { this.closed += 1 }
}

function fill(queue: FrameQueue<FakeFrame>, count: number, start = 0, step = 1) {
  const frames: FakeFrame[] = []
  for (let index = 0; index < count; index += 1) {
    const frame = new FakeFrame(start + index * step)
    frames.push(frame)
    queue.push(frame)
  }
  return frames
}

describe('FrameQueue overflow', () => {
  it('drops the oldest frame exactly once when over the high watermark', () => {
    const queue = new FrameQueue<FakeFrame>()
    const frames = fill(queue, VIDEO_QUEUE_HIGH + 2)
    expect(queue.length).toBe(VIDEO_QUEUE_HIGH)
    expect(frames[0].closed).toBe(1)
    expect(frames[1].closed).toBe(1)
    expect(frames[2].closed).toBe(0)
    expect(queue.dropped).toBe(2)
  })
})

describe('FrameQueue take', () => {
  it('returns the newest due frame and closes the ones it skips', () => {
    const queue = new FrameQueue<FakeFrame>()
    const frames = fill(queue, 5, 0, 1)
    const picked = queue.take(2)
    expect(picked?.frame.timestamp).toBe(2)
    expect(frames[0].closed).toBe(1)
    expect(frames[1].closed).toBe(1)
    expect(frames[2].closed).toBe(0)
    expect(queue.length).toBe(2)
  })

  it('returns null and closes nothing when no frame is due', () => {
    const queue = new FrameQueue<FakeFrame>()
    const frames = fill(queue, 3, 10, 1)
    expect(queue.take(0)).toBeNull()
    expect(frames.every((frame) => frame.closed === 0)).toBe(true)
    expect(queue.length).toBe(3)
  })

  it('draws a single late frame rather than skipping it', () => {
    const queue = new FrameQueue<FakeFrame>()
    fill(queue, 1, 0, 1)
    const picked = queue.take(10)
    expect(picked?.skipDraw).toBe(false)
  })

  it('skips drawing only while catching up with more due frames behind', () => {
    const queue = new FrameQueue<FakeFrame>()
    fill(queue, 6, 0, 0.01)
    const picked = queue.take(5)
    expect(picked?.skipDraw).toBe(false)
    expect(queue.length).toBe(0)
  })

  it('honours the early tolerance for a frame due within one vsync', () => {
    const queue = new FrameQueue<FakeFrame>()
    fill(queue, 1, 1.002, 1)
    expect(queue.take(1)?.frame.timestamp).toBe(1.002)
  })
})

describe('FrameQueue floor and flush', () => {
  it('closes queued frames below the floor and rejects later pushes', () => {
    const queue = new FrameQueue<FakeFrame>()
    const frames = fill(queue, 5, 0, 1)
    queue.setFloor(2)
    expect(frames[0].closed).toBe(1)
    expect(frames[1].closed).toBe(1)
    expect(queue.length).toBe(3)

    const late = new FakeFrame(0.5)
    queue.push(late)
    expect(late.closed).toBe(1)
    expect(queue.length).toBe(3)
  })

  it('closes every frame once on flush and does not double close', () => {
    const queue = new FrameQueue<FakeFrame>()
    const frames = fill(queue, 4)
    queue.flush()
    queue.flush()
    expect(frames.every((frame) => frame.closed === 1)).toBe(true)
    expect(queue.length).toBe(0)
  })
})
