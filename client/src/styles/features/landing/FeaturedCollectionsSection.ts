import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const FeaturedCollectionsSection = styled(Row)`
  width: auto;
  background-color: ${theme.color.offWhite};
  margin-bottom: ${theme.spacing.landingPageSectionGap};
`

export default FeaturedCollectionsSection
