import { createGlobalStyle } from 'styled-components'

import YaleNewRoman from '../resources/fonts/YaleNew-Roman.otf'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'YaleNew', serif;
    src: url(${YaleNewRoman});
  }

  body {
    min-height: 100vh;
    margin: 0;
    font-family: Inter, "Helvetica Neue", Arial, sans-serif;
    font-size: ${theme.font.size.normal};
    font-weight: ${theme.font.weight.extraLight};
    letter-spacing: 0;
    line-height: 32px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.color.offWhite};
  }

  h1 {
    font-size: 3.1em;
    color: #222222;
    letter-spacing: -2px;
    font-size: ${theme.font.mobile.h1.size};
    line-height: ${theme.font.mobile.h1.lineHeight};
    font-weight: ${theme.font.mobile.h1.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h1.size};
      line-height: ${theme.font.desktop.h1.lineHeight};
      font-weight: ${theme.font.desktop.h1.weight};
    }
  }

  h2 {
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.h2.size};
    line-height: ${theme.font.mobile.h2.lineHeight};
    font-weight: ${theme.font.mobile.h2.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h2.size};
      line-height: ${theme.font.desktop.h2.lineHeight};
      font-weight: ${theme.font.desktop.h2.weight};
    }
  }

  h3 {
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.h3.size};
    line-height: ${theme.font.mobile.h3.lineHeight};
    font-weight: ${theme.font.mobile.h3.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h3.size};
      line-height: ${theme.font.desktop.h3.lineHeight};
      font-weight: ${theme.font.desktop.h3.weight};
    }
  }

  h4 {
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.h4.size};
    line-height: ${theme.font.mobile.h4.lineHeight};
    font-weight: ${theme.font.mobile.h4.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h4.size};
      line-height: ${theme.font.desktop.h4.lineHeight};
      font-weight: ${theme.font.desktop.h4.weight};
    }
  }

  h5 {
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: left;
    line-height: 24px;
    font-size: ${theme.font.mobile.h5.size};
    line-height: ${theme.font.mobile.h5.lineHeight};
    font-weight: ${theme.font.mobile.h5.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h5.size};
      line-height: ${theme.font.desktop.h5.lineHeight};
      font-weight: ${theme.font.desktop.h5.weight};
    }
  }

  p {
    color: ${theme.color.black};
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.bodyLight.size};
    line-height: ${theme.font.mobile.bodyLight.lineHeight};
    font-weight: ${theme.font.mobile.bodyLight.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.bodyLight.size};
      line-height: ${theme.font.desktop.bodyLight.lineHeight};
      font-weight: ${theme.font.desktop.bodyLight.weight};
    }
  }

  ul {
    padding-left: 0;
  }

  a {
    color: ${theme.color.link};
    text-decoration: none;
  }

  dt {
    overflow-wrap: break-word;
  }

  code {
    color: ${theme.color.black}
  }

  .accordion-button:not(.collapsed) {
    color: ${theme.color.black}
  }

  #route-container {
    min-height: 100vh;
  }
`

export default GlobalStyle
