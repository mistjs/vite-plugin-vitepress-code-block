import { defineConfig } from 'vitepress'
import { vitePluginVitepressCodeBlock } from 'vite-plugin-vitepress-code-block'
import Inspector from 'vite-plugin-inspect'
export default defineConfig({
  title: 'VitePress',
  themeConfig: {},
  vite: {
    plugins: [
      vitePluginVitepressCodeBlock(),
      Inspector(),
    ],
  },
})
