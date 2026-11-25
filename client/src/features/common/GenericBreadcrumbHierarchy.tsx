import React, { useState, type JSX } from 'react'
import { Col, Row } from 'react-bootstrap'

import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import { useGetItemsQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import { getParentData } from '../../lib/util/hierarchyHelpers'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'

import RecordLink from './RecordLink'

interface IProps {
  // the entity to display a hierarchy for (Object, Set, Concept, or Place)
  entity: IEntity
  id: string
  // a function to get the next (parent) entity in the hierarchy
  getNextEntityUri: (entity: IEntity) => Array<string>
  // an optional function to filter out unwanted results from the hierarchy list, after all of the next entities have been added
  linkFilter?: (entity: IEntity) => boolean
  // the maximum number of hierarchy results to display
  maxLength: number
  // className modifier to change styling/alignment of the component based on context
  divClassName?: string
  isResultSnippet?: boolean
  snippetClassName?: string
  snippetLabel?: string
}

// This component is used to display breadcrumb hierarchies. Currently used in result snippets and entity headers for Objects (when part of archives), Sets (when an archive), Concepts, and Places
const GenericBreadcrumbHierarchy: React.FC<IProps> = ({
  entity,
  id,
  getNextEntityUri,
  linkFilter,
  maxLength,
  divClassName,
  isResultSnippet = false,
  snippetClassName = '',
  snippetLabel,
}) => {
  const [done, setDone] = useState(false)
  const [entities, setEntities] = useState([entity])
  const [prevEntity, setPrevEntity] = useState(entity)

  // Reset done and entities when props.entity changes.
  // Otherwise the state remains the same when the component is
  // refreshed under new react route.
  // This is done during render rather than in an effect to avoid an extra render with stale state.
  // The reset values are also used for the rest of this render, so the parent lookup below does not
  // append to the previous entity's hierarchy.
  const entityChanged = entity !== prevEntity
  if (entityChanged) {
    setPrevEntity(entity)
    setDone(false)
    setEntities([entity])
  }
  const currentEntities = entityChanged ? [entity] : entities
  const currentDone = entityChanged ? false : done

  const uris = getNextEntityUri(currentEntities[0])
  const skip = uris.length > 0 ? false : true

  const { data, isSuccess, isError, isLoading } = useGetItemsQuery(
    {
      uris,
      profile: 'results',
    },
    {
      skip,
    },
  )

  // Add the returned data to the current list of parents/entities and set done to true to stop retrieving items
  if (isSuccess && !currentDone) {
    const entityAsParent = getParentData(data, linkFilter)
    // Determine if the parent has ancestors
    if (
      entityAsParent === null ||
      getNextEntityUri(entityAsParent).length === 0 ||
      currentEntities.length > maxLength
    ) {
      setDone(true)
    }

    if (entityAsParent !== null) {
      setEntities([entityAsParent, ...currentEntities])
    }
  }

  // All ancestors have been retrieved
  if (isSuccess || isError || currentDone) {
    const record = new EntityParser(entity)
    const entityName = record.getPrimaryName(config.aat.langen)

    const links = currentEntities
      .slice(0, currentEntities.length - 1)
      .reduce<JSX.Element[]>((linkArr, currentEntity, currentIndex) => {
        // if we don't have a filter, or the filter is true, then add the link to the array
        if (linkFilter === undefined || linkFilter(currentEntity)) {
          const key = `${currentEntity.id}-${currentIndex}`
          linkArr.push(
            <React.Fragment key={key}>
              {linkArr.length !== 0 && ' > '}
              <RecordLink
                url={currentEntity.id ?? ''}
                linkCategory="Breadcrumb"
                ariaRoleDescription="breadcrumb"
              />
            </React.Fragment>,
          )
        }
        // if the link filter is defined and false, do not add the link to the array
        return linkArr
      }, [])

    if (links.length === 0) {
      return null // don't show the hierarchy is there's no parent
    }

    if (isResultSnippet) {
      return (
        <Row>
          <Col>
            <StyledDt>{snippetLabel}</StyledDt>
            <StyledDd data-testid={snippetClassName}>
              <div
                className={divClassName || ''}
                data-testid={`${id}-generic-breadcrumb-hierarchy`}
                role="navigation"
              >
                {links} {'>'} {entityName}
              </div>
            </StyledDd>
          </Col>
        </Row>
      )
    }

    return (
      <div
        className={divClassName || ''}
        data-testid={`${id}-generic-breadcrumb-hierarchy`}
        role="navigation"
      >
        {links} {'>'} {entityName}
      </div>
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  return null
}

export default GenericBreadcrumbHierarchy
