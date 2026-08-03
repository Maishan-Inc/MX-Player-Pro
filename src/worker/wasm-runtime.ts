export interface RustDemuxerRuntime {
  available: boolean
  probe?: (bytes: Uint8Array) => boolean
}

export async function loadRustDemuxer(): Promise<RustDemuxerRuntime> {
  try {
    const url = new URL('/wasm/mkv_demuxer.js', self.location.origin)
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
