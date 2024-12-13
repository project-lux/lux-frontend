import React, { useState } from 'react'

import { pushClientEvent } from '../../lib/pushClientEvent'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { IHalLink } from '../../types/IHalLink'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import StyledAccordionButton from '../../styles/features/relatedLists/AccordionButton'

import SearchResultRelatedList from './SearchResultRelatedList'

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
const SearchResultsAccordionItem: React.FC<IProps> = ({
  searchTermConfig,
  halLink,
  index,
}) => {
  const [activeAccordion, setActiveAccordion] = useState(false)
  const { title, searchTag, tab } = searchTermConfig
  const searchTerm = searchTag.replace('lux:', '')

  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      uri: halLink,
    },
  )

  if (isSuccess && data) {
    // If there are no search results return null
    if (data.orderedItems.length === 0) {
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
        data-testid={`search-results-accordion-item-${searchTerm}`}
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
                `Accordion ${title}`,
              )
              setActiveAccordion(!activeAccordion)
            }}
            data-testid={`search-accordion-item-${searchTerm}-button`}
          >
            {isLoading ? 'Loading...' : title}
          </StyledAccordionButton>
        </h2>
        <div
          id={`collapse-${index}-${searchTerm}`}
          className="accordion-collapse collapse"
          aria-labelledby={`#heading-related-${index}-${searchTerm}`}
          data-testid={`collapse-${index}-${searchTerm}`}
        >
          <div className="accordion-body">
            {/* Render list based on results list */}
            {activeAccordion && isSuccess && data && (
              <SearchResultRelatedList
                url={halLink}
                scope={tab}
                data={data}
                title={title as string}
              />
            )}
          </div>
        </div>
      </div>
      <StyledHr
        className="w-100 searchResultsAccordionItemHr"
        color={theme.color.lightGray}
      />
    </React.Fragment>
  )
}

export default SearchResultsAccordionItem
