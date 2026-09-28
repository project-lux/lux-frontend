import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { formatHalLink } from '../../lib/parse/search/queryParser'
import { ISearchResults } from '../../types/ISearchResults'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import { searchScope } from '../../config/searchTypes'
import { getAllParamsFromHalLink } from '../../lib/parse/search/halLinkHelper'
import { pushClientEvent } from '../../lib/pushClientEvent'
import {
  AI_ASSISTED_SEARCH_STORAGE_KEY,
  AI_REFINEMENT_PARAM,
} from '../../config/aiAssistedSearch/variables'

interface IProps {
  data: ISearchResults
  eventTitle: string
  url: string
  scope?: string
  additionalLinkText?: string
  className?: string
}

const SearchResultsLink: React.FC<IProps> = ({
  data,
  url,
  eventTitle,
  scope,
  additionalLinkText = '',
  className = 'searchResultsLink',
}) => {
  const [isAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })
  const estimate = getEstimates(data)
  const newScope = scope !== undefined ? scope : 'objects'
  const resultsEndpoint = searchScope[newScope]

  const params = getAllParamsFromHalLink(url, 'search')
  const sort = new URLSearchParams(params).get('sort')

  const linkLabel = `Show all ${estimate} ${additionalLinkText} result${
    estimate !== 1 ? 's' : ''
  }`
  const searchQ = formatHalLink(url, searchScope[newScope])
  const searchString = `${searchQ}&searchLink=true&searchType=advanced${
    sort !== null ? `&${resultsEndpoint[0]}s=${sort}` : ''
  }${isAiSearch ? `&${AI_REFINEMENT_PARAM}=true` : ''}`

  return (
    <Link
      className={className}
      to={{
        pathname: `/view/results/${newScope}`,
        search: searchString,
      }}
      onClick={() => pushClientEvent('Search Link', 'Selected', eventTitle)}
      data-testid="search-related-list-link"
    >
      {linkLabel}
    </Link>
  )
}

export default SearchResultsLink
