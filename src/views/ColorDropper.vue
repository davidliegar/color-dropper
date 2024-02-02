
<template>
  <main>
    <tool-box
      v-model="data.currentTool"
      :saved-colors="data.savedColors"
      @handle-img="img => restart(img)"
    />

    <canvas 
      ref="canvasRef"
      class="canvas"
      :class="{ active: data.currentTool === ToolEnum.ColorDropper }"
      @mousemove="getColor"
      @click="saveColor"
    />

    <canvas 
      ref="canvasDetailRef"
      class="canvasDetail"
    />
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import ToolBox from '@/components/ToolBox.vue'
import { ToolEnum } from '@/core/tools'
import defaultImg from '@/assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg'
import borderImg from '@/assets/SelectedColor.svg'
import { CANVAS_USE_CASES, injectStrict } from '@/injects'
import type { Color } from '@/core/canvas'

const canvasUseCases = injectStrict(CANVAS_USE_CASES)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasDetailRef = ref<HTMLCanvasElement | null>(null)

interface Data {
  currentTool?: ToolEnum
  currentColor?: Color
  savedColors: Color[]
  defaultImgElement?: HTMLImageElement
  borderImgElement?: HTMLImageElement
  hasFrameBeenProcessed: boolean
}
const data = reactive<Data>({
  hasFrameBeenProcessed: true,
  savedColors: []
})

function getColor(e: MouseEvent) {
  if (
    data.currentTool !== ToolEnum.ColorDropper ||
    !data.hasFrameBeenProcessed
  ) return

  data.hasFrameBeenProcessed = false

  requestAnimationFrame(() => update(e))
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

function positionDetailCanvas (e: MouseEvent) {
  if (
    !canvasRef.value ||
    !canvasDetailRef.value ||
    !data.borderImgElement
  ) return

  canvasUseCases.zoomImgToCanvas(canvasDetailRef.value, canvasRef.value, {
    img: data.borderImgElement,
    zoom: 50,
    cropWidth: 300,
    x: e.pageX,
    y: e.pageY,
  })
}

async function getImg (img = defaultImg) {
  data.defaultImgElement = await canvasUseCases.loadImg(img)
  data.borderImgElement = await canvasUseCases.loadImg(borderImg)
}


function update (e: MouseEvent) {
  if (!canvasRef.value) {
    return
  }

  positionDetailCanvas(e)

  const color = canvasUseCases.getColorFromPixel(
    canvasRef.value,
    {
      x: e.pageX,
      y: e.pageY
    }
  )

  data.currentColor = color
  data.hasFrameBeenProcessed = true
}

function draw () {
  if (
    !canvasRef.value ||
    !canvasDetailRef.value ||
    !data.defaultImgElement
  ) return
  
  canvasUseCases.setCanvasViewport(canvasRef.value)
  canvasUseCases.drawImgIntoCanvasFullWidth(canvasRef.value, data.defaultImgElement)

  canvasUseCases.setCanvasViewport(canvasDetailRef.value)
  data.hasFrameBeenProcessed = true
}

async function restart (img = defaultImg) {
  await getImg(img)
  draw()

}

onMounted(restart)

window.addEventListener('resize', () => {
  if (!data.hasFrameBeenProcessed) return

  requestAnimationFrame(draw)
}, false);
</script>

<style lang="postcss">
.canvas.active {
  cursor: pointer;
}

.canvasDetail {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>@/core/utilities/debounce