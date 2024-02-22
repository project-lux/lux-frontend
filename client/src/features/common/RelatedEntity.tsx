import React from 'react'
import { Row, Col } from 'react-bootstrap'
// import styled from 'styled-components'

import RecordLink from './RecordLink'

interface IRelatedEntity {
  icon: string
  text: string
  uri: string
  id: string
}

const RelatedEntity: React.FC<IRelatedEntity> = ({ icon, text, uri, id }) => (
  <Row className="d-flex">
    <Col xs={12}>
      <div className="d-flex">
        <div className="flex-shrink-0">
          <img
            src={icon}
            alt={`icon for ${text}`}
            id="icon"
            className="imageIcon"
            data-testid={`${id}-img-icon`}
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <dt
            className="mb-0"
            style={{ fontWeight: '300' }}
            data-testid={`${id}-term`}
          >
            {text}
          </dt>
          <dd data-testid={`${id}-link`}>
            <RecordLink url={uri} />
          </dd>{' '}
        </div>
      </div>
    </Col>
  </Row>
)

export default RelatedEntity
