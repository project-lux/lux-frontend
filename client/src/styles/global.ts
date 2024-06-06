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
    line-height: 72px;
    font-weight: ${theme.font.weight.light};
  }

  h2 {
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    line-height: 56px;
    font-weight: 200;
  }

  h3 {
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    line-height: 40px;
    font-weight: 200;
  }

  h4 {
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    line-height: 32px;
    font-weight: 700;
  }

  h5 {
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: left;
    line-height: 24px;
    font-weight: 700;
  }

  p {
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    line-height: 24px;
    font-weight: 200;
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
