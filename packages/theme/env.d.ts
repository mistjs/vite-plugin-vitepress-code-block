declare module 'virtual:vitepress-code-block'{
  const obj = {
    msg: 'from virtual module',
  }
  export default {
    ...obj,
  }
}
