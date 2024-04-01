/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import { useGetItemsQuery } from '../../redux/api/ml_api'
import {
  extractHalLinks,
  getNextSetUris,
  getParentData,
  isEntityAnArchive,
  removeViewFromPathname,
} from '../../lib/util/hierarchyHelpers'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ArchiveHierarchyContainer: React.FC<{
  entity: IEntity
  parentsOfCurrentEntity: Array<string>
  currentEntityIsArchive?: boolean
}> = ({ entity, parentsOfCurrentEntity, currentEntityIsArchive = false }) => {
  const { pathname } = useLocation()

  const [done, setDone] = useState(false)
  const [archives, setArchives] = useState<Array<IEntity>>([entity])
  const [topLevelAncestor, setTopLevelAncestor] = useState<string>(entity.id!)

  useEffect(() => {
    setDone(false)
    setArchives([entity])
  }, [entity])

  const uris = getNextSetUris(archives[0])
  const queryInput = uris.length > 0 ? uris : skipToken

  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetItemsQuery(queryInput)

  if (isSuccess && !done) {
    const parent = getParentData(data, isEntityAnArchive)

    if (
      parent === null ||
      getNextSetUris(parent).length === 0 ||
      archives.length > 8
    ) {
      setDone(true)
    }

    if (parent !== null && isEntityAnArchive(parent)) {
      setArchives([parent, ...archives])
      setTopLevelAncestor(parent.id as string)
    }
  }

  if (isSuccess || isError || done || uris.length === 0) {
    const ancestorIds: Array<string> = archives
      .map((archive) => archive.id!)
      .filter((id) => id !== undefined)

    if (ancestorIds.length === 1) {
      // if there is only one ancestor and it is an object, do not display hierarchy
      if (
        ancestorIds[0].includes('digital') ||
        ancestorIds[0].includes('object')
      ) {
        return null
      }
      // If there is only one element in the archive and it is the current entity and that entity
      // does not have children, do not render the hierarchy.
      if (
        ancestorIds[0].includes(removeViewFromPathname(pathname)) &&
        entity._links !== undefined &&
        extractHalLinks(entity._links).length === 0
      ) {
        return null
      }
    }

    return (
      <StyledEntityPageSection>
        <h2>Explore {currentEntityIsArchive ? 'the Archive' : ''}</h2>
        <ArchiveHierarchyChild
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

  // No ancestors exist
  return null
}

export default ArchiveHierarchyContainer
