import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../../theme'

export const StyledLandingPage = styled(Row)`
  div#srch-hero-container {
    margin: 0 ${theme.spacing.cancelDefaultPadding}
      ${theme.spacing.landingPageSectionGap};
    background-color: ${theme.color.white};
  }
`

export const HeaderContainerCol = styled.div`
  margin-top: 48px;
`
