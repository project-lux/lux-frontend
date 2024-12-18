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
import HowDoISeeIt from '../common/HowDoISeeIt'
import { ErrorFallback } from '../error/ErrorFallback'
import ILinguisticObject from '../../types/data/ILinguisticObject'
import IVisualItem from '../../types/data/IVisualItem'

import Images from './Images'
import CarriedBy from './CarriedBy'
import About from './About'

const WorksPage: React.FC<{ data: ILinguisticObject | IVisualItem }> = ({
  data,
}) => {
  const entity = new WorkParser(data)
  const personUri =
    entity.getProductionAgent() || entity.getPublicationAgent() || undefined

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader entity={data} primaryAgent={personUri} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Images entity={data} />
      </ErrorBoundary>
      <StyledEntityBody>
        <Col lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <CarriedBy entity={data} />
            <About entity={data} />
          </ErrorBoundary>
        </Col>
        <Col lg={4}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StyledEntityPageSection>
              <HowDoISeeIt data={data} />
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
