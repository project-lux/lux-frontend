import React, { useState } from 'react'
import _, { isUndefined } from 'lodash'

import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import StyledCheckboxDiv from '../../styles/features/myCollections/CheckboxDiv'

const DeleteOption: React.FC<{
  record: string
  isDefaultCollection: boolean
  selectedRecords: Array<{ uuid: string; isDefaultCollection: boolean }>
  handleSelection: (
    x: Array<{ uuid: string; isDefaultCollection: boolean }>,
  ) => void
}> = ({ record, isDefaultCollection, selectedRecords, handleSelection }) => {
  const [isSelected, setIsSelected] = useState<boolean>(true)
  const { data, isSuccess, isError } = useGetItemQuery({
    uri: stripYaleIdPrefix(record),
  })

  let primaryName: string = isError ? record : 'Loading...'
  if (isSuccess && data) {
    const entity = new EntityParser(data)
    primaryName = entity.getPrimaryName(config.aat.langen)
    if (isDefaultCollection) {
      // Find the default collection and set it as the default in the local state
      const target = selectedRecords.find(
        (selected) => selected.uuid === record,
      )
      const source = {
        uuid: record,
        isDefaultCollection: true,
      }
      if (!isUndefined(target)) {
        Object.assign(target, source)
        handleSelection(selectedRecords)
      }
    }
  }

  const handleSelectionOfCheckbox = (): void => {
    setIsSelected(!isSelected)
    if (isSelected) {
      handleSelection(
        _.remove(selectedRecords, function (entity) {
          return entity.uuid !== record
        }),
      )
    } else {
      handleSelection([
        ...selectedRecords,
        { uuid: record, isDefaultCollection: isDefaultCollection },
      ])
    }
  }

  return (
    <StyledCheckboxDiv
      className="py-1 px-2"
      data-testid="record-selection-div"
      selected={!isDefaultCollection && isSelected}
    >
      <input
        disabled={isDefaultCollection}
        className="checkbox d-inline mt-0 selectIndividualCheckbox"
        type="checkbox"
        id={record}
        onChange={() => handleSelectionOfCheckbox()}
        checked={!isDefaultCollection && isSelected}
      />
      <label className="form-check-label ms-2" htmlFor={record}>
        {primaryName}{' '}
        {isDefaultCollection ? '(Default collections cannot be deleted)' : ''}
      </label>
    </StyledCheckboxDiv>
  )
}

export default DeleteOption
