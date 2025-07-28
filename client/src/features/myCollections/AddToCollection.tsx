import React, { useState } from 'react'

import { onAddRequest } from '../../lib/myCollections/onAddRequest'
import { pushClientEvent } from '../../lib/pushClientEvent'

import AddToCollectionButton from './AddToCollectionButton'
import AddToCollectionModal from './AddToCollectionModal'
import CreateCollectionModal from './CreateCollectionModal'

interface IProps {
  successMessage: string
  errorMessage: string
  redirectPathname: string
  redirectSearchParams?: string
  buttonClassName: string
  buttonDisabled?: boolean
}

const AddToCollection: React.FC<IProps> = ({
  successMessage,
  errorMessage,
  redirectPathname,
  redirectSearchParams,
  buttonClassName,
  buttonDisabled = false,
}) => {
  const [showAddToCollectionModal, setShowAddToCollectionModal] =
    useState<boolean>(false)
  const [showCreateCollectionModal, setShowCreateCollectionModal] =
    useState<boolean>(false)

  // event to handle the closing of the add to collection modal
  const handleCloseAddModal = (): void => {
    pushClientEvent('My Collections', 'Closed', 'Add to My Collections modal')
    setShowAddToCollectionModal(false)
  }

  // event to handle the closing of the create a collection modal
  const handleCloseCreateCollectionModal = (): void => {
    pushClientEvent('My Collections', 'Closed', 'Delete Collections modal')
    setShowCreateCollectionModal(false)
  }

  return (
    <React.Fragment>
      {showAddToCollectionModal && (
        <AddToCollectionModal
          showModal={showAddToCollectionModal}
          onSuccess={() =>
            onAddRequest(
              successMessage,
              'primary',
              redirectPathname,
              redirectSearchParams,
            )
          }
          onError={() =>
            onAddRequest(
              errorMessage,
              'danger',
              redirectPathname,
              redirectSearchParams,
            )
          }
          onClose={handleCloseAddModal}
          showCreateNewModal={setShowCreateCollectionModal}
        />
      )}
      {showCreateCollectionModal && (
        <CreateCollectionModal
          showModal={showCreateCollectionModal}
          onClose={handleCloseCreateCollectionModal}
        />
      )}
      <AddToCollectionButton
        additionalClassName={buttonClassName}
        setShowModal={setShowAddToCollectionModal}
        disabled={buttonDisabled}
      >
        <React.Fragment>
          <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
          Add to My Collections
        </React.Fragment>
      </AddToCollectionButton>
    </React.Fragment>
  )
}

export default AddToCollection
