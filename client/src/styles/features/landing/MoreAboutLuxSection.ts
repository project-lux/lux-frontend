import styled from 'styled-components'

import { ToppedBorderedDiv } from '../../shared/BorderedDiv'
import theme from '../../theme'

const padX = theme.spacing.sectionPaddingX

const MoreAboutLux = styled(ToppedBorderedDiv)`
  margin-bottom: ${theme.spacing.landingPageSectionGap};
  padding: 37px ${padX} 25px ${padX};
  width: 100%;
  background-color: ${theme.color.white};

  h2 {
    font-size: ${theme.font.mobile.h2.size};
    font-weight: ${theme.font.mobile.h2.weight};
    line-height: ${theme.font.mobile.h2.lineHeight};
    letter-spacing: -2px;
    color: ${theme.color.trueBlack};
    margin-bottom: 19px;

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 3.1em;
      line-height: ${theme.font.desktop.h1.lineHeight};
      font-weight: ${theme.font.desktop.h2.weight};
    }
  }

  h3 {
    font-family: Inter, sans-serif;
    letter-spacing: 0;
    font-weight: ${theme.font.mobile.h3.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 1.5em;
      line-height: ${theme.font.desktop.h3.lineHeight};
      font-weight: 700;
    }
  }

  p,
  ul {
    font-size: 1.5em;
    letter-spacing: 0;
    line-height: 40px;
    color: #222;
  }

  p {
    font-weight: ${theme.font.weight.extraLight};
    font-size: ${theme.font.mobile.bodyRegular.size};
    line-height: ${theme.font.mobile.bodyRegular.lineHeight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 1.5em;
      line-height: 32px;
    }
  }

  ul {
    list-style-type: none;
    font-weight: 500;
    line-height: 32px;
  }

  li:not(:last-child) {
    margin-bottom: 10px;
  }
`

export default MoreAboutLux
