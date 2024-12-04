import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

interface IProps {
  actionBgColor?: string
}

const SecondaryButton = styled(Button)<IProps>`
  background-color: ${theme.color.white};
  color: ${theme.color.black};
  border-radius: ${theme.border.radius};
  border-color: ${theme.color.black};
  font-size: 16px;
  padding: 6px;
  font-weight: ${theme.font.weight.regular};
  text-decoration: none;

  &:disabled {
    background-color: ${(props) => props.actionBgColor || theme.color.black};
    color: ${theme.color.white};
    border-color: ${theme.color.white};
  }

  &:hover {
    background-color: ${(props) => props.actionBgColor || theme.color.black};
    border-color: ${theme.color.white};
    color: ${theme.color.white};
  }

  &:active {
    background-color: ${(props) => props.actionBgColor || theme.color.black};
    border-color: ${theme.color.white};
    color: ${theme.color.white};
  }
`

export default SecondaryButton
