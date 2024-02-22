import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const UVContainer = styled(Row)`
  padding: 1rem 0 0 0;
  background-color: ${theme.color.white};

  .iframe-container {
    position: relative;
    width: 100%;
    padding: 33% 50%; // trick to reserve space for absolutely positioned children with varying height
    background-color: ${theme.color.black};

    @media (min-width: 1200px) {
      padding: 0;
      height: 800px;
    }
  }

  iframe {
    position: absolute;
    top: 0;
    display: block;
    width: 95%;
    height: 100%;

    @media (min-width: 1200px) {
      position: relative;
      height: 800px;
      margin: 0;
    }
  }
`

export default UVContainer
