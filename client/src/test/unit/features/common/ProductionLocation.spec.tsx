import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { place as mockPlace } from '../../../data/place'
import { reusableMinimalEntity as mockEntity } from '../../../data/reusableMinimalEntity'
import ProductionLocation from '../../../../features/common/ProductionLocation'
import { stripYaleIdPrefix } from '../../../../lib/parse/data/helper'

const strippedMockUrl = stripYaleIdPrefix(mockPlace.id)

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockPlace,
    isSuccess: true,
  }),
  useGetItemsQuery: () => ({
    data: [mockEntity('Parent Place')],
    isSuccess: true,
  }),
  useGetNameQuery: () => ({
    data: mockPlace,
    isSuccess: true,
  }),
}))

jest.mock('leaflet')

describe('ProductionLocation', () => {
  it('renders the record link', async () => {
    render(
      <BrowserRouter>
        <ProductionLocation location={mockPlace.id} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(`${strippedMockUrl}-record-link`)
    expect(link).toBeInTheDocument()
  })

  it('renders the map', async () => {
    render(
      <BrowserRouter>
        <ProductionLocation location={mockPlace.id} />
      </BrowserRouter>,
    )

    const map = screen.getByTestId('map-container')
    expect(map).toBeInTheDocument()
  })

  it('renders hierarchy', async () => {
    render(
      <BrowserRouter>
        <ProductionLocation location={mockPlace.id} />
      </BrowserRouter>,
    )

    const hierarchy = screen.getByTestId(
      'event-location-generic-breadcrumb-hierarchy',
    )
    expect(hierarchy).toBeInTheDocument()
  })
})
