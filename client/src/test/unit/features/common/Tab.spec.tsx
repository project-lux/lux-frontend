import { render, screen } from '@testing-library/react'
import React from 'react'

import Tab from '../../../../features/common/Tab'

describe('Tab', () => {
  it('renders children', async () => {
    const mockId = 'testing'

    render(
      <Tab title="test">
        <p data-testid={mockId}>Testing</p>
      </Tab>,
    )

    const child = screen.getByTestId(mockId)
    expect(child).toBeInTheDocument()
  })
})
