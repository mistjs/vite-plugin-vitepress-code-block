<script lang="ts" setup>
import comps from 'virtual:vitepress-code-block'
defineProps<{ src?: string }>()
// console.log(comps)
</script>
<template>
  <div>
    <slot name="icon" />
    <slot />
    {{ src }}
    {{ comps() }}
  </div>
</template>
<script lang="ts">
export default {
  name: 'Demo',
}
</script>
