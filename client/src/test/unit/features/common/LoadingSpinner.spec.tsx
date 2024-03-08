import { render, screen } from '@testing-library/react'
import React from 'react'

import LoadingSpinner from '../../../../features/common/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders', async () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toBeInTheDocument()
  })
})
