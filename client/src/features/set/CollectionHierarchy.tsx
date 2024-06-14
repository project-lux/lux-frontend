import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    // Reset done and members when props.entity changes.
    // Otherwise the state remains the same when the component is
    // refreshed under new react route.
    setDone(false)
    setMembers([entity])
  }, [entity])

  const uri = getNextMemberOfUri(members[0])
  const queryInput =
    uri !== null
      ? {
          uri: stripYaleIdPrefix(uri),
          profile: 'results',
        }
      : skipToken

  const { data, isSuccess, isError, isLoading } = useGetItemQuery(queryInput)

  if (isSuccess && !done) {
    if (getNextMemberOfUri(data) === null || members.length > 8) {
      setDone(true)
    }
    setMembers([data, ...members])
  }

  if (isSuccess || isError || done) {
    const memberOfName = new EntityParser(entity).getPrimaryName(
      config.aat.langen,
    )

    const links = members.slice(0, members.length - 1).map((p, ix) => {
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
