import type { Color, position } from '../domain'

export function getColorFromPixel() {
  return (canvas: HTMLCanvasElement, mouse: position): Color => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (!ctx) {
      throw new Error()
    }

    const pxData = ctx.getImageData(
      mouse.x * window.devicePixelRatio,
      mouse.y * window.devicePixelRatio,
      1,
      1
    )

    const color = {
      R: pxData.data[0],
      G: pxData.data[1],
      B: pxData.data[2]
    }

    return color
  }
}
