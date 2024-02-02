<template>
  <div class="range-slider">
    <div
      v-show="data.showLabel"
      ref="label"
      class="range-slider-label"
    >
      {{ model }}
    </div>
    <input
      id="range"
      v-model="model"
      class="range-slider-input"
      type="range"
      :data-range="model"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      @mouseover="data.showLabel = true"
      @mouseleave="data.showLabel = false"
      @keydown.prevent="() => {}"
    >
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

export interface RangeSliderProps {
  min?: number,
  max?: number,
  step?: number
}

const props = withDefaults(defineProps<RangeSliderProps>(), {
  min: 20,
  max: 200,
  step: 1
})

const data = reactive({
  showLabel: false
})

const label = ref<HTMLInputElement | null>(null)

const model = defineModel<number>({  
  set(value) {
    updateSlider()
    return +value
  }
})

onMounted(() => {
  updateSlider()
})

function updateSlider () {
  const percent = 100 * ((model.value ?? 0) - props.min) / (props.max - props.min)
  const labelPosition = -13 - (percent * 0.2)

  if (label.value) label.value.style.left = `calc(${percent}% + (${labelPosition}px))`
}
</script>

<style lang="postcss" scoped>
.range-slider {
  width: 100%;
  position: relative;
  padding: 1rem 0;
}

.range-slider-input {
  appearance: none;
  position: relative;
  height: 0.3rem;
  outline: none;
  padding: 0;
  margin: 0;
  width: 100%;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background:  var(--bg);
    box-shadow: var(--shadow-large);
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    border: 1px solid var(--white);
    cursor: pointer;
    transition: background 0.15s ease-in-out;
  }

  &::-moz-range-thumb {
    width: 2rem;
    height: 2rem;
    border: 0;
    border-radius: 50%;
    box-shadow: var(--shadow-large);
    backdrop-filter: blur(8.2px);
    background: rgba(255, 255, 255, 0.7);
    -webkit-backdrop-filter: blur(8.2px);
    border: 1px solid var(--white);
    cursor: pointer;
    transition: background 0.15s ease-in-out;
  }
}

.range-slider-label {
  box-sizing: border-box;
  display: inline-flex;
  position: absolute;
  width: 4.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  padding: 0.5rem 0;
  top: -2.3rem;
  background: var(--grey-700);
  box-shadow: var(--shadow-large);
  font-size: var(--size-12);
  color: white;

  &::after {
    position: absolute;
    bottom: -0.8rem;
    width: 0;
    height: 0;
    border-bottom: 0.4rem solid transparent;
    border-top: 0.4rem solid var(--grey-700);
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
    content: "";
  }
}
</style>
