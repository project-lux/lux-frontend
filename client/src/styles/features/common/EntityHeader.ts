import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../../theme'

const EntityHeader = styled(Row)`
  margin: 0;
  padding-left: 2rem;
  padding-right: 1rem;
  background-color: ${theme.color.white};

  h1 {
    margin-bottom: 0.5rem;
  }

  @media (min-width: ${theme.breakpoints.md}px) {
    padding-left: 2.5rem;
  }
`

export default EntityHeader
