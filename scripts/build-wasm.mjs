import { existsSync } from 'node:fs'
import { mkdir, cp, rm } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

const run = promisify(execFile)
const root = new URL('..', import.meta.url)
const crate = new URL('./crates/mkv-demuxer/', root)
const out = new URL('./public/wasm/', root)

await mkdir(out, { recursive: true })
try {
  await run(process.platform === 'win32' ? 'wasm-pack.exe' : 'wasm-pack', ['build', fileURLToPath(crate), '--target', 'web', '--out-dir', fileURLToPath(out), '--out-name', 'mkv_demuxer'], { windowsHide: true })
} catch (error) {
  if (!existsSync(new URL('./mkv_demuxer_bg.wasm', out))) {
    if (process.env.REQUIRE_WASM === '1') throw error
    console.warn('wasm-pack is not installed; keeping the TypeScript parser for local UI development.')
    console.warn(error?.message || error)
  }
}

// wasm-pack 会在 --out-dir 里写一个内容为 `*` 的 .gitignore。它随产物复制到
// dist-lib/wasm/ 后会让 `git add -A` 跳过整个目录，CDN 分支就少了 WASM。
await rm(new URL('./.gitignore', out), { force: true })

try {
  await cp(new URL('./README.md', root), new URL('./README.md', out))
} catch {
  // The generated package is optional during local development.
}
