
<template>
  <main>
    <tool-box
      v-model="data.currentTool"
      :saved-colors="data.savedColors"
    />

    <canvas 
      ref="canvasRef"
      class="canvas"
      @mousemove="getColor"
      @click="saveColor"
    />
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import ToolBox from '@/components/ToolBox.vue'
import { ToolEnum } from '@/core/tools'
import defaultImg from '@/assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg'
import { CANVAS_USE_CASES, injectStrict } from '@/injects'
import type { Color } from '@/core/canvas'

const canvasUseCases = injectStrict(CANVAS_USE_CASES)
const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Data {
  currentTool?: ToolEnum
  currentColor?: Color
  savedColors: Color[]
}
const data = reactive<Data>({
  savedColors: []
})

function getColor (e: MouseEvent) {
  if (!canvasRef.value || data.currentTool !== ToolEnum.ColorDropper) {
    return
  }

  const color = canvasUseCases.getColorFromPixel(
    canvasRef.value,
    {
      x: e.clientX,
      y: e.clientY
    }
  )

  data.currentColor = color
}

function saveColor () {
  if (
    !canvasRef.value ||
    data.currentTool !== ToolEnum.ColorDropper ||
    !data.currentColor
  ) {
    return
  }

  data.savedColors.push(data.currentColor)
}

onMounted(() => {
  if (!canvasRef.value) return
  canvasUseCases.setCanvasViewport(canvasRef.value)
  canvasUseCases.loadImgToCanvas(canvasRef.value, defaultImg)
})
</script>

<style lang="postcss">
.canvas {
  cursor: pointer;
}
</style>