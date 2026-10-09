import React from 'react'
import { Button, Modal } from 'react-bootstrap'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { isNull } from 'lodash'

// import { resetState } from '../../redux/slices/advancedSearchSlice'
// import { useAppDispatch, useAppSelector } from '../../app/hooks'
// import { addSelectedHelpText } from '../../redux/slices/helpTextSlice'
// import { pushClientEvent } from '../../lib/pushClientEvent'
// import { ISimpleSearchState } from '../../redux/slices/simpleSearchSlice'

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
    keyboard={false}
    animation={false}
    aria-describedby="modalBody"
    aria-labelledby="modalTitle"
    data-testid={modalDataTestId}
  >
    <Modal.Dialog className="m-0">
      <Modal.Header closeButton>
        <Modal.Title id="modalTitle">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">{text}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => onClose()}
          data-testid={cancelButtonDataTestId}
        >
          {cancelButtonText}
        </Button>
        <Button
          variant="primary"
          onClick={() => onConfirm()}
          data-testid={confirmButtonDataTestId}
        >
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  </Modal>
)

export default AlertModal
