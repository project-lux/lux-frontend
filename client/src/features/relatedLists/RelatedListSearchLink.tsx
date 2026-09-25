import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { scopeToTabTranslation } from '../../config/searchTypes'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { convertToANDQuery } from '../../lib/parse/search/queryParser'
import {
  AI_ASSISTED_SEARCH_STORAGE_KEY,
  AI_REFINEMENT_PARAM,
} from '../../config/aiAssistedSearch/variables'

interface ILinkParams {
  scope: string
  criteria: IAdvancedSearchState
  id: string
  title: string
  total?: number
  label?: string
}

const RelatedListSearchLink: React.FC<ILinkParams> = ({
  scope,
  criteria,
  id,
  title,
  total,
  label,
}) => {
  const [isAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })
  const tab = scopeToTabTranslation[scope]

  const linkLabel = `Show all ${total || ''} ${label || ''} result${
    total !== 1 ? 's' : ''
  }`

  const searchQ = convertToANDQuery(JSON.stringify(criteria))

  return (
    <Link
      to={{
        pathname: `/view/results/${tab}`,
        search: `q=${searchQ}&searchLink=true&searchType=advanced${isAiSearch ? `&${AI_REFINEMENT_PARAM}=true` : ''}`,
      }}
      onClick={() =>
        pushClientEvent('Search Link', 'Selected', `Accordion ${title}`)
      }
      data-testid={`related-list-search-link-${id}`}
    >
      {linkLabel}
    </Link>
  )
}

export default RelatedListSearchLink
