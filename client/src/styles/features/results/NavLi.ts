import styled from 'styled-components'

import theme from '../../theme'

export const NavLi = styled.li`
  width: auto;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  &.active {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    @media (min-width: 1278px) {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      background: ${theme.color.white};
      box-shadow: 0px 5px 5px ${theme.color.black20};
    }
  }
`
export default NavLi
