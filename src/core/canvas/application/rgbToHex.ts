import type { Color, HexColor } from '../domain'

function componentToHex(c: number) {
  const hex = c.toString(16)

  return hex.length == 1 ? `0${hex}` : hex
}

export function rgbToHex() {
  return (color: Color): HexColor => {
    return `#${componentToHex(color.R)}${componentToHex(color.G)}${componentToHex(color.B)}`
  }
}
