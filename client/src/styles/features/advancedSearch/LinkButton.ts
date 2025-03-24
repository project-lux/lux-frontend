import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const LinkButton = styled(Button)`
  color: ${theme.color.link};
  text-decoration: none;
  padding: 0;
`

export default LinkButton
