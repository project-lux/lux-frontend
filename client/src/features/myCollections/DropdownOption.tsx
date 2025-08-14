import React, { ChangeEvent, forwardRef } from 'react'
import { Form } from 'react-bootstrap'

/**
 * Checkbox used for advanced search field options
 * @param {string} label label for the form group
 * @param {string} value the UUID of the option
 * @param {string} helpTextKey the checkbox's corresponding help text
 * @param {boolean} checked value is checked or not
 * @param {(e: ChangeEvent<HTMLInputElement>, ind: number) => void} onCheck callback function to check the checkbox
 * @returns {JSX.Element}
 */
const DropdownCheckbox = forwardRef<
  HTMLDivElement,
  {
    label: string
    value: string
    selectedOptions: Array<string>
    indexOfData: number
    onCheck: (e: ChangeEvent<HTMLInputElement>, ind: number) => void
    isCheckboxDisabled?: boolean
  }
>(
  (
    {
      label,
      value,
      selectedOptions,
      indexOfData,
      onCheck,
      isCheckboxDisabled = false,
    },
    ref,
  ) => (
    <Form.Group
      className="mx-2 fw-normal d-flex mb-2"
      ref={ref}
      controlId={value}
      data-testid="options-dropdown-checkbox"
    >
      <Form.Check
        id={`${value}-${indexOfData}`}
        type="checkbox"
        className="d-flex align-top mt-0"
        checked={selectedOptions.includes(value)}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onCheck(e, indexOfData)}
        disabled={isCheckboxDisabled}
      />
      <Form.Label
        column="sm"
        htmlFor={`${value}-${indexOfData}`}
        value={value}
        className="py-0 ps-2 pe-1 d-inline"
      >
        {label}
      </Form.Label>
    </Form.Group>
  ),
)

DropdownCheckbox.displayName = 'DropdownCheckbox'

export default DropdownCheckbox
