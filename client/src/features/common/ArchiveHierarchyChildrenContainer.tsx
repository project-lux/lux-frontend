/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { isNull, isUndefined } from 'lodash'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import IEntity from '../../types/data/IEntity'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
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
  setIncludedItems: string | null
  setIncludedWorks: string | null
}> = ({
  ancestor,
  skipApiCalls = false,
  parentsOfCurrentEntity,
  ancestors,
  setIncludedItems,
  setIncludedWorks,
}) => {
  const dispatch = useAppDispatch()

  const { pathname } = useLocation()
  const [page, setPage] = useState<number>(1)
  const [halLink, setHalLink] = useState<string | null>(
    setIncludedWorks || setIncludedItems,
  )

  const skip = halLink === null
  const { data, isSuccess, isLoading, isFetching } =
    useGetSearchRelationshipQuery(
      {
        uri: halLink,
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
    if (
      !data.hasOwnProperty('next') &&
      halLink?.includes('/work') &&
      !isNull(setIncludedItems)
    ) {
      setHalLink(setIncludedItems)
      setPage(1)
    } else if (!isNull(next) && !isUndefined(next)) {
      setPage(paginate)
    } else {
      setHalLink(null)
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      let totalResults = 0
      const children: Array<string> = []
      // let next = null
      totalResults += getEstimates(data)
      // next = data.next !== undefined ? data.next.id : null
      // // If the results returned is the last page of results
      // if (isNull(next) || (!isNull(next) && next.includes('/works'))) {
      //   next = itemLink
      // }
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
    page,
    parentsOfCurrentEntity,
    pathname,
    skip,
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

    console.log(state)
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
          {ancestor.id?.includes('9e7a1c79-8fa0-4eaf-9570-a3cbce09fac2') && (
            <p style={{ wordBreak: 'break-word' }}>
              {halLink}, {page}
            </p>
          )}
          {(data.hasOwnProperty('next') ||
            (!data.hasOwnProperty('next') &&
              halLink?.includes('/work') &&
              !isNull(setIncludedItems))) && (
            <button
              type="button"
              className="btn btn-link show-more"
              onClick={() => handleShowMore(page + 1, data.next)}
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
