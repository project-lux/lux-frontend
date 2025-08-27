import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import { ResultsTab } from '../../types/ResultsTab'
import { facetNamesLists } from '../../config/facets'
import { searchScope } from '../../config/searchTypes'
import { getFacetData } from '../../lib/facets/helper'
import { ICriteria } from '../../types/ISearchResults'

import FacetAccordion from './FacetAccordion'
import SelectionContainer from './SelectionContainer'

const FacetContainer: React.FC = () => {
  const { search } = useLocation()
  const { tab, subTab } = useParams<keyof ResultsTab>() as ResultsTab
  const currentTabScope = subTab ? 'collections' : tab
  const facetsRequested = facetNamesLists[currentTabScope]
  const scope = searchScope[currentTabScope]
  const facetData = getFacetData(subTab ? subTab : tab, search, scope)
  if (facetData !== null && facetData.mainQuery !== null) {
    const { mainQuery, facetQuery, selectedFacets } = facetData

    return (
      <Row className="ps-3 w-100" style={{ height: 'max-content' }}>
        <SelectionContainer
          key={JSON.stringify(facetQuery)}
          facetQuery={facetQuery}
          scope={scope}
          selectedFacets={selectedFacets}
        />
        <Col xs={12} className="px-0">
          <FacetAccordion
            key={search}
            criteria={mainQuery}
            requestedFacets={facetsRequested}
            facetQuery={facetQuery as ICriteria}
            scope={scope}
            selectedFacets={selectedFacets}
          />
        </Col>
      </Row>
    )
  }
  return null
}

export default FacetContainer
