import styled from 'styled-components'

import theme from '../../theme'

interface IProps {
  border?: string
}

const ResultsIconSvg = styled.object<IProps>`
  position: relative;
  border-radius: 1px;
  padding: 3px;
  height: 60px;
  width: 60px;
  top: calc(35% - 20px);

  @media (min-width: ${theme.breakpoints.sm}px) {
    top: calc(45% - 20px);
  }
`
export default ResultsIconSvg
