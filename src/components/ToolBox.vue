<template>
  <aside class="toolbox">
    <div>
      <h1 class="title">
        Color dropper
      </h1>
      
      <picsart-input-file
        class="input"
        @change="handleImg"
      />
  
      <hr />
  
      <h2 class="subtitle">
        Tools 
      </h2>
  
      <tool-box-item 
        id="Color"
        icon="IconColorPicker.svg"
        label="Color dropper"
        v-model="form.colorDropper"
      />
  
      <picasrt-slider v-model="form.zoom" />
    </div>
    
    <div class="savedColors">
      <tool-box-color
        v-for="(color, index) in props.savedColors"
        :key="index"
        :color="color"
      />
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
  savedColors: Color[],
  modelValue: Model
}>()

const emit = defineEmits<{
  handleImg: [file: string]
  'update:modelValue': [form: Model]
}>()

const form = reactive({
  colorDropper: !!props.modelValue.ColorDropper,
  zoom: (typeof props.modelValue.Zoom === 'number') ? props.modelValue.Zoom : 50
})

watchEffect(() => {
  emit('update:modelValue', {
    [ToolEnum.ColorDropper]: form.colorDropper,
    [ToolEnum.Zoom]: form.zoom
  })
})

function handleImg (event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file) {
    emit('handleImg', URL.createObjectURL(file))
  }
}
</script>

<style lang="postcss" scoped>
.toolbox {
  position: fixed;
  top: 30px;
  left: 30px;
  width: 300px;
  background:  var(--bg);
  border-radius: 16px;
  box-shadow: var(--shadow-large);
  backdrop-filter: blur(8.2px);
  -webkit-backdrop-filter: blur(8.2px);
  border: 1px solid var(--white);
  padding: var(--size-24);
  max-height: calc(100vh - 60px);
  display: grid;
  grid-template-rows: auto 1fr;

  & .title {
    font-size: var(--size-24);
    font-weight: 700;
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

.savedColors {
  margin-block-start: var(--size-8);
  overflow: auto;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: var(--grey-300);
    position: absolute;
  }

  &::-webkit-scrollbar-thumb {
    background-color:  var(--grey-500);
  }
}

.input {
  margin-block: var(--size-16);
}
</style>