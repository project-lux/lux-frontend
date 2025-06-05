import styled from 'styled-components'
import { Form } from 'react-bootstrap'

import theme from '../../theme'

export const StyledInput = styled(Form.Control)`
  height: auto;
  width: 100%;
  border: none;
  border: 1px solid ${theme.color.button};
  border-radius: 5px !important;
  min-width: 150px;
`
