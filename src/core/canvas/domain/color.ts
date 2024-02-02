export interface Color {
  R: number
  G: number
  B: number
}

export type HexColor = `#${string}`
export type HslColor = `hsl(${number}, ${number}%, ${number}%)`
