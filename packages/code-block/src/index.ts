import type { Plugin } from 'vite'
import { createMarkdownRenderer } from 'vitepress'
import { parser } from 'posthtml-parser'
import type { CodeBlockOptions } from './typing.'
const vitePluginVitepressCodeBlock = (options?: CodeBlockOptions): Plugin => {
  const {
    wrapper = 'demo',
  } = (options || {})
  let md: Awaited<ReturnType<typeof createMarkdownRenderer>>
  return {
    name: 'vite-plugin-vitepress-code-block',
    config() {
    },
    async configResolved(config) {
      md = await createMarkdownRenderer(config.root, {}, config.base)
      // console.log(md.render)
    },
    transform(code: string, id: string) {
      if (id.endsWith('.md')) {
        // TODO
        // const body = this.parse(code).body
      }
    },
  }
}

export {
  vitePluginVitepressCodeBlock,
}
export default vitePluginVitepressCodeBlock
