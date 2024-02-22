import React from 'react'
import { Col } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { getSelectedFacets } from '../../lib/facets/selectedFacets'
import { ISearchResponse } from '../../types/ISearchResponse'
import { ICriteria } from '../../types/ISearchResults'
import { getParamPrefix } from '../../lib/util/params'
import theme from '../../styles/theme'
import { ResultsTab } from '../../types/ResultsTab'

import FacetAccordion from './FacetAccordion'
import SelectionContainer from './SelectionContainer'

const StyledContainer = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
  border-radius: ${theme.border.radius};
  height: auto;
  margin-bottom: 1rem;
`

const StyledHeader = styled.h3`
  max-width: 287px;
  margin-left: 21px;
  margin-right: 12px;
  margin-bottom: 29px;
  padding-top: 29px;
`

interface IFacets {
  facetsRequested: Array<string>
  searchResponse: ISearchResponse
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

const FacetContainer: React.FC<IFacets> = ({
  facetsRequested,
  searchResponse,
  scope,
}) => {
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
      <Col xs={12} sm={12} md={12} lg={3}>
        <StyledContainer>
          <StyledHeader>Refine</StyledHeader>
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
        </StyledContainer>
      </Col>
    )
  }
  return null
}

export default FacetContainer
