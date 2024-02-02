import {
  getColorFromPixel,
  setCanvasViewport,
  drawImgIntoCanvasFullWidth,
  loadImg,
  rgbToHex,
  zoomImgToCanvas,
} from '@/core/canvas'

export function provideCanvasUseCases () {
  return {
    getColorFromPixel: getColorFromPixel(),
    setCanvasViewport: setCanvasViewport(),
    drawImgIntoCanvasFullWidth: drawImgIntoCanvasFullWidth(),
    rgbToHex: rgbToHex(),
    zoomImgToCanvas: zoomImgToCanvas(),
    loadImg: loadImg()
  }
}
