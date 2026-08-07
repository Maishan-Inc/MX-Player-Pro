import InlineDemuxWorker from './demux.worker?worker&inline'
import { createWorkerWithStrategy } from './worker-factory'

export function createDemuxWorker(workerUrl?: string | URL): Worker {
  try {
    return createWorkerWithStrategy(workerUrl, InlineDemuxWorker)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`WORKER_CREATE_FAILED:${message}`)
  }
}
