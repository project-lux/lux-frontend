import styled from 'styled-components'

import theme from '../../theme'

interface IProps {
  width?: string
  height?: string
  margin?: string
}

const StyledIconDiv = styled.div<IProps>`
  position: relative;
  text-align: center;
  border: 1px dotted #8095e8;
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '72px'};
  height: ${(props) => props.height || '72px'};

  @media (min-width: ${theme.breakpoints.sm}px) {
    width: ${(props) => props.width || '152px'};
    height: ${(props) => props.height || '152px'};
  }
`
export default StyledIconDiv
