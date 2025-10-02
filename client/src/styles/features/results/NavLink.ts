import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import theme from '../../theme'

const StyledNavLink = styled(NavLink)`
  color: ${theme.color.black};
  background-color: ${theme.color.tabButtonBgColor};
  letter-spacing: 0;
  text-align: center;
  display: block;
  padding: 12px 26px;
  text-decoration: none;
  border-radius: ${theme.border.radius};
  width: 100%;
  align-items: start;
  flex-direction: column;
  margin-bottom: 10px;

  & > div > div > img {
    filter: grayscale(100%);
  }

  & > div > div > div > div.linkTitle {
    font-size: ${theme.font.desktop.tabNavigation.size};
    font-weight: ${theme.font.desktop.tabNavigation.weight};
    line-height: ${theme.font.desktop.tabNavigation.lineHeight};
  }

  & > div > div > div > div.linkSubtext {
    font-size: ${theme.font.desktop.bodyLight.size};
    font-weight: ${theme.font.desktop.bodyLight.weight} !important;
    line-height: ${theme.font.desktop.bodyLight.lineHeight};
  }

  &:hover {
    color: ${theme.color.black};
    text-decoration: underline;
  }

  &.active {
    box-shadow: -1px -1px 5px ${theme.color.black20};
    background: ${theme.color.white};
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    margin-bottom: -5px;
    z-index: -1;

    & > div > div > img {
      filter: none;
    }

    &#events {
      box-shadow: 4px -1px 5px ${theme.color.black20};
    }

    &#works,
    $#people,
    &#places,
    &#concepts {
      box-shadow: -1px -1px 5px ${theme.color.black20};
    }
  }

  &.active.simple {
    box-shadow: 0px 3px 5px ${theme.color.black20};
  }

  @media (min-width: 1469px) {
    font-size: 1.25em;
  }

  &.myCollectionsNavLink {
    color: ${theme.color.trueBlack};
    font-size: 1.25rem;

    &.nav-link.active {
      color: ${theme.color.primary.blue};
      border-bottom-color: ${theme.color.primary.blue};
    }
  }
`

export default StyledNavLink
