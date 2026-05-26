import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

interface IProps {
  textColor?: string
  actionBgColor?: string
}

const SecondaryButton = styled(Button)<IProps>`
  background-color: ${theme.color.white};
  color: ${(props) => props.textColor || theme.color.black};
  border-radius: ${theme.border.radius};
  border-color: ${(props) => props.textColor || theme.color.black};
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

  &.btn:active {
    background-color: ${(props) => props.actionBgColor || theme.color.black};
    border-color: ${theme.color.white};
    color: ${theme.color.white};
  }
`

export default SecondaryButton
