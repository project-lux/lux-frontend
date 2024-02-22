/* eslint-disable react/require-default-props */
import React from 'react'

import StyledDataRow from '../../styles/shared/DataRow'

import TextLabel from './TextLabel'

interface IContainer {
  label?: string | undefined
  additionalClassName?: string
  children: JSX.Element
}

const TextContainer: React.FC<IContainer> = ({
  label,
  children,
  additionalClassName = '',
}) => (
  <StyledDataRow
    className={`row ${additionalClassName}`}
    data-testid="text-container"
  >
    <TextLabel label={label} className="col-12" />
    {children}
  </StyledDataRow>
)

export default TextContainer
