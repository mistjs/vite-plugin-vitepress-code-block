import type { Plugin, ResolvedConfig } from 'vite'
import { createMarkdownRenderer } from 'vitepress'
import MagicString from 'magic-string'
import type { CodeBlockOptions, VirtualMapType } from './typing'
import { transformCode } from './transform-code'
import { compileScript } from './compile-script'
const vitePluginVitepressCodeBlock = (options?: CodeBlockOptions): Plugin => {
  const {
    wrapper = 'demo',
  } = (options || {})
  const virtualMap: Map<string, VirtualMapType> = new Map()
  let md: any
  let _config: ResolvedConfig
  return {
    name: 'vite-plugin-vitepress-code-block',
    enforce: 'pre',
    async configResolved(config) {
      _config = config
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
        // 清空其他的数据
        virtualMap.clear()
        md.__path = id
        md.__replaceCode.clear()
        const s = new MagicString(code)
        md.render(code)
        Array.from(md.__replaceCode.entries()).forEach(
          ([key, value]) => {
            s.replace(key, value)
          },
        )
        const { replaceCode, code: sourceCode } = compileScript(code, virtualMap, _config.command)
        // console.log(replaceCode, sourceCode)
        // if (replaceCode)
        //   s.prepend(sourceCode)
        // else
        //   s.replace(replaceCode, sourceCode)
        return {
          code: s.toString() + sourceCode,
          map: s.generateMap(),
        }
      }
    },
  }
}

export {
  vitePluginVitepressCodeBlock,
}
export default vitePluginVitepressCodeBlock
