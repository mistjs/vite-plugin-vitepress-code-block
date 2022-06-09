# vite-plugin-vitepress-code-block

使用该插件，你可以将代码块转换为一个演示模块，以便你可以在示例中查看它的功能。


## Install


```shell

# use npm
npm install vite-plugin-vitepress-code-block -D

# use pnpm

pnpm add vite-plugin-vitepress-code-block -D

```

## Usage

我们在项目根目录创建一个名为`.vitepress`的文件夹，然后在这个文件夹下创建一个名为`config.ts/js`的文件。

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


