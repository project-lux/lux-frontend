import React from 'react'

import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import { useGetCollectionQuery } from '../../redux/api/ml_api'
import LinkContainer from '../common/LinkContainer'

interface IProps {
  entity: IEntity
}

const Collections: React.FC<IProps> = ({ entity }) => {
  // get the collection but skip request if data does not have a member_of property
  const { data, isSuccess, isLoading } = useGetCollectionQuery(
    { entity, aat: config.aat.collection },
    {
      skip: entity === undefined || entity.member_of === undefined,
    },
  )

  const collectionData = data
    ? data.filter((collection: string) => collection !== null)
    : []

  if (isLoading) {
    ;<p>Loading...</p>
  }

  if (isSuccess && data) {
    return (
      <LinkContainer
        label="Named Collections"
        content={collectionData}
        itemSpacing="double"
        id="named-collection-container"
        hrClassName="namedCollectionHr"
      />
    )
  }
}

export default Collections
