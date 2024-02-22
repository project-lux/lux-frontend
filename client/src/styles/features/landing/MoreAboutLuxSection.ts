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
    font-size: 3.1rem;
    font-weight: 200;
    letter-spacing: -2px;
    line-height: 72px;
    color: #000;
    margin-bottom: 19px;
  }

  h3 {
    font-family: Inter, sans-serif;
    font-size: 1.5em;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 32px;
  }

  p,
  ul {
    font-size: 1.5em;
    letter-spacing: 0;
    line-height: 40px;
    color: #222;
  }

  p {
    font-weight: 200;
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
