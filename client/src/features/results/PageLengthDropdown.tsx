import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import { getPageLength, getParamPrefix } from '../../lib/util/params'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { ResultsTab } from '../../types/ResultsTab'
import StyledDropdown from '../../styles/shared/Dropdown'

const pageLengthOptions = [20, 60, 100]

interface IPageLengthDropdown {
  className?: string
}

const PageLengthDropdown: React.FC<IPageLengthDropdown> = ({ className }) => {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const queryString = new URLSearchParams(search)
  const selected = getPageLength(queryString)

  const handlePageLengthSelection = (value: string | null): void => {
    if (value === null || parseInt(value, 10) === selected) {
      return
    }
    pushClientEvent('Page Length', 'Selected', `Page Length ${value}`)
    queryString.set('pageLength', value)
    // return to the first page so the current page is not out of range
    queryString.delete(`${getParamPrefix(tab)}p`)
    navigate(`${pathname}?${queryString.toString()}`)
  }

  return (
    <StyledDropdown
      onSelect={handlePageLengthSelection}
      className={className}
      data-testid="page-length-dropdown"
    >
      <Dropdown.Toggle
        id="page-length-dropdown"
        className="h-100 w-100"
        data-testid="page-length-dropdown-button"
        aria-label={`Results per page: ${selected}`}
      >
        {pageLengthOptions.includes(selected)
          ? `Results: ${selected}`
          : `Custom: ${selected}`}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>Page Length</Dropdown.Header>
        {pageLengthOptions.map((option) => (
          <Dropdown.Item
            key={option}
            as="button"
            type="button"
            eventKey={option.toString()}
            aria-label={`Show ${option} results per page`}
            data-testid={`page-length-option-${option}`}
            active={selected === option}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export default PageLengthDropdown
