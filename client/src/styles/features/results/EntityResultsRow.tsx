import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const EntityResultsRow = styled(Row)`
  padding: 0px;

  @media (min-width: ${theme.breakpoints.md}px) {
    padding: 1.5rem;
  }
`
export default EntityResultsRow
