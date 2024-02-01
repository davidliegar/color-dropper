export function loadImgToCanvas () {
  return (canvas: HTMLCanvasElement, imgPath: string): void => {  
    const img = new Image();
    img.onload = function () {
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return
  
      const WRatio = canvas.width / img.width
      const HRatio = canvas.height / img.height
      const ratio = Math.min(WRatio, HRatio)
      
      ctx.drawImage(
        img, 0, 0, 
        img.width * window.devicePixelRatio, 
        img.height * window.devicePixelRatio,
        0, 0, img.width * ratio * window.devicePixelRatio, img.height * ratio * window.devicePixelRatio
      )
    }
  
    img.src = imgPath
  }
}
