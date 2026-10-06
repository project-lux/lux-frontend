import styled from 'styled-components'

import theme from '../../theme'

const ResultsHeader = styled.h2`
  font-size: 2em;
  color: ${theme.color.black};
  letter-spacing: 0;
  text-align: left;
  font-weight: 200;

  @media (max-width: ${theme.breakpoints.md}px) {
    display: none;
  }
`
export default ResultsHeader
