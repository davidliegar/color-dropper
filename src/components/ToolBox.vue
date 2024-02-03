<template>
  <aside class="toolbox" :class="{ hide: data.isClosed }">
    <div class="handle" @click="toggleClose">
      <span :class="{ rotate: !data.isClosed }">&rsaquo;</span>
    </div>
    <div>
      <h1 class="title">Color dropper</h1>

      <picsart-input-file class="input" @change="handleImg" />

      <hr />

      <h2 class="subtitle">Tools</h2>

      <tool-box-item
        id="Color"
        icon="IconColorPicker.svg"
        label="Color dropper"
        v-model="form.colorDropper"
      />

      <picasrt-slider v-model="form.zoom" />
    </div>

    <div class="saved-colors">
      <tool-box-color v-for="(color, index) in props.savedColors" :key="index" :color="color" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ToolEnum } from '@/core/tools'
import ToolBoxItem from './ToolBoxItem.vue'
import PicasrtSlider from './PicasrtSlider.vue'
import PicsartInputFile from './PicsartInputFile.vue'
import type { Color } from '@/core/canvas'
import { reactive, watchEffect } from 'vue'
import ToolBoxColor from './ToolBoxColor.vue'

type Model = Record<ToolEnum, boolean | number>

const props = defineProps<{
  savedColors: Color[]
  modelValue: Model
}>()

const emit = defineEmits<{
  handleImg: [file: string]
  'update:modelValue': [form: Model]
}>()

const data = reactive({
  isClosed: false
})

const form = reactive({
  colorDropper: !!props.modelValue.ColorDropper,
  zoom: typeof props.modelValue.Zoom === 'number' ? props.modelValue.Zoom : 70
})

watchEffect(() => {
  emit('update:modelValue', {
    [ToolEnum.ColorDropper]: form.colorDropper,
    [ToolEnum.Zoom]: form.zoom
  })
})

function handleImg(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file) {
    emit('handleImg', URL.createObjectURL(file))
  }
}

function toggleClose() {
  data.isClosed = !data.isClosed
}
</script>

<style lang="postcss" scoped>
.toolbox {
  --left: 30px;
  --width: calc(100% - 2 * var(--left));

  position: fixed;
  top: 30px;
  left: var(--left);
  width: var(--width);
  background: var(--bg);
  border-radius: 16px;
  box-shadow: var(--shadow-large);
  backdrop-filter: var(--blur);
  border: 1px solid var(--white);
  padding: var(--size-24);
  max-height: calc(100vh - 60px);
  display: grid;
  grid-template-rows: auto 1fr;
  z-index: 10;
  transition: transform 300ms ease-in-out;

  &.hide {
    transform: translateX(calc(-1 * var(--width) - 3 * var(--left)));

    @media (--tablet) {
      transform: translateX(calc(-1 * var(--width) - var(--left)));
    }
  }

  & .handle {
    font-size: var(--size-24);
    display: flex;
    align-items: center;
    position: absolute;
    right: -20px;
    top: 10px;
    width: 20px;
    height: 40px;
    z-index: -1;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: var(--shadow-large);
    backdrop-filter: var(--blur);
    background: var(--white);
    cursor: pointer;
    justify-content: center;
    transition: transform 100ms ease-in;

    & .rotate {
      transform: rotateY(0.5turn);
    }
  }

  @media (--tablet) {
    --width: 360px;
  }

  & .title {
    font-size: var(--size-24);
    font-weight: 700;
    margin-block-end: var(--size-32);
  }

  & hr {
    border-color: var(--bg);
  }

  & .subtitle {
    font-size: var(--size-24);
    font-weight: 500;
    margin-block: var(--size-16);
  }
}

.saved-colors {
  margin-block-start: var(--size-8);
  overflow: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: var(--grey-300);
    position: absolute;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--grey-500);
  }
}

.input {
  margin-block: var(--size-16);
}
</style>
