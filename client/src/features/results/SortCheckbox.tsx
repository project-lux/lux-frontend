import React from 'react'

import StyledCheckbox from '../../styles/features/facets/Checkbox'

const SortCheckbox: React.FC<{ value: string; key: string }> = ({
  value,
  key,
}) => {
  console.log('here')

  return (
    <div className="form-check d-block align-top">
      <StyledCheckbox
        className="form-check-input d-inline"
        type="checkbox"
        value={value}
        id={key}
      />
      <label className="form-check-label ms-2" htmlFor={key}>
        {value}
      </label>
    </div>
  )
}

export default SortCheckbox
