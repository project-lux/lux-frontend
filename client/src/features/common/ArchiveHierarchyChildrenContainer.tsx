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

const isHalLinkForSets = (link: string | null): boolean =>
  !isNull(link) && link.includes('/set')

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
  const [setPage, setSetPage] = useState<number>(1)
  const [itemPage, setItemPage] = useState<number>(1)
  const [halLink, setHalLink] = useState<string | null>(objectOrSetMemberOfSet)

  const skip = halLink === null
  const { data, isSuccess, isLoading, isFetching } =
    useGetSearchRelationshipQuery(
      {
        uri: halLink,
        page: isHalLinkForSets(halLink) ? setPage : itemPage,
      },
      {
        skip,
      },
    )

  const handleShowLess = (): void => {
    const page = isHalLinkForSets(halLink) ? setPage : itemPage
    if (isHalLinkForSets(halLink)) {
      setSetPage(setPage - 1)
    } else {
      if (itemPage === 1 && !isUndefined(objectOrSetMemberOfSet)) {
        setHalLink(objectOrSetMemberOfSet)
      }
      setItemPage(itemPage > 1 ? itemPage - 1 : 1)
    }
    dispatch(
      removeData({
        id: ancestor.id!,
        page,
        halLinkType: halLink?.includes('/set') ? 'sets' : 'items',
      }),
    )
  }

  const handleShowMore = (next: string | null): void => {
    // If there are no more set results
    if (
      !data.hasOwnProperty('next') &&
      halLink?.includes('/set') &&
      !isNull(objectOrSetMemberOfSet)
    ) {
      setHalLink(objectOrSetMemberOfSet)
    } else if (!isNull(next) && !isUndefined(next)) {
      // If the results returned contains more data
      if (isHalLinkForSets(halLink)) {
        setSetPage(setPage + 1)
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
      totalResults += getEstimates(data)
      for (const item of data.orderedItems) {
        const { id } = item
        children.push(id)
      }
      const page = isHalLinkForSets(halLink) ? setPage : itemPage
      dispatch(
        addData({
          id: ancestor.id!,
          values: children,
          total: totalResults,
          page,
          halLinkType: halLink?.includes('/set') ? 'sets' : 'items',
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
    setPage,
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
              halLink?.includes('/set') &&
              !isNull(objectOrSetMemberOfSet))) && (
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
