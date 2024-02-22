import styled from 'styled-components'

import theme from '../../theme'

// The "What is LUX" panel layered over the hero image
const WhatIsLux = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: ${theme.spacing.contentAbsMarginX};
  width: auto;
  background-color: ${theme.color.teal90};
  margin-right: 40px;
  z-index: 1;

  h2 {
    position: absolute;
    left: -${theme.spacing.contentAbsMarginX};
    top: 33px;
    width: auto;
    height: auto;
    padding: 25px ${theme.spacing.contentAbsMarginX};
    color: ${theme.color.white};
    background-color: ${theme.color.primary.darkBlue};
    font-family: Inter, sans-serif;
    font-size: 2.25rem;
    font-weight: ${theme.font.weight.extraLight};
    letter-spacing: -2px;
    z-index: 2;

    @media (min-width: ${theme.breakpoints.sm}px) {
      font-size: 3.1rem;
    }
  }

  p {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 150px;
    font-family: Inter, sans-serif;
    font-size: 1.2rem;
    color: ${theme.color.offWhite};
    letter-spacing: 0;
    text-align: left;
    line-height: 1.8rem;
    font-weight: ${theme.font.weight.light};

    @media (min-width: ${theme.breakpoints.sm}px) {
      padding-top: 170px;
      padding-left: 47px;
      padding-right: 56px;
    }
  }

  @media (min-width: 552px) {
    max-width: 460px;
    margin-right: 0;
  }

  @media (min-width: 992px) {
    p {
      padding-top: 170px;
      font-size: 1.4em;
      line-height: 2.5rem;
    }
  }

  @media (min-width: 1200px) {
    p {
      padding-top: 176px;
      font-size: 2em;
      line-height: 2.5rem;
    }
  }
`

export default WhatIsLux
