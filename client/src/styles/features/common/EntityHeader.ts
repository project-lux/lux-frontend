import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../../theme'

const EntityHeader = styled(Row)`
  margin: 0;
  padding-top: '1rem';
  padding-bottom: '1.5rem';
  padding-left: ${theme.spacing.contentAbsMarginX};
  padding-right: ${theme.spacing.contentAbsMarginX};
  background-color: ${theme.color.white};

  h1 {
    margin-bottom: 0.5rem;
  }
`

export default EntityHeader
