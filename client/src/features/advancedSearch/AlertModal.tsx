import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { isNull } from 'lodash'

import { resetState } from '../../redux/slices/advancedSearchSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateCurrentSearchState } from '../../redux/slices/currentSearchSlice'
import { addSelectedHelpText } from '../../redux/slices/helpTextSlice'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { ISimpleSearchState } from '../../redux/slices/simpleSearchSlice'

interface IAlertModal {
  showModal: boolean
  onClose: () => void
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @returns
 */
const AlertModal: React.FC<IAlertModal> = ({ showModal, onClose }) => {
  const simpleSearchState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )

  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(search)

  const dispatch = useAppDispatch()

  const handleContinueToSimpleSearch = (): void => {
    dispatch(updateCurrentSearchState({ value: 'simple' }))
    dispatch(addSelectedHelpText({ value: 'searchSwitch' }))
    onClose()
    dispatch(resetState())
    const { value } = simpleSearchState
    urlParams.set('sq', !isNull(value) ? value : '')
    urlParams.set('fromAdvanced', 'true')
    // urlParams.delete('qt')
    pushClientEvent('Search Switch', 'Selected', 'Continue To Simple Search')
    navigate(`${pathname}?${urlParams.toString()}`, {
      state: { targetName: 'Results Page' },
    })
  }

  return (
    <Modal
      show={showModal}
      onHide={() => onClose()}
      backdrop="static"
      keyboard={false}
      animation={false}
      aria-describedby="modalBody"
      aria-labelledby="modalTitle"
      data-testid="switch-to-simple-search-warning-modal"
    >
      <Modal.Dialog className="my-0">
        <Modal.Header closeButton>
          <Modal.Title id="modalTitle">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modalBody">
          You are about to leave the advanced search form. All input will be
          lost. Do you wish to continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleContinueToSimpleSearch}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default AlertModal
