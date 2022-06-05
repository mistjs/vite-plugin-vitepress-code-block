import type { VirtualMapType } from './typing'

export const loadModule = (virtulModule: Map<string, VirtualMapType>): string => {
  const modules: Record<string, VirtualMapType> = {}
  Array.from(virtulModule.entries()).forEach(([key, value]) => {
    modules[key] = value
  })
  return JSON.stringify(modules)
}
