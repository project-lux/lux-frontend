/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import StyledDropdown from '../../styles/shared/Dropdown'

interface IDropdown {
  options: Record<string, string>
  handleChange: any
  className: string
  id: string
  label: string
  headerText: string
  selected?: string
}

const SortDropdown: React.FC<IDropdown> = ({
  options,
  handleChange,
  className,
  id,
  label,
  headerText,
  selected,
}) => {
  const handleOptionSelection = (value: string): void => {
    handleChange(value)
  }

  return (
    <StyledDropdown
      onSelect={handleOptionSelection}
      className={`${className} me-2`}
      data-testid={id}
    >
      <Dropdown.Toggle id={id} data-testid={`${id}-button`}>
        {selected !== undefined && options[selected] !== undefined
          ? options[selected]
          : label}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>{headerText}</Dropdown.Header>
        {Object.entries(options).map(([key, value]) => (
          <Dropdown.Item
            key={key}
            as="button"
            eventKey={key}
            aria-label={`Sort by ${value}`}
            data-testid="search-results-sorting-option"
            active={selected === key}
          >
            {value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export default SortDropdown
