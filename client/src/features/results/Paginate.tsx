import React, { useRef, useState } from 'react'
import { Col, Form, InputGroup, Pagination, Row } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { isUndefined } from 'lodash'

import theme from '../../styles/theme'
import { getParamPrefix } from '../../lib/util/params'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useWindowWidth } from '../../lib/hooks/useWindowWidth'
import { DOTS } from '../../lib/util/paginationHelper'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'

import { Paginator } from './Paginator'

interface IPagination {
  estimate: number
  currentPage: number
  pageSize: number
  handleSelectionOfPage?: (pageValue: number) => void
  siblingCount?: number
  isArchive?: boolean
  xxlGridSize?: number
}

const StyledPagination = styled(Pagination)`
  border-radius: 5px;

  li {
    width: 100%;
  }

  li.page-item.active > span.page-link {
    background-color: ${theme.color.primary.blue};
    border-color: ${theme.color.primary.blue};
    font-weight: bold;
  }

  li > a:hover {
    background: ${theme.color.primary.blue};
    border-color: ${theme.color.primary.blue};
    color: white;
    text-decoration: underline;
  }

  li > span.page-link {
    height: 100%;
    display: flex;
    align-items: center;
  }

  li > a.page-link {
    height: 100%;
    display: flex;
    align-items: center;
  }
`

const StyledInputGroupDiv = styled(InputGroup)`
  span {
    border: none;
    background-color: ${theme.color.white};
  }
`

/**
 * Renders the pagination component used to page through results
 * @param {number} estimate the estimate of the total number of results returned
 * @param {number} currentPage the current result page a user is viewing
 * @param {number} pageSize the number of results per page
 * @param {(x: number) => void} handleSelectionOfPage optional; the function to use when selecting a page - used ONLY for archive hierarchy
 * @param {number} siblingCount optional; known configuration for the given search tag
 * @param {boolean} isArchive optional; used for determining if the Go To page filter should be rendered
 * @param {number} xxlGridSize optional; used to set the grid size of the pagination container at xxl viewports
 * @returns {JSX.Element}
 */
const Paginate: React.FC<IPagination> = ({
  estimate,
  currentPage,
  pageSize,
  handleSelectionOfPage,
  siblingCount = 2,
  isArchive = false,
  xxlGridSize = 8,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pageValue, setPageValue] = useState<number>(currentPage)
  const { width } = useWindowWidth()

  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const URL = new URLSearchParams(search)
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = isUndefined(tab) ? 'i' : getParamPrefix(tab)
  const pageParam = `${paramPrefix}p`
  // remove page so that the paginator can assign the page number
  URL.delete(pageParam)
  const newURL = URL.toString()

  // Push analytics
  const handleAnalytics = (): void => {
    pushClientEvent('Pagination', 'Selected', 'Results Page')
  }

  const handlePageSelection = (pageNumber: number): void => {
    handleAnalytics()
    if (!isUndefined(handleSelectionOfPage)) {
      handleSelectionOfPage(pageNumber)
    } else {
      navigate({
        pathname: `${pathname}`,
        search: `?${newURL}&${pageParam}=${pageNumber}`,
      })
    }
  }

  // Go to the specified page
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    handleAnalytics()
    if (!isUndefined(handleSelectionOfPage)) {
      handleSelectionOfPage(pageValue)
    } else {
      navigate({
        pathname: `${pathname}`,
        search: `?${newURL}&${pageParam}=${pageValue}`,
      })
    }
  }

  const paginationRange = Paginator({
    currentPage,
    estimate,
    siblingCount,
    pageSize,
  })

  const lastPage = Math.ceil(estimate / pageSize)

  if (
    currentPage === 0 ||
    (paginationRange.length > 0 && paginationRange.length < 2)
  ) {
    return null
  }

  return (
    <Row className="mt-4">
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={xxlGridSize}
        className="d-flex justify-content-center"
      >
        <StyledPagination data-testid="results-page-pagination">
          {width < theme.breakpoints.md ? (
            <React.Fragment>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageSelection(currentPage - 1)}
              >
                Previous
              </Pagination.Prev>
              <Pagination.Next
                disabled={currentPage === lastPage}
                onClick={() => handlePageSelection(currentPage + 1)}
              >
                Next
              </Pagination.Next>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Pagination.First
                active={currentPage === 1}
                onClick={() => handlePageSelection(1)}
              >
                First
              </Pagination.First>
              {currentPage !== 1 && (
                <Pagination.Prev
                  onClick={() => handlePageSelection(currentPage - 1)}
                />
              )}
              {paginationRange.length > 0 &&
                paginationRange.map((pageNumber: string | number) => {
                  if (typeof pageNumber === 'string' && pageNumber === DOTS) {
                    return <Pagination.Ellipsis disabled key={pageNumber} />
                  }
                  return (
                    <Pagination.Item
                      key={pageNumber}
                      active={currentPage === pageNumber}
                      onClick={() => handlePageSelection(pageNumber as number)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  )
                })}
              {currentPage !== lastPage && (
                <Pagination.Next
                  onClick={() => handlePageSelection(currentPage + 1)}
                />
              )}
              <Pagination.Last
                active={currentPage === lastPage}
                onClick={() => handlePageSelection(lastPage)}
              >
                Last
              </Pagination.Last>
            </React.Fragment>
          )}
        </StyledPagination>
      </Col>
      {/* Do not render the following if the component is used by an explore hierarchy */}
      {!isArchive && (
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={4}>
          <Form
            className="d-flex justify-content-center"
            onSubmit={submitHandler}
            data-testid="pagination-page-input"
          >
            <StyledInputGroupDiv className="mb-3 w-auto">
              <InputGroup.Text id="page-input">Go to page</InputGroup.Text>
              <Form.Control
                id="page-input"
                type="number"
                placeholder={currentPage.toString()}
                onChange={(e) =>
                  setPageValue(parseInt(e.currentTarget.value, 10))
                }
                min={1}
                max={lastPage}
                ref={inputRef}
                value={pageValue.toString()}
                aria-label="Go to specific page"
                aria-describedby="page-input"
              />
              <InputGroup.Text id="page-input">of {lastPage}</InputGroup.Text>
            </StyledInputGroupDiv>
            <PrimaryButton
              type="submit"
              className="d-flex align-items-center py-1 h-75 mx-1"
            >
              Go
            </PrimaryButton>
          </Form>
        </Col>
      )}
    </Row>
  )
}

export default Paginate
