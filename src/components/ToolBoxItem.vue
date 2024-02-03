<template>
  <div>
    <input :id="props.id.toString()" class="input" type="checkbox" v-model="model" />
    <label class="label" :for="props.id.toString()">
      <img class="img" :src="imageUrl" />
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
  cursor: pointer;
  height: 100%;
  grid-template-rows: 24px auto;
  font-size: var(--size-16);
  display: flex;
  gap: 4px;
  padding: var(--size-12) var(--size-8);
  background: var(--bg);
  border-radius: 16px;
  box-shadow: var(--shadow-large);
  backdrop-filter: var(--blur);
  border: 1px solid var(--white);
}

.img {
  width: var(--size-16);
}

.input {
  display: none;

  &:hover + .label {
    background: rgb(255 255 255 / 70%);
  }

  &:checked + .label {
    background: rgb(255 255 255 / 90%);
  }
}
</style>
