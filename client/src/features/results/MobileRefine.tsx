import React, { useState } from 'react'
import { Accordion, Col, Modal, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { isUndefined } from 'lodash'

import FacetContainer from '../facets/FacetContainer'
import SecondaryButton from '../../styles/shared/SecondaryButton'
import { sortBy, sortDirection } from '../../config/sortingOptions'
import { ResultsTab } from '../../types/ResultsTab'
import theme from '../../styles/theme'

import SortCheckbox from './SortCheckbox'

const StyledAccordion = styled(Accordion)`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: ${theme.color.white};
  border-radius: ${theme.border.radius};

  .accordion-button {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;

    &:after {
      margin-left: 0px;
    }
  }
`

interface IProps {
  handleSelectionOfSortDirection: (x: string) => void
  handleSelectionOfSortTerm: (x: string) => void
  sortTermSelected?: string
  sortDirectionSelected?: string
}

const MobileRefine: React.FC<IProps> = ({
  handleSelectionOfSortDirection,
  handleSelectionOfSortTerm,
  sortTermSelected,
  sortDirectionSelected,
}) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const [fullscreen, setFullscreen] = useState(true)
  const [show, setShow] = useState(false)
  const sortByOptions = sortBy[tab]
  const selectedSortTerm = !isUndefined(sortTermSelected)
    ? sortByOptions[sortTermSelected]
    : ''
  const selectedSortDirection = !isUndefined(sortDirectionSelected)
    ? sortDirectionSelected
    : ''

  const handleShow = (breakpoint: boolean): void => {
    setFullscreen(breakpoint)
    setShow(true)
  }

  return (
    <React.Fragment>
      <SecondaryButton
        onClick={() => handleShow(!fullscreen)}
        className="w-100"
      >
        <i className="bi bi-funnel me-1" />
        Sort & Refine
      </SecondaryButton>
      <Modal show={show} fullscreen onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title hidden>Sort and Refine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h3>Sort</h3>
            <StyledAccordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header style={{ lineHeight: '20px' }}>
                  <Row className="d-flex justify-content-between sortByTitle w-100">
                    <Col className="d-flex justify-content-start">Sort By</Col>
                    <Col className="d-flex justify-content-end">
                      {selectedSortTerm}
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body className="px-0">
                  <div className="px-4">
                    {Object.entries(sortByOptions).map(([key, value]) => (
                      <SortCheckbox
                        value={value}
                        option={key}
                        name="By"
                        selected={sortTermSelected}
                        handleSelection={handleSelectionOfSortTerm}
                      />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header style={{ lineHeight: '20px' }}>
                  <Row className="d-flex justify-content-between sortByTitle w-100">
                    <Col className="d-flex justify-content-start">
                      Sort Direction
                    </Col>
                    <Col className="d-flex justify-content-end">
                      {selectedSortDirection}
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body className="px-0">
                  <div className="px-4">
                    {Object.entries(sortDirection).map(([key, value]) => (
                      <SortCheckbox
                        value={value}
                        option={key}
                        name="Direction"
                        selected={selectedSortDirection}
                        handleSelection={handleSelectionOfSortDirection}
                      />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </StyledAccordion>
          </div>
          <h3>Refine</h3>
          <FacetContainer />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default MobileRefine
