import React, { useEffect, useState } from 'react'

import { useAppSelector } from '../../app/hooks'
import { booleanFacetNames, facetLabels } from '../../config/facets'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { useGetFacetsSearchQuery } from '../../redux/api/ml_facets_api'
import { IFacetsSelected } from '../../redux/slices/facetsSlice'
import {
  ICriteria,
  IOrderedItems,
  ISearchResults,
} from '../../types/ISearchResults'
import { IFacetsPagination } from '../../types/IFacets'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'

import Checklist from './Checklist'
import FullDateInput from './FullDateInput'

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
  const [page, setPage] = useState<number>(1)
  const [facets, setFacets] = useState<IFacetsPagination>({
    requests: {},
    total: 0,
    numberOfPages: 1,
  })
  const combinedQuery = facetQuery ? { AND: [criteria, facetQuery] } : criteria

  const { data, isSuccess, isLoading } = useGetFacetsSearchQuery({
    q: JSON.stringify(combinedQuery),
    facets: {},
    facetNames: facetName,
    tab,
    page,
  })

  // get the facet state to determine the previously selected facet
  const facetsState = useAppSelector(
    (state) => state.facetSelection as IFacetsSelected,
  )
  let isFacetOpen = facetName === facetsState.lastSelectedFacetName

  useEffect(() => {
    if (isSuccess && data) {
      let totalResults = 0
      const children: Array<IOrderedItems> = []
      totalResults += getEstimates(data as ISearchResults)

      const { orderedItems, id } = data as ISearchResults
      for (const item of orderedItems) {
        children.push(item)
      }

      const requestProperty = `call${page}`
      if (
        !facets.requests.hasOwnProperty(requestProperty) &&
        id.includes(`page=${page}`)
      ) {
        setFacets({
          requests: {
            ...facets.requests,
            [requestProperty]: filterFacetValues(children, facetName),
          },
          total: totalResults,
          numberOfPages: Math.ceil(totalResults / 20),
        })
      }
    }
  }, [data, facetName, facets, isSuccess, page])

  if (isLoading) {
    return <p className="px-2 py-1">Loading facet...</p>
  }

  if (isSuccess && data) {
    const { orderedItems } = data as ISearchResults
    if (
      orderedItems &&
      orderedItems.length > 0 &&
      Object.keys(facets.requests).length > 0
    ) {
      return (
        <div key={`${tab}-${facetName}`} className="accordion-item">
          <p className="accordion-header" id={`heading-${index}`}>
            <button
              onClick={() => {
                const action = isFacetOpen ? 'Close' : 'Open'
                isFacetOpen = !isFacetOpen
                pushClientEvent(
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
                <FullDateInput
                  combinedQuery={combinedQuery}
                  criteria={criteria}
                  facetValues={facets}
                  facetSection={facetName}
                  facetQuery={facetQuery}
                  scope={scope}
                  currentTab={tab}
                  facetName={facetName}
                  lastPage={facets.numberOfPages}
                />
              ) : (
                <Checklist
                  criteria={criteria}
                  facetValues={facets}
                  facetSection={facetName}
                  facetQuery={facetQuery}
                  scope={scope}
                  selectedFacets={selectedFacets}
                  page={page}
                  lastPage={facets.numberOfPages}
                  setPage={setPage}
                  setFacets={setFacets}
                />
              )}
            </div>
          </div>
          <StyledHr color={theme.color.lightGray} width="100%" />
        </div>
      )
    }
    return null
  }

  handleCallback(facetName)
  return null
}

export default FacetAccordionItem
