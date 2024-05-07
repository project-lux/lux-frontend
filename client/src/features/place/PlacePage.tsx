import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import {
  hierarchyChildren,
  relatedAccordions,
  // relatedTypes,
  // locations,
  relatedObjectsAndWorks,
} from '../../config/placeSearchTags'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import AccordionContainer from '../relatedLists/AccordionContainer'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import Map from '../common/Map'
import RelatedObjectsAndWorks from '../common/RelatedObjectsAndWorks'
import { ErrorFallback } from '../error/ErrorFallback'
// import Locations from '../common/Locations'
// import WhatWeHave from '../common/WhatWeHave'
import EntityParser from '../../lib/parse/data/EntityParser'
import {
  getAllNextPlaceUris,
  getNextPlaceUris,
} from '../../lib/util/hierarchyHelpers'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import ImageThumbnail from '../common/ImageThumbnail'
import HierarchyContainer from '../hierarchy/FullscreenContainer'
import { useAppDispatch } from '../../app/hooks'
import { addOrigin } from '../../redux/slices/hierarchySlice'
import IPlace from '../../types/data/IPlace'

import AboutPanel from './AboutPanel'

const PlacePage: React.FC<{ data: IPlace }> = ({ data }) => {
  const dispatch = useAppDispatch()
  const place = new EntityParser(data)
  const images = place.getImages()

  useEffect(() => {
    dispatch(addOrigin({ value: data }))
  }, [data, dispatch])

  const mapConfig = {
    wkt: data.defined_by || '',
    thumbnailMode: false,
  }

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader entity={data}>
          <GenericBreadcrumbHierarchy
            key={place.json.id}
            entity={data}
            columnClassName="px-0"
            maxLength={8}
            getNextEntityUri={getNextPlaceUris}
            id="place-page"
          />
        </EntityHeader>
      </ErrorBoundary>
      <StyledEntityBody>
        <Col xs={12} lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RelatedObjectsAndWorks
              links={data._links}
              relationships={relatedObjectsAndWorks}
              type="place"
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HierarchyContainer
              key={place.json.id}
              entity={data}
              halLink={hierarchyChildren}
              getParentUris={getAllNextPlaceUris}
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {/* {Object.keys(data._links).includes(locations.searchTag) && (
                  <Locations halLink={data._links[locations.searchTag]} />
                )} */}
            <Row className="my-3">
              <Col xs={12}>
                <AccordionContainer
                  searchTags={relatedAccordions}
                  providedHalLinks={data._links}
                />
              </Col>
            </Row>
          </ErrorBoundary>
        </Col>
        <Col lg={4}>
          <StyledEntityPageSection className="row">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {/* Render the map if there is map data */}
                {mapConfig.wkt !== '' && (
                  <Map config={mapConfig} className="col lg" />
                )}
                {/* Render images if they exist and there is no map data */}
                {mapConfig.wkt === '' && images.length > 0 && (
                  <div style={{ height: '20rem' }}>
                    <ImageThumbnail imageInfo={images[0]} />
                  </div>
                )}
              </ErrorBoundary>
            </Col>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AboutPanel entity={data} />
            </ErrorBoundary>
            {/* <WhatWeHave
                    configuredHalLinks={relatedTypes}
                    providedHalLinks={data._links}
                  /> */}
          </StyledEntityPageSection>
          <Row>
            <Col xs={12}>
              <FeedbackButton />
            </Col>
          </Row>
          <StyledEntityPageSection className="row">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <DataSources entity={data} />
              </ErrorBoundary>
            </Col>
          </StyledEntityPageSection>
        </Col>
      </StyledEntityBody>
    </React.Fragment>
  )
}

export default PlacePage
