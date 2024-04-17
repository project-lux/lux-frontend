import styled from 'styled-components'

import theme from '../../theme'

const StyledMapContainer = styled.div`
  border: 1px solid #ddd;
  background-color: #fafafa;

  &.sm {
    width: 72px;
    height: 72px;

    .leaflet-container {
      width: 72px;
      height: 72px;

      @media (min-width: ${theme.breakpoints.sm}px) {
        width: 152px;
        height: 125px;
      }
    }

    @media (min-width: ${theme.breakpoints.sm}px) {
      width: 152px;
      height: 125px;
    }
  }

  &.md {
    width: 70%;
    min-height: 16rem;
    max-height: 600px;

    @media (min-width: ${theme.breakpoints.md}px) and (max-width: ${theme
        .breakpoints.lg}px) {
      width: 50%;
    }

    @media (min-width: ${theme.breakpoints.xl}px) {
      width: 50%;
    }
  }

  &.lg .leaflet-container {
    width: 100%;
    min-height: 20rem;
    max-height: 600px;
  }
`

export default StyledMapContainer
