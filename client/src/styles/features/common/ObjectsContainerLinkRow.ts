import styled from 'styled-components'
import { Row } from 'react-bootstrap'

import theme from '../../theme'

const ObjectsContainerLinkRow = styled(Row)`
  font-size: 1em;
  color: ${theme.color.link};
  letter-spacing: 0;
  text-align: left;
  font-weight: 400;

  @media (min-width: ${theme.breakpoints.md}px) {
    text-align: right;
  }
`

export default ObjectsContainerLinkRow
