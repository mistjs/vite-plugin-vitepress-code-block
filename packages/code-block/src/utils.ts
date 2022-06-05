import type { NodeTag } from 'posthtml-parser'

export const isString = (value: unknown): value is string => typeof value === 'string'

export const isNumber = (value: unknown): value is number => typeof value === 'number'

export const isObject = <T extends object>(value: unknown): value is T => Object.prototype.toString.call(value) === '[object Object]'

export const isArray = <T>(value: unknown): value is T[] => Array.isArray(value)

export const isDemoInWrapper = (node: NodeTag, wrapper: string): boolean => {
  return node.tag === wrapper
}
