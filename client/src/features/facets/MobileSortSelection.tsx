import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'
import theme from '../../styles/theme'
import { sortBy } from '../../config/sortingOptions'
import { removeSorting } from '../../lib/facets/removeFilter'

const StyledSelectedFacetContainer = styled.div`
  background: #ffffff;
  border: 1px solid #cacaca;
  border-radius: 5px;
  font-size: 1em;
  color: ${theme.color.black};
  letter-spacing: 0;
  text-align: left;
  font-weight: 400;
  white-space: nowrap;

  @media (min-width: ${theme.breakpoints.md}px) {
    font-size: 1.125em;
    white-space: break-spaces;
  }
`

const StyledButton = styled.button`
  width: 10px;
  height: 10px;
  padding: 0px;
`

interface ISelected {
  selectedSort: string
  selectedDirection: string
}

const MobileSortSelection: React.FC<ISelected> = ({
  selectedSort,
  selectedDirection,
}) => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const sortOptions = sortBy[tab]
  const label = `Sorting By ${sortOptions[selectedSort]}:${selectedDirection}`

  const handleRemoveFacet = (): void => {
    const newSearchParams = removeSorting(search, tab)
    pushClientEvent('Facets Selected Filters', 'Removed', `Facet ${label}`)
    pushClientEvent('Sorting Selected Filters', 'Removed', label)
    navigate(`${pathname}?${newSearchParams}`)
  }

  return (
    <StyledSelectedFacetContainer className="me-1 px-1">
      <span className="pe-2">{label}</span>
      <StyledButton
        type="button"
        className="btn-close"
        aria-label={`Remove ${label}`}
        onClick={handleRemoveFacet}
      />
    </StyledSelectedFacetContainer>
  )
}

export default MobileSortSelection
