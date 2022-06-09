<template>
  <section :id="id" class="code-block">
    <section class="code-block-demo">
      <component :is="comp" />
    </section>
    <section class="code-block-meta">
      <div v-if="title" class="code-block-title">
        {{ title }}
      </div>
      <div v-if="desc" class="code-block-description" v-html="descData" />
      <div class="code-block-actions">
        <CodeSandbox class="code-block-action" @click="openCodeSandbox" />
        <FileCopy
          v-if="!copied"
          class="code-block-action"
          @click="copy(codeSource)"
        />
        <FileSuccess v-else class="code-block-action-success" />
        <Expand
          v-show="!showCode"
          class="code-block-action-code"
          @click="onShowCode"
        />
        <UnExpand
          v-show="showCode"
          class="code-block-action-code"
          @click="onShowCode"
        />
      </div>
    </section>
    <transition name="code-block-transition" v-on="on">
      <section v-if="showCode" class="code-block-source" v-html="highlightCode" />
    </transition>
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useClipboard } from '../composables/useClipboard'
import FileSuccess from './icons/FileSuccess.vue'
import CodeSandbox from './icons/CodeSandbox.vue'
import Expand from './icons/Expand.vue'
import UnExpand from './icons/UnExpand.vue'
import FileCopy from './icons/FileCopy.vue'
const props = defineProps({
  id: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  desc: {
    type: String,
    default: undefined,
  },
  code: {
    type: String,
    default: undefined,
  },
  highlight: {
    type: String,
    default: undefined,
  },
  sandboxCode: {
    type: String,
  },
  comp: {
    type: Object,
  },
})
const highlightCode = computed(() =>
  props.highlight
    ? decodeURIComponent(props.highlight)
      .replace('<span class="copy" />', '')
    : '')
const codeSource = computed(() => decodeURIComponent(props.code || ''))
const sandboxCode = computed(
  () => props.sandboxCode || 'https://codesandbox.io/',
)
const descData = computed(() => decodeURIComponent(props.desc || ''))
const showCode = ref(false)
const openCodeSandbox = () => {
  window.open(sandboxCode.value)
}
const onShowCode = () => {
  showCode.value = !showCode.value
}
const { copied, copy } = useClipboard()
const on = reactive({
  beforeEnter(el: any) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom

    el.style.maxHeight = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  },
  enter(el: any) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
    else {
      el.style.maxHeight = 0
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden'
  },
  afterEnter(el: any) {
    el.style.maxHeight = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  beforeLeave(el: any) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.maxHeight = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },

  leave(el: any) {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  },

  afterLeave(el: any) {
    el.style.maxHeight = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  },
})
</script>

<style scoped>
.code-block{
  background-color: var(--vp-c-bg);;
  border-radius: 2px;
  border: 1px solid var(--vp-c-divider-light);
  transition: all .3s;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}
:deep(div[class*='language-']){
  border-radius: 0;
}
@media (min-width: 640px) {
  :deep(div[class*='language-']){
    margin: 0;
    border-radius: 0;
  }
}

:deep([class*='language-']:before){
  content: none;
}
.code-block  div[class*=language-]{
  border-radius: 0;
  transition: all .3s;
  padding: 0;
}
.code-block-demo{
  padding: 1.5rem 1.3rem;
  border-bottom: 1px solid var(--vp-c-divider-light);;
  transition: all .3s;
}
.code-block-meta{
  position: relative;
}
.code-block-title{
  position: absolute;
  background: #ffffff;;
  color: #2c3e50;
  font-size: 14px;
  font-weight: bolder;
  top: -12px;
  padding: 2px 10px;
  margin-left: 30px;
  z-index: 2;
  transition: all .3s;
}

.code-block-description{
  border-bottom: 1px dashed var(--vp-c-divider-light);
  transition: all .3s;
  padding: 1rem 1.3rem;
  font-size: 14px;
}
.code-block-description >p{
  margin: 0;
}
.code-block-actions{
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--vp-c-text-1);
}

.code-block-actions .code-block-action{
  cursor: pointer;
  width: 16px;
  height: 16px;
  opacity: .6;
  transform: scale(1);
  transition: transform .5s;
}
.code-block-actions .code-block-action:hover{
  opacity: .8;
  transform: scale(1.2);
}

.code-block-action-success{
  cursor: pointer;
  width: 16px;
  height: 16px;
  opacity: .6;
  color:#177ddc;
}
.code-block-action-code{
  cursor: pointer;
  width: 16px;
  height: 16px;
  opacity: .6;
  transition: opacity .3s;
}

.code-block-transition-leave-active,
.code-block-transition-enter-active {
  transition: .2s max-height ease-in-out,
  .2s padding-top ease-in-out,
  .2s padding-bottom ease-in-out;
}
</style>
