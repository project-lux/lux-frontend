import React from 'react'

import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import StyledCheckboxDiv from '../../styles/features/myCollections/CheckboxDiv'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import IEntity from '../../types/data/IEntity'

const AddOption: React.FC<{
  collection: string
  selected: IEntity | null
  handleSelection: (x: IEntity) => void
}> = ({ collection, selected, handleSelection }) => {
  const { data, isSuccess, isError } = useGetItemQuery({
    uri: stripYaleIdPrefix(collection),
  })

  let primaryName: string = isError ? collection : 'Loading...'
  let classifiedAsDefaultCollection: boolean = false
  if (isSuccess && data) {
    const entity = new EntityParser(data)
    primaryName = entity.getPrimaryName(config.aat.langen)
    classifiedAsDefaultCollection = primaryName === 'Default Collection'
    if (classifiedAsDefaultCollection && selected === null) {
      handleSelection(data)
    }
    // TODO: add back in once AAT has been updated
    // classifiedAsDefaultCollection = entity.isClassifiedAs(
    //   config.aat.defaultCollection,
    // )
  }

  const handleSelectionOfRadioButton = (): void => {
    handleSelection(data)
  }

  if (isSuccess && data) {
    const isSelected = selected ? selected.id === data.id : false

    return (
      <StyledCheckboxDiv
        className="py-1 px-2"
        data-testid="collection-selection-div"
        selected={isSelected}
      >
        <input
          className="radio d-inline mt-0 selectIndividualRadioButton"
          type="radio"
          id={collection}
          onChange={() => handleSelectionOfRadioButton()}
          checked={isSelected}
        />
        <label className="form-check-label ms-2" htmlFor={collection}>
          {primaryName}
        </label>
      </StyledCheckboxDiv>
    )
  }
}

export default AddOption
