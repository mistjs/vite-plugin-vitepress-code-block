import MagicString from 'magic-string'

export const computedPosition = (codeArr: string[], map: [number, number], content: string): [number, number] => {
  const [, end] = map
  const codeEndArr = codeArr.slice(0, end)
  const codeStr = codeEndArr.join('\n')
  const s = new MagicString(codeStr)
  const c = content.length
  return [s.length() - c, s.length()]
}
