import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import theme from '../../theme'

const StyledLink = styled(NavLink)`
  font-size: 1em;
  color: ${theme.color.black};
  background-color: ${theme.color.tabButtonBgColor};
  letter-spacing: 0;
  text-align: center;
  font-weight: 500;
  height: 100%;
  display: block;
  padding: 14px 20px 12px;
  text-decoration: none;
  line-height: 30px;
  border-radius: ${theme.border.radius};

  &:hover {
    color: ${theme.color.black};
    text-decoration: underline;
  }

  &.active {
    box-shadow: 1px 1px 5px ${theme.color.black20};
    background: ${theme.color.white};

    @media (min-width: 1278px) {
      box-shadow: none;
    }
  }

  &.active.simple {
    box-shadow: 0px 3px 5px ${theme.color.black20};
  }

  @media (min-width: 1469px) {
    font-size: 1.25em;
  }
`

export default StyledLink
