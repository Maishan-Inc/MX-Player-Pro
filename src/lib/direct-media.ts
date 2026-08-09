import type { SourceDescriptor } from '../types'

export type MediaFetch = (url: string, init?: RequestInit) => Promise<Response>

interface FetchBridgeRequest {
  id: number
  url: string
  init: {
    method?: string
    headers: Array<[string, string]>
    mode?: RequestMode
    redirect?: RequestRedirect
    cache?: RequestCache
  }
}

type FetchBridgeReply =
  | { id: number; ok: true; status: number; statusText: string; headers: Array<[string, string]>; body: ArrayBuffer | null }
  | { id: number; ok: false; error: string }

/** Hostnames whose address space is known before DNS resolution. */
export function isLocalNetworkUrl(value: string): boolean {
  let hostname: string
  try {
    hostname = new URL(value).hostname.toLowerCase().replace(/^\[|\]$/g, '')
  } catch {
    return false
  }

  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local')) return true
  if (hostname === '::1' || hostname.startsWith('fc') || hostname.startsWith('fd')) return true
  if (/^fe[89ab]/i.test(hostname)) return true

  const octets = hostname.split('.').map(Number)
  if (octets.length !== 4 || octets.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false
  const [first, second] = octets
  return first === 10 || first === 127 || first === 0 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
}

/**
 * Chrome cannot open its Local Network Access permission prompt from a Worker.
 * A document-side HEAD grants/validates access before the demux Worker starts; no
 * media body is downloaded and the request still goes straight to the source URL.
 */
export async function primeLocalNetworkAccess(source: SourceDescriptor): Promise<boolean> {
  if (source.kind !== 'url' || !isLocalNetworkUrl(source.url)) return false
  try {
    await fetch(source.url, { method: 'HEAD', mode: 'cors', redirect: 'follow', cache: 'no-store' })
  } catch {
    const response = await fetch(source.url, {
      headers: { Range: 'bytes=0-0' }, mode: 'cors', redirect: 'follow', cache: 'no-store',
    })
    await response.body?.cancel()
  }
  return true
}

/** Execute local-media fetches in the document, where Chrome grants LNA permission. */
export function createDirectFetchHost(sourceUrl: string, fetcher: MediaFetch = (url, init) => fetch(url, init)) {
  const channel = new MessageChannel()
  const controllers = new Map<number, AbortController>()
  let closed = false

  channel.port1.onmessage = (event: MessageEvent<FetchBridgeRequest>) => {
    const request = event.data
    if (!request || typeof request.id !== 'number') return
    if (request.url !== sourceUrl) {
      channel.port1.postMessage({ id: request.id, ok: false, error: 'FETCH_BRIDGE_URL_REJECTED' } satisfies FetchBridgeReply)
      return
    }

    const controller = new AbortController()
    controllers.set(request.id, controller)
    void fetcher(sourceUrl, {
      method: request.init.method,
      headers: request.init.headers,
      mode: request.init.mode,
      redirect: request.init.redirect,
      cache: request.init.cache,
      signal: controller.signal,
    }).then(async (response) => {
      const body = request.init.method === 'HEAD' ? null : await response.arrayBuffer()
      if (closed) return
      const reply: FetchBridgeReply = {
        id: request.id, ok: true, status: response.status, statusText: response.statusText,
        headers: Array.from(response.headers.entries()), body,
      }
      channel.port1.postMessage(reply, body ? [body] : [])
    }).catch((error) => {
      if (closed) return
      const reply: FetchBridgeReply = {
        id: request.id, ok: false, error: error instanceof Error ? error.message : String(error),
      }
      channel.port1.postMessage(reply)
    }).finally(() => controllers.delete(request.id))
  }
  channel.port1.start()

  return {
    port: channel.port2,
    close() {
      if (closed) return
      closed = true
      controllers.forEach((controller) => controller.abort())
      controllers.clear()
      channel.port1.close()
    },
  }
}

/** Recreate fetch semantics inside the Worker over an in-page MessageChannel. */
export function createDirectFetchClient(port: MessagePort) {
  let nextId = 0
  let closed = false
  const pending = new Map<number, { resolve: (response: Response) => void; reject: (error: Error) => void }>()

  port.onmessage = (event: MessageEvent<FetchBridgeReply>) => {
    const reply = event.data
    const waiter = reply && pending.get(reply.id)
    if (!waiter) return
    pending.delete(reply.id)
    if (!reply.ok) { waiter.reject(new TypeError(reply.error)); return }
    waiter.resolve(new Response(reply.body, { status: reply.status, statusText: reply.statusText, headers: reply.headers }))
  }
  port.start()

  const bridgedFetch: MediaFetch = (url, init = {}) => {
    if (closed) return Promise.reject(new TypeError('FETCH_BRIDGE_CLOSED'))
    const id = ++nextId
    const request: FetchBridgeRequest = {
      id, url,
      init: {
        method: init.method, headers: Array.from(new Headers(init.headers).entries()),
        mode: init.mode, redirect: init.redirect, cache: init.cache,
      },
    }
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject })
      port.postMessage(request)
    })
  }

  return {
    fetch: bridgedFetch,
    close() {
      if (closed) return
      closed = true
      pending.forEach(({ reject }) => reject(new TypeError('FETCH_BRIDGE_CLOSED')))
      pending.clear()
      port.close()
    },
  }
}
