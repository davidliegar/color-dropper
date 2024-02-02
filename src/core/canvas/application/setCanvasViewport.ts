export function setCanvasViewport() {
  return (canvas: HTMLCanvasElement): HTMLCanvasElement => {
    canvas.width = document.documentElement.clientWidth * window.devicePixelRatio
    canvas.height = document.documentElement.clientHeight * window.devicePixelRatio

    canvas.style.width = `${document.documentElement.clientWidth}px`
    canvas.style.height = `${document.documentElement.clientHeight}px`

    return canvas
  }
}
