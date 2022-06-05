import type { Plugin } from 'vite'
import { createMarkdownRenderer } from 'vitepress'
// import type * as MarkdownIt from 'markdown-it'
import type { CodeBlockOptions } from './typing.'
const vitePluginVitepressCodeBlock = (options?: CodeBlockOptions): Plugin => {
  const {
    wrapper = 'demo',
  } = (options || {})
  let md: any
  return {
    name: 'vite-plugin-vitepress-code-block',
    enforce: 'pre',
    config(config) {
      // console.log(config)
      // config.plugins = []
    },
    async configResolved(config) {
      md = await createMarkdownRenderer(config.root, {}, config.base)
      md.__replaceCode = new Map()
      const rawRule = md.renderer.rules.html_block!
      md.renderer.rules.html_block = function(tokens, idx, options, env, self) {
        // console.log(md.__path)
        const content = tokens[idx].content
        // console.log(content, idx)
        // md.__sourceData.replace(content, '测试啊啊啊啊啊啊')
        // md.__replaceCode.set(content, '测试啊啊啊啊啊啊')
        return rawRule(tokens, idx, options, env, self)
      }
      // console.log(md.render)
      // console.log(config)
    },
    transform(code: string, id: string) {
      if (id.endsWith('.md')) {
        md.__path = id
        md.__replaceCode.clear()
        md.render(code)
        Array.from(md.__replaceCode.entries()).forEach(([key, value]) => {
          code = code.replace(key, value)
        })
        // console.log(code)
        return {
          code,
        }
      }

      // TODO
      // const body = this.parse(code).body
      // return {
      //   // code: md.render(code),
      // }
    },
    buildStart(options) {
      // console.log('buildStart', options)
    },
  }
}

export {
  vitePluginVitepressCodeBlock,
}
export default vitePluginVitepressCodeBlock
