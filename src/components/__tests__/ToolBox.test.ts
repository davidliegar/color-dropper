import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import toolBox from '../ToolBox.vue'
import { provideCanvasUseCases } from '@/core/canvas'
import { CANVAS_USE_CASES } from '@/injects'

describe('toolBox Component', () => {
  it('renders a toolbox item and emit a model', async () => {
    const canvasUseCases = provideCanvasUseCases()

    const props = {
      modelValue: {},
      savedColors: [
        {
          R: 123,
          G: 10,
          B: 24
        }
      ]
    }

    render(toolBox, {
      global: {
        provide: {
          [CANVAS_USE_CASES as symbol]: canvasUseCases
        }
      },

      props
    })

    screen.getByText(canvasUseCases.rgbToHex(props.savedColors[0]))
  })
})
