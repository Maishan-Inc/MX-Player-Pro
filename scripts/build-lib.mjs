import { cp, mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = new URL('..', import.meta.url)
const outDir = new URL('./dist-lib/', root)
const wasmSrc = new URL('./public/wasm/', root)
const wasmOut = new URL('./wasm/', outDir)

// 版本号由 CI 通过 APP_VERSION 传入，同时注入到代码和 package.json。
const version = process.env.APP_VERSION || '1.0.0-dev'

// BUILD_MODE 通过 env 传给 vite.config.ts，避免为一个变量引入 cross-env。
await new Promise((resolve, reject) => {
  const child = spawn('npx', ['vite', 'build'], {
    cwd: fileURLToPath(root),
    env: { ...process.env, BUILD_MODE: 'lib' },
    shell: process.platform === 'win32',
    stdio: 'inherit',
  })
  child.on('error', reject)
  child.on('close', (code) => {
    if (code === 0) resolve()
    else reject(new Error(`vite build 退出码 ${code}`))
  })
})

// WASM 必须和 SDK 一起发布：jsDelivr 消费者拿不到本仓库的 public/。
if (existsSync(fileURLToPath(wasmSrc))) {
  await mkdir(wasmOut, { recursive: true })
  await cp(wasmSrc, wasmOut, { recursive: true })
  console.log('已复制 WASM 产物到 dist-lib/wasm/')
} else {
  console.warn('public/wasm/ 不存在，dist-lib 将不含 WASM；消费者会退回 TypeScript 解析器。')
}

// 让 dist-lib 可以被 npm 直接发布，也让 jsDelivr 的目录列表更清晰。
const pkg = {
  name: 'mx-player-pro',
  version,
  type: 'module',
  exports: {
    '.': './mx-player.js',
    './vue': './mx-player-vue.js',
    './react': './mx-player-react.js',
    './wasm/*': './wasm/*',
  },
  peerDependencies: {
    react: '>=18',
    'react-dom': '>=18',
    vue: '>=3.3',
  },
  peerDependenciesMeta: {
    react: { optional: true },
    'react-dom': { optional: true },
    vue: { optional: true },
  },
  license: 'MIT',
  repository: { type: 'git', url: 'https://github.com/Maishan-Inc/MX-Player-Pro.git' },
}
await writeFile(new URL('./package.json', outDir), `${JSON.stringify(pkg, null, 2)}\n`)
console.log('已生成 dist-lib/package.json')
