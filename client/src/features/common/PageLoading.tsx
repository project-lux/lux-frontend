import React from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledLoadingSpinner from '../../styles/features/common/Spinner'
import StyledPageLoading from '../../styles/features/common/PageLoading'

const PageLoading: React.FC = () => (
  <StyledPageLoading data-testid="page-loading">
    <Row className="mx-0">
      <Col xs={12} className="d-flex justify-content-center">
        <StyledLoadingSpinner animation="border" variant="primary" />
      </Col>
      <Col xs={12} className="d-flex justify-content-center">
        <h2>Loading data...</h2>
      </Col>
    </Row>
  </StyledPageLoading>
)

export default PageLoading
