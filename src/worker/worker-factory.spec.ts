import { describe, expect, it, vi } from 'vitest'
import { createWorkerWithStrategy } from './worker-factory'

describe('demux worker strategy', () => {
  it('uses the inline worker by default so CDN imports stay self-contained', () => {
    const inlineWorker = { kind: 'inline' } as unknown as Worker
    const InlineWorker = vi.fn(function InlineWorker() { return inlineWorker })
    const UrlWorker = vi.fn()

    const result = createWorkerWithStrategy(undefined, InlineWorker, UrlWorker)

    expect(result).toBe(inlineWorker)
    expect(InlineWorker).toHaveBeenCalledWith({ name: 'mx-player-demux', type: 'module' })
    expect(UrlWorker).not.toHaveBeenCalled()
  })

  it('uses an explicit workerUrl for sites whose CSP blocks blob workers', () => {
    const urlWorker = { kind: 'url' } as unknown as Worker
    const InlineWorker = vi.fn()
    const UrlWorker = vi.fn(function UrlWorker() { return urlWorker })

    const result = createWorkerWithStrategy('/static/demux.worker.js', InlineWorker, UrlWorker)

    expect(result).toBe(urlWorker)
    expect(UrlWorker).toHaveBeenCalledWith('/static/demux.worker.js', { name: 'mx-player-demux', type: 'module' })
    expect(InlineWorker).not.toHaveBeenCalled()
  })
})
