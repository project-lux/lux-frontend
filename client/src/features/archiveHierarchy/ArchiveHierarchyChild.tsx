import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { isNull } from 'lodash'

import theme from '../../styles/theme'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import CollapseButton from '../../styles/shared/CollapseButton'
import CollapseContainer from '../advancedSearch/CollapseContainer'
import { useGetItemQuery } from '../../redux/api/ml_api'
import {
  currentUriInHierarchy,
  getHalLinkForChildren,
  isInHierarchy,
} from '../../lib/util/hierarchyHelpers'
import IEntity from '../../types/data/IEntity'
import RecordLink from '../common/RecordLink'
import { setWithMemberOf } from '../../config/setsSearchTags'

import ArchiveHierarchyChildrenContainer from './ArchiveHierarchyChildrenContainer'

const StyledCol = styled(Col)`
  &:hover {
    background-color: ${theme.color.lightGray};
  }

  & > i {
    color: ${theme.color.primary.blue};
  }
`

/**
 * Renders the child within the hierarchy
 * @param {string} child the child entity being processed
 * @param {boolean} skipApiCalls the current result page a user is viewing
 * @param {Array<{ id: string; currentPageHalLink: string | null }>} ancestors
 * @param {IEntity} currentEntity the currently view entity data
 * @returns {JSX.Element}
 */
const ArchiveHierarchyChild: React.FC<{
  child: string
  skipApiCalls: boolean
  ancestors: Array<{ id: string; currentPageHalLink: string | null }>
  currentEntity: IEntity
}> = ({ child, skipApiCalls, ancestors, currentEntity }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { pathname } = useLocation()

  // get the child entity
  const { data, isSuccess, isLoading, isFetching } = useGetItemQuery(
    { uri: stripYaleIdPrefix(child) },
    { skip: skipApiCalls },
  )

  // set the collapsible container to open if the data being parsed is within the current hierarchy
  useEffect(() => {
    // set the dropdown to open if the entity is in the current hierarchy
    if (isSuccess && data && !currentUriInHierarchy(data.id, pathname)) {
      setOpen(
        isInHierarchy(
          data.id,
          ancestors.map((ancestor) => ancestor.id),
        ),
      )
    }
  }, [data, isSuccess, pathname, ancestors])

  if (isSuccess && data) {
    const entity = new EntityParser(data)
    const primaryName = entity.getPrimaryName(config.aat.langen)
    const iiifImages = entity.getManifestId()
    const activeClassName = currentUriInHierarchy(data.id, pathname)
      ? 'active'
      : ''
    const childrenHalLink = entity.getHalLink(setWithMemberOf.searchTag)
    // get the HAL link to retrieve the children of this entity
    // This HAL link is based on what the current page of the child entity is
    const currentPageHalLink = getHalLinkForChildren(data, ancestors)

    // if the entity has children, render a collapsible component
    if (!isNull(childrenHalLink) && !isNull(currentPageHalLink)) {
      return (
        <Row className="mx-0" key={pathname}>
          <StyledCol xs={12} className="my-2 lh-sm">
            <CollapseButton
              onClick={() => setOpen(!open)}
              aria-controls={`hierarchy-content-${entity.json.id}`}
              aria-expanded={open}
              aria-label={
                open
                  ? `close ${primaryName} dropdown`
                  : `open ${primaryName} dropdown`
              }
              className="collapseNestedAdvancedSearch float-left"
              marginTop="0px"
              borderRadius="0px"
            >
              {open ? '-' : '+'}
            </CollapseButton>
            <RecordLink
              url={entity.json.id!}
              name={primaryName}
              className={`ms-2 ${activeClassName}`}
              linkCategory="Hierarchy"
            />
            {iiifImages !== '' && <i className="bi bi-camera-fill" />}
          </StyledCol>
          <Col xs={12} className="ps-4">
            <CollapseContainer
              open={open}
              id={entity.json.id || primaryName}
              className="ps-1"
            >
              <ArchiveHierarchyChildrenContainer
                skipApiCalls={!open}
                key={pathname}
                ancestors={ancestors}
                objectOrSetMemberOfSet={
                  !isNull(currentPageHalLink)
                    ? currentPageHalLink
                    : childrenHalLink
                }
                currentEntity={currentEntity}
              />
            </CollapseContainer>
          </Col>
        </Row>
      )
    }

    // If the entity being parsed does not have children
    return (
      <Row key={pathname} className="my-1">
        <StyledCol xs={12} className="lh-sm my-1">
          <RecordLink
            url={entity.json.id!}
            name={primaryName}
            className={`${activeClassName}`}
            linkCategory="Hierarchy"
          />
          {iiifImages !== '' && (
            <React.Fragment>
              &nbsp;
              <i className="bi bi-camera-fill" />
            </React.Fragment>
          )}
        </StyledCol>
      </Row>
    )
  }

  if (isLoading || isFetching) {
    return <p>Loading...</p>
  }

  return null
}

export default ArchiveHierarchyChild
