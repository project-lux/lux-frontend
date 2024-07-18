/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import DescriptionList from '../../styles/shared/DescriptionList'
import {
  getCriteriaFromHalLink,
  getResultTabFromHalLink,
} from '../../lib/parse/search/halLinkHelper'
import { IFacetsPagination } from '../../types/IFacets'
import { IOrderedItems } from '../../types/ISearchResults'

import ListItem from './ListItem'

interface IProps {
  url: string
  searchTerm: string
  data: IFacetsPagination
  title: string
  page: number
  lastPage: number
  setPage: (x: number) => void
  setFacets: (x: IFacetsPagination) => void
}

const FacetsRelatedList: React.FC<IProps> = ({
  url,
  searchTerm,
  data,
  title,
  page,
  lastPage,
  setPage,
  setFacets,
}) => {
  const criteria = getCriteriaFromHalLink(url, 'facets')
  const scope = getResultTabFromHalLink(url)

  const handleShowLess = (): void => {
    const currentRequest = `call${page}`
    if (data.requests[currentRequest]) {
      delete data.requests[currentRequest]
    }
    setFacets(data)
    setPage(page - 1)
  }

  const recordLinks = (facets: Array<IOrderedItems>): any => {
    const filteredFacets = facets.filter((facet) => {
      let { value } = facet
      // type cast as a string
      value = value as string
      const currentUri = url.replace('/view', '')
      return (
        value !== null && value !== undefined && !value.includes(currentUri)
      )
    })

    if (filteredFacets.length === 0) {
      return <p>There is no related data.</p>
    }
    return (
      <React.Fragment>
        {filteredFacets.map((facet: IOrderedItems, ind: number) => {
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
        })}
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
            onClick={() => handleShowLess()}
          >
            Show Less
          </button>
        )}
      </React.Fragment>
    )
  }

  const facetsData: Array<IOrderedItems> = []
  Object.values(data.requests).map((value) =>
    value.map((v) => facetsData.push(v)),
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
