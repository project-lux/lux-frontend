import React from 'react'

import SecondaryButton from '../../styles/shared/SecondaryButton'
import theme from '../../styles/theme'

const CreateCollectionButton: React.FC<{
  additionalClassName: string
}> = ({ additionalClassName }) => (
  <SecondaryButton
    type="button"
    className={`btn text-center text-nowrap rounded-3 p-2 ${additionalClassName} editMyCollectionsButton`}
    onClick={() => null}
    textColor={theme.color.button}
    actionBgColor={theme.color.black20}
    data-testid="create-new-collection-button"
  >
    <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
    Create New
  </SecondaryButton>
)

export default CreateCollectionButton
