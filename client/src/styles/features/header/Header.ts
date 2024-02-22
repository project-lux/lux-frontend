import styled from 'styled-components'

import theme from '../../theme'

const Header = styled.div`
  width: 100%;
  .navbar {
    background-color: ${theme.color.primary.darkBlue} !important;
    padding: 1.25 auto;

    .container {
      width: 100%;
    }
  }

  .navbar-brand {
    font-family: YaleDesign, serif;
    font-weight: 400;
    color: ${theme.color.white};
    white-space: pre-wrap;
  }

  #nav-links a {
    color: ${theme.color.white};
    font-weight: ${theme.font.weight.medium};
  }

  .navbar-dark .navbar-toggler {
    color: ${theme.color.white};
    border: none;
    font-weight: ${theme.font.weight.medium};

    @media (min-width: ${theme.breakpoints.lg}px) {
      float: right;
      padding: 0;
    }
  }

  @media (min-width: 576px) {
    &.navbar-collapse {
      display: block;
      flex-basis: auto;
    }

    .navbar-brand {
      font-size: 2em;
    }
  }
`

export default Header
