/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

import { scopeToTabTranslation } from '../../config/searchTypes'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface ILinkParams {
  scope: string
  criteria: IAdvancedSearchState
  id: string
  title: string
  total?: number
  label?: string
}

const SemanticSearchLink: React.FC<ILinkParams> = ({
  scope,
  criteria,
  id,
  title,
  total,
  label,
}) => {
  const tab = scopeToTabTranslation[scope]

  const linkLabel = `Show all ${total || ''} ${label || ''} result${
    total !== 1 ? 's' : ''
  }`

  return (
    <Link
      to={{
        pathname: `/view/results/${tab}`,
        search: `q=${JSON.stringify(criteria)}&openSearch=false`,
      }}
      onClick={() =>
        pushSiteImproveEvent(`${title} Show All Link`, 'Selected', linkLabel)
      }
      data-testid={`semantic-search-link-${id}`}
    >
      {linkLabel}
    </Link>
  )
}

export default SemanticSearchLink
