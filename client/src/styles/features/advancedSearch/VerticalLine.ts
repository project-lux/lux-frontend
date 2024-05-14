import styled from 'styled-components'

import theme from '../../theme'

const VerticalLine = styled.div`
  border-left: 1px solid ${theme.color.secondary.cornflowerBlue};
  margin-left: 1.5rem;
  padding-top: 1rem;
  display: flex;

  &.groupVerticalLine {
    height: calc(100% - 53px);
  }
`

export default VerticalLine
