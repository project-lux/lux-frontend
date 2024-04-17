import React, { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { Col, Row } from 'react-bootstrap'

import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import { useGetItemsQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import { getParentData } from '../../lib/util/hierarchyHelpers'

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
  columnClassName?: string
}

// This component is used to display breadcrumb hierarchies. Currently used in result snippets and entity headers for Objects (when part of archives), Sets (when an archive), Concepts, and Places
const GenericBreadcrumbHierarchy: React.FC<IProps> = ({
  entity,
  id,
  getNextEntityUri,
  linkFilter,
  maxLength,
  columnClassName,
}) => {
  const [done, setDone] = useState(false)
  const [entities, setEntities] = useState([entity])

  useEffect(() => {
    // Reset done and entities when props.entity changes.
    // Otherwise the state remains the same when the component is
    // refreshed under new react route.
    setDone(false)
    setEntities([entity])
  }, [entity])

  const uris = getNextEntityUri(entities[0])
  const queryInput = uris.length > 0 ? uris : skipToken

  const { data, isSuccess, isError, isLoading } = useGetItemsQuery(queryInput)

  // Add the returned data to the current list of parents/entities and set done to true to stop retrieving items
  if (isSuccess && !done) {
    const entityAsParent = getParentData(data, linkFilter)
    // Determine if the parent has ancestors
    if (
      entityAsParent === null ||
      getNextEntityUri(entityAsParent).length === 0 ||
      entities.length > maxLength
    ) {
      setDone(true)
    }

    if (entityAsParent !== null) {
      setEntities([entityAsParent, ...entities])
    }
  }

  // All ancestors have been retrieved
  if (isSuccess || isError || done) {
    const record = new EntityParser(entity)
    const entityName = record.getPrimaryName(config.dc.langen)

    const links = entities
      .slice(0, entities.length - 1)
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

    return (
      <Row>
        <Col
          className={columnClassName || ''}
          data-testid={`${id}-generic-breadcrumb-hierarchy`}
        >
          {links} {'>'} {entityName}
        </Col>
      </Row>
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  return null
}

export default GenericBreadcrumbHierarchy
