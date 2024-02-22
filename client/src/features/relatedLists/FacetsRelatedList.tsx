/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import config from '../../config/config'
import DescriptionList from '../../styles/shared/DescriptionList'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import {
  getCriteriaFromHalLink,
  getResultTabFromHalLink,
} from '../../lib/parse/search/halLinkHelper'

import ListItem from './ListItem'

interface IProps {
  url: string
  searchTerm: string | Array<string>
  data: ISearchResults
}

const FacetsRelatedList: React.FC<IProps> = ({ url, searchTerm, data }) => {
  const criteria = getCriteriaFromHalLink(url, 'facets')
  const scope = getResultTabFromHalLink(url)

  const unitLength = 20
  const [displayLength, setDisplayLength] = useState(unitLength)

  const recordLinks = (facets: Array<IOrderedItems>): any => {
    const filteredFacets = facets.filter((facet) => {
      let { value } = facet
      // type cast as a string
      value = value as string
      const currentUri = url.replace('/view', '')
      return (
        value !== null &&
        value !== undefined &&
        !value.includes(currentUri) &&
        value !== config.dc.collectionItem
      )
    })

    if (filteredFacets.length === 0) {
      return <p>There is no related data.</p>
    }
    return (
      <React.Fragment>
        {filteredFacets
          .slice(0, displayLength)
          .map((facet: IOrderedItems, ind: number) => {
            const { value, totalItems } = facet
            return (
              <ListItem
                key={facet.id}
                uri={value as string}
                count={totalItems || 0}
                tab={scope}
                criteria={criteria}
                searchTerm={searchTerm}
                index={ind}
                itemSpacing="double"
              />
            )
          })}
        {displayLength >= unitLength && displayLength < facets.length && (
          <button
            type="button"
            className="btn btn-link show-more"
            onClick={() => setDisplayLength(facets.length)}
          >
            Show All
          </button>
        )}
        {displayLength > 20 && (
          <button
            type="button"
            className="btn btn-link show-less"
            onClick={() => setDisplayLength(unitLength)}
          >
            Show Less
          </button>
        )}
      </React.Fragment>
    )
  }

  const { orderedItems } = data
  if (orderedItems !== null && orderedItems.length > 0) {
    return (
      <DescriptionList
        data-testid={`related-facets-description-list-${searchTerm}`}
      >
        {recordLinks(orderedItems)}
      </DescriptionList>
    )
  }

  return null
}

export default FacetsRelatedList
