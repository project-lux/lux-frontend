import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import NamesContainer from '../../../../features/common/NamesContainer'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockContent = 'Mock Name'
const mockNames = {
  primaryName: [
    {
      content: mockContent,
      language: '',
    },
  ],
}
const mockEntity = reusableMinimalEntity('Primary Name')

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

describe('NamesContainer', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <NamesContainer names={mockNames} />
      </BrowserRouter>,
    )

    const container = screen.getByTestId('names-container')
    expect(container).toBeInTheDocument()
  })

  it('renders label', async () => {
    render(
      <BrowserRouter>
        <NamesContainer names={mockNames} />
      </BrowserRouter>,
    )

    const label = screen.getByTestId('primaryname-text-label')
    expect(label).toBeInTheDocument()
  })

  it('renders name component', async () => {
    render(
      <BrowserRouter>
        <NamesContainer names={mockNames} />
      </BrowserRouter>,
    )

    const name = screen.getByText(mockContent)
    expect(name).toBeInTheDocument()
  })
})
