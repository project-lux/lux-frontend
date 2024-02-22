import { Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

interface IProps {
  length: number
  currentInd: number
}

const FeaturedCollection = styled(Col)<IProps>`
  margin-bottom: 1.25em;

  &:first-child {
    margin-left: 0;
  }

  :last-child {
    margin-bottom: 0px;
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  .card {
    border-radius: ${theme.border.radius};
    box-shadow: 1px 1px 5px ${theme.color.black20};
    height: 100%;
  }

  .image-container {
    background-color: black;
    width: 100%;
    object-fit: contain;
    border-radius: 8px 8px 0px 0px;
  }

  .body {
    padding: ${theme.spacing.sectionPaddingX};
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0px 0px;
  }

  h2 {
    margin-bottom: 0.5rem;
    font-family: Inter, sans-serif;
    font-size: 1.5em;
    color: #222222;
    letter-spacing: 0;
    line-height: 32px;
    font-weight: ${theme.font.weight.bold};
  }

  p {
    margin-bottom: 0.5rem;
  }
`

export default FeaturedCollection
