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
import EditWebpageLinksForm from './EditWebpageLinksForm'
import EditNotesForm from './EditNotesForm'

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
    case 'identifiers':
      return 'Edit Identifiers'
    case 'links':
      return 'Edit Webpage Links'
    case 'notes':
      return 'Edit Notes'
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
          <EditNamesForm data={data} onClose={onClose} />
        )}
        {editOptionSelected === 'default' && (
          <SetAsDefault data={data} onClose={onClose} />
        )}
        {editOptionSelected === 'classification' && (
          <EditClassificationsForm data={data} onClose={onClose} />
        )}
        {editOptionSelected === 'identifiers' && (
          <EditIdentifiersFrom data={data} onClose={onClose} />
        )}
        {editOptionSelected === 'links' && (
          <EditWebpageLinksForm data={data} onClose={onClose} />
        )}
        {editOptionSelected === 'notes' && (
          <EditNotesForm data={data} onClose={onClose} />
        )}
        {editOptionSelected === 'default' && (
          <SetAsDefault data={data} onClose={onClose} />
        )}
      </Modal.Body>
    </Modal>
  )
}

export default EditCollectionModal
