import type { VirtualMapType } from './typing'

export const loadModule = (virtulModule: Map<string, VirtualMapType>): string => {
  const modules = 'import { defineAsyncComponent } from \'vue\'\n'
  let imported = 'const __yanyu__code__block = {\n'
  virtulModule.forEach((value) => {
    const path = value.path
    // imported[path] = `defineAsyncComponent(()=>import(${path}))`
    imported += `"${path}":defineAsyncComponent(()=>import("${path}")),\n`
  })
  return `${modules}${imported}}`
}
