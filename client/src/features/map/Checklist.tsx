import React from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledCheckbox from '../../styles/features/facets/Checkbox'
import { IAdvancedSearchConfig } from '../../config/advancedSearch/advancedSearch'

const relationships = {
  'Is the Place of Creation of Works Created By this Person': {
    scope: 'work',
    query: JSON.stringify({
      AND: [
        {
          createdAt: {
            id: 'https://lux.collections.yale.edu/data/place/82be5302-2c55-4921-a3a5-9bdb9fc96342',
          },
        },
        {
          createdBy: {
            id: 'https://lux.collections.yale.edu/data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba',
          },
        },
      ],
    }),
  },
  'Produced Here this Person': {
    scope: 'item',
    query: JSON.stringify({
      AND: [
        {
          OR: [
            {
              AND: [
                {
                  producedAt: {
                    id: 'https://lux.collections.yale.edu/data/place/f14804ea-6bd1-4bfb-9394-6f5428c83c34',
                  },
                },
                {
                  producedBy: {
                    id: 'https://lux.collections.yale.edu/data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba',
                  },
                },
              ],
            },
            {
              AND: [
                {
                  producedAt: {
                    id: 'https://lux.collections.yale.edu/data/place/f14804ea-6bd1-4bfb-9394-6f5428c83c34',
                  },
                },
                {
                  productionInfluencedBy: {
                    id: 'https://lux.collections.yale.edu/data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba',
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
  },
}

interface IProps {
  onSelect: (query: IAdvancedSearchConfig, scope: string) => void
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
