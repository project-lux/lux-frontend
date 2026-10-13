import React from 'react'
import { Link } from 'react-router-dom'

import { scopeToTabTranslation } from '../../config/searchTypes'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { convertToANDQuery } from '../../lib/parse/search/queryParser'
import {
  AI_REFINEMENT_PARAM,
  SEARCH_TYPE_PARAM,
} from '../../config/aiAssistedSearch/variables'
import { ICurrentSearchState } from '../../redux/slices/currentSearchSlice'
import { useAppSelector } from '../../app/hooks'

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
  const asSearchState = useAppSelector(
    (searchState) => searchState.currentSearch as ICurrentSearchState,
  )
  const isAiSearch = asSearchState.isAiSearch
  const tab = scopeToTabTranslation[scope]

  const linkLabel = `Show all ${total || ''} ${label || ''} result${
    total !== 1 ? 's' : ''
  }`

  const searchQ = convertToANDQuery(JSON.stringify(criteria))

  return (
    <Link
      to={{
        pathname: `/view/results/${tab}`,
        search: `q=${searchQ}&searchLink=true&${SEARCH_TYPE_PARAM}=advanced&qt=${tab}${isAiSearch ? `&${AI_REFINEMENT_PARAM}=true` : ''}`,
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
