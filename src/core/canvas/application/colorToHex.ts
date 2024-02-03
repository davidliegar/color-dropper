import type { Color, HexColor } from '../domain'

function componentToHex(c: number) {
  const hex = c.toString(16)

  return hex.length == 1 ? `0${hex}` : hex
}

export function colorToHex() {
  return (color: Color, options: { useAlpha: Boolean }): HexColor => {
    const hex6 = `${componentToHex(color.R)}${componentToHex(color.G)}${componentToHex(color.B)}`

    if (options?.useAlpha) {
      return `#${hex6}${componentToHex(color.A)}`
    }

    return `#${hex6}`
  }
}
