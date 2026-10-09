import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useNavigate } from 'react-router-dom'

import StyledTitleHeader from '../../styles/features/advancedSearch/TitleHeader'
import { ErrorFallback } from '../error/ErrorFallback'
import { pushClientEvent } from '../../lib/pushClientEvent'
import ErrorMessage from '../search/ErrorMessage'
import {
  SEARCH_TYPE_PARAM,
  // AI_REFINEMENT_PARAM,
} from '../../config/aiAssistedSearch/variables'

import CloseButton from './CloseButton'
import AlertModal from './AlertModal'

/**
 * Container for holding the advanced search components.
 * @returns
 */
const Header: React.FC = () => {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const queryParams = new URLSearchParams(search)
  // const isRefineSearch = queryParams.has(AI_REFINEMENT_PARAM)
  //   ? queryParams.get(AI_REFINEMENT_PARAM) === 'true'
  //   : false
  const searchType = queryParams.has(SEARCH_TYPE_PARAM)
    ? queryParams.get(SEARCH_TYPE_PARAM)
    : null
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const handleCloseModal = (): void => {
    setShowModal(false)
    pushClientEvent(
      'Search Switch',
      'Selected',
      'Cancel Switch to Simple Search',
    )
  }

  const handleOnConfirm = (): void => {
    setShowModal(false)
    pushClientEvent(
      'Search Switch',
      'Selected',
      'Confirm Switch to Simple Search',
    )
    // If it is an advanced search and not a refinement, set the search type to simple
    if (searchType === 'advanced') {
      queryParams.set(SEARCH_TYPE_PARAM, 'simple')
    }
    navigate({
      pathname,
      search: `?${queryParams.toString()}`,
    })
  }

  let title = 'Switch to Standard Search?'
  let text =
    'Are you sure you want to switch to simple search? You will lose your advanced search settings.'
  let confirmButtonText = 'Use Standard Search'
  let cancelButtonText = 'Keep Advanced Search'

  if (searchType === 'advanced') {
    title = 'Close the Advanced Search?'
    text =
      'Are you sure you want to close the advanced search? You will lose any advanced search changes you have not submitted.'
    confirmButtonText = 'Close Advanced Search'
  }

  return (
    <Row className="mx-0">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {showModal && (
          <AlertModal
            showModal={showModal}
            onConfirm={handleOnConfirm}
            onClose={handleCloseModal}
            title={title}
            text={text}
            confirmButtonText={confirmButtonText}
            cancelButtonText={cancelButtonText}
            confirmButtonDataTestId="close-advanced-search-button"
            cancelButtonDataTestId="keep-advanced-search-button"
            modalDataTestId="close-advanced-search-modal"
          />
        )}
        {isError && (
          <Col xs={12} className="mt-2 w-75">
            <ErrorMessage onClose={setIsError} />
          </Col>
        )}
        <Col xs={12} className="px-0">
          <StyledTitleHeader className="mb-3 mx-0">
            <Col sm={9} xs={12}>
              <h2>Advanced Search</h2>
            </Col>
            <Col
              sm={3}
              xs={12}
              className="d-flex align-items-center justify-content-end"
            >
              <CloseButton setShowModal={setShowModal} key={search} />
            </Col>
          </StyledTitleHeader>
        </Col>
      </ErrorBoundary>
    </Row>
  )
}

export default Header
