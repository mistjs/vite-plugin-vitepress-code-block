# vitepress-theme-code-block

en-US |
[简体中文](https://github.com/mistjs/vite-plugin-vitepress-code-block/blob/main/packages/theme/README.zh-CN.md)


This is a code block theme plugin based on vitepress

## Install

```shell
# use npm
npm install vitepress-theme-code-block -D

# use pnpm
pnpm add vitepress-theme-code-block -D

```

## Usage

We need to create a theme folder in the `.vitepress` directory and create a file called `index.ts/js` in this folder.

```ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { CodeDemo } from 'vitepress-theme-code-block'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', CodeDemo)
  },
} as Theme

```
