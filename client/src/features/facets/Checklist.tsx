/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import config from '../../config/config'
import { IFacetValue } from '../../types/IFacets'
import { ICriteria } from '../../types/ISearchResults'

import Checkbox from './Checkbox'

interface IFacets {
  criteria: ICriteria
  facetValues: Array<IFacetValue>
  facetSection: string
  length?: number
  facetQuery: ICriteria
  scope: string
  selectedFacets: Map<string, Set<string>> | null
}

const Checklist: React.FC<IFacets> = ({
  criteria,
  facetValues,
  facetSection,
  length = 20,
  facetQuery,
  scope,
  selectedFacets,
}) => {
  const [displayLength, setDisplayLength] = useState(length)

  const list = facetValues
    .filter(
      (facet) =>
        facet.value !== null && facet.value !== config.dc.collectionItem,
    )
    .slice(0, displayLength)
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
        {displayLength >= length && displayLength < facetValues.length && (
          <button
            type="button"
            className="btn btn-link show-more"
            onClick={() => setDisplayLength(displayLength + length)}
          >
            Show More
          </button>
        )}
        {displayLength > length && (
          <button
            type="button"
            className="btn btn-link show-less"
            onClick={() =>
              setDisplayLength(Math.max(displayLength - length, length))
            }
          >
            Show Less
          </button>
        )}
      </form>
    </React.Fragment>
  )
}

export default Checklist
