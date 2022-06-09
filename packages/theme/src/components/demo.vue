<script lang="ts" setup>
import { computed, ref } from 'vue'
const props = defineProps<{ code?: string;highlight?: string;type?: string;comp?: any }>()
const formatCode = computed(() => props.code ? decodeURIComponent(props.code) : '')
const data = ref(1)
const formatHighlight = computed(() =>
  props.highlight
    ? decodeURIComponent(props.highlight)
      .replace('<span class="copy" />', '<span class="copy"></span>')
    : '')
// console.log(props.comp)
</script>
<template>
  <div style="display: flex;flex-direction: column">
    <button @click="data ++">
      按钮{{ data }}
    </button>
    <suspense>
      <component :is="comp" />
      <template #fallback>
        Loading...
      </template>
    </suspense>
    <slot name="icon" />
    <div v-html="formatHighlight" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'Demo',
}
</script>
