/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

import { scopeToTabTranslation } from '../../config/searchTypes'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'

interface ILinkParams {
  scope: string
  criteria: IAdvancedSearchState
  id: string
  total?: number
  label?: string
}

const SemanticSearchLink: React.FC<ILinkParams> = ({
  scope,
  criteria,
  id,
  total,
  label,
}) => {
  const tab = scopeToTabTranslation[scope]

  return (
    <Link
      to={{
        pathname: `/view/results/${tab}`,
        search: `q=${JSON.stringify(criteria)}&openSearch=false`,
      }}
      data-testid={`semantic-search-link-${id}`}
    >
      Show all {total} {label} result
      {total !== 1 && `s`}
    </Link>
  )
}

export default SemanticSearchLink
