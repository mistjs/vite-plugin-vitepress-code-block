# vitepress-theme-code-block

这是一个基于vitepress 的代码块主题插件

## Install

```shell
# use npm
npm install vitepress-theme-code-block -D

# use pnpm
pnpm add vitepress-theme-code-block -D

```

## Usage

我们需要在`.vitepress`目录下创建一个主题文件夹，并在这个文件夹下创建一个名为`index.ts/js`的文件。

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
