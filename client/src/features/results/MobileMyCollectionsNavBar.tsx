import React from 'react'
import { Dropdown } from 'react-bootstrap'

import { nestedPageLinks } from '../../config/myCollections'
import StyledDropdown from '../../styles/shared/Dropdown'

interface IProps {
  searchQueryString: string
  currentNestedPage: string
}

const MobileMyCollectionsNavBar: React.FC<IProps> = ({
  searchQueryString,
  currentNestedPage,
}) => (
  <StyledDropdown className="w-100">
    <Dropdown.Toggle
      id="mobile-my-collections-dropdown"
      className="w-100 d-flex align-items-center"
    >
      {nestedPageLinks[currentNestedPage]} (estimate)
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {Object.keys(nestedPageLinks).map((key) => (
        <Dropdown.Item
          href={`/view/results/collections/${key}${searchQueryString}`}
          active={currentNestedPage === key}
        >
          {nestedPageLinks[key]} (estimate)
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </StyledDropdown>
)

export default MobileMyCollectionsNavBar
