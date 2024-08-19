import React from 'react'
import { Row } from 'react-bootstrap'

import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import PlaceParser from '../../lib/parse/data/PlaceParser'
import config from '../../config/config'
import { getNextPlaceUris } from '../../lib/util/hierarchyHelpers'

import Map from './Map'
import RecordLink from './RecordLink'
import GenericBreadcrumbHierarchy from './GenericBreadcrumbHierarchy'

interface IProps {
  location: string
}

const ProductionLocation: React.FC<IProps> = ({ location }) => {
  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(location),
    profile: 'results',
  })

  if (isSuccess && data) {
    const place = new PlaceParser(data)
    const name = place.getPrimaryName(config.aat.langen)

    const mapConfig = {
      wkt: data.defined_by || '',
      thumbnailMode: false,
    }

    const hasMapData = mapConfig.wkt !== ''

    return (
      <React.Fragment>
        <Row className={hasMapData ? 'mb-1' : ''}>
          <RecordLink name={name} url={location} />
        </Row>
        {hasMapData && <Map config={mapConfig} className="md row ms-1" />}
        <GenericBreadcrumbHierarchy
          key={data.id}
          entity={data}
          columnClassName="mt-2"
          maxLength={8}
          getNextEntityUri={getNextPlaceUris}
          id="event-location"
        />
      </React.Fragment>
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  return null
}

export default ProductionLocation
