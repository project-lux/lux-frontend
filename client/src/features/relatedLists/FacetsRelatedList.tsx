/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import config from '../../config/config'
import DescriptionList from '../../styles/shared/DescriptionList'
import {
  getCriteriaFromHalLink,
  getResultTabFromHalLink,
} from '../../lib/parse/search/halLinkHelper'

import ListItem from './ListItem'

interface IProps {
  url: string
  searchTerm: string
  data: {
    requests: {
      [key: string]: Array<{ value: string; totalItems: number }>
    }
    total: number
  }
  title: string
  page: number
  lastPage: number
  setPage: (x: number) => void
}

const FacetsRelatedList: React.FC<IProps> = ({
  url,
  searchTerm,
  data,
  title,
  page,
  lastPage,
  setPage,
}) => {
  const criteria = getCriteriaFromHalLink(url, 'facets')
  const scope = getResultTabFromHalLink(url)

  const recordLinks = (
    facets: Array<{ value: string; totalItems: number }>,
  ): any => {
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
        {filteredFacets.map(
          (facet: { value: string; totalItems: number }, ind: number) => {
            const { value, totalItems } = facet
            return (
              <ListItem
                key={value}
                uri={value as string}
                count={totalItems || 0}
                title={title}
                tab={scope}
                criteria={criteria}
                searchTerm={searchTerm}
                index={ind}
                itemSpacing="double"
              />
            )
          },
        )}
        {page !== lastPage && (
          <button
            type="button"
            className="btn btn-link show-more"
            onClick={() => setPage(page + 1)}
          >
            Show More
          </button>
        )}
        {page !== 1 && (
          <button
            type="button"
            className="btn btn-link show-less"
            onClick={() => setPage(page - 1)}
          >
            Show Less
          </button>
        )}
      </React.Fragment>
    )
  }

  const facetsData: Array<{ value: string; totalItems: number }> = []
  Object.values(data.requests).map((value) =>
    value.map((v) =>
      facetsData.push({ value: v.value, totalItems: v.totalItems }),
    ),
  )

  return (
    <DescriptionList
      data-testid={`related-facets-description-list-${searchTerm}`}
    >
      {recordLinks(facetsData)}
    </DescriptionList>
  )
}

export default FacetsRelatedList
