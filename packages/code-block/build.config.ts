import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    'vitepress',
    'vite',
  ],
  entries: [
    'src/index',
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
