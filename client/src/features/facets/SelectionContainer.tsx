import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { ICriteria } from '../../types/ISearchResults'
import { getParamPrefix } from '../../lib/util/params'
import { reset } from '../../redux/slices/facetsSlice'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'

import SelectedFacet from './SelectedFacet'

const StyledSelectionContainer = styled.div`
  background: rgba(0, 147, 176, 0.15);
`

const StyledRow = styled.div`
  padding: 21px 20px;
`

const StyledSpan = styled.span`
  font-size: 1em;
  color: #5d5d5d;
  letter-spacing: 0;
  text-align: left;
  font-weight: 700;
  top: 428px;
  left: 48px;
  max-width: 256px;
  max-height: 20px;
  display: inline-block;
`

const StyledClearAllButton = styled.button`
  font-size: 1em;
  color: #006dc6;
  letter-spacing: 0;
  text-align: right;
  font-weight: 400;
  height: 25px;
  width: 100px;
  padding: 0px 0px;
  text-decoration: none;
`
interface IProps {
  facetQuery: ICriteria | null
  scope: string
  selectedFacets: Map<string, Set<string>> | null
}

const SelectionContainer: React.FC<IProps> = ({
  facetQuery,
  scope,
  selectedFacets,
}) => {
  const location = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)
  const { search } = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const dispatch = useAppDispatch()

  // Removes all URL params that are facet related
  const handleClearAll = (): void => {
    // Set page to 1 so that the current page is not set as default
    params.set(`${paramPrefix}p`, '1')
    params.delete('facetRequest')
    params.delete(`${paramPrefix}f`)
    const updatedQuery = params.toString()
    dispatch(reset())
    pushClientEvent('Facets Selected Filters', 'Selected', 'Facet Clear All')
    navigate(`${location.pathname}?${updatedQuery}`)
  }

  const getSelectedFacets = (): JSX.Element[] | null => {
    if (selectedFacets === null) {
      return null
    }
    const selectedFacetComponents = [] as JSX.Element[]
    selectedFacets.forEach((entityIds, searchTag) =>
      entityIds.forEach((entityId) => {
        // If the entityId is of type number, it should be rendered as we need to accept string and numerical values
        if (entityId || typeof entityId === 'number') {
          selectedFacetComponents.push(
            <SelectedFacet
              key={`${searchTag}_${entityId}`}
              searchTag={searchTag}
              option={entityId}
              facetQuery={facetQuery}
              scope={scope}
            />,
          )
        }
      }),
    )
    return selectedFacetComponents
  }

  if (selectedFacets && selectedFacets.size > 0) {
    return (
      <StyledSelectionContainer>
        <StyledRow className="row">
          <StyledSpan style={{ whiteSpace: 'nowrap' }}>
            Selected Filters
            <StyledClearAllButton
              type="button"
              className="btn btn-link"
              onClick={() => handleClearAll()}
            >
              Clear All
            </StyledClearAllButton>
          </StyledSpan>
          <StyledRow className="row">
            {selectedFacets ? getSelectedFacets() : null}
          </StyledRow>
        </StyledRow>
      </StyledSelectionContainer>
    )
  }

  return null
}

export default SelectionContainer
