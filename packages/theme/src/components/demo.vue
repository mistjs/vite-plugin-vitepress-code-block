<script lang="ts" setup>
defineProps<{ src?: string }>()
</script>
<template>
  <div>
    <slot name="icon" />
    <slot />
    {{ src }}
  </div>
</template>
<script lang="ts">
export default {
  name: 'Demo',
}
</script>
