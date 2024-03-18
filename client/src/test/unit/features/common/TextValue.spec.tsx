import { render, screen } from '@testing-library/react'
import React from 'react'

import TextValue from '../../../../features/common/TextValue'

const mockValues = ['mock value']

describe('TextValue', () => {
  it('renders', async () => {
    render(<TextValue values={mockValues} />)

    const label = screen.getByTestId('text-value')
    expect(label).toBeInTheDocument()
  })

  it('renders all the values', async () => {
    render(<TextValue values={mockValues} />)

    const values = screen.getAllByTestId('text-value-detail-description')
    expect(values.length).toEqual(mockValues.length)
  })
})
