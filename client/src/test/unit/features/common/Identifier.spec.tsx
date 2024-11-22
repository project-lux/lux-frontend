import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import Identifier from '../../../../features/common/Identifier'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockEntity = reusableMinimalEntity('Identifier Label')

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

describe('Identifier', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <Identifier
          label="Identifiers"
          identifiers={['123456']}
          carriedOutBy={['test']}
          index={0}
          location="CT"
        />
      </BrowserRouter>,
    )

    const container = screen.getByTestId('identifier-div')
    expect(container).toBeInTheDocument()
  })

  it('renders locations', async () => {
    render(
      <BrowserRouter>
        <Identifier
          label="Identifiers"
          identifiers={['123456']}
          carriedOutBy={['test']}
          index={0}
          location="CT"
        />
      </BrowserRouter>,
    )

    const container = screen.getByTestId('identifier-div')
    expect(container).toHaveTextContent('CT')
  })

  it('renders the label', async () => {
    render(
      <BrowserRouter>
        <Identifier
          label="Identifiers"
          identifiers={['123456']}
          carriedOutBy={['test']}
          index={0}
          location="CT"
        />
      </BrowserRouter>,
    )

    const label = screen.getByTestId('identifiers-text-label')
    expect(label).toHaveTextContent('Identifier Label')
  })
})
