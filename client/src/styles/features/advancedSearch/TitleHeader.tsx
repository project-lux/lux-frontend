import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../../theme'

const TitleHeader = styled(Row)`
  margin: 0;
  padding: 1rem 1.5rem;
  background-color: ${theme.color.white};

  &.h2 {
    font-size: 2em;
  }
`

export default TitleHeader
