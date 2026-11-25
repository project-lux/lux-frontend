import React, { useState } from 'react'

import { pushClientEvent } from '../../lib/pushClientEvent'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { IHalLink } from '../../types/IHalLink'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import { IFacetsPagination } from '../../types/IFacets'
import { ISearchResults } from '../../types/ISearchResults'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import StyledAccordionButton from '../../styles/features/relatedLists/AccordionButton'

import FacetsRelatedList from './FacetsRelatedList'

interface IProps {
  searchTermConfig: IHalLink
  halLinkFromData: string
  index: number
}

/**
 * Renders the accordion item containing the accordion header and retrieves the HAL link data
 * @param {IHalLink} searchTermConfig known configuration for the given search tag
 * @param {string} halLinkFromData the HAL link in the entity's data
 * @param {number} index the array index of the current HAL link
 * @returns {JSX.Element}
 */
const FacetedListAccordionItem: React.FC<IProps> = ({
  searchTermConfig,
  halLinkFromData,
  index,
}) => {
  const { title, halLinkName, jsonSearchTerm } = searchTermConfig
  const searchTerm = halLinkName.replace('lux:', '')

  const [activeAccordion, setActiveAccordion] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [facets, setFacets] = useState<IFacetsPagination>({
    requests: {},
    total: 0,
    numberOfPages: 0,
  })
  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      uri: halLinkFromData,
      page: page.toString(),
    },
  )

  // Store each page of results as it arrives. This runs during render whenever data or page changes,
  // rather than in an effect, so the new page is shown without an extra render.
  // prevDeps starts as null so cached data is still stored on the first render.
  const [prevDeps, setPrevDeps] = useState<{
    data: typeof data
    isSuccess: boolean
    page: number
  } | null>(null)
  if (
    prevDeps === null ||
    prevDeps.data !== data ||
    prevDeps.isSuccess !== isSuccess ||
    prevDeps.page !== page
  ) {
    setPrevDeps({ data, isSuccess, page })
    const requestProperty = `call${page}`
    // While the next page is loading, data still holds the previous page, so check the page in data.id
    if (
      isSuccess &&
      data &&
      !facets.requests.hasOwnProperty(requestProperty) &&
      data.id.includes(`page=${page}`)
    ) {
      const totalResults = getEstimates(data as ISearchResults)
      setFacets({
        requests: {
          ...facets.requests,
          [requestProperty]: [...(data as ISearchResults).orderedItems],
        },
        total: totalResults,
        numberOfPages: Math.ceil(totalResults / 20),
      })
    }
  }

  if (isSuccess && data) {
    // Check if the results contain any data
    const { orderedItems } = data
    if (orderedItems.length === 0) {
      return null
    }
  }

  // Return null if there is an error
  if (isError) {
    return null
  }

  return (
    <React.Fragment>
      <div
        className="accordion-item"
        data-testid={`faceted-list-accordion-item-${searchTerm}`}
      >
        <h2
          className="accordion-header"
          id={`heading-related-${index}-${searchTerm}`}
        >
          <StyledAccordionButton
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${index}-${searchTerm}`}
            aria-expanded="false"
            aria-controls={`#collapse-${index}-${searchTerm}`}
            onClick={() => {
              pushClientEvent(
                'Accordion Item',
                activeAccordion ? 'Close' : 'Open',
                title,
              )
              setActiveAccordion(!activeAccordion)
            }}
            data-testid={`faceted-list-accordion-item-${searchTerm}-button`}
          >
            {isLoading ? 'Loading...' : title}
          </StyledAccordionButton>
        </h2>
        <div
          id={`collapse-${index}-${searchTerm}`}
          className="accordion-collapse collapse"
          aria-labelledby={`#heading-related-${index}-${searchTerm}`}
        >
          <div className="accordion-body" data-testid="accordion-body">
            {/* Render list based on facets returned */}
            {isSuccess && data && (
              <FacetsRelatedList
                activeAccordion={activeAccordion}
                url={halLinkFromData}
                searchTerm={jsonSearchTerm || ''}
                data={facets}
                title={title || ''}
                page={page}
                lastPage={facets.numberOfPages}
                setPage={setPage}
                setFacets={setFacets}
              />
            )}
          </div>
        </div>
      </div>
      <StyledHr
        className="w-100 facetedListAccordionHr"
        color={theme.color.lightGray}
      />
    </React.Fragment>
  )
}

export default FacetedListAccordionItem
