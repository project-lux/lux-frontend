import React from 'react'
import { Dropdown } from 'react-bootstrap'

import { nestedPageLinks } from '../../config/myCollections/resultsTabs'
import StyledDropdown from '../../styles/shared/Dropdown'
import LoadingSpinner from '../common/LoadingSpinner'

interface IProps {
  searchQueryString: string
  currentNestedPage: string
  currentEstimates: Record<string, string | number>
  isLoading: boolean
  isFetching: boolean
}

const MobileMyCollectionsNavBar: React.FC<IProps> = ({
  searchQueryString,
  currentNestedPage,
  currentEstimates,
  isLoading,
  isFetching,
}) => (
  <StyledDropdown className="w-100">
    <Dropdown.Toggle
      id="mobile-my-collections-dropdown"
      className="w-100 d-flex align-items-center"
    >
      {nestedPageLinks[currentNestedPage]} (
      {currentEstimates[currentNestedPage]})
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {Object.keys(nestedPageLinks).map((key) => (
        <Dropdown.Item
          href={`/view/results/collections/${key}${searchQueryString}`}
          active={currentNestedPage === key}
        >
          {nestedPageLinks[key]} (
          {isLoading || isFetching ? (
            <LoadingSpinner size="sm" />
          ) : (
            currentEstimates[key]
          )}
          )
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </StyledDropdown>
)

export default MobileMyCollectionsNavBar
