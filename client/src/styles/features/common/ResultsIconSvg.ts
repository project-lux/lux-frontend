import styled from 'styled-components'

import theme from '../../theme'

const ResultsIconSvg = styled.object`
  position: relative;
  border: 2px solid #00356b;
  border-radius: 1px;
  padding: 3px;
  height: 40px;
  width: 40px;
  top: calc(35% - 10px);

  @media (min-width: ${theme.breakpoints.sm}px) {
    top: calc(45% - 10px);
  }
`
export default ResultsIconSvg
