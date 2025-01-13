import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import PrimaryButton from '../../styles/shared/PrimaryButton'
import { fetchRelatedLists } from '../../lib/util/fetchRelatedLists'
import { IRelatedListResults } from '../../types/IRelatedLists'
import { transformRelatedListResults } from '../../lib/parse/search/relatedListsParser'
import PageLoading from '../common/PageLoading'
import { pushClientEvent } from '../../lib/pushClientEvent'

import RelatedListRow from './RelatedListRow'

interface IProps {
  activeAccordion: boolean
  results: IRelatedListResults
  halLink: string
  title: string
  next?: {
    id: string
    type: string
  }
}

const RelatedList: React.FC<IProps> = ({
  activeAccordion,
  results,
  halLink,
  title,
  next,
}) => {
  const [currentResults, setCurrentResults] =
    useState<IRelatedListResults>(results)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(next !== undefined)
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = (page: number): void => {
    pushClientEvent('Pagination', 'Selected', 'Related List Accordion')
    fetchRelatedLists({
      halLink,
      page,
      onSuccess: (data) => {
        const parsedData = JSON.parse(data)
        const transformedData = transformRelatedListResults(
          parsedData.orderedItems,
        )
        if (transformedData !== null) {
          setCurrentPage(page)
          setCurrentResults(transformedData)
          setHasMore(parsedData.next !== undefined)
        } else {
          setIsError(true)
        }
        setIsLoading(false)
      },
      onError: () => setIsError(true),
      onLoading: () => setIsLoading(true),
    })
  }

  if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    return <p>An error occurred fetching the data.</p>
  }

  return (
    <Row>
      <Col xs={12}>
        <dl>
          {Object.keys(currentResults).map((uri, ind: number) => (
            <RelatedListRow
              key={uri}
              activeAccordion={activeAccordion}
              uri={uri}
              results={currentResults}
              index={ind}
              title={title}
            />
          ))}
        </dl>
      </Col>
      {(hasMore || currentPage !== 1) && (
        <Col
          xs={12}
          className="d-flex justify-content-center"
          data-testid="related-list-pagination"
        >
          <PrimaryButton
            className="relatedListPaginationButton previous"
            disabled={currentPage === 1}
            onClick={() => handleClick(currentPage - 1)}
          >
            Previous
          </PrimaryButton>
          <PrimaryButton
            className="relatedListPaginationButton next"
            disabled={!hasMore}
            onClick={() => handleClick(currentPage + 1)}
          >
            Next
          </PrimaryButton>
        </Col>
      )}
    </Row>
  )
}

export default RelatedList
