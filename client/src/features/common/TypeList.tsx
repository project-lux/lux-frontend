import React from 'react'

import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'

import RecordLink from './RecordLink'

interface IProps {
  types: string[]
  label?: string
}

const TypeList: React.FC<IProps> = ({ types, label = '' }) => (
  <React.Fragment>
    <StyledDt data-testid="types-label">{label} Types</StyledDt>
    <StyledDd data-testid="entity-type-list">
      {types.map((type, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${type}_${index}`}>
          <RecordLink url={type} linkCategory="Results Snippet" />
          {index === types.length - 1 ? '' : ', '}
        </React.Fragment>
      ))}
    </StyledDd>
  </React.Fragment>
)

export default TypeList
