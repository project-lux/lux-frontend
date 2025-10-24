import React, { type JSX } from 'react'

const SelectionList: React.FC<{
  children: Array<JSX.Element>
}> = ({ children }) => (
  <div
    className="rounded-2 border"
    style={{
      height: '300px',
      overflow: 'scroll',
    }}
    data-testid="user-collections-list-container"
  >
    {children}
  </div>
)

export default SelectionList
