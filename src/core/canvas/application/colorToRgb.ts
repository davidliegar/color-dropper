import type { Color, RgbColor, RgbaColor } from '../domain'

export function colorToRgb() {
  return (color: Color, options: { useAlpha: Boolean }): RgbColor | RgbaColor => {
    if (options?.useAlpha) {
      const alpha = (color.A / 255).toFixed(2)
      return `rgba(${color.R}, ${color.G}, ${color.B}, ${alpha})`
    }

    return `rgb(${color.R}, ${color.G}, ${color.B})`
  }
}
