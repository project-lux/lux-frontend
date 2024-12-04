import React, { useState } from 'react'
import { Accordion, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

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
  }
`

const MobileRefine: React.FC<{ selectedSortDirection?: string }> = ({
  selectedSortDirection,
}) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const [fullscreen, setFullscreen] = useState(true)
  const [show, setShow] = useState(false)
  const sortByOptions = sortBy[tab]

  const handleShow = (breakpoint: boolean): void => {
    setFullscreen(breakpoint)
    setShow(true)
  }

  return (
    <React.Fragment>
      <SecondaryButton onClick={() => handleShow(!fullscreen)}>
        <i className="bi bi-funnel" />
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
                  Sort By {selectedSortDirection}
                </Accordion.Header>
                <Accordion.Body className="px-0">
                  <div className="px-4">
                    {Object.entries(sortByOptions).map(([key, value]) => (
                      <SortCheckbox value={value} key={key} />
                    ))}
                  </div>
<<<<<<< HEAD
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header style={{ lineHeight: '20px' }}>
                  Sort Direction {selectedSortDirection}
                </Accordion.Header>
                <Accordion.Body className="px-0">
                  <div className="px-4">
=======
                  <div
                    className="px-4 mt-3"
                    style={{ borderTop: `solid 1px ${theme.color.lightGray}` }}
                  >
                    <h4 className="mt-3">Sort Direction</h4>
>>>>>>> 3b3ad4c (429 changed mobile layout on results page)
                    {Object.entries(sortDirection).map(([key, value]) => (
                      <SortCheckbox value={value} key={key} />
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
