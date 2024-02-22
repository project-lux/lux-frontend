import styled from 'styled-components'

import theme from '../theme'

interface IProps {
  color?: string
  width?: string
}

const Hr = styled.hr<IProps>`
  border: solid 0.5px
    ${(props) => props.color || theme.color.secondary.cornflowerBlue};
  opacity: 0.75;
  padding: 0px 5px;
  width: ${(props) => (props.width ? props.width : '98%')};
  margin: auto;
`

export default Hr
