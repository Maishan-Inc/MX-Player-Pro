export interface RustDemuxerRuntime {
  available: boolean
  probe?: (bytes: Uint8Array) => boolean
}

/**
 * Resolve the Rust demuxer next to wherever the SDK itself was served from.
 *
 * The origin-relative `/wasm/` path only ever worked for the first-party app. Loaded
 * from a CDN onto an embedder's page, `self.location.origin` is the *embedder's*
 * domain, so the fetch 404s and every consumer silently falls back to the TypeScript
 * parser. `baseUrl` is threaded in from the SDK, which knows its own script URL.
 */
export async function loadRustDemuxer(baseUrl?: string): Promise<RustDemuxerRuntime> {
  try {
    const url = baseUrl
      ? new URL('mkv_demuxer.js', baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`)
      : new URL('/wasm/mkv_demuxer.js', self.location.origin)
    const module = await import(/* @vite-ignore */ url.href) as {
      default?: () => Promise<unknown>
      wasm_version?: () => string
      probe_ebml?: (bytes: Uint8Array) => boolean
    }
    await module.default?.()
    return { available: module.wasm_version?.().startsWith('mkv-demuxer/') === true, probe: module.probe_ebml }
  } catch {
    return { available: false }
  }
}
