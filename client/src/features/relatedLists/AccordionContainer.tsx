/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { IHalLinks } from '../../types/IHalLinks'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'

import RelatedListAccordionItem from './RelatedListAccordionItem'
import SearchResultsAccordionItem from './SearchResultsAccordionItem'
import FacetedListAccordionItem from './FacetedListAccordionItem'

interface IProps {
  searchTags: IHalLinks
  providedHalLinks: any
}

/**
 * Renders the accordion items if the given search tag exists in the entity's data.
 * @param {IHalLinks} searchTags configuration of all available search tags for the given entity type
 * @param {any} providedHalLinks the HAL links in the entity's data
 * @returns {JSX.Element}
 */
const AccordionContainer: React.FC<IProps> = ({
  searchTags,
  providedHalLinks,
}) => {
  const accordionContainer = Object.keys(providedHalLinks || {}).map(
    (link: string) => {
      const searchTagKeys = Object.keys(searchTags)

      return searchTagKeys.map((tag, index) => {
        if (searchTags[tag].searchTag === link) {
          const halLink = providedHalLinks[link].href

          const isRelatedList = halLink.includes('/api/related-list')
          const isFacetedList = halLink.includes('/api/facets')
          const isSearchResultsList = halLink.includes('/api/search')

          return (
            <React.Fragment key={tag}>
              {isRelatedList && (
                <RelatedListAccordionItem
                  searchTermConfig={searchTags[tag]}
                  halLink={halLink}
                  index={index}
                />
              )}
              {isFacetedList && (
                <FacetedListAccordionItem
                  searchTermConfig={searchTags[tag]}
                  halLink={halLink}
                  index={index}
                />
              )}
              {isSearchResultsList && (
                <SearchResultsAccordionItem
                  searchTermConfig={searchTags[tag]}
                  halLink={halLink}
                  index={index}
                />
              )}
            </React.Fragment>
          )
        }
        return null
      })
    },
  )

  return (
    <StyledEntityPageSection
      className="accordion p-0"
      id="related-accordion"
      data-testid="accordion-container"
    >
      {accordionContainer}
    </StyledEntityPageSection>
  )
}

export default AccordionContainer
