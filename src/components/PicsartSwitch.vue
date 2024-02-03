<template>
  <div class="switch-wrapper">
    <slot />
    <label class="switch">
      <input type="checkbox" v-model="model" name="switch" />
      <span class="slider" />
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({
  default: false
})
</script>

<style lang="postcss" scoped>
.switch-wrapper {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: var(--size-40);
  height: var(--size-24);

  & .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: var(--bg);
    backdrop-filter: var(--blur);
    border-radius: 34px;
    transition: 0.4s;
    box-shadow: inset 0 0 0 1px var(--white);

    &::before {
      position: absolute;
      content: '';
      border-radius: 50%;
      height: var(--size-16);
      width: var(--size-16);
      left: 4px;
      bottom: 4px;
      background-color: var(--white);
      transition: 0.4s;
    }
  }

  & input {
    display: none;

    &:checked {
      & + .slider {
        background-color: var(--active-color);

        &::before {
          transform: translateX(var(--size-16));
        }
      }
    }
  }
}
</style>
