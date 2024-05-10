/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { isNull } from 'lodash'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import IEntity from '../../types/data/IEntity'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import {
  currentUriInHierarchy,
  getItemChildren,
  getWorkChildren,
} from '../../lib/util/hierarchyHelpers'
import { getDataApiBaseUrl } from '../../config/config'
import {
  addData,
  removeData,
  IArchiveHierarchy,
} from '../../redux/slices/hierarchySlice'
import { getEstimates } from '../../lib/parse/search/searchResultParser'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

const ArchiveHierarchyChildrenContainer: React.FC<{
  ancestor: IEntity
  skipApiCalls?: boolean
  parentsOfCurrentEntity: Array<string>
  ancestors: Array<string>
}> = ({
  ancestor,
  skipApiCalls = false,
  parentsOfCurrentEntity,
  ancestors,
}) => {
  const dispatch = useAppDispatch()
  const currentState = useAppSelector(
    (state) => state.archiveHierarchy as IArchiveHierarchy,
  )

  const workLink = getWorkChildren(ancestor._links)
  const itemLink = getItemChildren(ancestor._links)
  const { pathname } = useLocation()
  const [page, setPage] = useState<number>(1)
  const [searchLink, setSearchLink] = useState<string | null>(
    workLink || itemLink,
  )

  const skip = isNull(searchLink) || isNull(currentState.next)
  const { data, isSuccess, isLoading, isFetching } =
    useGetSearchRelationshipQuery(
      {
        uri: searchLink,
        page,
      },
      {
        skip,
      },
    )

  const handleShowLess = (paginate: number): void => {
    setPage(paginate)
    dispatch(
      removeData({
        id: ancestor.id!,
        page,
      }),
    )
  }

  const handleShowMore = (paginate: number, next: string | null): void => {
    if (!isNull(next)) {
      setPage(paginate)
    } else if (isNull(next) && searchLink?.includes('works')) {
      setSearchLink(itemLink)
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      let totalResults = 0
      const children: Array<string> = []
      let next = null
      totalResults += getEstimates(data)
      next = data.next !== undefined ? data.next.id : null
      if (isNull(next) && searchLink === workLink) {
        next = itemLink
      }
      for (const item of data.orderedItems) {
        const { id } = item
        const pathnameInResults = currentUriInHierarchy(id, pathname)
        if (!pathnameInResults) {
          children.push(id)
        }
      }
      // Only add the current entity to the top of the results if it is included in the
      // current list of children from a parent and if it is the first page of results
      if (parentsOfCurrentEntity.includes(ancestor.id!) && page === 1) {
        children.unshift(
          pathname.replace('/view', `${getDataApiBaseUrl()}data`),
        )
      }
      if (ancestor.id?.includes('set/9e7a1c79-8fa0-4eaf-9570-a3cbce09fac2')) {
        console.log(next)
      }
      dispatch(
        addData({
          id: ancestor.id!,
          values: children,
          total: totalResults,
          page,
          next,
        }),
      )
    }
  }, [
    ancestor.id,
    data,
    dispatch,
    isSuccess,
    itemLink,
    page,
    parentsOfCurrentEntity,
    pathname,
    searchLink,
    workLink,
  ])

  if (isSuccess && data && currentState.hasOwnProperty(ancestor.id!)) {
    const state = currentState[ancestor.id!]
    const children: Array<string> = []
    Object.values(state.requests).map((value) =>
      value.map((v) => children.push(v)),
    )
    if (ancestor.id?.includes('set/9e7a1c79-8fa0-4eaf-9570-a3cbce09fac2')) {
      console.log('here')
    }

    return (
      <React.Fragment>
        {children.map((child: string, ind: number) => (
          <ArchiveHierarchyChild
            // eslint-disable-next-line react/no-array-index-key
            key={`${child}-${ind}`}
            child={child}
            skipApiCalls={skipApiCalls}
            parentsOfCurrentEntity={parentsOfCurrentEntity}
            ancestors={ancestors}
          />
        ))}
        <Col xs={12} className="d-flex justify-content-start">
          {state.next !== null && (
            <button
              type="button"
              className="btn btn-link show-more"
              onClick={() => handleShowMore(page + 1, state.next)}
            >
              Show More
            </button>
          )}
          {page !== 1 && (
            <button
              type="button"
              className="btn btn-link show-more"
              onClick={() => handleShowLess(page - 1)}
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
