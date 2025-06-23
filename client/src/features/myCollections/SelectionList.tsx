import React from 'react'

import SelectionOption from './SelectionOption'

const SelectionList: React.FC<{
  listOfRecords: Array<string>
}> = ({ listOfRecords }) => (
  <div
    className="rounded-2 border"
    style={{
      height: '300px',
      overflow: 'scroll',
    }}
    data-testid="user-collections-list-container"
  >
    {listOfRecords.map((record) => (
      <SelectionOption record={record} />
    ))}
  </div>
)

export default SelectionList
