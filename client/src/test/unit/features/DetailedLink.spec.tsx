import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { person as mockPerson } from '../../data/person'
import DetailedLink from '../../../features/works/DetailedLink'

jest.mock('../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockPerson,
    isSuccess: true,
  }),
}))

const mockUri = mockPerson.id as string

describe('DetailedLink', () => {
  it('renders the link with name', () => {
    render(
      <BrowserRouter>
        <DetailedLink uri={mockUri} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('internal-link')
    expect(link).toHaveTextContent('Mock Person')
  })

  it('renders the icon', () => {
    render(
      <BrowserRouter>
        <DetailedLink uri={mockUri} />
      </BrowserRouter>,
    )
    const icon = screen.getByTestId('entity-icon-img')
    expect(icon).toHaveAttribute('src', 'people-orgs.svg')
  })
})
