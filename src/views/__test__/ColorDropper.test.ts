import { describe, it, expect, vi, type MockInstance, beforeEach, afterEach } from 'vitest'
import { render, waitFor, screen, fireEvent, cleanup } from '@testing-library/vue'
import ColorDropper from '../ColorDropper.vue'
import { CANVAS_USE_CASES } from '@/injects'
import { provideCanvasUseCases } from '@/core/canvas'
import userEvent from '@testing-library/user-event'

describe('color Dropper', () => {
  let canvasUseCases: ReturnType<typeof provideCanvasUseCases>
  let loadImgSpy: MockInstance
  let drawSpy: MockInstance

  beforeEach(() => {
    canvasUseCases = provideCanvasUseCases()

    loadImgSpy = vi.spyOn(canvasUseCases, 'loadImg')
    const img = new Image()
    loadImgSpy.mockImplementation(() => Promise.resolve(img))

    drawSpy = vi.spyOn(canvasUseCases, 'drawImgIntoCanvasFullWidth')
    drawSpy.mockImplementation(() => Promise.resolve())

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
      (callback: FrameRequestCallback): number => {
        callback(0)
        return 0
      }
    )
  })

  afterEach(() => {
    cleanup()
  })

  it('renders ColorDropper and calls the useCases necessary to render the canvas', async () => {
    render(ColorDropper, {
      global: {
        provide: {
          [CANVAS_USE_CASES as symbol]: canvasUseCases
        }
      }
    })

    await waitFor(() => expect(drawSpy).toHaveBeenCalledOnce())

    expect(loadImgSpy).toHaveBeenCalledTimes(2)
  })

  it('select color dropper tool and moves the mouse over the canvas', async () => {
    const getColorSpy = vi.spyOn(canvasUseCases, 'getColorFromPixel')
    getColorSpy.mockImplementation(() => ({ R: 10, G: 10, B: 10 }))

    render(ColorDropper, {
      global: {
        provide: {
          [CANVAS_USE_CASES as symbol]: canvasUseCases
        }
      }
    })

    await waitFor(() => expect(drawSpy).toHaveBeenCalledOnce())

    await fireEvent.update(screen.getByRole('checkbox'))

    await userEvent.pointer([
      { keys: '[TouchA>]', target: screen.getByTestId('canvas') },
      { pointerName: 'TouchA', coords: { x: 200, y: 200 } },
      { keys: '[/TouchA]' }
    ])

    expect(getColorSpy).toHaveBeenCalledOnce()
  })
})
