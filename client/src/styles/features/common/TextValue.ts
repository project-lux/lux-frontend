import styled from 'styled-components'

import theme from '../../theme'

interface IProps {
  displayType: string
  itemSpacing: string
}

export const StyledTextValue = styled.div<IProps>`
  dd {
    display: ${(props) => props.displayType};
    margin-bottom: ${(props) =>
      props.itemSpacing === 'double'
        ? theme.spacing.verticalItemDoubleSpacing
        : theme.spacing.verticalItemSingleSpacing};
    overflow-wrap: break-word;
  }
`
