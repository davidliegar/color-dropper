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
      color: {
        R: 123,
        G: 10,
        B: 24
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

    screen.getByText(canvasUseCases.rgbToHex(props.color))

    await userEvent.selectOptions(screen.getByRole('combobox'), 'rgb')

    screen.getByText('rgb(123, 10, 24)')

    await userEvent.selectOptions(screen.getByRole('combobox'), 'hsl')

    screen.getByText(canvasUseCases.rgbToHsl(props.color))
  })
})
