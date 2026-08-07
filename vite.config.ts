import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const entry = (path: string) => fileURLToPath(new URL(path, import.meta.url))

/**
 * 两类产物：
 * - 默认：GitHub Pages 上的演示站点（dist/）
 * - BUILD_MODE=lib：给开发者引入的 SDK（dist-lib/）
 *
 * SDK 只出 ES 格式。播放器使用模块 Worker 和现代浏览器 API，不提供会误导
 * 开发者用经典 <script src> 的 UMD/IIFE 版本。
 */
export default defineConfig(({ mode }) => {
  const version = process.env.APP_VERSION || '1.2.0-dev'

  if (process.env.BUILD_MODE === 'lib') {
    const variant = process.env.LIB_VARIANT || 'standalone'
    const variants: Record<string, { entry: string; fileName: string; external: string[] }> = {
      standalone: {
        entry: entry('./src/index.ts'),
        fileName: 'mx-player',
        external: [] as string[],
      },
      react: {
        entry: entry('./src/react/MXPlayerReact.tsx'),
        fileName: 'mx-player-react',
        external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
      },
      vue: {
        entry: entry('./src/vue/MxPlayer.ts'),
        fileName: 'mx-player-vue',
        external: ['vue'],
      },
      worker: {
        entry: entry('./src/worker/demux.worker.ts'),
        fileName: 'mx-player-worker',
        external: [],
      },
    }
    const selected = variants[variant] || variants.standalone

    return {
      plugins: [react()],
      publicDir: false,
      worker: { format: 'es' },
      define: { __APP_VERSION__: JSON.stringify(version) },
      base: './',
      build: {
        target: 'es2022',
        sourcemap: true,
        outDir: 'dist-lib',
        emptyOutDir: variant === 'standalone',
        lib: {
          entry: selected.entry,
          formats: ['es'],
          fileName: () => `${selected.fileName}.js`,
          cssFileName: 'mx-player',
        },
        rollupOptions: {
          external: selected.external,
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
