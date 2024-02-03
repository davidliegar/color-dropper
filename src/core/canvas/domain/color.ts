export interface Color {
  R: number
  G: number
  B: number
  A: number
}

export type HexColor = `#${string}`

export type RgbColor = `rgb(${number}, ${number}, ${number})`
export type RgbaColor = `rgba(${number}, ${number}, ${number}, ${string})`

export type HslColor = `hsl(${number}, ${number}%, ${number}%)`
export type HslaColor = `hsla(${number}, ${number}%, ${number}%, ${string})`
