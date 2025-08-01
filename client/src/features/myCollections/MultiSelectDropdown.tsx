/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

import StyledDropdown from '../../styles/shared/Dropdown'
import { pushClientEvent } from '../../lib/pushClientEvent'
import ApiText from '../common/ApiText'

import DropdownOption from './DropdownOption'

interface IFieldSelectRow {
  id: string
  className: string
  ariaLabel: string
  options: Record<string, string>
  selectedOptions: Array<string>
  onCheck: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Dropdown button that displays options for the current selected field.
 * @param {string} id the id of the dropdown toggle
 * @param {string} className the className of the dropdown toggle
 * @param {string} ariaLabel the aria-label of the dropdown toggle
 * @param {Record<string, string>} options the available options for selection
 * @param {Array<string>} selectedOptions the current selected options
 * @param {() => void} onCheck the function to call when an option is selected
 * @param {() => void} onUncheck the function to call when an option is removed
 * @returns {JSX.Element}
 */
const MultiSelectDropdown: React.FC<IFieldSelectRow> = ({
  id,
  className,
  ariaLabel,
  options,
  selectedOptions,
  onCheck,
}) => {
  const [show, setShow] = useState<boolean>(false)

  const handleClickDropdownButton = (e: any): void => {
    pushClientEvent(
      'My Collections',
      e.target.classList.contains('show') ? 'Closed' : 'Opened',
      'Options Dropdown Menu',
    )
    // Set the dropdown to open or close
    setShow(!show)
  }
  const dropdownButtonText =
    selectedOptions.length > 0
      ? selectedOptions.map((sO) => options[sO]).join(', ')
      : 'Select'

  return (
    <StyledDropdown show={show}>
      <Dropdown.Toggle
        id={id}
        data-testid={id}
        className={className}
        aria-label={ariaLabel}
        onClick={handleClickDropdownButton}
      >
        {dropdownButtonText}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(options).map((key) => (
          <Dropdown.Item
            as={DropdownOption}
            label={ApiText(options[key]) || 'Unknown label'}
            value={key}
            selectedOptions={selectedOptions}
            onCheck={onCheck}
          />
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export default MultiSelectDropdown
