import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const LoadingSpinner = styled(Spinner)`
  height: 8rem;
  width: 8rem;
  margin-top: 4rem;
  // !important required as it overwrites react bootstrap styling
  color: ${theme.color.primary.darkBlue} !important;
`

export default LoadingSpinner
