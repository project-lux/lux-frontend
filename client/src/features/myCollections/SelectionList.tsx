import React from 'react'

import SelectionOption from './SelectionOption'

const SelectionList: React.FC<{
  listOfRecords: Array<string>
  selected: Array<string>
  handleSelection: (value: Array<string> | string) => void
}> = ({ listOfRecords, handleSelection, selected }) => (
  <div
    className="rounded-2 border"
    style={{
      height: '300px',
      overflow: 'scroll',
    }}
    data-testid="user-collections-list-container"
  >
    {listOfRecords.map((record) => (
      <SelectionOption
        record={record}
        selectedRecords={selected}
        handleSelection={handleSelection}
      />
    ))}
  </div>
)

export default SelectionList
