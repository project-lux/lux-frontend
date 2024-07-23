import React from 'react'

import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import RecordLink from '../common/RecordLink'

import ViewHierarchyButton from './ViewHierarchyButton'

interface IProps {
  entityId: string
}

const ParentCustomNode: React.FC<IProps> = ({ entityId }) => {
  const uriToRetrieve = stripYaleIdPrefix(entityId)

  const { data, isSuccess } = useGetItemQuery({
    uri: uriToRetrieve,
  })

  let name = ''
  if (data && isSuccess) {
    const entity = new EntityParser(data)
    name = entity.getPrimaryName(config.aat.langen)
  }

  return (
    <span className="d-flex display-inline align-items-center">
      <ViewHierarchyButton
        data={data}
        name={name}
        rotation="90"
        className="parentButton"
      />
      <RecordLink url={entityId} name={name} />
    </span>
  )
}

export default ParentCustomNode
