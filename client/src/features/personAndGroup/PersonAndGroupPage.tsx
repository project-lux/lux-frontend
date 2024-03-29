import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Col from 'react-bootstrap/Col'
import { Row } from 'react-bootstrap'

import {
  relatedAccordions,
  relatedObjectsAndWorks,
  timelines,
  // itemAndWorkTypes,
  // locations,
} from '../../config/personAndGroupSearchTags'
import { ErrorFallback } from '../error/ErrorFallback'
import PersonAndGroupParser from '../../lib/parse/data/PersonAndGroupParser'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import AccordionContainer from '../relatedLists/AccordionContainer'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import ImageThumbnail from '../common/ImageThumbnail'
import RelatedObjectsAndWorks from '../common/RelatedObjectsAndWorks'
// import Locations from '../common/Locations'
// import TimelineContainers from '../common/TimelineContainers'
// import WhatWeHave from '../common/WhatWeHave'
import TimelineContainers from '../common/TimelineContainers'

import About from './About'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PersonAndGroupPage: React.FC<{ data: any }> = ({ data }) => {
  const agent = new PersonAndGroupParser(data)
  let startDate = ''
  let endDate = ''
  if (agent.json.id?.includes('person')) {
    startDate = agent.getBirthYear()
    endDate = agent.getDeathYear()
  } else {
    startDate = agent.getFormationDate()
    endDate = agent.getDissolutionDate()
  }
  const images = agent.getImages()
  const types = agent.getTypes()
  const [supertypeIcon, helperText] = agent.getSupertypeIcon(types)

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader
          entity={data}
          start={startDate}
          end={endDate}
          icon={supertypeIcon}
          entityTypeForIcon={helperText}
        />
      </ErrorBoundary>
      <StyledEntityBody>
        <Col lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RelatedObjectsAndWorks
              links={data._links}
              relationships={relatedObjectsAndWorks}
              type={agent.json.id?.includes('person') ? 'Person' : 'Group'}
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <TimelineContainers
              searchTags={timelines}
              providedHalLinks={agent.json._links}
            />
          </ErrorBoundary>

          {/* {Object.keys(data._links).includes(locations.searchTag) && (
                <Locations halLink={data._links[locations.searchTag]} />
              )} */}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AccordionContainer
              searchTags={relatedAccordions}
              providedHalLinks={agent.json._links}
            />
          </ErrorBoundary>
        </Col>
        <Col lg={4}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StyledEntityPageSection className="row">
              <Col xs={12}>
                {images.length > 0 && (
                  <div style={{ height: '20rem' }}>
                    <ImageThumbnail imageInfo={images[0]} />
                  </div>
                )}
                <About data={data} />
                {/* <WhatWeHave
                    configuredHalLinks={itemAndWorkTypes}
                    providedHalLinks={person.json._links}
                  /> */}
              </Col>
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

export default PersonAndGroupPage
