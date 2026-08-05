import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const entry = (path: string) => fileURLToPath(new URL(path, import.meta.url))

/**
 * 两种产物：
 * - 默认：GitHub Pages 上的演示站点（dist/）
 * - BUILD_MODE=lib：给开发者引入的 SDK（dist-lib/）
 *
 * SDK 只出 ES 格式。播放器依赖 `new Worker(..., {type:'module'})` 与动态 import()
 * 加载 WASM，二者都无法在经典脚本（UMD/IIFE）里工作，出一个跑不起来的 UMD
 * 只会让人以为 <script src> 能用。
 */
export default defineConfig(({ mode }) => {
  const version = process.env.APP_VERSION || '1.0.0-dev'

  if (process.env.BUILD_MODE === 'lib') {
    return {
      plugins: [react()],
      worker: { format: 'es' },
      define: { __APP_VERSION__: JSON.stringify(version) },
      build: {
        target: 'es2022',
        sourcemap: true,
        outDir: 'dist-lib',
        emptyOutDir: true,
        lib: {
          entry: {
            'mx-player': entry('./src/index.ts'),
            'mx-player-vue': entry('./src/vue/MxPlayer.ts'),
            'mx-player-react': entry('./src/react/MXPlayerReact.tsx'),
          },
          formats: ['es'],
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime', 'vue'],
        },
      },
    }
  }

  return {
    base: mode === 'production' ? './' : '/',
    plugins: [react()],
    worker: { format: 'es' },
    define: { __APP_VERSION__: JSON.stringify(version) },
    build: { target: 'es2022', sourcemap: true },
  }
})
