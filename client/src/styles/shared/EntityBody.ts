import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../theme'

const EntityBody = styled(Row)`
  margin: 0 0;
  padding-top: ${theme.spacing.sectionGap};
  background-color: ${theme.color.offPanel};
`

export default EntityBody
