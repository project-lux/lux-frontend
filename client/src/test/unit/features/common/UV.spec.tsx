import { render, screen } from '@testing-library/react'
import React from 'react'

import UV from '../../../../features/common/UV'

describe('UV', () => {
  it('renders the record links', async () => {
    render(<UV manifest="test" />)

    const viewer = screen.getByTestId('uv-viewer')
    expect(viewer).toBeInTheDocument()
  })
})
