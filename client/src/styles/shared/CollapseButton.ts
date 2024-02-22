import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

interface IProps {
  borderRadius?: string
  marginTop?: string
}

const CollapseButton = styled(Button)<IProps>`
  border: 1px solid ${theme.color.black};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '5px'};
  background-color: ${theme.color.white};
  color: ${theme.color.black};
  margin-left: -0.75rem;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '10px')};
  height: 22px;
  width: 20px;
  text-align: center;
  line-height: 50%;
  vertical-align: middle;
  padding-left: 0.25rem;
  padding-right: 0.25rem;

  &:hover {
    background-color: ${theme.color.white};
    color: ${theme.color.black};
  }

  &:focus {
    background-color: ${theme.color.white};
    color: ${theme.color.black};
  }
`

export default CollapseButton
