import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const AddButton = styled(Button)`
  width: auto;
  border: none;
  background: transparent;
  border-radius: ${theme.border.radius};
  color: ${theme.color.link};

  &:hover {
    background-color: inherit;
    color: ${theme.color.link};
  }

  &.btn:active {
    background-color: ${theme.color.link};
    color: ${theme.color.white};
  }

  &:focus {
    background-color: inherit;
    color: ${theme.color.link};
  }
`

export default AddButton
