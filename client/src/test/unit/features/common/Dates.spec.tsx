import { render, screen } from '@testing-library/react'
import React from 'react'

import Dates from '../../../../features/common/Dates'

describe('Dates', () => {
  it('renders the start and end date', () => {
    render(<Dates start="2000" end="2024" />)

    const date = screen.getByTestId('start-end-dates')
    expect(date).toHaveTextContent(', 2000-2024')
  })
})
