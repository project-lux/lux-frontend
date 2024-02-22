import React, { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { Col, Row } from 'react-bootstrap'

import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'

import RecordLink from './RecordLink'

interface IProps {
  // the entity to display a hierarchy for (Object, Set, Concept, or Place)
  entity: IEntity
  // a function to get the next (parent) entity in the hierarchy
  getNextEntityUri: (entity: IEntity) => string | null
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

  const uri = getNextEntityUri(entities[0])
  const queryInput =
    uri !== null
      ? {
          uri,
          profile: 'results',
        }
      : skipToken

  const { data, isSuccess, isError, isLoading } = useGetItemQuery(queryInput)

  if (isSuccess && !done) {
    if (getNextEntityUri(data) === null || entities.length > maxLength) {
      setDone(true)
    }
    setEntities([data, ...entities])
  }

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
              <RecordLink url={currentEntity.id ?? ''} />
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
          data-testid="generic-breadcrumb-hierarchy"
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
