import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const LinkButton = styled(Button)`
  color: ${theme.color.link};
  text-decoration: none;
  padding: 0;

  &#search-toggle {
    display: none;

    @media (min-width: ${theme.breakpoints.md}px) {
      display: block;
    }
  }
`

export default LinkButton
