import React, { useEffect, useState } from 'react'
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
  ancestors: Array<{ id: string; currentPageHalLink: string | null }>
  objectOrSetMemberOfSet: string
  currentEntity: IEntity
}> = ({
  skipApiCalls = false,
  ancestors,
  objectOrSetMemberOfSet,
  currentEntity,
}) => {
  const [page, setPage] = useState<number | undefined>(undefined)
  const [children, setChildren] = useState<Array<string>>([])

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
      setChildren(data.orderedItems.map((item: IOrderedItems) => item.id))
    }
  }, [isSuccess, data, setChildren])

  if (isSuccess && data) {
    const pageOfEntity = getPageNumber(data)
    console.log('CHILDREN: ', children)

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
