import { render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import Map from '../../../../features/common/Map'

const mockConfig = {
  thumbnailMode: false,
  wkt: 'POINT (-76.33269 44.38342)',
}

vi.mock('leaflet')

vi.mock('react-leaflet', () => ({
  MapContainer: ({
    children,
    className,
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid="leaflet-map" className={className}>
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid="leaflet-tile-layer" />,
  Marker: () => <div data-testid="leaflet-marker" />,
  GeoJSON: () => <div data-testid="leaflet-geojson" />,
}))

describe('Map', () => {
  it('renders the StyledMapContainer', () => {
    render(<Map config={mockConfig} className="col md" />)

    const map = screen.getByTestId('map-container')
    expect(map).toBeInTheDocument()
  })
})
