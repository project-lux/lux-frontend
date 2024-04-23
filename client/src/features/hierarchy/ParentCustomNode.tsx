import React from 'react'

import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import RecordLink from '../common/RecordLink'
import StyledHierarchyButton from '../../styles/features/hierarchy/HierarchyButton'
import { useAppDispatch } from '../../app/hooks'
import { addInitialState } from '../../redux/slices/hierarchyVisualizationSlice'

interface IProps {
  entityId: string
}

const ParentCustomNode: React.FC<IProps> = ({ entityId }) => {
  const dispatch = useAppDispatch()
  const uriToRetrieve = stripYaleIdPrefix(entityId)

  const handleHierarchyChange = (p: Array<string>): void => {
    dispatch(addInitialState({ origin: entityId, parents: p, children: [] }))
  }

  const { data, isSuccess } = useGetItemQuery({
    uri: uriToRetrieve,
    profile: 'results',
  })

  let name = ''
  let parents: Array<string> = []
  if (data && isSuccess) {
    const entity = new EntityParser(data)
    name = entity.getPrimaryName(config.dc.langen)
    parents = entity.getPartOf()
  }

  return (
    <span className="d-flex display-inline align-items-center">
      <StyledHierarchyButton
        type="button"
        rotate="90"
        onClick={handleHierarchyChange(parents)}
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
