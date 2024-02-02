<template>
  <div 
    class="toolBoxColor"
    @click.self="toClipBoard"
  >
    <div class="color" />
    <div class="backdrop" />
    {{ formatToShow }}

    <select 
      v-model="colorFormat"
      class="select"
      name="colors" 
      id="colors"
    >
      <option value="hex">Hex</option>
      <option value="rgb">RGB</option>
      <option value="hsl">HSL</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import type { Color } from '@/core/canvas'
import { CANVAS_USE_CASES, injectStrict } from '@/injects';
import { computed, ref } from 'vue';
const canvasUseCases = injectStrict(CANVAS_USE_CASES)

const props = defineProps<{
  color: Color
}>()

const colorFormat = ref<'hex' | 'rgb' | 'hsl'>('hex')

const hexColor = computed(() => {
  return canvasUseCases.rgbToHex(props.color)
})

const hslColor = computed(() => {
  return canvasUseCases.rgbToHsl(props.color)
})

const rgbColor = computed(() => {
  return `rgb(${props.color.R}, ${props.color.G}, ${props.color.B})`
})

const formatToShow = computed(() => {
  return {
    'hex': hexColor.value,
    'rgb': rgbColor.value,
    'hsl': hslColor.value
  }[colorFormat.value]
})

function toClipBoard () {
  navigator.clipboard.writeText(formatToShow.value)
}
</script>

<style lang="postcss" scoped>
.toolBoxColor {
  width: 100%;
  height: var(--size-32);
  display: grid;
  grid-template-columns: 24px auto min-content;
  align-items: center;
  padding: 0 0.5em;
  margin-block: var(--size-8);
  gap: var(--size-8);
  cursor: pointer;
  font-size: var(--size-12);
  position: relative;
  cursor: pointer;
}

.color {
  width: var(--size-24);
  height: var(--size-24);
  background: v-bind(hexColor);
}

.backdrop {
  position: absolute;
  width: 28px;
  height: 28px;
  background: var(--bg);
  mix-blend-mode: difference;
  z-index: -1;
  left: 4px;
  top: 3px;
}

.select {
  background-color: transparent;
  border: thin solid var(--white);
  border-radius: var(--radius-sm);
  display: inline-block;
  line-height: 1.5em;
  padding: 0.5em 3.5rem 0.5em 1em;
  appearance: none;
    
  background-image:
    linear-gradient(45deg, transparent 50%, var(--white) 50%),
    linear-gradient(135deg, var(--white) 50%, transparent 50%),
    linear-gradient(to right, var(--white), var(--white));

  background-position:
    calc(100% - 16px) calc(1em + 2px),
    calc(100% - 12px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;

  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;

  background-repeat: no-repeat;

  &:focus {
    outline: none;
  }
}
</style>