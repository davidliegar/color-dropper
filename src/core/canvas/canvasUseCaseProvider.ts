import {
  getColorFromPixel,
  setCanvasViewport,
  drawImgIntoCanvasFullWidth,
  loadImg,
  colorToHex,
  zoomImgToCanvas,
  clearCanvas,
  colorToHsl,
  colorToRgb
} from '@/core/canvas'

export function provideCanvasUseCases() {
  return {
    getColorFromPixel: getColorFromPixel(),
    setCanvasViewport: setCanvasViewport(),
    drawImgIntoCanvasFullWidth: drawImgIntoCanvasFullWidth(),
    colorToHex: colorToHex(),
    zoomImgToCanvas: zoomImgToCanvas(),
    loadImg: loadImg(),
    clearCanvas: clearCanvas(),
    colorToHsl: colorToHsl(),
    colorToRgb: colorToRgb()
  }
}
