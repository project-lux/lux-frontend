import React from 'react'
import { Alert, Col, Row } from 'react-bootstrap'

const ErrorMessgae: React.FC<{
  onClose: (close: boolean) => void
}> = ({ onClose }) => (
  <Row className="d-flex justify-content-center">
    <Col xs={12} className="w-75">
      <Alert
        className="d-flex justify-content-center"
        variant="warning"
        onClose={() => onClose(false)}
        dismissible
        data-testid="search-error-message"
      >
        <p className="fs-4 mb-0">Invalid search string detected.</p>
      </Alert>
    </Col>
  </Row>
)

export default ErrorMessgae
