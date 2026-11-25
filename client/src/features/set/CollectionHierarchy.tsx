import React, { useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'

import config from '../../config/config'
import EntityParser from '../../lib/parse/data/EntityParser'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import IEntity from '../../types/data/IEntity'
import RecordLink from '../common/RecordLink'
import { useGetItemQuery } from '../../redux/api/ml_api'
import { getPath } from '../../lib/util/uri'

interface IProps {
  entity: IEntity
}

function getNextMemberOfUri(entity: IEntity): string | null {
  const memberOf = entity.member_of
  if (Array.isArray(memberOf) && memberOf.length > 0 && memberOf[0].id) {
    return getPath(memberOf[0].id)
  }
  return null
}

const CollectionHierarchy: React.FC<IProps> = ({ entity }) => {
  const [done, setDone] = useState(false)
  const [members, setMembers] = useState([entity])
  const [prevEntity, setPrevEntity] = useState(entity)

  // Reset done and members when props.entity changes.
  // Otherwise the state remains the same when the component is
  // refreshed under new react route.
  // This is done during render rather than in an effect to avoid an extra render with stale state.
  // The reset values are also used for the rest of this render, so the parent lookup below does not
  // append to the previous entity's hierarchy.
  const entityChanged = entity !== prevEntity
  if (entityChanged) {
    setPrevEntity(entity)
    setDone(false)
    setMembers([entity])
  }
  const currentMembers = entityChanged ? [entity] : members
  const currentDone = entityChanged ? false : done

  const uri = getNextMemberOfUri(currentMembers[0])
  const queryInput =
    uri !== null
      ? {
          uri: stripYaleIdPrefix(uri),
          profile: 'results',
        }
      : skipToken

  const { data, isSuccess, isError, isLoading } = useGetItemQuery(queryInput)

  if (isSuccess && !currentDone) {
    if (getNextMemberOfUri(data) === null || currentMembers.length > 8) {
      setDone(true)
    }
    setMembers([data, ...currentMembers])
  }

  if (isSuccess || isError || currentDone) {
    const memberOfName = new EntityParser(entity).getPrimaryName(
      config.aat.langen,
    )

    const links = currentMembers
      .slice(0, currentMembers.length - 1)
      .map((p, ix) => {
        const key = `${p.id}-${ix}`

        return (
          <span key={key} data-testid={`collections-hierarchy-${ix}`}>
            {ix !== 0 && ' > '}
            <RecordLink url={p.id ?? ''} linkCategory="Breadcrumb" />
          </span>
        )
      })

    if (links.length === 0) {
      return null // don't show the hierarchy is there's no parent
    }

    return (
      <span>
        {links} &gt; {memberOfName}
      </span>
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  // No member_of exists
  return null
}

export default CollectionHierarchy
