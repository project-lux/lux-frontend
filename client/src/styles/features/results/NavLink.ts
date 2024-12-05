import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import theme from '../../theme'

const StyledNavLink = styled(NavLink)`
  color: ${theme.color.black};
  background-color: ${theme.color.tabButtonBgColor};
  letter-spacing: 0;
  text-align: center;
  display: block;
  padding: 12px 12px 12px;
  text-decoration: none;
  border-radius: ${theme.border.radius};
  width: 100%;
  align-items: start;
  flex-direction: column;
  margin-bottom: 10px;

  & > div > img {
    filter: grayscale(100%);
  }

  & > div > span.linkTitle {
    font-size: ${theme.font.tabNavigation.size};
    font-weight: ${theme.font.tabNavigation.weight};
    line-height: ${theme.font.tabNavigation.lineHeight};
  }

  & > div > span.linkSubtext {
    font-size: ${theme.font.bodyLight.size};
    font-weight: ${theme.font.bodyLight.weight} !important;
    line-height: ${theme.font.bodyLight.lineHeight};
  }

  &:hover {
    color: ${theme.color.black};
    text-decoration: underline;
  }

  &.active {
    box-shadow: -1px -1px 5px ${theme.color.borderShadow};
    background: ${theme.color.white};
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    margin-bottom: -5px;
    z-index: -1;

    & > div > img {
      filter: none;
    }
  }

  &.active.simple {
    box-shadow: 0px 3px 5px ${theme.color.black20};
  }

  @media (min-width: 1469px) {
    font-size: 1.25em;
  }
`

export default StyledNavLink
