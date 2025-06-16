import React from 'react'

import theme from '../../styles/theme'
import PrimaryButton from '../../styles/shared/PrimaryButton'

const AddToCollectionButton: React.FC<{
  selectAll: boolean
  width: number
}> = ({ selectAll, width }) => {
  const additionalClassName =
    width < theme.breakpoints.sm ? 'w-100 me-0' : 'me-2'

  return (
    <PrimaryButton
      type="button"
      className={`btn text-center text-nowrap rounded-3 p-2 ${additionalClassName} editMyCollectionsButton`}
      onClick={() => null}
      data-testid="add-to-collection-button"
      disabled={!selectAll}
    >
      <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
      Add to My Collections
    </PrimaryButton>
  )
}

export default AddToCollectionButton
