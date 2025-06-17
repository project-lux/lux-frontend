import React from 'react'

import SelectionOption from './SelectionOption'

const SelectionList: React.FC<{
  listOfUserCollections: Array<string>
}> = ({ listOfUserCollections }) => (
  <div
    className="rounded-2 border"
    data-testid="user-collections-list-container"
  >
    {listOfUserCollections.map((collection) => (
      <SelectionOption collection={collection} />
    ))}
  </div>
)

export default SelectionList
