import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

const DisplaySwitchButton = styled(Button)`
  background-color: ${theme.color.white} !important;
  color: ${theme.color.black};
  border-radius: 10px;
  border-color: ${theme.color.white} !important;
  text-decoration: none;
  padding: 0.5rem;

  &:disabled,
  &:hover,
  &:active,
  &:focus {
    background-color: ${theme.color.white};
    color: ${theme.color.black};
    border-color: ${theme.color.white};
  }
`
export default DisplaySwitchButton
