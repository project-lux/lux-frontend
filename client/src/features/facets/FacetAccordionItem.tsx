import React from 'react'

import { useAppSelector } from '../../app/hooks'
import { booleanFacetNames, facetLabels } from '../../config/facets'
import { pushSiteImproveEvent } from '../../lib/siteImprove'
import { useGetFacetsSearchQuery } from '../../redux/api/ml_facets_api'
import { IFacetsSelected } from '../../redux/slices/facetsSlice'
import {
  ICriteria,
  IOrderedItems,
  ISearchResults,
} from '../../types/ISearchResults'

import Checklist from './Checklist'
import DateInput from './DateInput'

interface IProps {
  criteria: ICriteria
  tab: string
  facetName: string
  index: number
  facetQuery: ICriteria
  scope: string
  selectedFacets: Map<string, Set<string>> | null
  handleCallback: (facetName: string) => void
}

const filterFacetValues = (
  facets: IOrderedItems[],
  facetName: string,
): IOrderedItems[] => {
  // Remove null values
  let values = facets.filter((val: IOrderedItems) => val.value !== null)

  // Sort the boolean facet values so that Yes appears first in the list
  if (booleanFacetNames.has(facetName)) {
    values = Object.values(facets).sort(
      (a: IOrderedItems, b: IOrderedItems) => {
        const valA = a.value as number
        const valB = b.value as number
        return valB - valA
      },
    )
  }
  return values
}

const FacetAccordionItem: React.FC<IProps> = ({
  criteria,
  tab,
  facetName,
  index,
  facetQuery,
  scope,
  selectedFacets,
  handleCallback,
}) => {
  const combinedQuery = facetQuery ? { AND: [criteria, facetQuery] } : criteria
  const { data, isSuccess, isLoading } = useGetFacetsSearchQuery({
    q: JSON.stringify(combinedQuery),
    facets: {},
    facetNames: facetName,
    tab,
  })

  // get the facet state to determine the previously selected facet
  const facetsState = useAppSelector(
    (state) => state.facetSelection as IFacetsSelected,
  )
  let isFacetOpen = facetName === facetsState.lastSelectedFacetName

  if (isSuccess && data) {
    const { orderedItems } = data as ISearchResults
    const facetsToShow =
      orderedItems !== null && orderedItems.length > 0
        ? filterFacetValues(orderedItems, facetName)
        : []

    if (facetsToShow.length > 0) {
      return (
        <div key={`${tab}-${facetName}`} className="accordion-item">
          <p className="accordion-header" id={`heading-${index}`}>
            <button
              onClick={() => {
                const action = isFacetOpen ? 'Close' : 'Open'
                isFacetOpen = !isFacetOpen
                pushSiteImproveEvent(
                  'Facets Accordion Item',
                  action,
                  `Facet ${facetLabels[facetName]}`,
                )
              }}
              className={`accordion-button ${isFacetOpen ? '' : 'collapsed'}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${index}`}
              aria-expanded={isFacetOpen}
              aria-controls={`#collapse-${index}`}
            >
              {facetLabels[facetName]}
            </button>
          </p>
          <div
            id={`collapse-${index}`}
            className={`accordion-collapse collapse ${
              facetName === facetsState.lastSelectedFacetName ? 'show' : ''
            }`}
            aria-labelledby={`#heading-${index}`}
            data-bs-parent={`#${tab}-facet-accordion`}
          >
            <div className="accordion-body">
              {facetName.includes('Date') ? (
                <DateInput
                  criteria={criteria}
                  facetValues={facetsToShow}
                  facetSection={facetName}
                  facetQuery={facetQuery}
                  scope={scope}
                  autoFocus={facetName === facetsState.lastSelectedFacetName}
                />
              ) : (
                <Checklist
                  criteria={criteria}
                  facetValues={facetsToShow}
                  facetSection={facetName}
                  facetQuery={facetQuery}
                  scope={scope}
                  selectedFacets={selectedFacets}
                />
              )}
            </div>
          </div>
        </div>
      )
    }
  }

  if (isLoading) {
    return <p className="px-2 py-1">Loading facet...</p>
  }

  handleCallback(facetName)
  return null
}

export default FacetAccordionItem
