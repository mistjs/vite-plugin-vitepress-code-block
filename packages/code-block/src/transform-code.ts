import { dirname, extname, relative, resolve } from 'path'
import { readFileSync } from 'fs'
import { parser } from 'posthtml-parser'
import type { Node } from 'posthtml-parser'
import { render } from 'posthtml-render'
import { isArray, isDemoInWrapper, isNumber, isString } from './utils'
import type { CodeSourceType, VirtualMapType } from './typing'

const ALLOW_NEED_TYPE = ['vue', 'jsx', 'tsx']

const getCodeSource = (codePath: string): CodeSourceType => {
  // 获取源代码
  const codeSource = readFileSync(codePath, 'utf-8')
  // 获取扩展名称
  const ext = extname(codePath)
  return {
    code: codeSource,
    type: ext.slice(1),
  }
}

const formatSourceCode = (code: string, ext: string) => {
  return `\`\`\`${ext}\n${code}\n\`\`\``
}

const renderSourceCode = (md: any, ext: string, code: string) => {
  const formatCode = formatSourceCode(code, ext)
  return md.render(formatCode)
}

const renderWrapper = (nodeList: Node[], wrapper: string, dir: string, md: any,
  virtualMap: Map<string, VirtualMapType>, root: string, hmrMap: Map<string, Set<string>>): string|undefined => {
  for (const nodeListElement of nodeList) {
    // 判断当前是不是一个NodeTag
    if (!isString(nodeListElement) && !isNumber(nodeListElement)) {
      if (isDemoInWrapper(nodeListElement, wrapper)) {
        // 这里面包含了demo在里面，那么接下来我们就需要处理里面的demo的数据
        const attrs = nodeListElement.attrs
        // 判断是否存在src目录
        if (attrs.src && isString(attrs.src)) {
          // 如果哦存在就获取一下源码
          const filePath = resolve(dir, attrs.src)
          const codeSource = getCodeSource(filePath)
          // 获取数据
          if (ALLOW_NEED_TYPE.includes(codeSource.type) && !attrs?.raw) {
            // 当前表示是一个组件，那么我们就需要处理一下这个组件的数据格式,首先判断一下，
            // 当前的path中是否已经处理过了，
            // 或者已经被处理过了，那么我们不需要再进行处理了，直接用
            const relativePath = relative(root, filePath)
            const id = md.__path
            if (hmrMap.has(filePath)) {
              const setData = hmrMap.get(filePath)
              if (!setData.has(id))
                setData.add(id)
            }
            else {
              hmrMap.set(filePath, (new Set<string>()).add(id))
            }
            if (!virtualMap.has(relativePath)) {
              // 存在就不处理了
              const formatCode = renderSourceCode(md, codeSource.type, codeSource.code)
              virtualMap.set(relativePath, {
                code: codeSource.code,
                type: codeSource.type,
                formatCode,
                path: attrs.src,
                root,
              })
            }
            attrs['v-bind'] = `__yanyu__code__block['${attrs.src}']`
            if (attrs.src)
              delete attrs.src
          }
          else {
            // 其他情况直接编译成对应的源码格式就好
            return formatSourceCode(codeSource.code, codeSource.type)
          }
        }
      }
      else {
        // TODO
        if (isArray<Node>(nodeListElement.content)) {
          // 判断是不是字符串，如果是字符串，需要处理一下再赋值
          const dataSource = renderWrapper(nodeListElement.content, wrapper, dir, md, virtualMap, root, hmrMap)
          if (isString(dataSource)) {
            nodeListElement.content = []
            nodeListElement.content.push(dataSource)
          }
          else {
            nodeListElement.content = dataSource
          }
        }
      }
    }
  }
}

export const transformCode = (
  content: string,
  md: any,
  wrapper = 'demo',
  virtualMap: Map<string, VirtualMapType>,
  root: string, hmrMap: Map<string, Set<string>>): string => {
  const id = md.__path
  // 拿到当前的数据，开始对数据进行处理
  const parserNode: Node[] = parser(content)
  // 开始遍历数据
  const dir = dirname(id)
  const sourceData = renderWrapper(parserNode, wrapper, dir, md, virtualMap, root, hmrMap)
  if (sourceData)
    return sourceData
  return render(parserNode)
}
