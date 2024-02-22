import { Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

export const StyledContainer = styled(Col)`
  background: ${theme.color.white};
  box-shadow: 1px 1px 5px 0 ${theme.color.borderShadow};
  border-radius: 8px 8px 0px 0px;
  padding: 1rem;
  height: auto;
  display: inline-table;
  position: relative;
  flex: 0 0 auto;

  &.advancedSearchBody {
    margin-bottom: 0rem;
    margin-top: 0rem;
    width: 75% !important;
    margin-left: 0.75rem;
  }

  &.helpText {
    margin-bottom: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
    width: 25% !important;

    @media (min-width: ${theme.breakpoints.md}px) {
      margin-bottom: 0;
      margin-top: 0;

      &:before {
        z-index: 10;
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        margin-left: 0;
        bottom: 0;
        top: 40%;
        left: 0;
        background-color: ${theme.color.white};
        box-sizing: border-box;
        border: 5px solid ${theme.color.borderShadow};
        border-color: transparent transparent ${theme.color.white}
          ${theme.color.white};
        transform-origin: 0 0;
        transform: rotate(45deg);
      }

      &:after {
        z-index: -10;
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        margin-left: 0;
        bottom: 0;
        top: 40%;
        left: 0;
        box-sizing: border-box;
        border: 5px solid ${theme.color.white};
        border-color: transparent transparent ${theme.color.white}
          ${theme.color.white};
        transform-origin: 0 0;
        transform: rotate(45deg);
        box-shadow: 1px 1px 5px 0 ${theme.color.borderShadow};
      }
    }
  }
`
