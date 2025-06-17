import React from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'
import ApiText from '../common/ApiText'

const StyledDiv = styled.div`
  &:hover {
    background-color: ${theme.color.lightBabyBlue};
    color: ${theme.color.trueBlack};
  }
`

const SelectionOption: React.FC<{
  collection: string
}> = ({ collection }) => (
  <StyledDiv onClick={() => alert('it works')} data-testid="collection-select">
    {ApiText(collection)}
  </StyledDiv>
)

export default SelectionOption
