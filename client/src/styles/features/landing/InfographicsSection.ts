import styled from 'styled-components'

import { ToppedBorderedDiv } from '../../shared/BorderedDiv'
import theme from '../../theme'

const padX = theme.spacing.sectionPaddingX

const InfographicsSection = styled(ToppedBorderedDiv)`
  margin-bottom: ${theme.spacing.landingPageSectionGap};
  padding: 37px ${padX} 25px ${padX};
  width: 100%;
  background-color: ${theme.color.white};

  h2 {
    margin-bottom: 20px;
    font-family: Inter, sans-serif;
    font-size: 3.1rem;
    color: #000000;
    letter-spacing: -2px;
    line-height: 72px;
    font-weight: 200;
  }

  div.card-inner {
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
    padding-bottom: 30px;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: ${theme.color.secondary.cornflowerBlue};
    width: 350px;

    @media (min-width: ${theme.breakpoints.sm}px) {
      min-width: 450px;
    }

    @media (min-width: ${theme.breakpoints.sm}px) {
      width: auto;
    }
  }

  img.icon {
    width: 90px;
    height: 90px;
  }

  div.number {
    margin-bottom: 5px;
    font-family: Inter, sans-serif;
    font-size: 3.1em;
    font-weight: 200;
    color: ${theme.color.black};
    letter-spacing: -2px;
    line-height: 72px;
  }

  div.label {
    padding-left: 3px;
    font-family: Inter, sans-serif;
    font-size: 1.5em;
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    line-height: 32px;
    font-weight: 700;
  }
`

export default InfographicsSection
