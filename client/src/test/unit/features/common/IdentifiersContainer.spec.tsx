import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'
import IdentifiersContainer from '../../../../features/common/IdentifiersContainer'

const mockEntity = reusableMinimalEntity('Identifier Label')
const mockIdentifiers = [
  {
    identifier: ['123456'],
    label: 'Identifiers',
    carriedOutBy: [],
  },
]

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => ({
      pathname: 'mock-path',
    }),
  }
})

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

describe('IdentifiersContainer', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <IdentifiersContainer identifiers={mockIdentifiers} id="test" />
      </BrowserRouter>,
    )

    const label = screen.getByTestId('test-identifier-label')
    expect(label).toBeInTheDocument()
  })

  it('renders the IdentifiersList', async () => {
    render(
      <BrowserRouter>
        <IdentifiersContainer identifiers={mockIdentifiers} id="test" />
      </BrowserRouter>,
    )

    const list = screen.getByTestId('identifiers-list-row-0')
    expect(list).toBeInTheDocument()
  })
})
