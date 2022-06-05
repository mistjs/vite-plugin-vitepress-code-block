import type { Plugin } from 'vite'
import { createMarkdownRenderer } from 'vitepress'
import MagicString from 'magic-string'
import type { CodeBlockOptions, VirtualMapType } from './typing'
import { transformCode } from './transform-code'
import { loadModule } from './load-module'
const vitePluginVitepressCodeBlock = (options?: CodeBlockOptions): Plugin => {
  const {
    wrapper = 'demo',
  } = (options || {})
  const virtualModule = 'virtual:vitepress-code-block'
  const resolvedVirtualModuleId = `\0${virtualModule}`
  const virtualMap: Map<string, VirtualMapType> = new Map()
  let md: any
  return {
    name: 'vite-plugin-vitepress-code-block',
    enforce: 'pre',
    resolveId(id: string) {
      if (id === virtualModule) {
        // TODO
        return resolvedVirtualModuleId
      }
    },
    async configResolved(config) {
      md = await createMarkdownRenderer(config.root, {}, config.base)
      md.__replaceCode = new Map()
      const rawRule = md.renderer.rules.html_block!
      md.renderer.rules.html_block = function(tokens, idx, options, env, self) {
        const content = tokens[idx].content
        const renderCode = transformCode(content, md, wrapper, virtualMap, config.root)
        md.__replaceCode.set(content, renderCode)
        return rawRule(tokens, idx, options, env, self)
      }
    },
    transform(code: string, id: string) {
      if (id.endsWith('.md')) {
        md.__path = id
        md.__replaceCode.clear()
        const s = new MagicString(code)
        md.render(code)
        Array.from(md.__replaceCode.entries()).forEach(
          ([key, value]) => {
            s.replace(key, value)
          },
        )
        return {
          code: s.toString(),
          map: s.generateMap(),
        }
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // 判断，当前所处的页面
        return {
          code: `export default function(){ return ${loadModule(virtualMap)} }`,
          map: null,
        }
      }
    },
  }
}

export {
  vitePluginVitepressCodeBlock,
}
export default vitePluginVitepressCodeBlock
