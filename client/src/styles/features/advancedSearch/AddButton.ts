import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const AddButton = styled(Button)`
  width: auto;
  background-color: ${theme.color.white};
  border: none;
  border-radius: ${theme.border.radius};
  color: ${theme.color.link};

  &:hover {
    background-color: ${theme.color.white};
    color: ${theme.color.link};
  }

  &:focus {
    background-color: ${theme.color.white};
    color: ${theme.color.link};
  }
`

export default AddButton
