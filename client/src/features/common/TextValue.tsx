import React, { type JSX } from 'react'

import { StyledTextValue } from '../../styles/features/common/TextValue'

interface ITextValue {
  className?: string
  values: Array<string> | JSX.Element[]
  displayType?: string
  itemSpacing?: 'single' | 'double'
}

// Take a list of strings or React elements and wrap each item in <dd>.
const TextValue: React.FC<ITextValue> = ({
  className = 'col-md-12',
  values,
  displayType = 'block',
  itemSpacing = 'single',
}) => (
  <StyledTextValue
    className={`${className} col-sm-12`}
    displayType={displayType}
    itemSpacing={itemSpacing}
    data-testid="text-value"
  >
    {values.map((value: string | JSX.Element, ind: number) => (
      <dd key={`${value}-${ind}`} data-testid="text-value-detail-description">
        {value}
      </dd>
    ))}
  </StyledTextValue>
)

export default TextValue
