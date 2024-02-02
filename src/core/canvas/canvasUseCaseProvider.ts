import {
  getColorFromPixel,
  setCanvasViewport,
  drawImgIntoCanvasFullWidth,
  loadImg,
  rgbToHex,
  zoomImgToCanvas,
  clearCanvas,
  rgbToHsl
} from '@/core/canvas'

export function provideCanvasUseCases () {
  return {
    getColorFromPixel: getColorFromPixel(),
    setCanvasViewport: setCanvasViewport(),
    drawImgIntoCanvasFullWidth: drawImgIntoCanvasFullWidth(),
    rgbToHex: rgbToHex(),
    zoomImgToCanvas: zoomImgToCanvas(),
    loadImg: loadImg(),
    clearCanvas: clearCanvas(),
    rgbToHsl: rgbToHsl()
  }
}
