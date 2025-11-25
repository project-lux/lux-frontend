import React, { ChangeEvent, JSX, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { useAuth } from 'react-oidc-context'

import useApiText from '../../lib/hooks/useApiText'
import { replaceBaseUrl } from '../../lib/parse/data/helper'
import { pushClientEvent } from '../../lib/pushClientEvent'
import StyledDropdown from '../../styles/shared/Dropdown'

import DropdownOption from './DropdownOption'

interface IMultiSelectDropdown {
  id: string
  className: string
  ariaLabel: string
  options: Record<string, string>
  selectedOptions: Array<string>
  indexOfData: number
  onCheck: (e: ChangeEvent<HTMLInputElement>, ind: number) => void
  required?: boolean
}

/**
 * Dropdown button that displays options for the current selected field.
 * @param {string} id the id of the dropdown toggle
 * @param {string} className the className of the dropdown toggle
 * @param {string} ariaLabel the aria-label of the dropdown toggle
 * @param {Record<string, string>} options the available options for selection
 * @param {Array<string>} selectedOptions the current selected options
 * @param {number} indexOfData the index of the parent record being edited
 * @param {() => void} onCheck the function to call when an option is selected
 * @returns {JSX.Element}
 */
const MultiSelectDropdown = ({
  id,
  className,
  ariaLabel,
  options,
  selectedOptions,
  indexOfData,
  onCheck,
}: IMultiSelectDropdown): JSX.Element => {
  const auth = useAuth()
  const loc = useLocation()
  const [show, setShow] = useState<boolean>(false)
  const labels: Record<string, string> = {}

  Object.keys(options).forEach((key) => {
    const { value: optionVal } = useApiText({
      textOrUri: options[key],
      pageUri: loc.pathname,
      auth,
    })
    labels[key] = optionVal || options[key]
  })

  const handleClickDropdownButton = (): void => {
    pushClientEvent(
      'My Collections',
      show ? 'Closed' : 'Opened',
      'Options Dropdown Menu',
    )
    // Set the dropdown to open or close
    setShow(!show)
  }
  const dropdownButtonText =
    selectedOptions.length > 0
      ? selectedOptions
          .map((sO) => {
            const newKey = replaceBaseUrl(sO)
            return options[newKey]
          })
          .join(', ')
      : 'Select'

  return (
    <StyledDropdown show={show} onToggle={handleClickDropdownButton}>
      <Dropdown.Toggle
        id={id}
        data-testid={id}
        className={className}
        aria-label={ariaLabel}
      >
        {dropdownButtonText}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(options).map((key) => (
          <Dropdown.Item
            as={DropdownOption}
            label={labels[key] || 'Unknown label'}
            value={key}
            selectedOptions={selectedOptions}
            indexOfData={indexOfData}
            onCheck={onCheck}
            isCheckboxDisabled={options[key] === 'Personal Collection'}
          />
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export default MultiSelectDropdown
