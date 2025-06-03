import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import { isUndefined } from 'lodash'

import IEntity from '../../types/data/IEntity'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import {
  getEstimates,
  getPageNumber,
} from '../../lib/parse/search/searchResultParser'
import Paginate from '../results/Paginate'
import { IOrderedItems } from '../../types/ISearchResults'

import ArchiveHierarchyChild from './ArchiveHierarchyChild'

const ArchiveHierarchyChildrenContainer: React.FC<{
  skipApiCalls?: boolean
  ancestors: Array<{ id: string; childrenHalLink: string | null }>
  objectOrSetMemberOfSet: string
  currentEntity: IEntity
}> = ({
  skipApiCalls = false,
  ancestors,
  objectOrSetMemberOfSet,
  currentEntity,
}) => {
  const [page, setPage] = useState<number | undefined>(undefined)
  const [halLink, setHalLink] = useState<string>(objectOrSetMemberOfSet)

  const skip = objectOrSetMemberOfSet === null
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

  // handle pagination of the children list
  const handlePagination = (pageNumber: number): void => {
    const searchParams = halLink.split('q')
    const params = new URLSearchParams(`q${searchParams[1]}`)

    // remove the pageWith param if it exists
    if (params.has('pageWith')) {
      params.delete('pageWith')
    }
    setHalLink(`${searchParams[0]}${params.toString()}`)
    setPage(pageNumber)
  }

  if (isSuccess && data) {
    const pageOfEntity = getPageNumber(data)
    const children = data.orderedItems.map((item: IOrderedItems) => item.id)

    return (
      <React.Fragment>
        {/* render all children of the current ancestor */}
        {children.map((child: string, ind: number) => (
          <ArchiveHierarchyChild
            key={`${child}-${ind}`}
            child={child}
            skipApiCalls={skipApiCalls}
            ancestors={ancestors}
            currentEntity={currentEntity}
          />
        ))}
        <Col xs={12} className="d-flex justify-content-start">
          <Paginate
            estimate={getEstimates(data)}
            currentPage={isUndefined(page) ? pageOfEntity : page}
            pageSize={20}
            handleSelectionOfPage={handlePagination}
            isArchive
            xxlGridSize={12}
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
