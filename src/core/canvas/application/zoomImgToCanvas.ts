export interface ZoomOptions {
  img: HTMLImageElement
  x: number
  y: number
  zoom: number
  cropWidth: number
}

export function zoomImgToCanvas () {
  return async (canvas: HTMLCanvasElement, canvasOrigin: HTMLCanvasElement, options: ZoomOptions) => {  
    const w = Math.floor(canvasOrigin.width / options.zoom)
    const h = Math.floor(canvasOrigin.height / options.zoom)    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const scaledCrop = Math.max(w, h)

    ctx.imageSmoothingEnabled = false
    
    ctx.drawImage(
      canvasOrigin, 
      (options.x * devicePixelRatio) - scaledCrop / 2, (options.y * devicePixelRatio) - scaledCrop / 2,
      scaledCrop, scaledCrop,
      (options.x * devicePixelRatio) - options.cropWidth / 2, (options.y * devicePixelRatio) - options.cropWidth / 2,
      options.cropWidth, options.cropWidth
    );

    ctx.imageSmoothingEnabled = true

    ctx.globalCompositeOperation = "destination-in"
    ctx.beginPath()
    ctx.arc(
      (options.x * devicePixelRatio), (options.y * devicePixelRatio),
      options.cropWidth / 2,
      0, Math.PI * 2
    )

    ctx.fill();
    ctx.globalCompositeOperation = "source-over"

    ctx.drawImage(
      options.img, 
      (options.x * devicePixelRatio) - options.cropWidth / 2, (options.y * devicePixelRatio) -  options.cropWidth / 2,
      options.cropWidth, options.cropWidth
    );
  }
}
