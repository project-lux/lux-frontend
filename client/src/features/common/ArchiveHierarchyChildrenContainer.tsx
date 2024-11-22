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
} from '../../redux/slices/archiveHierarchySlice'
import { getEstimates } from '../../lib/parse/search/searchResultParser'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

const isHalLinkForWorks = (link: string | null): boolean =>
  !isNull(link) && link.includes('/works')

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
  const [workPage, setWorkPage] = useState<number>(1)
  const [itemPage, setItemPage] = useState<number>(1)
  const [halLink, setHalLink] = useState<string | null>(
    setIncludedWorks || setIncludedItems,
  )

  const skip = halLink === null
  const { data, isSuccess, isLoading, isFetching } =
    useGetSearchRelationshipQuery(
      {
        uri: halLink,
        page: isHalLinkForWorks(halLink) ? workPage : itemPage,
      },
      {
        skip,
      },
    )

  const handleShowLess = (): void => {
    const page = isHalLinkForWorks(halLink) ? workPage : itemPage
    if (isHalLinkForWorks(halLink)) {
      setWorkPage(workPage - 1)
    } else {
      if (itemPage === 1 && !isUndefined(setIncludedWorks)) {
        setHalLink(setIncludedWorks)
      }
      setItemPage(itemPage > 1 ? itemPage - 1 : 1)
    }
    dispatch(
      removeData({
        id: ancestor.id!,
        page,
        halLinkType: halLink?.includes('/work') ? 'works' : 'items',
      }),
    )
  }

  const handleShowMore = (next: string | null): void => {
    // If there are no more work results
    if (
      !data.hasOwnProperty('next') &&
      halLink?.includes('/work') &&
      !isNull(setIncludedItems)
    ) {
      setHalLink(setIncludedItems)
    } else if (!isNull(next) && !isUndefined(next)) {
      // If the results returned contains more data
      if (isHalLinkForWorks(halLink)) {
        setWorkPage(workPage + 1)
      } else {
        setItemPage(itemPage + 1)
      }
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
      const page = isHalLinkForWorks(halLink) ? workPage : itemPage
      dispatch(
        addData({
          id: ancestor.id!,
          values: children,
          total: totalResults,
          page,
          halLinkType: halLink?.includes('/work') ? 'works' : 'items',
        }),
      )
    }
  }, [
    ancestor.id,
    data,
    dispatch,
    halLink,
    isSuccess,
    itemPage,
    parentsOfCurrentEntity,
    pathname,
    skip,
    workPage,
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
          {(data.hasOwnProperty('next') ||
            (!data.hasOwnProperty('next') &&
              halLink?.includes('/work') &&
              !isNull(setIncludedItems))) && (
            <button
              type="button"
              className="btn btn-link show-more"
              onClick={() => handleShowMore(data.next)}
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
