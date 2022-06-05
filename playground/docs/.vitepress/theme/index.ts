import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { Demo } from 'vite-plugin-vitepress-demo'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo)
  },
} as Theme
