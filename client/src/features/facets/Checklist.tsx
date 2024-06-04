/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import config from '../../config/config'
import { ICriteria, IOrderedItems } from '../../types/ISearchResults'

import Checkbox from './Checkbox'

interface IFacets {
  criteria: ICriteria
  facetValues: Array<IOrderedItems>
  facetSection: string
  length?: number
  facetQuery: ICriteria
  scope: string
  selectedFacets: Map<string, Set<string>> | null
  page: number
  lastPage: number
  setPage: (x: number) => void
}

const Checklist: React.FC<IFacets> = ({
  criteria,
  facetValues,
  facetSection,
  length = 20,
  facetQuery,
  scope,
  selectedFacets,
  page,
  lastPage,
  setPage,
}) => {
  const list = facetValues
    .filter(
      (facet) =>
        facet.value !== null && facet.value !== config.dc.collectionItem,
    )
    .map((facet) => (
      <React.Fragment key={facet.value}>
        <Checkbox
          criteria={criteria}
          facet={facet}
          facetSection={facetSection}
          selectedFacets={selectedFacets}
          facetQuery={facetQuery}
          scope={scope}
        />
      </React.Fragment>
    ))

  return (
    <React.Fragment>
      <form>
        {list}
        {page !== lastPage && (
          <button
            type="button"
            className="btn btn-link show-more"
            onClick={() => setPage(page + 1)}
          >
            Show More
          </button>
        )}
        {page !== 1 && (
          <button
            type="button"
            className="btn btn-link show-less"
            onClick={() => setPage(page - 1)}
          >
            Show Less
          </button>
        )}
      </form>
    </React.Fragment>
  )
}

export default Checklist
