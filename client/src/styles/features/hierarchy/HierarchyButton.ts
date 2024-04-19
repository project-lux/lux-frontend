import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

interface IProps {
  rotate: string
}

const HierarchyButton = styled(Button)<IProps>`
  border: none;
  background-color: ${theme.color.white};
  color: ${theme.color.primary.darkBlue};
  padding: 0.25rem;
  transform: rotate(${(props) => props.rotate}deg);

  &.button {
    color: ${theme.color.primary.darkBlue};
  }

  &.childButton {
    margin-left: 0.5rem;
  }

  &.parentButton {
    margin-right: 0.5rem;
  }

  &:active,
  &:hover,
  &:focus {
    background-color: ${theme.color.white};
    color: ${theme.color.primary.darkBlue};
    border: 1px solid ${theme.color.primary.darkBlue};
    border-radius: 5px;
    --bs-btn-active-bg: ${theme.color.primary.darkBlue};
    --bs-btn-active-border-color: ${theme.color.primary.darkBlue};
    --bs-btn-active-color: ${theme.color.white};
  }
`

export default HierarchyButton
