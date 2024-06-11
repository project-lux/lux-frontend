/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Link } from 'react-router-dom'

import { formatHalLink } from '../../lib/parse/search/queryParser'
import { ISearchResults } from '../../types/ISearchResults'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import { searchScope } from '../../config/searchTypes'
import { getAllParamsFromHalLink } from '../../lib/parse/search/halLinkHelper'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface IProps {
  data: ISearchResults
  eventTitle: string
  url: string
  scope?: string
  additionalLinkText?: string
}

const SearchResultsLink: React.FC<IProps> = ({
  data,
  url,
  eventTitle,
  scope,
  additionalLinkText = '',
}) => {
  const estimate = getEstimates(data)
  const newScope = scope !== undefined ? scope : 'objects'
  const resultsEndpoint = searchScope[newScope]

  const params = getAllParamsFromHalLink(url, 'search')
  const sort = new URLSearchParams(params).get('sort')

  const linkLabel = `Show all ${estimate} ${additionalLinkText} result${
    estimate !== 1 ? 's' : ''
  }`
  const searchQ = formatHalLink(url, searchScope[newScope])
  const searchString = `${searchQ}&openSearch=false${
    sort !== null ? `&${resultsEndpoint[0]}s=${sort}` : ''
  }`

  return (
    <Link
      to={{
        pathname: `/view/results/${newScope}`,
        search: searchString,
      }}
      state={{
        targetName: 'Results Page',
      }}
      onClick={() =>
        pushSiteImproveEvent('Search Link', 'Selected', eventTitle)
      }
      data-testid="search-related-list-link"
    >
      {linkLabel}
    </Link>
  )
}

export default SearchResultsLink
