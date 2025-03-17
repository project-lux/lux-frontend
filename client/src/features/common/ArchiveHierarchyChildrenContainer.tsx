import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import IEntity from '../../types/data/IEntity'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import {
  addData,
  removeData,
  IArchiveHierarchy,
} from '../../redux/slices/archiveHierarchySlice'
import { getEstimates } from '../../lib/parse/search/searchResultParser'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

const ArchiveHierarchyChildrenContainer: React.FC<{
  ancestor: IEntity
  skipApiCalls?: boolean
  parentsOfCurrentEntity: Array<string>
  ancestors: Array<string>
  objectOrSetMemberOfSet: string | null
}> = ({
  ancestor,
  skipApiCalls = false,
  parentsOfCurrentEntity,
  ancestors,
  objectOrSetMemberOfSet,
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

  const handleShowLess = (): void => {
    setPage(page - 1)
    dispatch(
      removeData({
        id: ancestor.id!,
        page,
      }),
    )
  }

  const handleShowMore = (): void => {
    setPage(page + 1)
  }

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

    return (
      <React.Fragment>
        {children.map((child: string, ind: number) => (
          <ArchiveHierarchyChild
            key={`${child}-${ind}`}
            child={child}
            skipApiCalls={skipApiCalls}
            parentsOfCurrentEntity={parentsOfCurrentEntity}
            ancestors={ancestors}
          />
        ))}
        <Col xs={12} className="d-flex justify-content-start">
          {data.hasOwnProperty('next') && (
            <button
              type="button"
              className="btn btn-link show-more"
              onClick={() => handleShowMore()}
            >
              Show More
            </button>
          )}
          {Object.keys(state.requests).length > 1 && (
            <button
              type="button"
              className="btn btn-link show-more"
              onClick={() => handleShowLess()}
            >
              Show Less
            </button>
          )}
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
