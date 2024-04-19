import React from 'react'

import RecordLink from '../common/RecordLink'
import StyledHierarchyButton from '../../styles/features/hierarchy/HierarchyButton'
import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import config from '../../config/config'

interface IProps {
  id: string
}

const Li: React.FC<IProps> = ({ id }) => {
  const { data, isSuccess } = useGetItemQuery({
    uri: stripYaleIdPrefix(id),
    profile: 'results',
  })

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
        aria-label={`View the hierarchy for ${name}`}
      >
        <i className="bi bi-diagram-2 fs-5" />
      </StyledHierarchyButton>
    </li>
  )
}

export default Li
