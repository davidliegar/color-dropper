<template>
  <div>
    <input 
      :id="props.value.toString()"
      class="input"
      type="checkbox" 
      :true-value="props.value"
      :false-value="undefined"
      v-model="model"
    >
    <label class="label" :for="props.value.toString()">
      <img class="img" :src="imageUrl">
      {{ props.label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import type { ToolEnum } from '@/core/tools';

const props = defineProps<{
  value: ToolEnum
  icon: string
  label:string
}>()

const model = defineModel<ToolEnum>()

const imageUrl = new URL(`/src/assets/${props.icon}`, import.meta.url).href
</script>

<style lang="postcss" scoped>
.label {
  position: relative;
  border: 1px solid var(--white);
  cursor: pointer;
  border-radius: 0.4rem;
  height: 100%;
  display: grid;
  grid-template-rows: 24px auto;
  font-size: var(--size-16);
  display: flex;
  gap: 4px;
  padding: var(--size-12) var(--size-8);
  background: var(--bg);
  border-radius: 16px;
  box-shadow: var(--shadow-large);
  backdrop-filter: blur(8.2px);
  -webkit-backdrop-filter: blur(8.2px);
  border: 1px solid var(--white);
}

.img {
  width: var(--size-16);
}

.input {
  display: none;

  &:hover + .label {
    background: rgba(255, 255, 255, 0.7);
  }

  &:checked + .label {
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>