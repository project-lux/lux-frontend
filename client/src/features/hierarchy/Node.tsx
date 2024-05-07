import React from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'
import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'

interface IProps {
  entityId: string
}

const StyledSpan = styled.span`
  color: ${theme.color.black};
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  font-weight: 400;
`

const Node: React.FC<IProps> = ({ entityId }) => {
  const uriToRetrieve = stripYaleIdPrefix(entityId)

  const { data, isSuccess } = useGetItemQuery({
    uri: uriToRetrieve,
    profile: 'results',
  })

  let name = ''
  if (data && isSuccess) {
    const entity = new EntityParser(data)
    name = entity.getPrimaryName(config.dc.langen)
  }

  return (
    <StyledSpan className="d-flex display-inline align-items-center">
      {name}
    </StyledSpan>
  )
}

export default Node
