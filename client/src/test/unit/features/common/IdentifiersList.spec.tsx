import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'
import IdentifiersList from '../../../../features/common/IdentifiersList'

const mockEntity = reusableMinimalEntity('Identifier Label')
const mockIdentifiers = [
  {
    identifier: ['123456'],
    label: 'Identifiers',
    carriedOutBy: [],
  },
]

vi.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'mock-path',
  }),
}))

vi.mock('../../../../redux/api/ml_api', () => ({
  useGetNameQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
  useGetItemQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

describe('IdentifiersList', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <IdentifiersList identifiers={mockIdentifiers} />
      </BrowserRouter>,
    )

    const label = screen.getByTestId('identifiers-list-row-0')
    expect(label).toBeInTheDocument()
  })

  it('renders the Identifier', async () => {
    render(
      <BrowserRouter>
        <IdentifiersList identifiers={mockIdentifiers} />
      </BrowserRouter>,
    )

    const div = screen.getByTestId('identifier-div')
    expect(div).toBeInTheDocument()
  })
})
