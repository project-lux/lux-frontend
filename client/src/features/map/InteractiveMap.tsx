import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Col, Row } from 'react-bootstrap'

import StyledMapContainer from '../../styles/features/common/StyledMapContainer'
import { fetchSearchResults } from '../../lib/util/fetchSearchResults'
import { IAdvancedSearchConfig } from '../../config/advancedSearch/advancedSearch'

import Checklist from './Checklist'

const InteractiveMap: React.FC = () => {
  const [pinpoints, setPinpoints] = useState(null)
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log(pinpoints, isError, isLoading)
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  // User selects a checkbox
  // The selection triggers a query to get the results from the relationship selected
  // If the request is successful
  const handleSearch = (query: IAdvancedSearchConfig, scope: string): void => {
    fetchSearchResults({
      scope,
      query,
      onSuccess: (data) => {
        const parsedData = JSON.parse(data)
        if (parsedData !== null) {
          setPinpoints(parsedData)
        } else {
          setIsError(true)
        }
        setIsLoading(false)
      },
      onError: () => setIsError(true),
      onLoading: () => setIsLoading(true),
    })
  }

  return (
    <Row>
      <Col xs={8}>
        <StyledMapContainer
          className="col lg"
          data-testid="locations-map-container"
        >
          <MapContainer center={[51.505, -0.09]} zoom={1.5}>
            <TileLayer
              attribution={attribution}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </StyledMapContainer>
      </Col>
      <Col xs={4}>
        <Checklist onSelect={handleSearch} />
      </Col>
    </Row>
  )
}

export default InteractiveMap
