import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import config from '../../config/config'
import {
  relatedEntites,
  relatedAccordions,
  timelines,
} from '../../config/eventSearchTags'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import RelatedObjectsWorksAndCollections from '../common/RelatedObjectsWorksAndCollections'
import { ErrorFallback } from '../error/ErrorFallback'
import EventParser from '../../lib/parse/data/EventParser'
import AccordionContainer from '../relatedLists/AccordionContainer'
import ImageThumbnail from '../common/ImageThumbnail'
import IEvent from '../../types/data/IEvent'
import TimelineContainer from '../timeline/TimelineContainer'

import About from './About'

const EventPage: React.FC<{ data: IEvent }> = ({ data }) => {
  const event = new EventParser(data)
  const images = event.getImages()
  const name = event.getPrimaryName(config.aat.primaryName)

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader entity={data} />
      </ErrorBoundary>
      <StyledEntityBody>
        <Col lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RelatedObjectsWorksAndCollections
              links={data._links}
              relationships={relatedEntites}
              type="event"
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <TimelineContainer
              key={`${data.id}-timeline`}
              searchTags={timelines}
              providedHalLinks={event.json._links}
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AccordionContainer
              searchTags={relatedAccordions}
              providedHalLinks={event.json._links}
            />
          </ErrorBoundary>
        </Col>
        <Col lg={4}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StyledEntityPageSection className="row">
              <Col xs={12}>
                {images.length > 0 && (
                  <div style={{ height: '20rem' }}>
                    <ImageThumbnail imageInfo={images[0]} name={name} />
                  </div>
                )}
                <About entity={data} />
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

export default EventPage
