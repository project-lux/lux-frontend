/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import RecordLink from '../common/RecordLink'

interface IProducedBy {
  agent: string | null
  date: string | null
  label: string
  location?: string | null
  locationLabel?: string
}

const ProductionSnippet: React.FC<IProducedBy> = ({
  agent,
  date,
  label,
  location,
  locationLabel,
}) => (
  <React.Fragment>
    {agent !== null && (
      <Row>
        <Col>
          <StyledDt>{label}</StyledDt>
          <StyledDd data-testid="production-snippet-agent-data">
            <RecordLink url={agent} /> {date !== null && `in ${date}`}
          </StyledDd>
        </Col>
      </Row>
    )}
    {location !== undefined && location !== null && (
      <Row>
        <Col>
          <StyledDt>{locationLabel || 'Location'}</StyledDt>
          <StyledDd data-testid="production-snippet-location-data">
            <RecordLink url={location} />
          </StyledDd>
        </Col>
      </Row>
    )}
  </React.Fragment>
)

export default ProductionSnippet
