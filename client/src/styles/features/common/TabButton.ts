import styled from 'styled-components'

import theme from '../../theme'

export const StyledTabButton = styled.button`
  position: relative;
  font-size: 1.125rem;
  color: #000;
  letter-spacing: 0;
  text-align: center;
  font-weight: 500;
  width: 100%;
  height: 80%;

  &:hover {
    color: #000;
    text-decoration: underline;
  }

  &.tab.nav-link {
    background: ${theme.color.tabButtonBgColor};
    border-radius: ${theme.border.radius};
    border: 1px solid ${theme.color.borderShadow};
  }

  &.tab.nav-link.active {
    background: #fff;
    box-shadow: 1px 1px 5px ${theme.color.borderShadow};

    div.arrow {
      position: absolute;
      overflow: hidden;
      left: calc(50% - 20px);
      bottom: -16px;
      width: 40px;
      height: 16px;
      background-color: transparent;

      &:after {
        content: '';
        position: absolute;
        top: -12px;
        left: 9px;
        width: 22px;
        height: 22px;
        transform: rotate(225deg);
        border: 1px solid ${theme.color.borderShadow};
        background-color: ${theme.color.white};
        box-shadow: 1px 1px 5px ${theme.color.borderShadow};
      }
    }
  }
`
