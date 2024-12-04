import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown'

import theme from '../theme'

const ReactBootstrapDropdown = styled(Dropdown)`
  .dropdown-toggle {
    color: ${theme.color.button};
    background-color: ${theme.color.white};
    border: 1px solid ${theme.color.button};
    border-radius: 5px;

    &.mobileNavigationDropdown {
      color: ${theme.color.button};
      border: none;
      display: flex;
    }
  }

  .dropdown-toggle.show {
    color: ${theme.color.button};
    background-color: ${theme.color.white};
  }

  .dropdown-menu.show {
    max-height: 400px;
    overflow-y: scroll;
  }

  .dropdown-item.active {
    background-color: ${theme.color.primary.blue};
  }

  &#advanced-search-switch {
    display: none;

    @media (min-width: ${theme.breakpoints.md}px) {
      display: block;
    }
  }
`

export default ReactBootstrapDropdown
