import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const ContentPage = styled(Row)`
  h1 {
    margin-bottom: 0;
    padding-top: 33px;
    padding-bottom: 33px;
    padding-left: ${theme.spacing.contentAbsMarginX};
    padding-right: ${theme.spacing.contentAbsMarginX};
    background-color: ${theme.color.white};
  }

  ul {
    padding-left: 32px;
  }

  .lower-block {
    display: flex;
    padding-top: ${theme.contentPage.headerGap};
    padding-bottom: ${theme.contentPage.footerGap};
    padding-left: ${theme.spacing.sectionAbsMarginX};
    padding-right: ${theme.spacing.sectionAbsMarginX};
    background-color: ${theme.color.offWhite};
  }
`

export default ContentPage
