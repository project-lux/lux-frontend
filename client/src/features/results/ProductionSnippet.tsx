/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

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
      <React.Fragment>
        <StyledDt>{label}</StyledDt>
        <StyledDd data-testid="production-snippet-agent-data">
          <RecordLink url={agent} /> {date !== null && `in ${date}`}
        </StyledDd>
      </React.Fragment>
    )}
    {location !== undefined && location !== null && (
      <React.Fragment>
        <StyledDt>{locationLabel || 'Location'}</StyledDt>
        <StyledDd data-testid="production-snippet-location-data">
          <RecordLink url={location} />
        </StyledDd>
      </React.Fragment>
    )}
  </React.Fragment>
)

export default ProductionSnippet
