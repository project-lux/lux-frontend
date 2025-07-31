import styled from 'styled-components'
import { Button } from 'react-bootstrap'

import theme from '../../theme'

const DeleteButton = styled(Button)`
  color: ${theme.color.dangerRed};
  background-color: ${theme.color.white};
  border: none;

  &:hover,
  &:focus,
  &:active {
    color: ${theme.color.white};
    background-color: ${theme.color.dangerRed};
  }
`

export default DeleteButton
