import React from 'react'

import PrimaryButton from '../../styles/shared/PrimaryButton'

const CreateCollectionButton: React.FC<{
  additionalClassName: string
  setShowModal: (x: boolean) => void
}> = ({ additionalClassName, setShowModal }) => (
  <PrimaryButton
    type="button"
    className={`btn text-center text-nowrap rounded-3 p-2 ${additionalClassName} editMyCollectionsButton`}
    onClick={() => setShowModal(true)}
    data-testid="create-new-collection-button"
  >
    <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
    Create New
  </PrimaryButton>
)

export default CreateCollectionButton
