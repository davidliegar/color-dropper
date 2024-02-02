import type { HexColor } from '..'

export interface ZoomOptions {
  img: HTMLImageElement
  x: number
  y: number
  zoom: number
  cropWidth: number
  color: HexColor
}

export function zoomImgToCanvas() {
  return async (
    canvas: HTMLCanvasElement,
    canvasOrigin: HTMLCanvasElement,
    options: ZoomOptions
  ) => {
    const w = Math.floor(canvasOrigin.width / options.zoom)
    const h = Math.floor(canvasOrigin.height / options.zoom)
    const mouseX = options.x * devicePixelRatio
    const mouseY = options.y * devicePixelRatio

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const scaledCrop = Math.max(w, h)

    ctx.imageSmoothingEnabled = false

    ctx.drawImage(
      canvasOrigin,
      mouseX - scaledCrop / 2,
      mouseY - scaledCrop / 2,
      scaledCrop,
      scaledCrop,
      mouseX - options.cropWidth / 2,
      mouseY - options.cropWidth / 2,
      options.cropWidth,
      options.cropWidth
    )

    const grd = ctx.createLinearGradient(0, mouseY, 0, mouseY + options.cropWidth / 2)
    grd.addColorStop(0, 'transparent')
    grd.addColorStop(1, 'white')

    ctx.fillStyle = grd

    ctx.fillRect(
      mouseX - options.cropWidth / 2,
      mouseY + 50,
      options.cropWidth,
      options.cropWidth / 2
    )

    ctx.fillStyle = 'black'

    ctx.imageSmoothingEnabled = true

    ctx.globalCompositeOperation = 'destination-in'
    ctx.beginPath()
    ctx.arc(mouseX, mouseY, options.cropWidth / 2, 0, Math.PI * 2)

    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'

    ctx.arc(mouseX, mouseY, (options.cropWidth - 50) / 2, 0, Math.PI * 2)
    ctx.strokeStyle = options.color
    ctx.lineWidth = 15

    ctx.stroke()

    ctx.drawImage(
      options.img,
      mouseX - options.cropWidth / 2,
      mouseY - options.cropWidth / 2,
      options.cropWidth,
      options.cropWidth
    )

    ctx.font = '45px Sans-serif'
    ctx.fillText(options.color.toUpperCase(), mouseX - 100, mouseY + 100)
  }
}
