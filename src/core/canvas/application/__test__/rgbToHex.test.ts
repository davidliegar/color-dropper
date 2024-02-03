import { describe, expect, it } from 'vitest'
import { provideCanvasUseCases } from '@/core/canvas'

describe('colorToHex useCase', () => {
  it('return an hex color from a color type', async () => {
    const canvasUseCases = provideCanvasUseCases()

    expect(
      canvasUseCases.colorToHex(
        {
          R: 10,
          G: 10,
          B: 10,
          A: 255
        },
        { useAlpha: false }
      )
    ).toEqual('#0a0a0a')
  })
})
