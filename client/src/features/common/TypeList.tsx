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
        {types.reduce((links: React.ReactNode[], type: string, index) => {
          if (type !== null) {
            links.push(
              <React.Fragment key={`${type}_${index}`}>
                {links.length > 0 ? ', ' : ''}
                <RecordLink url={type} linkCategory="Results Snippet" />
              </React.Fragment>,
            )
          }
          return links
        }, [])}
      </StyledDd>
    </Col>
  </Row>
)

export default TypeList
