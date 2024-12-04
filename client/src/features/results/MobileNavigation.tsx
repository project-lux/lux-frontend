import React from 'react'
import { Dropdown } from 'react-bootstrap'

import { searchScope } from '../../config/searchTypes'
import { tabToLinkLabel } from '../../config/results'
import { getIcon } from '../../lib/advancedSearch/searchHelper'
import StyledDropdown from '../../styles/shared/Dropdown'

const MobileNavigation: React.FC = () => {
  // set to estimates or set empty if no results
  const estimates: Record<string, number | string> = {
    objects: '-',
    works: '-',
    people: '-',
    places: '-',
    concepts: '-',
    events: '-',
  }

  return (
    <StyledDropdown className="mobileNavigationDropdown">
      <Dropdown.Toggle id="dropdown-components" className="w-100">
        Objects
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.entries(searchScope).map(([key, value]) => (
          <Dropdown.Item key={key} eventKey={key}>
            <div className="float-start">
              <span className="linkTitle float-start">
                {tabToLinkLabel[key]}
              </span>
              <br />
              <span className="linkSubtext">
                {estimates[key]}
                results
              </span>
            </div>
            <div className="float-end">
              <img
                className="float-end navIcon"
                src={getIcon(value)}
                alt="icon"
                aria-label="icon"
                height={45}
                width={45}
              />
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export default MobileNavigation
