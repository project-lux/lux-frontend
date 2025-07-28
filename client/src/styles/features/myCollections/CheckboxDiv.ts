import styled from 'styled-components'

import theme from '../../theme'

interface IStyledDivProps {
  selected: boolean
}

const CheckboxDiv = styled.div<IStyledDivProps>`
  color: ${theme.color.trueBlack};
  background-color: ${(props) =>
    props.selected ? theme.color.lightBabyBlue : 'none'};

  &:hover {
    background-color: ${theme.color.lightBabyBlue};
  }
`

export default CheckboxDiv
