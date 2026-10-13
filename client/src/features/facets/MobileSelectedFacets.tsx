import React, { type JSX } from 'react'
import styled from 'styled-components'
import { Col } from 'react-bootstrap'
import { isUndefined } from 'lodash'

import theme from '../../styles/theme'
import { getFacetData } from '../../lib/facets/helper'
import { ICriteria } from '../../types/ISearchResults'

import SelectedFacet from './SelectedFacet'
import MobileSortSelection from './MobileSortSelection'

const StyledSelectionSpan = styled.span`
  background: ${theme.color.lightBabyBlue};
  overflow-x: scroll;
  white-space: nowrap;
`

interface IProps {
  tab: string
  search: string
  scope: string
  selectedSortBy?: string
  selectedSortDirection?: string
}

const MobileSelectedFacets: React.FC<IProps> = ({
  tab,
  search,
  scope,
  selectedSortBy,
  selectedSortDirection,
}) => {
  const facetData = getFacetData(tab, search, scope)

  const getSelectedFacets = (
    selectedFacets: Map<string, Set<string>>,
    facetQuery: ICriteria,
  ): JSX.Element[] | null => {
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

  let facetQuery = null
  let selectedFacets = null
  if (facetData) {
    facetQuery = facetData.facetQuery
    selectedFacets = facetData.selectedFacets
  }

  const hasSorting =
    !isUndefined(selectedSortBy) && !isUndefined(selectedSortDirection)

  if ((facetQuery && selectedFacets) || hasSorting) {
    return (
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="py-2 selectedFacetsMobileContainer"
      >
        <StyledSelectionSpan className="d-flex p-2">
          {facetQuery && selectedFacets && selectedFacets.size > 0
            ? getSelectedFacets(selectedFacets, facetQuery)
            : null}
          {hasSorting ? (
            <MobileSortSelection
              key={`${selectedSortBy}_${selectedSortDirection}`}
              selectedSort={selectedSortBy}
              selectedDirection={selectedSortDirection}
            />
          ) : null}
        </StyledSelectionSpan>
      </Col>
    )
  }

  return null
}

export default MobileSelectedFacets
