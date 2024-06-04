import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { pushSiteImproveEvent } from '../../lib/siteImprove'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { IHalLink } from '../../types/IHalLink'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import { getEstimates } from '../../lib/parse/search/searchResultParser'

import FacetsRelatedList from './FacetsRelatedList'

interface IProps {
  searchTermConfig: IHalLink
  halLink: string
  index: number
}

const StyledAccordionButton = styled.button`
  color: #222222;
  letter-spacing: 0;
  text-align: left;
  line-height: 56px;
  font-weight: 200;
  font-size: 1.5rem;
`

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
  const [activeAccordion, setActiveAccordion] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [facets, setFacets] = useState<{
    requests: {
      [key: string]: Array<{ value: string; totalItems: number }>
    }
    total: number
  }>({ requests: {}, total: 0 })
  const { title, searchTag, jsonSearchTerm } = searchTermConfig
  const searchTerm = searchTag.replace('lux:', '')

  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      uri: halLink,
      page: page.toString(),
    },
  )

  useEffect(() => {
    if (isSuccess && data) {
      let totalResults = 0
      const children: Array<{ value: string; totalItems: number }> = []
      totalResults += getEstimates(data)

      for (const item of data.orderedItems) {
        const { value, totalItems } = item
        children.push({ value, totalItems })
      }

      const requestProperty = `call${page}`
      if (!facets.requests.hasOwnProperty(requestProperty)) {
        setFacets({
          requests: {
            ...facets.requests,
            [requestProperty]: children,
          },
          total: totalResults,
        })
      }
    }
  }, [data, facets, halLink, isSuccess, page, searchTerm])

  // Check if the results contain any data
  if (isSuccess && data) {
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
              pushSiteImproveEvent(
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
            {activeAccordion && isSuccess && data && (
              <FacetsRelatedList
                url={halLink}
                searchTerm={jsonSearchTerm || ''}
                data={facets}
                title={title || ''}
                page={page}
                // SET
                lastPage={3}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </div>
      <StyledHr className="w-100" color={theme.color.lightGray} />
    </React.Fragment>
  )
}

export default FacetedListAccordionItem
