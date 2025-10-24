import React, { type JSX } from 'react'

import PrimaryButton from '../../styles/shared/PrimaryButton'

/**
 * Button to add a record or records to a collection
 * @param {boolean} selectAll sets whether or not the modal is visible on the page
 * @param {() => void} setShowModal function to open the modal
 * @param {string} additionalClassName className for the button
 * @returns {JSX.Element}
 */
const AddToCollectionButton: React.FC<{
  setShowModal: (x: boolean) => void
  children: JSX.Element
  disabled?: boolean
  additionalClassName?: string
}> = ({ disabled = true, additionalClassName, setShowModal, children }) => (
  <PrimaryButton
    type="button"
    className={`btn text-center text-nowrap rounded-3 p-2 ${additionalClassName || ''} editMyCollectionsButton`}
    onClick={() => setShowModal(true)}
    data-testid="add-to-collection-button"
    disabled={disabled}
  >
    {children}
  </PrimaryButton>
)

export default AddToCollectionButton
