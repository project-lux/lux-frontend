import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { isNull, isUndefined } from 'lodash'
import { Col, Row } from 'react-bootstrap'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import { useGetAncestorsQuery } from '../../redux/api/ml_api'
import {
  getAncestorData,
  hasHierarchyHalLinks,
  removeViewFromPathname,
} from '../../lib/util/hierarchyHelpers'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { formatHalLink } from '../../lib/parse/search/queryParser'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

interface IProps {
  entityData: {
    entity: IEntity
    currentPageWithinParentResultsHalLink: null | string
  }
  objectsWithImagesHalLink: string | null
  currentEntityIsArchive?: boolean
  halLinkTitle?: string
}

const ArchiveHierarchyContainer: React.FC<IProps> = ({
  entityData,
  objectsWithImagesHalLink,
  currentEntityIsArchive = false,
  halLinkTitle,
}) => {
  const { pathname } = useLocation()
  // Retrieve all the ancestors of the current entity
  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetAncestorsQuery({
      entities: [entityData],
    })

  if (isSuccess && data) {
    // get the data needed from the ancestors
    const ancestors: Array<{
      id: string
      childrenHalLink: string | null
    }> = getAncestorData(data)

    // return null for the entire hierarchy if certain conditions are met
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
        entityData.entity._links !== undefined &&
        isNull(hasHierarchyHalLinks(entityData.entity._links))
      ) {
        return null
      }
    }

    // format search link for entities in the archive with images
    let searchString = ''
    if (objectsWithImagesHalLink !== null) {
      const searchQ = formatHalLink(objectsWithImagesHalLink, 'item')
      searchString = `${searchQ}&searchLink=true`
    }

    // label for the entities with images search results link
    const searchLinkLabel = !isUndefined(halLinkTitle)
      ? halLinkTitle
      : 'View records from this archive with images'

    return (
      <StyledEntityPageSection data-testid="explore-the-archive-hierarchy">
        <h2>Explore {currentEntityIsArchive ? 'the Archive' : ''}</h2>
        {/* Render the collapsible child componentstarting with the oldest ancestor */}
        <ArchiveHierarchyChild
          child={data.highestAncestorId as string}
          skipApiCalls={false}
          key={pathname}
          ancestors={ancestors}
          currentEntity={entityData.entity}
        />
        {/* Render the search link for users to view entities with images on the results page */}
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

  if (isLoading || isFetching) {
    return (
      <StyledEntityPageSection>
        <p>Loading...</p>
      </StyledEntityPageSection>
    )
  }

  if (isError) {
    return (
      <StyledEntityPageSection>
        <p>An error occurred trying to load the data.</p>
      </StyledEntityPageSection>
    )
  }

  // No ancestors exist
  return null
}

export default ArchiveHierarchyContainer
