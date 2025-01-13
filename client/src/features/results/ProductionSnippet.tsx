import React from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import RecordLink from '../common/RecordLink'

interface IProducedBy {
  agents: Array<string>
  date: string | null
  label: string
  location?: string | null
  locationLabel?: string
}

const ProductionSnippet: React.FC<IProducedBy> = ({
  agents,
  date,
  label,
  location,
  locationLabel,
}) => (
  <React.Fragment>
    {agents.length > 0 && (
      <Row>
        <Col>
          <StyledDt>{label}</StyledDt>
          <StyledDd data-testid="production-snippet-agent-data">
            {agents.slice(0, 3).map((agent, ind) => (
              <span>
                <RecordLink url={agent} />
                {ind !== 2 ? ', ' : ' '}
              </span>
            ))}
            {agents.length > 3 ? '... ' : ' '}
            {date !== null && `in ${date}`}
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
