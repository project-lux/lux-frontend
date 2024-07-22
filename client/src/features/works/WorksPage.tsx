import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { ErrorBoundary } from 'react-error-boundary'

import WorkParser from '../../lib/parse/data/WorkParser'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import CanIReuseIt from '../common/CanIReuseIt'
import { ErrorFallback } from '../error/ErrorFallback'

import CarriedBy from './CarriedBy'
import HowDoISeeIt from './HowDoISeeIt'
import About from './About'
import Images from './Images'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WorksPage: React.FC<{ data: any }> = ({ data }) => {
  const entity = new WorkParser(data)
  const personUri =
    entity.getProductionAgent() || entity.getPublicationAgent() || undefined
  const [supertypeIcon, helperText] = entity.getSupertypeIcon()

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader
          entity={data}
          primaryAgent={personUri}
          icon={supertypeIcon}
          entityTypeForIcon={helperText}
        />
      </ErrorBoundary>
      <Images entity={data} />
      <StyledEntityBody>
        <Col lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <CarriedBy entity={data} />
            <About entity={data} />
          </ErrorBoundary>
        </Col>
        <Col lg={4}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StyledEntityPageSection className="row">
              <HowDoISeeIt entity={data} />
              <CanIReuseIt entity={data} entityType="work" />
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

export default WorksPage
