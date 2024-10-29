import { render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import TabButton from '../../../../features/common/TabButton'

const mockTitle = 'Test Title'

describe('TabButton', () => {
  it('renders', async () => {
    render(
      <TabButton
        title={mockTitle}
        index={0}
        setSelectedTab={vi.fn()}
        isActive
      />,
    )

    const button = screen.getByTestId('tab-button-list-item')
    expect(button).toBeInTheDocument()
  })

  it('renders the title', async () => {
    render(
      <TabButton
        title={mockTitle}
        index={0}
        setSelectedTab={vi.fn()}
        isActive
      />,
    )

    const title = screen.getByTestId('test-title-button')
    expect(title).toHaveTextContent(mockTitle)
  })
})
