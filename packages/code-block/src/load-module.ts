import type { VirtualMapType } from './typing'

export const loadModule = (virtulModule: Map<string, VirtualMapType>): string => {
  const modules = 'import { defineAsyncComponent,reactive } from \'vue\'\n'
  let imported = 'const __yanyu__code__block = reactive({\n'
  virtulModule.forEach((value) => {
    const path = value.path
    imported += `"${path}":{"language": "${value.type}","code": "${encodeURIComponent(value.code)}","highlight": "${encodeURIComponent(value.formatCode)}","comp": defineAsyncComponent(()=>import("${path}"))},`
  })
  return `${modules}${imported}});`
}
