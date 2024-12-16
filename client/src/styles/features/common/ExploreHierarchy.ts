import styled from 'styled-components'
import { Row } from 'react-bootstrap'

import theme from '../../theme'

const ExploreHierarchy = styled(Row)`
  background-color: #fff;

  h2 {
    margin-bottom: 10px;
  }

  .hierarchyUl,
  .parentUl,
  .childrenUl {
    list-style-position: inside;
  }

  .parentUl,
  .childrenUl {
    margin-left: 1rem;
    list-style-type: disc;

    @media (min-width: ${theme.breakpoints.md}px) {
      list-style-type: circle;
    }
  }

  .parentLi,
  .childrenLi {
    margin-left: 0px;
    list-style-type: none;

    @media (min-width: ${theme.breakpoints.md}px) {
      margin-left: 28px;
      list-style-type: disc;
    }

    .parentMoreLessButton,
    .searchResultsLink {
      margin-left: 0rem;
      font-weight: ${theme.font.weight.regular};

      @media (min-width: ${theme.breakpoints.md}px) {
        margin-left: 1rem;
      }
    }
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
