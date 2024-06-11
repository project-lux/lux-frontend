/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { isUndefined } from 'lodash'
import { Col, Row } from 'react-bootstrap'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import { useGetItemsQuery } from '../../redux/api/ml_api'
import {
  hasHierarchyHalLinks,
  getNextSetUris,
  getParentData,
  isEntityAnArchive,
  removeViewFromPathname,
} from '../../lib/util/hierarchyHelpers'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { formatHalLink } from '../../lib/parse/search/queryParser'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

interface IProps {
  entity: IEntity
  parentsOfCurrentEntity: Array<string>
  objectsWithImagesHalLink: string | null
  currentEntityIsArchive?: boolean
  halLinkTitle?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ArchiveHierarchyContainer: React.FC<IProps> = ({
  entity,
  parentsOfCurrentEntity,
  objectsWithImagesHalLink,
  currentEntityIsArchive = false,
  halLinkTitle,
}) => {
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
        hasHierarchyHalLinks(entity._links).length === 0
      ) {
        return null
      }
    }

    // format search link for objects in the archive with images
    let searchString = ''
    if (objectsWithImagesHalLink !== null) {
      const searchQ = formatHalLink(objectsWithImagesHalLink, 'item')
      searchString = `${searchQ}&openSearch=false`
    }

    const searchLinkLabel = !isUndefined(halLinkTitle)
      ? halLinkTitle
      : 'View records from this archive with images'
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
        {objectsWithImagesHalLink !== null && (
          <Row className="mt-3">
            <Col>
              <Link
                to={{
                  pathname: `/view/results/objects`,
                  search: searchString,
                }}
                onClick={() =>
                  pushClientEvent('Search Link', 'Selected', searchLinkLabel)
                }
                state={{
                  targetName: 'Results Page',
                }}
                className="fw-bold"
                data-testid="image-link"
              >
                {searchLinkLabel}
                <i className="bi bi-camera-fill ms-2" />
              </Link>
            </Col>
          </Row>
        )}
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
