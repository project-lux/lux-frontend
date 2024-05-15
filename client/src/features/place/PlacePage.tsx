import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import {
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
import HierarchyContainer from '../hierarchy/HierarchyContainer'
import { hierarchyChildren } from '../../config/conceptSearchTags'
import { useAppDispatch } from '../../app/hooks'
import { addOrigin } from '../../redux/slices/hierarchyVisualizationSlice'

import AboutPanel from './AboutPanel'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlacePage: React.FC<{ data: any }> = ({ data }) => {
  const dispatch = useAppDispatch()
  const place = new EntityParser(data)
  const types = place.getTypes()
  const [supertypeIcon, helperText] = place.getSupertypeIcon(types)

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
        <EntityHeader
          entity={data}
          icon={supertypeIcon}
          entityTypeForIcon={helperText}
        >
          <GenericBreadcrumbHierarchy
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
                <Map config={mapConfig} className="col lg" />
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
