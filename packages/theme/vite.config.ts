import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import dtsPlugin from 'vite-plugin-dts'
export default defineConfig({
  plugins: [
    vuePlugin(),
    dtsPlugin(),
  ],
  build: {
    rollupOptions: {
      external: ['vue', 'virtual:vitepress-code-block'],
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
  },
})
