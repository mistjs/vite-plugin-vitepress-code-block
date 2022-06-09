import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { CodeDemo, Demo } from 'vite-plugin-vitepress-demo'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', CodeDemo)
  },
} as Theme
