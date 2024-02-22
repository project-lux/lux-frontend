import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../../theme'

const FooterBlocksSection = styled(Row)`
  margin-bottom: 0;
  padding-top: ${theme.landingPage.sectionPaddingTop};
  padding-bottom: ${theme.landingPage.sectionPaddingTop};
  padding-left: ${theme.spacing.contentAbsMarginX};
  padding-right: ${theme.spacing.contentAbsMarginX};
  min-width: 100%;
  background-color: ${theme.color.white};

  div.block {
    min-width: 240px;
  }

  h2 {
    font-family: Inter, sans-serif;
    font-size: 1.5em;
    color: ${theme.color.black};
    letter-spacing: 0;
    font-weight: ${theme.font.weight.bold};
    margin: 0;
  }

  @media (min-width: 992px) {
    div.block {
      max-width: 30%;
    }
  }
`

export default FooterBlocksSection
