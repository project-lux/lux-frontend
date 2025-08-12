import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { place as mockPlace } from '../../../data/place'
import { reusableMinimalEntity as mockEntity } from '../../../data/reusableMinimalEntity'
import ProductionLocation from '../../../../features/common/ProductionLocation'
import { stripYaleIdPrefix } from '../../../../lib/parse/data/helper'

const strippedMockUrl = stripYaleIdPrefix(mockPlace.id as string)

vi.mock('../../../../redux/api/ml_api', () => ({
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

vi.mock('leaflet')

describe('ProductionLocation', () => {
  it('renders the record link', async () => {
    render(
      <BrowserRouter>
        <ProductionLocation location={mockPlace.id as string} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(`${strippedMockUrl}-record-link`)
    expect(link).toBeInTheDocument()
  })

  it('renders the map', async () => {
    render(
      <BrowserRouter>
        <ProductionLocation location={mockPlace.id as string} />
      </BrowserRouter>,
    )

    const map = screen.getByTestId('map-container')
    expect(map).toBeInTheDocument()
  })

  it('renders hierarchy', async () => {
    render(
      <BrowserRouter>
        <ProductionLocation location={mockPlace.id as string} />
      </BrowserRouter>,
    )

    const hierarchy = screen.getByTestId(
      'event-location-generic-breadcrumb-hierarchy',
    )
    expect(hierarchy).toBeInTheDocument()
  })
})
