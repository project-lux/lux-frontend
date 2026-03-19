import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import sanitizeHtml from 'sanitize-html'

import theme from '../../styles/theme'
import EntityResultsDescription from '../cms/EntityResultsDescription'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { pushClientEvent } from '../../lib/pushClientEvent'

const StyledButton = styled(Button)`
  color: ${theme.color.link};
  background-color: white;
  margin-left: 0px;
  text-decoration: none;
  font-weight: ${theme.font.mobile.bodyLight.weight};

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: ${theme.breakpoints.md}px) {
    margin-left: 0.5em;
    font-weight: ${theme.font.desktop.bodyRegular.weight};
  }
`

const LuxOverlay: React.FC = () => {
  const [showFullscreenModal, setShowFullscreenModal] = useState(
    window.innerWidth < theme.breakpoints.md,
  )
  const [show, setShow] = useState(false)
  const attribRef = useRef(null)
  const overlayText = 'Learn more about Objects and Works'
  const objectsWorksHelpText =
    EntityResultsDescription('objectsWorksHelp') || ''

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    pushClientEvent('Overlay', 'Selected', overlayText)
    setShow(!show)
  }

  const onClose = (): void => {
    setShow(false)
  }

  useResizeableWindow(setShowFullscreenModal)

  return (
    <React.Fragment>
      <StyledButton
        ref={attribRef}
        variant="link"
        onClick={onClick}
        data-testid="image-attribution-overlay-button"
        aria-label={overlayText}
        className="px-0"
      >
        <i className="bi bi-question-circle open me-1" />
        {overlayText}
      </StyledButton>
      <Modal
        show={show}
        size="lg"
        onHide={() => onClose()}
        animation={showFullscreenModal ? true : false}
        fullscreen={showFullscreenModal ? 'md-down' : undefined}
        aria-describedby="modalBody"
        aria-labelledby="modalTitle"
      >
        <Modal.Dialog className="my-0">
          <Modal.Header closeButton>
            <Modal.Title id="modalTitle">
              What's the difference between Objects and Works?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modalBody">
            <div
              className="objectsWorksHelpText"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(objectsWorksHelpText),
              }}
              data-testid="learn-more-about-objects-works"
            />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </React.Fragment>
  )
}

export default LuxOverlay
