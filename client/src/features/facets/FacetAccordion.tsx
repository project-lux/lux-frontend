/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { ICriteria } from '../../types/ISearchResults'
import { ResultsTab } from '../../types/ResultsTab'
import { ErrorFallback } from '../error/ErrorFallback'

import FacetAccordionItem from './FacetAccordionItem'

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
    <div className="accordion" id={`${tab}-facet-accordion`}>
      {hasOnlyNullValues ? (
        <p className="ps-4 py-2 pe-2">
          There are no facets available for the current search.
        </p>
      ) : (
        elems
      )}
    </div>
  )
}

export default FacetAccordion
