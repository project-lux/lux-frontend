import React from 'react'

import StyledDataRow from '../../styles/shared/DataRow'

import TextLabel from './TextLabel'

interface IContainer {
  children: JSX.Element | Array<JSX.Element>
  label?: string | undefined
  additionalClassName?: string
  textLabelClassName?: string
}

const TextContainer: React.FC<IContainer> = ({
  label,
  children,
  additionalClassName = '',
  textLabelClassName = 'col-12',
}) => (
  <StyledDataRow
    className={`row ${additionalClassName}`}
    data-testid="text-container"
  >
    <TextLabel label={label} className={textLabelClassName} />
    {children}
  </StyledDataRow>
)

export default TextContainer
