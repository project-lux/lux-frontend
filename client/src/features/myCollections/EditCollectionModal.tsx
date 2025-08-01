import React from 'react'
import { Modal } from 'react-bootstrap'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

// import { useEditCollectionMutation } from '../../redux/api/ml_api'
import useAuthentication from '../../lib/hooks/useAuthentication'
// import { resetState } from '../../redux/slices/myCollectionsSlice'
import IMyCollection from '../../types/data/IMyCollection'

import EditNamesForm from './EditNamesForm'
import SetAsDefault from './SetAsDefault'
import EditClassificationsForm from './EditClassificationsForm'
import EditIdentifiersFrom from './EditIdentifiersForm'

interface IMyCollectionsModal {
  data: IMyCollection
  showModal: boolean
  onClose: () => void
  editOptionSelected: string
}

const getModalTitle = (formSelected: string): string => {
  switch (formSelected) {
    case 'name':
      return 'Edit Names'
    case 'image':
      return 'Set Collection Image'
    case 'default':
      return 'Set as Default Collection?'
    case 'classification':
      return 'Edit Collection Classification'
    case 'identifier':
      return 'Edit Identifiers'
    default:
      return 'Edit Collection'
  }
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} data the my collection object
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @param {string} editOptionSelected the edit option selected by the user
 * @returns
 */
const EditCollectionModal: React.FC<IMyCollectionsModal> = ({
  data,
  showModal,
  onClose,
  editOptionSelected,
}) => {
  useAuthentication()
  // const dispatch = useDispatch()
  // const { pathname } = useLocation()
  // const navigate = useNavigate()
  // const [editCollection] = useEditCollectionMutation()

  const handleSave = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    // editCollection({
    //   name,
    //   classification,
    //   language,
    // })
    //   .unwrap()
    //   .then(() => {
    //     onClose()
    //     dispatch(resetState())
    //     navigate(
    //       {
    //         pathname,
    //       },
    //       {
    //         state: {
    //           showAlert: true,
    //           alertMessage: `${name} was successfully created!`,
    //           alertVariant: 'primary',
    //         },
    //       },
    //     )
    //   })
    //   .catch(() => {
    //     onClose()
    //     dispatch(resetState())
    //     navigate(
    //       {
    //         pathname,
    //       },
    //       {
    //         state: {
    //           showAlert: true,
    //           alertMessage: `${name} could not be made.`,
    //           alertVariant: 'danger',
    //         },
    //       },
    //     )
    //   })
    onClose()
  }

  return (
    <Modal
      show={showModal}
      onHide={() => onClose()}
      backdrop="static"
      size="lg"
      keyboard={false}
      animation={false}
      aria-describedby="modalBody"
      aria-labelledby="modalTitle"
      data-testid="switch-to-simple-search-warning-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="modalTitle">
          {getModalTitle(editOptionSelected)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">
        {editOptionSelected === 'name' && (
          <EditNamesForm data={data} onFormSave={handleSave} />
        )}
        {editOptionSelected === 'default' && (
          <SetAsDefault data={data} onClose={onClose} />
        )}
        {editOptionSelected === 'classification' && (
          <EditClassificationsForm data={data} onClose={onClose} />
        )}
        {editOptionSelected === 'identifier' && (
          <EditIdentifiersFrom data={data} onClose={onClose} />
        )}
      </Modal.Body>
    </Modal>
  )
}

export default EditCollectionModal
