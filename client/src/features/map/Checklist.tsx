import React from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledCheckbox from '../../styles/features/facets/Checkbox'

const relationships = {
  'Is the Place of Creation of Works Created By this Person': {
    scope: 'place',
    query: JSON.stringify({
      createdHere: {
        createdBy: {
          id: 'https://lux.collections.yale.edu/data/person/95195aa1-7d50-40a3-906b-848d73556df6',
        },
      },
    }),
  },
  'Produced Here this Person': {
    scope: 'place',
    query: JSON.stringify({
      producedHere: {
        producedBy: {
          id: 'https://lux.collections.yale.edu/data/person/95195aa1-7d50-40a3-906b-848d73556df6',
        },
      },
    }),
  },
}

interface IProps {
  onSelect: (query: string, scope: string) => void
}

const Checklist: React.FC<IProps> = ({ onSelect }) => (
  <Row>
    <Col xs={12}>
      <h3>Select relationships to explore</h3>
    </Col>
    {Object.keys(relationships).map((relation) => {
      const { scope, query } = relationships[relation]
      return (
        <Col xs={12}>
          <StyledCheckbox
            className="form-check-input d-inline"
            type="checkbox"
            value={relation}
            id={relation}
            onClick={() => onSelect(query, scope)}
          />
          <label className="form-check-label ms-2" htmlFor={relation}>
            {relation}
          </label>
        </Col>
      )
    })}
  </Row>
)

export default Checklist
