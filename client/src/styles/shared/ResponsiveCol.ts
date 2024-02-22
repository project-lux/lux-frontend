import { Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

const ResponsiveCol = styled(Col)`
  @media (min-width: ${theme.breakpoints.md}px) and (max-width: 991px) {
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: 1200px) {
    display: flex;
    justify-content: flex-end;
  }
`

export default ResponsiveCol
