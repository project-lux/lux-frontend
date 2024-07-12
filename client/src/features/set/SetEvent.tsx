import React from 'react'

import { hasHalLinks } from '../../lib/parse/data/helper'
import ILinks from '../../types/data/ILinks'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { IHalLink } from '../../types/IHalLink'
import LinkContainer from '../common/LinkContainer'
import { IOrderedItems } from '../../types/ISearchResults'

interface IObject {
  providedLinks: ILinks
  configuredLink: IHalLink
}

const SetEvent: React.FC<IObject> = ({ providedLinks, configuredLink }) => {
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
        id="set-types-link-container"
        expandColumns
        itemSpacing="single"
      />
    )
  }

  return null
}

export default SetEvent
