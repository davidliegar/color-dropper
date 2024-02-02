import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import toolBox from '../ToolBoxItem.vue'

describe('toolBox Component', () => {
  it('renders a toolbox item and emit a model', async () => {
    const props = {
      id: '',
      icon: 'icon',
      label: 'label'
    }

    const { emitted } = render(toolBox, {
      props
    })

    screen.getByText('label')

    await fireEvent.update(screen.getByRole('checkbox'))
    expect(emitted()).toHaveProperty('update:modelValue')
  })
})
