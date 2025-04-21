import styled from 'styled-components'

import theme from '../../theme'
import { BorderedDiv } from '../../shared/BorderedDiv'

const { h2, ul } = theme.contentPage

const TermsOfUsePage = styled(BorderedDiv)`
  margin-top: ${theme.contentPage.headerGap};
  margin-bottom: ${theme.contentPage.footerGap};
  margin-left: ${theme.spacing.sectionAbsMarginX};
  margin-right: ${theme.spacing.sectionAbsMarginX};

  padding: ${theme.spacing.sectionPaddingX};
  background-color: ${theme.color.white};

  h2 {
    font-size: ${h2.fontSize};
    font-weight: ${h2.fontWeight};
    letter-spacing: ${h2.letterSpacing};
    line-height: ${h2.lineHeight};
    color: black;
    margin-bottom: ${h2.marginBottom};
  }

  ul {
    padding-left: ${ul.paddingLeft};
  }
`

export default TermsOfUsePage
