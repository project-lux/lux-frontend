import React, { useState } from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'
import ApiText from '../common/ApiText'

interface IStyledDivProps {
  selected: boolean
}

const StyledDiv = styled.div<IStyledDivProps>`
  color: ${theme.color.trueBlack};
  background-color: ${(props) =>
    props.selected ? theme.color.lightBabyBlue : 'none'};

  &:hover {
    background-color: ${theme.color.lightBabyBlue};
  }
`

const SelectionOption: React.FC<{
  record: string
}> = ({ record }) => {
  const [isSelected, setIsSelected] = useState<boolean>(true)

  return (
    <StyledDiv
      className="py-1 px-2"
      data-testid="record-selection-div"
      selected={isSelected}
    >
      <input
        className="checkbox d-inline mt-0 selectAllResultsCheckbox"
        type="checkbox"
        id="select-all-checkbox"
        onChange={() => setIsSelected(!isSelected)}
        checked={isSelected}
      />
      <label className="form-check-label ms-2" htmlFor="select-all-checkbox">
        {ApiText(record)}
      </label>
    </StyledDiv>
  )
}

export default SelectionOption
