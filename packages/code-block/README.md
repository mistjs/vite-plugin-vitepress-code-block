# vite-plugin-vitepress-code-block

[en-US](https://github.com/mistjs/vite-plugin-vitepress-code-block/tree/main/packages/code-block)  |
简体中文

With this plugin, you can translate code blocks into a demo module that demonstrates


## Install


```shell

# use npm
npm install vite-plugin-vitepress-code-block -D

# use pnpm

pnpm add vite-plugin-vitepress-code-block -D

```

## Usage

We create a folder in the project root directory called `.vitepress`. then we create a file called `config.ts/js` in this folder.


```ts
import { defineConfig } from 'vitepress'
import { vitePluginVitepressCodeBlock } from 'vite-plugin-vitepress-code-block'
export default defineConfig({
  vite: {
    plugins: [
      vitePluginVitepressCodeBlock(),
    ],
  },
})
```


