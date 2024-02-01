import {
  getColorFromPixel,
  setCanvasViewport,
  loadImgToCanvas,
  rgbToHex
} from '@/core/canvas'

export function provideCanvasUseCases () {
  return {
    getColorFromPixel: getColorFromPixel(),
    setCanvasViewport: setCanvasViewport(),
    loadImgToCanvas: loadImgToCanvas(),
    rgbToHex: rgbToHex()
  }
}
