import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Col, Row, Tooltip } from 'react-bootstrap'
import { isNull } from 'lodash'

import StyledMapContainer from '../../styles/features/common/StyledMapContainer'
import { fetchSearchResults } from '../../lib/util/fetchSearchResults'
import IPlace from '../../types/data/IPlace'
import { getPinpoints } from '../../lib/map/mapHelper'
import LoadingSpinner from '../common/LoadingSpinner'
import NoResultsAlert from '../results/NoResultsAlert'
import { IWktParseResult } from '../../lib/parse/data/mapHelper'

import Checklist from './Checklist'

const InteractiveMap: React.FC = () => {
  const [data, setData] = useState<null | Array<IPlace>>(null)
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  // User selects a checkbox
  // The selection triggers a query to get the results from the relationship selected
  // If the request is successful
  const handleSearch = (query: string, scope: string): void => {
    fetchSearchResults({
      scope,
      query,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (returnedData: Promise<any>) => {
        returnedData.then((d) => {
          if (d !== null) {
            if (!isNull(data)) {
              setData([...data, ...d.data])
            } else {
              setData(d.data)
            }
          } else {
            setIsError(true)
          }
        })
        setIsLoading(false)
      },
      onError: () => setIsError(true),
      onLoading: () => setIsLoading(true),
    })
  }

  let pins: IWktParseResult[] = []
  if (data !== null && data.length > 0) {
    pins = getPinpoints(data)
    console.log(pins)
  }

  return (
    <Row>
      <Col xs={8}>
        {isError && (
          <NoResultsAlert message="An error occurred when retrieving the results" />
        )}
        <StyledMapContainer
          className="col lg"
          data-testid="locations-map-container"
        >
          {isLoading && <LoadingSpinner />}
          <MapContainer center={[51.505, -0.09]} zoom={1.5}>
            <TileLayer
              attribution={attribution}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pins.length > 0 &&
              pins.map((p: IWktParseResult) => (
                <Marker position={p.center}>
                  <Popup>Popup!</Popup>
                  <Tooltip>Tooltip!</Tooltip>
                </Marker>
              ))}
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
