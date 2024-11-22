import React from 'react'
import { Col } from 'react-bootstrap'
import { ErrorBoundary } from 'react-error-boundary'

import RecordLink from '../common/RecordLink'
import StyledDataRow from '../../styles/shared/DataRow'
import { ErrorFallback } from '../error/ErrorFallback'

interface IEntity {
  data: Array<Record<string, string>>
}

const ActivityColumn: React.FC<{
  type: string
  dates: string
  location: string
}> = ({ type, dates, location }) => (
  <Col xs={12} className="d-inline-flex">
    <dd>
      {type !== '' && <RecordLink url={type} />}
      {dates !== '' && (
        <p className="my-0" data-testid="professional-activity-dates">
          during {dates}
        </p>
      )}
      {location !== '' && (
        <p className="mb-0" data-testid="professional-activity-location">
          &nbsp; in <RecordLink url={location} />
        </p>
      )}
    </dd>
  </Col>
)

const Activity: React.FC<IEntity> = ({ data }) => (
  <StyledDataRow
    className="row"
    id="group-activity"
    data-testid="agent-activity-container"
  >
    <Col xs={12}>
      <dt>Professional Activities</dt>
    </Col>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {data.map((activity, ind) => {
        const { type, dates, location } = activity
        return (
          <ActivityColumn
            key={ind}
            type={type}
            dates={dates}
            location={location}
          />
        )
      })}
    </ErrorBoundary>
  </StyledDataRow>
)

export default Activity
