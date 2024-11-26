import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ErrorBoundary } from 'react-error-boundary'

import StyledTitleHeader from '../../styles/features/advancedSearch/TitleHeader'
import { ErrorFallback } from '../error/ErrorFallback'
import { pushClientEvent } from '../../lib/pushClientEvent'
import ErrorMessage from '../search/ErrorMessage'

import ToggleButton from './ToggleSearchButton'
import AlertModal from './AlertModal'

/**
 * Container for holding the advanced search components.
 * @returns
 */
const Header: React.FC = () => {
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

  return (
    <Row className="mx-0">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {showModal && (
          <AlertModal showModal={showModal} onClose={handleCloseModal} />
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
              <ToggleButton
                setIsError={setIsError}
                setShowModal={setShowModal}
              />
            </Col>
          </StyledTitleHeader>
        </Col>
      </ErrorBoundary>
    </Row>
  )
}

export default Header
