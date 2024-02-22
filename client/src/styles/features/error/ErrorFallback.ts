import styled from 'styled-components'

import theme from '../../theme'

const ErrorFallback = styled.div`
  color: ${theme.color.errorFg};
  background-color: ${theme.color.errorBg};
  // box-shadow: 1px 1px 5px ${theme.color.black20};
  // border-radius: ${theme.border.radius};
  // margin: 1rem;
  height: auto;
`

export default ErrorFallback
