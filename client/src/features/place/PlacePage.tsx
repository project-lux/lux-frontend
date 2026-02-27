import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import {
  hierarchyChildren,
  relatedAccordions,
  // relatedTypes,
  // locations,
  relatedObjectsAndWorks,
  timelines,
} from '../../config/placeSearchTags'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import AccordionContainer from '../relatedLists/AccordionContainer'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import Map from '../common/Map'
import RelatedObjectsWorksAndCollections from '../common/RelatedObjectsWorksAndCollections'
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
import HierarchyContainer from '../hierarchy/HierarchyContainer'
import IPlace from '../../types/data/IPlace'
import IConcept from '../../types/data/IConcept'
import TimelineContainer from '../timeline/TimelineContainer'
import config from '../../config/config'

import About from './About'

const PlacePage: React.FC<{ data: IPlace }> = ({ data }) => {
  const place = new EntityParser(data)
  const images = place.getImages()
  const name = place.getPrimaryName(config.aat.primaryName)

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
            <RelatedObjectsWorksAndCollections
              links={data._links}
              relationships={relatedObjectsAndWorks}
              type="place"
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <TimelineContainer
              key={`${place.json.id}-timeline`}
              searchTags={timelines}
              providedHalLinks={place.json._links}
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HierarchyContainer
              key={`${place.json.id}-hierarchy`}
              entity={data}
              halLink={hierarchyChildren}
              getParentUris={
                getAllNextPlaceUris as (
                  entity: IPlace | IConcept,
                ) => Array<string>
              }
            />
            {/* {Object.keys(data._links).includes(locations.searchTag) && (
                  <Locations halLink={data._links[locations.searchTag]} />
                )} */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AccordionContainer
                searchTags={relatedAccordions}
                providedHalLinks={data._links}
              />
            </ErrorBoundary>
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
                    <ImageThumbnail imageInfo={images[0]} name={name} />
                  </div>
                )}
              </ErrorBoundary>
            </Col>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <About entity={data} />
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
