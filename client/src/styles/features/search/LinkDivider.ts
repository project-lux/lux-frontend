import styled from 'styled-components'

import theme from '../../theme'

const LinkDivider = styled.span`
  border-left: 1px solid ${theme.color.secondary.cornflowerBlue};
  height: 1.25rem;
  margin: 0 1rem;

  @media (max-width: ${theme.breakpoints.md}px) {
    margin: 0 0.5rem;
  }
`

export default LinkDivider
