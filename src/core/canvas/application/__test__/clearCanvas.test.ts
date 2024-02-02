import { describe, expect, it } from 'vitest'
import { provideCanvasUseCases } from '@/core/canvas'
import 'jest-canvas-mock'

describe('rgbToHex useCase', () => {
  it('return an hex color from a color type', async () => {
    const canvas = document.createElement('canvas')
    const canvasUseCases = provideCanvasUseCases()

    canvasUseCases.clearCanvas(canvas)
    const events = canvas.getContext('2d')?.__getEvents()

    expect(events).toMatchInlineSnapshot(`
      [
        {
          "props": {
            "height": 150,
            "width": 300,
            "x": 0,
            "y": 0,
          },
          "transform": [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "clearRect",
        },
      ]
    `)
  })
})
