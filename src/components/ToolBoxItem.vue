<template>
  <div>
    <input 
      :id="props.id.toString()"
      class="input"
      type="checkbox" 
      v-model="model"
    >
    <label class="label" :for="props.id.toString()">
      <img class="img" :src="imageUrl">
      {{ props.label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string
  icon: string
  label: string
}>()

const model = defineModel<boolean>()

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