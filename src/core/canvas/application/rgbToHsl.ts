import type { Color, HslColor } from '../domain'

export function rgbToHsl() {
  return (color: Color): HslColor => {
    const R = color.R / 255
    const G = color.G / 255
    const B = color.B / 255

    const cmin = Math.min(R, G, B)
    const cmax = Math.max(R, G, B)
    const delta = cmax - cmin

    let h = 0
    let s = 0
    let l = 0

    if (delta === 0) {
      h = 0
    } else if (cmax === R) {
      h = ((G - B) / delta) % 6
    } else if (cmax === G) {
      h = (B - R) / delta + 2
    } else {
      h = (R - G) / delta + 4
    }

    h = Math.round(h * 60)

    if (h < 0) {
      h += 360
    }

    l = (cmax + cmin) / 2

    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    s = Math.round(s * 100)
    l = Math.round(l * 100)

    return `hsl(${h}, ${s}%, ${l}%)`
  }
}
