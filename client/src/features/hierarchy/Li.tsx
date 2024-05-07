import React from 'react'

import RecordLink from '../common/RecordLink'
import StyledHierarchyButton from '../../styles/features/hierarchy/HierarchyButton'
import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import { useAppDispatch } from '../../app/hooks'
import { addOrigin } from '../../redux/slices/hierarchyVisualizationSlice'

interface IProps {
  id: string
}

const Li: React.FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch()

  const handleHierarchyChange = (entity: IEntity): void => {
    dispatch(addOrigin({ value: entity }))
  }

  const { data, isSuccess, isLoading, isFetching } = useGetItemQuery({
    uri: stripYaleIdPrefix(id),
  })

  if (isLoading || isFetching) {
    return <p>Loading...</p>
  }

  let name = ''
  if (data && isSuccess) {
    const entity = new EntityParser(data)
    name = entity.getPrimaryName(config.dc.langen)
  }

  return (
    <li>
      <RecordLink url={id} name={name} />
      <StyledHierarchyButton
        type="button"
        rotate="-90"
        className="childButton"
        onClick={() => handleHierarchyChange(data)}
        aria-label={`View the hierarchy for ${name}`}
      >
        <i className="bi bi-diagram-2 fs-5" />
      </StyledHierarchyButton>
    </li>
  )
}

export default Li
