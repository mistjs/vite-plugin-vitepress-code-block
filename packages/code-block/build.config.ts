import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    'fast-glob',
    'lodash',
    'magic-string',
    'markdown-it',
    'posthtml-parser',
    'posthtml-render',
    'vite',
    'vitepress',
  ],
  entries: [
    'src/index',
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
