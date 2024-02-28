import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

import ApiText from '../common/ApiText'
import theme from '../../styles/theme'
import InternalLink from '../common/InternalLink'

interface IProps {
  entityId: string
}

const StyledDropdown = styled(Dropdown)`
  .dropdown-toggle {
    color: ${theme.color.button};
    background-color: ${theme.color.white};
    border: none;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;

    &:after {
      display: none;
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
    background-color: ${theme.color.white};
  }

  .dropdown-item.focus {
    background-color: ${theme.color.white};
  }
`

const Node: React.FC<IProps> = ({ entityId }) => {
  const name = ApiText(entityId)

  return (
    <span className="d-flex display-inline align-items-center">
      <p className="mb-0">{name}</p>
      <StyledDropdown
        drop="end"
        id="advanced-search-switch"
        data-testid="hierarchy-dropdown"
      >
        <Dropdown.Toggle
          id="advanced-search-dropdown-toggle"
          data-testid="hierarchy-dropdown-toggle"
        >
          <i className="bi bi-three-dots-vertical" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <InternalLink uri={entityId} name="View Entity" />
          </Dropdown.Item>
          <Dropdown.Item>
            <InternalLink uri={entityId} name="View Hierarchy" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </StyledDropdown>
    </span>
  )
}

export default Node
