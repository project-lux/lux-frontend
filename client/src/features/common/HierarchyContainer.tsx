/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import { useGetItemQuery } from '../../redux/api/ml_api'
import SetParser from '../../lib/parse/data/SetParser'
import { getPath } from '../../lib/util/uri'

import HierarchyChild from './HierarchyChild'

function getNextSetUri(entity: IEntity): string | null {
  const memberOf = entity.member_of
  if (Array.isArray(memberOf) && memberOf.length > 0 && memberOf[0].id) {
    return getPath(memberOf[0].id)
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HierarchyContainer: React.FC<{
  entity: IEntity
  parentsOfCurrentEntity: Array<string>
  currentEntityIsArchive?: boolean
}> = ({ entity, parentsOfCurrentEntity, currentEntityIsArchive = false }) => {
  const { pathname } = useLocation()

  const [done, setDone] = useState(false)
  const [archives, setArchives] = useState([entity])
  const [topLevelAncestor, setTopLevelAncestor] = useState<string>(entity.id!)

  useEffect(() => {
    setDone(false)
    setArchives([entity])
  }, [entity])

  const uri = getNextSetUri(archives[0])
  const queryInput =
    uri !== null
      ? {
          uri,
        }
      : skipToken
  const { data, isSuccess, isError, isLoading, isFetching } =
    useGetItemQuery(queryInput)

  if (isSuccess && !done) {
    if (getNextSetUri(data) === null || archives.length > 8) {
      setDone(true)
    }

    const archiveRecord = new SetParser(data)
    const isArchive = archiveRecord.isArchive()
    if (isArchive) {
      setArchives([data, ...archives])
      setTopLevelAncestor(data.id)
    }
  }

  if (isSuccess || isError || done || uri === null) {
    const ancestorIds: Array<string> = archives
      .map((archive) => archive.id!)
      .filter((id) => id !== undefined)

    // if there is only one ancestor and it is an object, do not display hierarchy
    if (
      ancestorIds.length === 1 &&
      (ancestorIds[0].includes('digital') || ancestorIds[0].includes('object'))
    ) {
      return null
    }

    return (
      <StyledEntityPageSection>
        <h2>Explore {currentEntityIsArchive ? 'the Archive' : ''}</h2>
        <HierarchyChild
          child={topLevelAncestor as string}
          skipApiCalls={false}
          key={pathname}
          parentsOfCurrentEntity={parentsOfCurrentEntity}
          ancestors={ancestorIds}
        />
      </StyledEntityPageSection>
    )
  }

  if (isLoading || isFetching || !done) {
    return (
      <StyledEntityPageSection>
        <p>Loading...</p>
      </StyledEntityPageSection>
    )
  }

  // No part_of exists
  return null
}

export default HierarchyContainer
