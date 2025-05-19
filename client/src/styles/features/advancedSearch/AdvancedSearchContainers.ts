import { Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

interface IProps {
  asBodyBorderTopLeftRadius?: string
  helpTextBorderTopRightRadius?: string
}

export const StyledContainer = styled(Col)<IProps>`
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: auto;
  display: inline-table;
  position: relative;
  flex: 0 0 auto;

  &.advancedSearchBody {
    padding-left: 1rem;
    box-shadow: 0px 4px 5px 0px ${theme.color.black20};
    background: ${theme.color.white};
    border-top-left-radius: ${(props) =>
      props.asBodyBorderTopLeftRadius || theme.border.radius};
    border-bottom-left-radius: ${theme.border.radius};
    margin-bottom: 0rem;
    margin-top: 0rem;
    width: 75% !important;
  }

  &.helpText {
    padding-right: 1rem;
    padding-left: 1rem;
    box-shadow: 4px 4px 5px 0px ${theme.color.black20};
    background: ${theme.color.white};
    border-top-right-radius: ${(props) =>
      props.helpTextBorderTopRightRadius || theme.border.radius};
    border-bottom-right-radius: ${theme.border.radius};
    // margin-bottom: 1rem;
    // margin-top: 1rem;
    width: 25% !important;

    @media (min-width: ${theme.breakpoints.md}px) {
      margin-bottom: 0;
      margin-top: 0;
    }
  }
`
