import React from 'react'
import { Col } from 'react-bootstrap'

import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'

import IdentifiersList from './IdentifiersList'

interface IIdentifiers {
  identifiers: Array<{
    label: string
    identifier: Array<string>
    carriedOutBy: Array<string>
  }>
  id: string
}

const IdentifiersContainer: React.FC<IIdentifiers> = ({ identifiers, id }) => (
  <StyledDataRow className="row">
    <Col xs={12} sm={12} md={3}>
      <dt data-testid={`${id}-identifier-label`}>Identifiers</dt>
    </Col>
    <Col xs={12} sm={12} md={9}>
      <IdentifiersList identifiers={identifiers} />
    </Col>
    <Col xs={12}>
      <StyledHr width="100%" className="identifiersContainerHr" />
    </Col>
  </StyledDataRow>
)

export default IdentifiersContainer
