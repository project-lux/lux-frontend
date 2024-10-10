import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import {
  relatedAccordions,
  timeline,
  // relatedItems,
  // locations,
  relatedObjectsAndWorks,
  hierarchyChildren,
} from '../../config/conceptSearchTags'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import AccordionContainer from '../relatedLists/AccordionContainer'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import { ErrorFallback } from '../error/ErrorFallback'
import RelatedObjectsAndWorks from '../common/RelatedObjectsAndWorks'
// import Locations from '../common/Locations'
// import WhatWeHave from '../common/WhatWeHave'
import ConceptParser from '../../lib/parse/data/ConceptParser'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import {
  getAllNextConceptUris,
  getNextConceptUris,
} from '../../lib/util/hierarchyHelpers'
import HierarchyContainer from '../hierarchy/HierarchyContainer'
import TimelineContainer from '../timeline/TimelineContainer'
import IConcept from '../../types/data/IConcept'

import AboutPanel from './AboutPanel'

const ConceptPage: React.FC<{ data: IConcept }> = ({ data }) => {
  const concept = new ConceptParser(data)

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader entity={data}>
          <GenericBreadcrumbHierarchy
            key={concept.json.id}
            entity={data}
            id="concept-page"
            getNextEntityUri={getNextConceptUris}
            maxLength={10}
            columnClassName="px-0"
          />
        </EntityHeader>
      </ErrorBoundary>
      <StyledEntityBody>
        <Col lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RelatedObjectsAndWorks
              links={data._links}
              relationships={relatedObjectsAndWorks}
              type="concept"
            />
            <HierarchyContainer
              key={concept.json.id}
              entity={data}
              halLink={hierarchyChildren}
              getParentUris={getAllNextConceptUris}
            />
            <TimelineContainer
              searchTags={timeline}
              providedHalLinks={data._links}
            />
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
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StyledEntityPageSection className="row">
              <AboutPanel entity={data} />
              {/* <WhatWeHave
                    configuredHalLinks={relatedItems}
                    providedHalLinks={data._links}
                  /> */}
            </StyledEntityPageSection>
            <Row>
              <Col xs={12}>
                <FeedbackButton />
              </Col>
            </Row>
            <StyledEntityPageSection className="row">
              <Col xs={12} className="my-2">
                <DataSources entity={data} />
              </Col>
            </StyledEntityPageSection>
          </ErrorBoundary>
        </Col>
      </StyledEntityBody>
    </React.Fragment>
  )
}

export default ConceptPage
