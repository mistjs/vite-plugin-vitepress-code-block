import { defineConfig } from 'vitepress'
import { vitePluginVitepressCodeBlock } from 'vite-plugin-vitepress-code-block'
import Inspector from 'vite-plugin-inspect'
export default defineConfig({
  title: 'VitePress',
  themeConfig: {},
  markdown: {
    config(md) {
      console.log(md.__data)
    },
  },
  vite: {
    plugins: [
      vitePluginVitepressCodeBlock(),
      Inspector(),
    ],
  },
})
