import React from 'react'

import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import RecordLink from '../common/RecordLink'
import StyledHierarchyButton from '../../styles/features/hierarchy/HierarchyButton'
import { useAppDispatch } from '../../app/hooks'
import { addOrigin } from '../../redux/slices/hierarchyVisualizationSlice'
import IEntity from '../../types/data/IEntity'

interface IProps {
  entityId: string
}

const ParentCustomNode: React.FC<IProps> = ({ entityId }) => {
  const dispatch = useAppDispatch()
  const uriToRetrieve = stripYaleIdPrefix(entityId)

  const handleHierarchyChange = (entity: IEntity): void => {
    dispatch(addOrigin({ value: entity }))
  }

  const { data, isSuccess } = useGetItemQuery({
    uri: uriToRetrieve,
  })

  let name = ''
  if (data && isSuccess) {
    const entity = new EntityParser(data)
    name = entity.getPrimaryName(config.dc.langen)
  }

  return (
    <span className="d-flex display-inline align-items-center">
      <StyledHierarchyButton
        type="button"
        rotate="90"
        onClick={() => handleHierarchyChange(data)}
        className="parentButton"
        aria-label={`View the hierarchy for ${name}`}
      >
        <i className="bi bi-diagram-2 fs-5" />
      </StyledHierarchyButton>
      <RecordLink url={entityId} name={name} />
    </span>
  )
}

export default ParentCustomNode
