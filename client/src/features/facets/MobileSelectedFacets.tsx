import React from 'react'
import styled from 'styled-components'
import { Col } from 'react-bootstrap'

import theme from '../../styles/theme'
import { getFacetData } from '../../lib/facets/helper'
import { ICriteria } from '../../types/ISearchResults'

import SelectedFacet from './SelectedFacet'

const StyledSelectionContainer = styled(Col)`
  background: ${theme.color.lightBabyBlue};
  overflow-x: scroll;
  white-space: nowrap;
`

interface IProps {
  tab: string
  search: string
  scope: string
}

const MobileSelectedFacets: React.FC<IProps> = ({ tab, search, scope }) => {
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

  if (facetData) {
    const { facetQuery, selectedFacets } = facetData
    if (facetQuery && selectedFacets && selectedFacets.size > 0) {
      return (
        <StyledSelectionContainer xs={12} className="py-2">
          <span className="d-flex">
            {selectedFacets
              ? getSelectedFacets(selectedFacets, facetQuery)
              : null}
          </span>
        </StyledSelectionContainer>
      )
    }
  }

  return null
}

export default MobileSelectedFacets
