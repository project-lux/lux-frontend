import styled from 'styled-components'
import { Row } from 'react-bootstrap'

import theme from '../../theme'

const ObjectsContainerLinkRow = styled(Row)`
  font-size: 1em;
  color: ${theme.color.link};
  letter-spacing: 0;
  font-weight: 400;

  .searchResultLink {
    background-color: ${theme.color.white};
    color: ${theme.color.link};
    padding: 0px;
    border: none;
    font-weight: ${theme.font.weight.bold};

    @media (min-width: ${theme.breakpoints.md}px) {
      background-color: ${theme.color.primary.teal};
      color: ${theme.color.white};
      border-radius: 10px;
      border-color: ${theme.color.primary.teal};
      font-size: 16px;
      font-weight: ${theme.font.weight.bold};
      padding: 0.5rem 1rem;
      text-decoration: none;
    }
  }
`

export default ObjectsContainerLinkRow
