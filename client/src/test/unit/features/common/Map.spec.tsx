import { render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import Map from '../../../../features/common/Map'

const mockConfig = {
  thumbnailMode: false,
  wkt: 'POINT (-76.33269 44.38342)',
}

vi.mock('leaflet')

describe('Map', () => {
  it('renders', async () => {
    render(<Map config={mockConfig} className="col md" />)

    const map = screen.getByTestId('map-container')
    expect(map).toBeInTheDocument()
  })
})
