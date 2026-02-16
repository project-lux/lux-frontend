import styled from 'styled-components'

import theme from '../theme'

const ObjectWorkHeader = styled.div`
  border-bottom: solid 0.5px ${theme.color.secondary.cornflowerBlue};

  @media (min-width: ${theme.breakpoints.md}px) {
    border-bottom: none;
  }
`

export default ObjectWorkHeader
