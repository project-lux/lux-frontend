import React from 'react'
import { useParams } from 'react-router-dom'

import theme from '../../styles/theme'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { ResultsTab } from '../../types/ResultsTab'

const CreateCollectionButton: React.FC = () => {
  const { subTab } = useParams<keyof ResultsTab>() as ResultsTab

  let collectionsButtonText = 'Add to My Collections'
  if (subTab === 'my-collections') {
    collectionsButtonText = 'Create New'
  }

  return (
    <PrimaryButton
      type="button"
      className={`btn text-center text-nowrap rounded-3 p-2 ${width < theme.breakpoints.sm ? 'w-100 me-0' : 'me-2'} editMyCollectionsButton`}
      onClick={() => null}
      data-testid={
        subTab === 'my-collections'
          ? 'create-new-collection-button'
          : 'add-to-collection-button'
      }
      disabled={!selectAll && subTab !== 'my-collections'}
    >
      <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
      {collectionsButtonText}
    </PrimaryButton>
  )
}

export default CreateCollectionButton
