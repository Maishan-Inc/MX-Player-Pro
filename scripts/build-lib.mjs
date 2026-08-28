import { rm, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = new URL('..', import.meta.url)
const outDir = new URL('./dist-lib/', root)

// 版本号由 CI 通过 APP_VERSION 传入，同时注入到代码和 package.json。
const version = process.env.APP_VERSION || '0.2.8'

// 独立版需要把 React 运行时打进去，React 适配器则保留 peer dependency；
// 独立版、框架适配器与 CSP Worker 分开构建，避免一个全局 external 配置
// 破坏浏览器直连版本。
for (const variant of ['standalone', 'react', 'vue', 'worker']) {
  await runVite(variant)
}

// `?worker&inline` can still emit a detached sourcemap for the virtual worker. The
// runtime never requests it, and a self-contained CDN package must not advertise an
// external assets directory.
await rm(new URL('./assets/', outDir), { recursive: true, force: true })

// 让 dist-lib 可以被 npm 直接发布，也让 jsDelivr 的目录列表更清晰。
const pkg = {
  name: 'mx-player-pro',
  version,
  type: 'module',
  exports: {
    '.': './mx-player.js',
    './vue': './mx-player-vue.js',
    './react': './mx-player-react.js',
    './worker.js': './mx-player-worker.js',
    './style.css': './mx-player.css',
  },
  style: './mx-player.css',
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

function runVite(variant) {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['vite', 'build'], {
      cwd: fileURLToPath(root),
      env: { ...process.env, BUILD_MODE: 'lib', LIB_VARIANT: variant },
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`vite build (${variant}) 退出码 ${code}`))
    })
  })
}
