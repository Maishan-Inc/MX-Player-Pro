export type InlineWorkerConstructor = new (options?: WorkerOptions) => Worker
export type UrlWorkerConstructor = new (scriptURL: string | URL, options?: WorkerOptions) => Worker

const DEMUX_WORKER_OPTIONS: WorkerOptions = { name: 'mx-player-demux', type: 'module' }

/**
 * Prefer an inline Worker so an SDK imported from a CDN does not attempt to construct
 * a cross-origin Worker. Sites whose CSP blocks blob: can host the emitted Worker
 * themselves and pass workerUrl instead.
 */
export function createWorkerWithStrategy(
  workerUrl: string | URL | undefined,
  InlineWorker: InlineWorkerConstructor,
  WorkerClass: UrlWorkerConstructor = Worker,
): Worker {
  if (workerUrl) return new WorkerClass(workerUrl, DEMUX_WORKER_OPTIONS)
  return new InlineWorker(DEMUX_WORKER_OPTIONS)
}
