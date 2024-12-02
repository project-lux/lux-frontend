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
    color: #000000;
    letter-spacing: -2px;
    line-height: ${theme.font.mobile.h2.lineHeight};
    font-size: ${theme.font.mobile.h1.size};
    font-weight: ${theme.font.mobile.h2.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 3.1em;
      line-height: ${theme.font.desktop.h1.lineHeight};
    }
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
    width: 60px;
    height: 60px;

    @media (min-width: ${theme.breakpoints.sm}px) {
      width: 90px;
      height: 90px;
    }
  }

  div.number {
    margin-bottom: 5px;
    font-family: Inter, sans-serif;
    font-size: 2em;
    font-weight: ${theme.font.weight.extraLight};
    color: ${theme.color.black};
    letter-spacing: -2px;
    line-height: 72px;

    @media (min-width: ${theme.breakpoints.sm}px) {
      font-size: 3.1em;
    }
  }

  div.label {
    padding-left: 3px;
    font-family: Inter, sans-serif;
    font-size: 1.5em;
    font-weight: ${theme.font.weight.medium};
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    line-height: 32px;

    @media (min-width: ${theme.breakpoints.sm}px) {
      font-weight: ${theme.font.weight.bold};
    }
  }
`

export default InfographicsSection
