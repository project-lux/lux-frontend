import { Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const ResultsCol = styled(Col)`
  border-right: solid 1px ${theme.color.lightGray};
  display: none;

  @media (min-width: ${theme.breakpoints.md}px) {
    display: flex;
  }
`

export default ResultsCol
