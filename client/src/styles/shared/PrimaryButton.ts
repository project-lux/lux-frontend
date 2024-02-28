import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

const PrimaryButton = styled(Button)`
  background-color: ${theme.color.primary.teal};
  color: ${theme.color.white};
  border-radius: 10px;
  border-color: ${theme.color.primary.teal};
  font-size: 16px;
  font-weight: 700;
  padding: 1rem;
  text-decoration: none;

  &:disabled,
  &:hover {
    background-color: ${theme.color.primary.teal};
    color: ${theme.color.white};
    border-color: ${theme.color.primary.teal};
  }

  &.feedbackButton {
    font-size: 1.25rem;
  }
`

export default PrimaryButton
