import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { isUndefined } from 'lodash'
import { Col, Row } from 'react-bootstrap'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import { useGetAncestorsQuery, useGetItemsQuery } from '../../redux/api/ml_api'
import {
  hasHierarchyHalLinks,
  getNextSetUris,
  getParentData,
  isEntityAnArchive,
  removeViewFromPathname,
} from '../../lib/util/hierarchyHelpers'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { formatHalLink } from '../../lib/parse/search/queryParser'
import EntityParser from '../../lib/parse/data/EntityParser'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

interface IProps {
  entity: IEntity
  parentsOfCurrentEntity: Array<string>
  objectsWithImagesHalLink: string | null
  currentEntityIsArchive?: boolean
  halLinkTitle?: string
}

const ArchiveHierarchyContainer: React.FC<IProps> = ({
  entity,
  parentsOfCurrentEntity,
  objectsWithImagesHalLink,
  currentEntityIsArchive = false,
  halLinkTitle,
}) => {
  const { pathname } = useLocation()

  const [archives, setArchives] = useState<Array<IEntity>>([entity])
  const [topLevelAncestor, setTopLevelAncestor] = useState<string>(entity.id!)

  const uris = getNextSetUris(archives[0])
  const skip = uris.length > 0 ? false : true

  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetAncestorsQuery(
      {
        uris,
      },
      {
        skip,
      },
    )
  console.log(data)

  if (isSuccess || isError || uris.length === 0) {
    const ancestors: Array<{
      id: string
      currentPageHalLink: string | null
    }> = archives
      .map((archive) => {
        const a = new EntityParser(archive)
        const halLink =
          a.getHalLink('lux:setCurrentHierarchyPage') ||
          a.getHalLink('lux:itemCurrentHierarchyPage')
        return {
          id: archive.id!,
          currentPageHalLink: halLink,
        }
      })
      .filter((id) => id !== undefined)

    if (ancestors.length === 1) {
      // if there is only one ancestor and it is an object, do not display hierarchy
      if (
        ancestors[0].id.includes('digital') ||
        ancestors[0].id.includes('object')
      ) {
        return null
      }
      // If there is only one element in the archive and it is the current entity and that entity
      // does not have children, do not render the hierarchy.
      if (
        ancestors[0].id.includes(removeViewFromPathname(pathname)) &&
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
      searchString = `${searchQ}&searchLink=true`
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
          ancestors={ancestors}
          currentEntity={entity}
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
