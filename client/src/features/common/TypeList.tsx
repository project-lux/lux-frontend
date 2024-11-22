import React from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'

import RecordLink from './RecordLink'

interface IProps {
  types: string[]
}

const TypeList: React.FC<IProps> = ({ types }) => (
  <Row>
    <Col>
      <StyledDt data-testid="types-label">Categorized As</StyledDt>
      <StyledDd data-testid="entity-type-list">
        {types.map((type, index) => (
          <React.Fragment key={`${type}_${index}`}>
            <RecordLink url={type} linkCategory="Results Snippet" />
            {index === types.length - 1 ? '' : ', '}
          </React.Fragment>
        ))}
      </StyledDd>
    </Col>
  </Row>
)

export default TypeList
