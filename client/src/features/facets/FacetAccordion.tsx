import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router'
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
  // names of the facets that have no values for the current search
  const [nullFacets, setNullFacets] = useState<Set<string>>(new Set())
  const hasOnlyNullValues =
    requestedFacets.length > 0 &&
    requestedFacets.every((facet) => nullFacets.has(facet))

  const setFacetIsNull = useCallback((facetName: string): void => {
    setNullFacets((previous) =>
      previous.has(facetName) ? previous : new Set(previous).add(facetName),
    )
  }, [])

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
