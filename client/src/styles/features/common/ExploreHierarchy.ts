import styled from 'styled-components'

import theme from '../../theme'

const ExploreHierarchy = styled.div`
  background-color: #fff;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-position: inside;
  }

  li {
    margin-left: 28px;
  }

  button {
    background: none;
    border: none;
    padding: 0 0 0 0;
    font: inherit;
    color: ${theme.color.primary.blue};
    cursor: pointer;
    outline: inherit;
  }

  .moreless {
    margin: 5px 25px;
    font-weight: 400;

    button {
      margin-right: 5px;
    }
  }
`

export default ExploreHierarchy
