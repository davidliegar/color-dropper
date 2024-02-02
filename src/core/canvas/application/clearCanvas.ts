export function clearCanvas () {
  return async (canvas: HTMLCanvasElement) => {   
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}
