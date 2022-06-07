import { parser } from 'posthtml-parser'
import { omit } from 'lodash'
import type { VirtualMapType } from './typing'
import { loadModule } from './load-module'

const pat = /<script.*?>(.*?)<\/script>/gs

export const compileScript = (code: string, virtualMap: Map<string, VirtualMapType>, command: 'serve' | 'build'): { replaceCode: null|string;code: string } => {
  const script = pat.exec(code)
  const hmrCode = command === 'serve' ? '' : ''
  // console.log()
  let replaceCode = null
  let codeSource = ''
  if (script && script.length > 0) {
    const allCode = script[0]
    replaceCode = script[1]
    const parserData = parser(allCode)
    if (parserData.length > 0) {
      const tagData = parserData[0]
      if (typeof tagData === 'object' && Reflect.has(tagData.attrs || {}, 'setup')) {
        const attrs = omit(tagData.attrs, ['setup'])
        let restAttrs = ''
        for (const attrsKey in attrs) {
          const value = attrs[attrsKey]
          restAttrs += ` ${attrsKey}=${value}`
        }
        codeSource = `<script${restAttrs} setup>
${loadModule(virtualMap)}
${replaceCode || ''}
</script>`
      }
      else {
        // TODO
      }
    }
  }
  else {
    // TODO
    codeSource = `<script setup>
${loadModule(virtualMap)}
${replaceCode || ''}
</script>`
  }
  // console.log(codeSource, replaceCode)
  return {
    replaceCode,
    code: codeSource,
  }
}
