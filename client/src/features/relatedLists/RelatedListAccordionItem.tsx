import React, { useState } from 'react'
import styled from 'styled-components'
import { isNull } from 'lodash'

import { pushSiteImproveEvent } from '../../lib/siteImprove'
import { useGetRelatedListsQuery } from '../../redux/api/ml_api'
import { IHalLink } from '../../types/IHalLink'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'

import SemanticRelatedList from './SemanticRelatedList'

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
const RelatedListAccordionItem: React.FC<IProps> = ({
  searchTermConfig,
  halLink,
  index,
}) => {
  const [activeAccordion, setActiveAccordion] = useState(false)
  const { title, searchTag, isSemantic } = searchTermConfig
  const searchTerm = searchTag.replace('lux:', '')

  const { data, isSuccess, isLoading, isError } = useGetRelatedListsQuery(
    {
      url: halLink,
    },
    {
      skip: isSemantic === undefined,
    },
  )

  if (isSuccess) {
    if (isNull(data)) {
      return null
    }
    if (data) {
      const { results } = data
      // If there are no results return null
      if (results === null || Object.keys(results).length === 0) {
        return null
      }
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
        data-testid={`semantic-list-accordion-item-${searchTerm}`}
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
            data-testid={`semantic-list-accordion-item-${searchTerm}-button`}
          >
            {isLoading ? 'Loading...' : title}
          </StyledAccordionButton>
        </h2>
        <div
          id={`collapse-${index}-${searchTerm}`}
          className="accordion-collapse collapse"
          aria-labelledby={`#heading-related-${index}-${searchTerm}`}
        >
          <div className="accordion-body">
            {/* Render list of results against facets API endpoint */}
            {activeAccordion && isSuccess && data && data.results !== null && (
              <SemanticRelatedList
                results={data.results}
                halLink={halLink}
                next={data.next}
                title={title || ''}
              />
            )}
          </div>
        </div>
      </div>
      <StyledHr className="w-100" color={theme.color.lightGray} />
    </React.Fragment>
  )
}

export default RelatedListAccordionItem
