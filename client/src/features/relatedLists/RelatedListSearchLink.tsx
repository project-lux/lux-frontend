/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { useLocation } from 'react-router-dom'

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

const RelatedListSearchLink: React.FC<ILinkParams> = ({
  scope,
  criteria,
  id,
  title,
  total,
  label,
}) => {
  const { pathname } = useLocation()
  const tab = scopeToTabTranslation[scope]

  const linkLabel = `Show all ${total || ''} ${label || ''} result${
    total !== 1 ? 's' : ''
  }`

  const searchQ = JSON.stringify(criteria)
  return (
    <Link
      to={{
        pathname: `/view/results/${tab}`,
        search: `q=${searchQ}&openSearch=false`,
      }}
      state={{
        prevPath: pathname,
        targetName: `/view/results/${tab}?q=${searchQ}&openSearch=false`,
      }}
      onClick={() =>
        pushSiteImproveEvent('Search Link', 'Selected', `Accordion ${title}`)
      }
      data-testid={`related-list-search-link-${id}`}
    >
      {linkLabel}
    </Link>
  )
}

export default RelatedListSearchLink
