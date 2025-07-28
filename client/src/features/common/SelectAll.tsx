import React from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../app/hooks'
import {
  IMyCollectionsResultsState,
  addSelectAll,
  resetState,
} from '../../redux/slices/myCollectionsSlice'

interface ISelectAll {
  uuidsToAdd: Array<string>
  scope: string
}

const SelectAll: React.FC<ISelectAll> = ({ uuidsToAdd, scope }) => {
  const dispatch = useDispatch()
  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids } = currentMyCollectionState
  // The select all checkbox will be checked as long as there are 1 or more entities selected
  const isSelectAllChecked = uuids.length > 0

  // Handle the selection of the entity's checkbox
  const handleSelectAllCheckboxSelection = (): void => {
    if (isSelectAllChecked) {
      dispatch(resetState())
    } else {
      dispatch(addSelectAll({ uuids: uuidsToAdd, scope }))
    }
  }

  return (
    <span className="d-flex align-items-center">
      <input
        className="form-check-input d-inline mt-0 selectAllResultsCheckbox"
        type="checkbox"
        id="select-all-checkbox"
        onChange={() => handleSelectAllCheckboxSelection()}
        checked={isSelectAllChecked}
      />
      <label className="form-check-label ms-2" htmlFor="select-all-checkbox">
        {isSelectAllChecked ? `${uuids.length} Selected` : 'Select All'}
      </label>
    </span>
  )
}

export default SelectAll
