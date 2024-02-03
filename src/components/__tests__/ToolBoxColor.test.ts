import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import toolBoxColor from '../ToolBoxColor.vue'
import { provideCanvasUseCases } from '@/core/canvas'
import { CANVAS_USE_CASES } from '@/injects'

describe('toolBox Component', () => {
  it('renders a toolbox item with the different color representation', async () => {
    const canvasUseCases = provideCanvasUseCases()

    const props = {
      useAlpha: false,
      color: {
        R: 123,
        G: 10,
        B: 24,
        A: 255
      }
    }

    render(toolBoxColor, {
      global: {
        provide: {
          [CANVAS_USE_CASES as symbol]: canvasUseCases
        }
      },

      props
    })

    screen.getByText(canvasUseCases.colorToHex(props.color, { useAlpha: false }), { exact: false })

    await userEvent.selectOptions(screen.getByRole('combobox'), 'rgb')

    screen.getByText(canvasUseCases.colorToRgb(props.color, { useAlpha: false }))

    await userEvent.selectOptions(screen.getByRole('combobox'), 'hsl')

    screen.getByText(canvasUseCases.colorToHsl(props.color, { useAlpha: false }))
  })
})
