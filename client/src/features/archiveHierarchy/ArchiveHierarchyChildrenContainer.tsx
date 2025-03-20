import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { isNull, isUndefined } from 'lodash'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import IEntity from '../../types/data/IEntity'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import {
  addData,
  // removeData,
  IArchiveHierarchy,
} from '../../redux/slices/archiveHierarchySlice'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import Paginate from '../results/Paginate'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

const ArchiveHierarchyChildrenContainer: React.FC<{
  ancestor: IEntity
  skipApiCalls?: boolean
  parentsOfCurrentEntity: Array<string>
  ancestors: Array<string>
  objectOrSetMemberOfSet: string | null
  currentEntity: IEntity
}> = ({
  ancestor,
  skipApiCalls = false,
  parentsOfCurrentEntity,
  ancestors,
  objectOrSetMemberOfSet,
  currentEntity,
}) => {
  const dispatch = useAppDispatch()

  const { pathname } = useLocation()
  const [page, setPage] = useState<number>(1)

  const skip = objectOrSetMemberOfSet === null
  const { data, isSuccess, isLoading, isFetching } =
    useGetSearchRelationshipQuery(
      {
        uri: objectOrSetMemberOfSet,
        page,
      },
      {
        skip,
      },
    )

  useEffect(() => {
    if (isSuccess && data) {
      let totalResults = 0
      const children: Array<string> = []
      totalResults += getEstimates(data)
      for (const item of data.orderedItems) {
        const { id } = item
        children.push(id)
      }
      dispatch(
        addData({
          id: ancestor.id!,
          values: children,
          total: totalResults,
          page,
        }),
      )
    }
  }, [
    ancestor.id,
    data,
    dispatch,
    isSuccess,
    parentsOfCurrentEntity,
    pathname,
    skip,
    page,
  ])

  const currentState = useAppSelector(
    (state) => state.archiveHierarchy as IArchiveHierarchy,
  )

  if (isSuccess && data && currentState.hasOwnProperty(ancestor.id!)) {
    const state = currentState[ancestor.id!]
    const children: Array<string> = []
    Object.values(state.requests).map((value) =>
      value.map((v) => children.push(v)),
    )
    // get the HAL link that will return the page where the current entity is
    const currentEntityHalLinks = !isUndefined(currentEntity._links)
      ? currentEntity._links
      : null
    console.log(currentEntityHalLinks)
    const getCurrentEntityPage =
      !isNull(currentEntityHalLinks) &&
      currentEntityHalLinks.hasOwnProperty('lux:currentHierarchyPage')
        ? currentEntityHalLinks['lux:currentHierarchyPage']
        : null
    const currentEntityPrimaryName = new EntityParser(
      currentEntity,
    ).getPrimaryName(config.aat.primaryName)

    return (
      <React.Fragment>
        {isNull(getCurrentEntityPage) ? (
          <Button variant="link" className="px-0" onClick={() => alert('hi')}>
            Go to {currentEntityPrimaryName}
          </Button>
        ) : null}
        {children.map((child: string, ind: number) => (
          <ArchiveHierarchyChild
            key={`${child}-${ind}`}
            child={child}
            skipApiCalls={skipApiCalls}
            parentsOfCurrentEntity={parentsOfCurrentEntity}
            ancestors={ancestors}
            currentEntity={currentEntity}
          />
        ))}
        <Col xs={12} className="d-flex justify-content-start">
          <Paginate
            estimate={getEstimates(data)}
            currentPage={page}
            pageSize={20}
            handleSelectionOfPage={setPage}
            isArchive
          />
        </Col>
      </React.Fragment>
    )
  }

  if (isLoading || isFetching) {
    return <p>Loading...</p>
  }

  return null
}

export default ArchiveHierarchyChildrenContainer
