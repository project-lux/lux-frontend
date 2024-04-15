import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
// import { Button } from 'react-bootstrap'

import theme from '../../styles/theme'
import InternalLink from '../common/InternalLink'
import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'

interface IProps {
  entityId: string
}

const StyledSpan = styled.span`
  color: ${theme.color.button};
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.button};
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  font-weight: 400;
`

const StyledDropdown = styled(Dropdown)`
  .dropdown-toggle {
    color: ${theme.color.button};
    background-color: ${theme.color.white};
    border: 1px solid ${theme.color.button};
    border-radius: 5px;

    // &:after {
    //   display: none;
    // }
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

const ParentCustomNode: React.FC<IProps> = ({ entityId }) => {
  const { pathname } = useLocation()
  const uriToRetrieve = stripYaleIdPrefix(entityId)
  const isCurrentEntity = pathname.includes(uriToRetrieve)

  const { data, isSuccess } = useGetItemQuery({
    uri: uriToRetrieve,
    profile: 'results',
  })

  let name = ''
  if (data && isSuccess) {
    const entity = new EntityParser(data)
    name = entity.getPrimaryName(config.dc.langen)
  }

  if (isCurrentEntity) {
    return (
      <StyledSpan className="d-flex display-inline align-items-center">
        {name}
      </StyledSpan>
    )
  }

  return (
    <span className="d-flex display-inline align-items-center">
      <StyledDropdown
        drop="start"
        id="advanced-search-switch"
        data-testid="hierarchy-dropdown"
      >
        <Dropdown.Toggle
          id="advanced-search-dropdown-toggle"
          data-testid="hierarchy-dropdown-toggle"
        >
          {name}
          {/* <i className="bi bi-three-dots-vertical" /> */}
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

export default ParentCustomNode
