import React, { useEffect, useState } from 'react'

import { pushClientEvent } from '../../lib/pushClientEvent'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { IHalLink } from '../../types/IHalLink'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import { IFacetsPagination } from '../../types/IFacets'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import StyledAccordionButton from '../../styles/features/relatedLists/AccordionButton'

import FacetsRelatedList from './FacetsRelatedList'

interface IProps {
  searchTermConfig: IHalLink
  halLink: string
  index: number
}

/**
 * Renders the accordion item containing the accordion header and retrieves the HAL link data
 * @param {IHalLink} searchTermConfig known configuration for the given search tag
 * @param {string} halLink the HAL link in the entity's data
 * @param {number} index the array index of the current HAL link
 * @returns {JSX.Element}
 */
const FacetedListAccordionItem: React.FC<IProps> = ({
  searchTermConfig,
  halLink,
  index,
}) => {
  const { title, searchTag, jsonSearchTerm } = searchTermConfig
  const searchTerm = searchTag.replace('lux:', '')

  const [activeAccordion, setActiveAccordion] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [facets, setFacets] = useState<IFacetsPagination>({
    requests: {},
    total: 0,
    numberOfPages: 0,
  })
  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      uri: halLink,
      page: page.toString(),
    },
  )

  useEffect(() => {
    if (isSuccess && data) {
      let totalResults = 0
      const children: Array<IOrderedItems> = []
      totalResults += getEstimates(data as ISearchResults)

      const { orderedItems } = data as ISearchResults
      for (const item of orderedItems) {
        children.push(item)
      }

      const requestProperty = `call${page}`
      if (
        !facets.requests.hasOwnProperty(requestProperty) &&
        data.id.includes(`page=${page}`)
      ) {
        setFacets({
          requests: {
            ...facets.requests,
            [requestProperty]: children,
          },
          total: totalResults,
          numberOfPages: Math.ceil(totalResults / 20),
        })
      }
    }
  }, [data, facets, halLink, isSuccess, page])

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
                url={halLink}
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
