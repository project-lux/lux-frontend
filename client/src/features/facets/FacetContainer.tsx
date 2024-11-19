import React from 'react'
// import { Col } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'

import { getSelectedFacets } from '../../lib/facets/selectedFacets'
import { ICriteria } from '../../types/ISearchResults'
import { getParamPrefix } from '../../lib/util/params'
import { ResultsTab } from '../../types/ResultsTab'

import FacetAccordion from './FacetAccordion'
import SelectionContainer from './SelectionContainer'

interface IFacets {
  facetsRequested: Array<string>
  scope: string
}

function getIfValidQuery(str: string): ICriteria | null {
  if (/^\{.*\}$/.test(str)) {
    try {
      return JSON.parse(str)
    } catch (e) {
      return null
    }
  } else {
    return null
  }
}

const FacetContainer: React.FC<IFacets> = ({ facetsRequested, scope }) => {
  const { search } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)

  const searchParams = new URLSearchParams(search)
  const mainQueryString = searchParams.get('q') || ''
  const mainQuery = getIfValidQuery(mainQueryString)
  if (mainQuery) {
    const facetQueryString = searchParams.get(`${paramPrefix}f`)
    const facetQuery = facetQueryString ? JSON.parse(facetQueryString) : null
    const selectedFacets = facetQuery
      ? getSelectedFacets(facetQuery, scope)
      : null

    return (
      <React.Fragment>
        <SelectionContainer
          key={facetQuery}
          facetQuery={facetQuery}
          scope={scope}
          selectedFacets={selectedFacets}
        />
        <FacetAccordion
          key={search}
          criteria={mainQuery}
          requestedFacets={facetsRequested}
          facetQuery={facetQuery}
          scope={scope}
          selectedFacets={selectedFacets}
        />
      </React.Fragment>
    )
  }
  return null
}

export default FacetContainer
