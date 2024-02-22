import styled from 'styled-components'

import theme from '../theme'

interface IProps {
  width?: string
  height?: string
}

const StyledImageDiv = styled.div<IProps>`
  position: relative;
  width: ${(props) => props.width || '72px'};
  height: ${(props) => props.height || '72px'};

  @media (min-width: ${theme.breakpoints.sm}px) {
    width: ${(props) => props.width || '152px'};
    height: ${(props) => props.height || '125px'};
  }
`

export default StyledImageDiv
