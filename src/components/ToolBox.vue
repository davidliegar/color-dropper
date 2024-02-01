<template>
  <aside class="toolbox">
    <h1 class="title">
      Color dropper
    </h1>

    <hr />

    <input 
      type="file" 
      placeholder="upload img"
    />

    <hr />

    <h2 class="subtitle">
      Tools 
    </h2>

    <tool-box-item 
      :value="ToolEnum.ColorDropper"
      icon="IconColorPicker.svg"
      label="Color dropper"
      v-model="currentTool"
    />
    <div class="savedColors">
      <div 
        v-for="(color, index) in savedColorsComputed"
        class="color"
        :key="index"
        :style="`--savedColor: ${color.hex}`"
      >
        {{ color.hex }}
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ToolEnum } from '@/core/tools'
import ToolBoxItem from './ToolBoxItem.vue'
import type { Color } from '@/core/canvas'
import { computed } from 'vue';
import { CANVAS_USE_CASES, injectStrict } from '@/injects'

const canvasUseCases = injectStrict(CANVAS_USE_CASES)

const props = defineProps<{
  savedColors: Color[]
}>()

const currentTool = defineModel<ToolEnum>()

const savedColorsComputed = computed(() => {
  return props.savedColors.map(color => ({
    rgb: color,
    hex: canvasUseCases.rgbToHex(color)
  }))
})
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

.color {
  width: 100%;
  height: var(--size-32);
  background: var(--savedColor, var(--black));
  margin-block: var(--size-8);
  display: flex;
  align-items: center;
  padding: 0 0.5em;
}

.savedColors {
  margin-block-start: var(--size-8);
  max-height: 70vh;
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
</style>