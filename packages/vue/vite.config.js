import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { URL, fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'
import { resolvePath, createResolver } from '@nuxt/kit'

// Create resolver to resolve dist paths within @vunix/core
const core = createResolver(await resolvePath('@vunix/core', { cwd: import.meta.url }))

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@vunix/vue',
      fileName: 'vunix-vue',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'lodash'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue(),  dts({
    outputDir: 'dist/types',
    insertTypesEntry: true,
  })],
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('./src', import.meta.url)),
      '@core/': core.resolve('..') // root dist directory
    },
  },
})
