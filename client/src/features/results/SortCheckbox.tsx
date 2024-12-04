import React from 'react'

import StyledCheckbox from '../../styles/features/facets/Checkbox'

interface IProps {
  value: string
  option: string
  name: 'By' | 'Direction'
  handleSelection: (x: string) => void
  selected?: string
}

const SortCheckbox: React.FC<IProps> = ({
  value,
  option,
  name,
  selected,
  handleSelection,
}) => {
  const radioButtonName = `sort${name}`

  return (
    <div className="form-check d-block align-top ps-0">
      <StyledCheckbox
        className="form-radio-input d-inline"
        type="radio"
        value={value}
        id={option}
        name={radioButtonName}
        onChange={() => handleSelection(option)}
        checked={option === selected}
      />
      <label className="form-check-label ms-2" htmlFor={option}>
        {value}
      </label>
    </div>
  )
}

export default SortCheckbox
