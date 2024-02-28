import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import { relatedObjects } from '../../config/eventSearchTags'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import RelatedObjectsAndWorks from '../common/RelatedObjectsAndWorks'
import { ErrorFallback } from '../error/ErrorFallback'
import EventParser from '../../lib/parse/data/EventParser'
import StyledHr from '../../styles/shared/Hr'

import AboutPanel from './AboutPanel'
import HowDoISeeIt from './HowDoISeeIt'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventPage: React.FC<{ data: any }> = ({ data }) => {
  const event = new EventParser(data)
  const types = event.getTypes()
  const [supertypeIcon, helperText] = event.getSupertypeIcon(types)

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader
          entity={data}
          icon={supertypeIcon}
          entityTypeForIcon={helperText}
        />
      </ErrorBoundary>
      <StyledEntityBody>
        <Col lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RelatedObjectsAndWorks
              links={data._links}
              relationships={relatedObjects}
              type="event"
            />
          </ErrorBoundary>
        </Col>
        <Col lg={4}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StyledEntityPageSection className="row">
              <AboutPanel entity={data} />
              <StyledHr />
              <Col xs={12}>
                <HowDoISeeIt entity={data} />
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
