import React from 'react'
import { Modal } from 'react-bootstrap'

import PrimaryButton from '../../styles/shared/PrimaryButton'
import SecondaryButton from '../../styles/shared/SecondaryButton'
import theme from '../../styles/theme'

interface IAlertModal {
  showModal: boolean
  onConfirm: () => void
  onClose: () => void
  title: string
  text: string
  confirmButtonText: string
  cancelButtonText: string
  confirmButtonDataTestId: string
  cancelButtonDataTestId: string
  modalDataTestId: string
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @returns
 */
const AlertModal: React.FC<IAlertModal> = ({
  showModal,
  onConfirm,
  onClose,
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  confirmButtonDataTestId,
  cancelButtonDataTestId,
  modalDataTestId,
}) => (
  <Modal
    show={showModal}
    onHide={() => onClose()}
    backdrop="static"
    size="lg"
    keyboard={false}
    animation={false}
    aria-describedby="modalBody"
    aria-labelledby="modalTitle"
    data-testid={modalDataTestId}
    centered
  >
    <Modal.Dialog className="m-0">
      <Modal.Header closeButton>
        <Modal.Title id="modalTitle">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">{text}</Modal.Body>
      <Modal.Footer>
        <SecondaryButton
          type="button"
          textColor={theme.color.black65}
          actionBgColor={theme.color.black65}
          className="p-2"
          onClick={() => onClose()}
          data-testid={cancelButtonDataTestId}
        >
          {cancelButtonText}
        </SecondaryButton>
        <PrimaryButton
          type="button"
          padding="0.5rem"
          borderRadius="6px"
          onClick={() => onConfirm()}
          data-testid={confirmButtonDataTestId}
        >
          {confirmButtonText}
        </PrimaryButton>
      </Modal.Footer>
    </Modal.Dialog>
  </Modal>
)

export default AlertModal
