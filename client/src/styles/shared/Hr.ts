import styled from 'styled-components'

import theme from '../theme'

interface IProps {
  borderWidth?: string
  color?: string
  width?: string
  hiddenOnDesktop?: boolean
}

const Hr = styled.hr<IProps>`
  border: solid ${(props) => props.borderWidth || '0.5px'}
    ${(props) => props.color || theme.color.secondary.cornflowerBlue};
  opacity: 0.75;
  padding: 0px 5px;
  width: ${(props) => (props.width ? props.width : '98%')};
  margin: auto;

  &.footerBlocks {
    margin-bottom: 1rem;
    @media (min-width: ${theme.breakpoints.lg}px) {
      display: none;
    }
  }

  &.productionBodyEventHr,
  &.collectionHr,
  &.responsibleUnitHr,
  &.accessStatementHr {
    display: none;
  }

  @media (min-width: ${theme.breakpoints.md}px) {
    display: ${(props) => (props.hiddenOnDesktop ? 'none' : 'block')};
  }
`

export default Hr
