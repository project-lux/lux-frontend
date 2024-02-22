import styled from 'styled-components'

import theme from '../../theme'

const Footer = styled.div`
  background-color: ${theme.color.primary.darkBlue};
  height: 224px;

  @media (min-width: 576px) {
    height: 105px;
  }

  .container-fluid {
    display: flex;
    width: 100%;
    height: 100%;
  }

  #lux-footer-yale {
    margin-left: ${theme.spacing.contentAbsMarginX};
    font-family: YaleDesign, serif;
    font-size: 2em;
    font-weight: 400;
    color: ${theme.color.white};
  }

  footer {
    width: 100%;
    padding-top: 1rem;

    @media (min-width: ${theme.breakpoints.sm}px) {
      padding-top: 0;
    }
  }

  #lux-footer-nav-items {
    margin-right: 28px;
    display: block;

    @media (min-width: ${theme.breakpoints.sm}px) {
      display: flex;
    }
  }

  #lux-footer-nav-items-col {
    justify-content: start;
    padding-left: 3rem;

    @media (min-width: ${theme.breakpoints.sm}px) {
      justify-content: end;
      padding-left: 0;
    }
  }

  li.nav-item a {
    margin-right: 16px;
    color: white;
    letter-spacing: 0;
    text-align: right;
    font-weight: ${theme.font.weight.medium};
  }

  li.nav-item:last-child a {
    margin-right: 0;
  }
`

export default Footer
