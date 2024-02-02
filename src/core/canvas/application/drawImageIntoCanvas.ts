export const drawImgIntoCanvasFullWidth = () => {
  return async function (canvas: HTMLCanvasElement, img: HTMLImageElement) {    
    const imageWidth = img.naturalWidth;
    const imageHeight = img.naturalHeight;
    const scale = Math.min(canvas.width / imageWidth, canvas.height / imageHeight)
  
    const scaledWidth = imageWidth * scale;
    const scaledHeight = imageHeight * scale;

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(img,
      (canvas.width - scaledWidth) / 2, (canvas.height - scaledHeight) / 2,
      scaledWidth, scaledHeight
    )
  }
}
