import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

const DangerButton = styled(Button)`
  background-color: ${theme.color.dangerRed};
  color: ${theme.color.white};
  border-radius: ${theme.border.radius};
  border-color: ${theme.color.dangerRed};
  font-size: 16px;
  font-weight: ${theme.font.weight.bold};
  padding: 1rem;
  text-decoration: none;

  &:disabled {
    background-color: ${theme.color.dangerRed60};
    color: ${theme.color.white};
    border-color: ${theme.color.dangerRed60};
  }

  &:hover {
    background-color: ${theme.color.dangerRed};
    border-color: ${theme.color.dangerRed};
    color: ${theme.color.white};
  }

  &.btn:active {
    background-color: ${theme.color.dangerRed};
    border-color: ${theme.color.dangerRed};
    color: ${theme.color.white};
  }
`

export default DangerButton
