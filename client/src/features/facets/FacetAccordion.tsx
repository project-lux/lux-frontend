import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'

import { ICriteria } from '../../types/ISearchResults'
import { ResultsTab } from '../../types/ResultsTab'
import { ErrorFallback } from '../error/ErrorFallback'
import theme from '../../styles/theme'

import FacetAccordionItem from './FacetAccordionItem'

const StyledDiv = styled.div`
  width: 100%;
  box-shadow: 0px 0px 10px ${theme.color.black20};
  border-radius: ${theme.border.radius};

  @media (min-width: ${theme.breakpoints.md}px) {
    box-shadow: none;
  }
`

interface IProps {
  criteria: ICriteria
  requestedFacets: Array<string>
  facetQuery: ICriteria
  scope: string
  selectedFacets: Map<string, Set<string>> | null
}

const FacetAccordion: React.FC<IProps> = ({
  criteria,
  requestedFacets,
  facetQuery,
  scope,
  selectedFacets,
}) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const [hasOnlyNullValues, setHasOnlyNullValues] = useState<boolean>(false)
  const nullFacets: { [key: string]: boolean } = {}
  requestedFacets.forEach((facet) => {
    nullFacets[facet] = false
  })

  const setFacetIsNull = (facetName: string): void => {
    nullFacets[facetName] = true
    if (Object.values(nullFacets).every((value) => value)) {
      setHasOnlyNullValues(true)
    }
  }

  const elems = requestedFacets.map((facetName, ind) => (
    <ErrorBoundary FallbackComponent={ErrorFallback} key={facetName}>
      <FacetAccordionItem
        criteria={criteria}
        tab={tab}
        facetName={facetName}
        index={ind}
        facetQuery={facetQuery}
        scope={scope}
        selectedFacets={selectedFacets}
        handleCallback={setFacetIsNull}
      />
    </ErrorBoundary>
  ))

  return (
    <StyledDiv className="accordion" id={`${tab}-facet-accordion`}>
      {hasOnlyNullValues ? (
        <p className="ps-4 py-2 pe-2">
          There are no facets available for the current search.
        </p>
      ) : (
        elems
      )}
    </StyledDiv>
  )
}

export default FacetAccordion
