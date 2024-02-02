import { describe, expect, it } from 'vitest'
import { provideCanvasUseCases } from '@/core/canvas'

describe('rgbToHex useCase', () => {
  it('return an hex color from a color type', async () => {
    const canvasUseCases = provideCanvasUseCases()

    expect(
      canvasUseCases.rgbToHsl({
        R: 10,
        G: 10,
        B: 10
      })
    ).toEqual('hsl(0, 0%, 4%)')
  })
})
