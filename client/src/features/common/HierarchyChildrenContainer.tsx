/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import IEntity from '../../types/data/IEntity'
import { useGetHierarchyChildrenQuery } from '../../redux/api/ml_api'
import {
  currentUriInHierarchy,
  extractHalLinks,
} from '../../lib/util/hierarchyHelpers'
import { getDataApiBaseUrl } from '../../config/config'
import {
  addData,
  removeData,
  IArchiveHierarchy,
} from '../../redux/slices/hierarchySlice'
import { getEstimates } from '../../lib/parse/search/searchResultParser'

import HierarchyChild from './HierarchyChild'

const HierarchyChildrenContainer: React.FC<{
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

  const { pathname } = useLocation()
  const [page, setPage] = useState<number>(1)
  const links = ancestor._links ? extractHalLinks(ancestor._links) : []
  const skip = links.length === 0
  const { data, isSuccess, isLoading, isFetching } =
    useGetHierarchyChildrenQuery(
      {
        halLinks: links,
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

  useEffect(() => {
    if (isSuccess && data) {
      let totalResults = 0
      const children: Array<string> = []
      for (const result of data) {
        totalResults += getEstimates(result)
        for (const item of result.orderedItems) {
          const { id } = item
          const pathnameInResults = currentUriInHierarchy(id, pathname)
          if (!pathnameInResults) {
            children.push(id)
          }
        }
      }
      // Only add the current entity to the top of the results if it is included in the
      // current list of children from a parent and if it is the first page of results
      if (parentsOfCurrentEntity.includes(ancestor.id!) && page === 1) {
        children.unshift(
          pathname.replace('/view', `${getDataApiBaseUrl()}data`),
        )
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
    page,
    parentsOfCurrentEntity,
    pathname,
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

    // Right here, get every child
    console.log('children: ', children)
    return (
      <React.Fragment>
        {children.map((child: string, ind: number) => (
          <HierarchyChild
            // eslint-disable-next-line react/no-array-index-key
            key={`${child}-${ind}`}
            child={child}
            skipApiCalls={skipApiCalls}
            parentsOfCurrentEntity={parentsOfCurrentEntity}
            ancestors={ancestors}
          />
        ))}
        <Col xs={12} className="d-flex justify-content-start">
          {state.total >= 20 && state.total !== children.length && (
            <button
              type="button"
              className="btn btn-link show-more"
              onClick={() => setPage(page + 1)}
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

export default HierarchyChildrenContainer
