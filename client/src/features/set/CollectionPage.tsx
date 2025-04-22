import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import {
  timeline,
  // relatedTypes,
  objectsIncluded,
  relatedAccordions,
} from '../../config/collectionsSearchTags'
import WorkParser from '../../lib/parse/data/WorkParser'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import RelatedObjectsWorksAndCollections from '../common/RelatedObjectsWorksAndCollections'
import TimelineContainer from '../timeline/TimelineContainer'
// import WhatWeHave from '../common/WhatWeHave'
import AccordionContainer from '../relatedLists/AccordionContainer'
import { ErrorFallback } from '../error/ErrorFallback'

import CollectionHierarchy from './CollectionHierarchy'
import AboutCollection from './AboutCollection'

interface IProps {
  data: IEntity
}

const CollectionPage: React.FC<IProps> = ({ data }) => {
  const collection = new WorkParser(data)

  return (
    <React.Fragment>
      <EntityHeader entity={data}>
        <CollectionHierarchy entity={data} />
      </EntityHeader>
      <StyledEntityBody>
        <Col lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RelatedObjectsWorksAndCollections
              links={data._links || {}}
              relationships={objectsIncluded}
              type="collection"
            />
            <TimelineContainer
              searchTags={timeline}
              providedHalLinks={collection.json._links}
            />
            <AccordionContainer
              searchTags={relatedAccordions}
              providedHalLinks={collection.json._links}
            />
          </ErrorBoundary>
        </Col>
        <Col lg={4}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StyledEntityPageSection className="row">
              <Col xs={12}>
                <AboutCollection data={data} />
              </Col>
              {/* <WhatWeHave
                configuredHalLinks={relatedTypes}
                providedHalLinks={collection.json._links}
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

export default CollectionPage
