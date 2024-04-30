import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Col from 'react-bootstrap/Col'
import { Row } from 'react-bootstrap'

import {
  relatedAccordions,
  relatedObjectsAndWorks,
  timelines,
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
import TimelineContainer from '../timeline/TimelineContainer'
import IAgent from '../../types/data/IAgent'

import About from './About'

const PersonAndGroupPage: React.FC<{ data: IAgent }> = ({ data }) => {
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

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader entity={data} start={startDate} end={endDate} />
      </ErrorBoundary>
      <StyledEntityBody>
        <Col lg={8}>
          <Chart />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RelatedObjectsAndWorks
              links={data._links}
              relationships={relatedObjectsAndWorks}
              type={agent.json.id?.includes('person') ? 'Person' : 'Group'}
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <TimelineContainer
              searchTags={timelines}
              providedHalLinks={agent.json._links}
            />
          </ErrorBoundary>
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
