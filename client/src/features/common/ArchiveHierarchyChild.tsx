/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import theme from '../../styles/theme'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import CollapseButton from '../../styles/shared/CollapseButton'
import CollapseContainer from '../advancedSearch/CollapseContainer'
import { useGetItemQuery } from '../../redux/api/ml_api'
import {
  currentUriInHierarchy,
  extractHalLinks,
  isInHierarchy,
} from '../../lib/util/hierarchyHelpers'

import ArchiveHierarchyChildrenContainer from './ArchiveHierarchyChildrenContainer'
import RecordLink from './RecordLink'

const StyledCol = styled(Col)`
  &:hover {
    background-color: ${theme.color.lightGray};
  }

  & > i {
    color: ${theme.color.primary.blue};
  }
`

const ArchiveHierarchyChild: React.FC<{
  child: string
  skipApiCalls: boolean
  parentsOfCurrentEntity: Array<string>
  ancestors: Array<string>
}> = ({ child, skipApiCalls, parentsOfCurrentEntity, ancestors }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { pathname } = useLocation()

  const { data, isSuccess, isLoading, isFetching } = useGetItemQuery(
    { uri: stripYaleIdPrefix(child) },
    { skip: skipApiCalls },
  )

  useEffect(() => {
    if (isSuccess && data && !currentUriInHierarchy(data.id, pathname)) {
      setOpen(isInHierarchy(data.id, ancestors))
    }
  }, [data, isSuccess, pathname, ancestors])

  if (isSuccess && data) {
    const entity = new EntityParser(data)
    const primaryName = entity.getPrimaryName(config.dc.langen)
    const iiifImages = entity.getManifestId()
    const links = entity.json._links ? extractHalLinks(entity.json._links) : []
    const activeClassName = currentUriInHierarchy(data.id, pathname)
      ? 'active'
      : ''

    if (links.length > 0) {
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
            <CollapseContainer open={open} id={entity.json.id || primaryName}>
              <ArchiveHierarchyChildrenContainer
                ancestor={data}
                skipApiCalls={!open}
                key={pathname}
                parentsOfCurrentEntity={parentsOfCurrentEntity}
                ancestors={ancestors}
              />
            </CollapseContainer>
          </Col>
        </Row>
      )
    }

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
