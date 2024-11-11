import React from 'react'

import { hasHalLinks } from '../../lib/parse/data/helper'
import ILinks from '../../types/data/ILinks'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { IHalLink } from '../../types/IHalLink'
import { IOrderedItems } from '../../types/ISearchResults'

import LinkContainer from './LinkContainer'

interface IProps {
  providedLinks: ILinks
  configuredLink: IHalLink
  expandColumns?: boolean
  itemSpacing?: 'double' | 'single'
}

const ApiAboutData: React.FC<IProps> = ({
  providedLinks,
  configuredLink,
  expandColumns = false,
  itemSpacing = 'double',
}) => {
  const skip = !hasHalLinks({ event: configuredLink }, providedLinks)
  const uri = !skip ? providedLinks[configuredLink.searchTag].href : ''

  const { data, isSuccess, isLoading } = useGetSearchRelationshipQuery(
    {
      uri,
    },
    {
      skip,
    },
  )

  if (skip) {
    return null
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isSuccess && data) {
    const ids = data.orderedItems.map((item: IOrderedItems) => item.id)
    return (
      <LinkContainer
        content={ids}
        label={configuredLink.title}
        id="api-about-data-link-container"
        expandColumns={expandColumns}
        itemSpacing={itemSpacing}
      />
    )
  }

  return null
}

export default ApiAboutData
