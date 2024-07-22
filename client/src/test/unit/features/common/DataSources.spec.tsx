import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import DataSources from '../../../../features/common/DataSources'
import { entity as mockEntity } from '../../../data/entity'

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetNameQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
  useGetItemQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'mock-path',
  }),
}))

describe('DataSources', () => {
  it('renders the record link', () => {
    render(
      <BrowserRouter>
        <DataSources entity={mockEntity} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('This-Record-0-external-link')
    expect(link).toBeInTheDocument()
  })

  it('renders the IIIF manifest', () => {
    render(
      <BrowserRouter>
        <DataSources entity={mockEntity} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('IIIF-Manifest-0-external-link')
    expect(link).toBeInTheDocument()
  })

  it('renders the internal sources', () => {
    render(
      <BrowserRouter>
        <DataSources entity={mockEntity} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('Yale-Contributing-Records-0-external-link')
    expect(link).toBeInTheDocument()
  })

  it('renders the external sources', () => {
    render(
      <BrowserRouter>
        <DataSources entity={mockEntity} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(
      'External-Contributing-Records-0-external-link',
    )
    expect(link).toBeInTheDocument()
  })
})
