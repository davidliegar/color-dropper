export function loadImgToCanvas () {
  return (canvas: HTMLCanvasElement, imgPath: string): void => {  
    const img = new Image();
    img.onload = function () {
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;
      const scale = Math.min(canvas.width / imageWidth, canvas.height / imageHeight)

      const scaledWidth = imageWidth * scale;
      const scaledHeight = imageHeight * scale;

      ctx.drawImage(img,
        (canvas.width - scaledWidth) / 2,
        (canvas.height - scaledHeight) / 2,
        scaledWidth,
        scaledHeight
      )
    }
  
    img.src = imgPath
  }
}
