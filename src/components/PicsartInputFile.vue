<template>
  <div class="file-upload">
    <input
      id="file-upload"
      type="file"
      accept="image/png, image/gif, image/jpeg"
      @change="emit('on-new-file', $event)"
    />
    <label class="label" for="file-upload"> Choose File </label>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'on-new-file': [event: Event]
}>()
</script>

<style lang="postcss" scoped>
.file-upload {
  width: 100%;

  & input {
    display: none;
  }

  .label {
    cursor: pointer;
    font-weight: 400;
    width: 100%;
    padding: var(--size-8) var(--size-16);
    display: block;
    text-align: center;
    background: var(--bg);
    border-radius: 16px;
    box-shadow: var(--shadow-large);
    backdrop-filter: var(--blur);
    border: 1px solid var(--white);

    &:hover {
      background: rgb(255 255 255 / 70%);
    }
  }
}
</style>
