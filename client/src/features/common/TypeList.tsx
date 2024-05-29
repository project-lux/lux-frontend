import React from 'react'

import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'

import RecordLink from './RecordLink'

interface IProps {
  types: string[]
}

const TypeList: React.FC<IProps> = ({ types }) => (
  <React.Fragment>
    <StyledDt data-testid="types-label">Categorized As</StyledDt>
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
