/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, forwardRef } from 'react'
import { Form } from 'react-bootstrap'

/**
 * Checkbox used for advanced search field options
 * @param {string} label label for the form group
 * @param {string} value the UUID of the option
 * @param {string} helpTextKey the checkbox's corresponding help text
 * @param {boolean} checked value is checked or not
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} onCheck callback function to check the checkbox
 * @returns {JSX.Element}
 */
const DropdownCheckbox = forwardRef<
  HTMLDivElement,
  {
    label: string
    value: string
    selectedOptions: Array<string>
    onCheck: (e: ChangeEvent<HTMLInputElement>) => void
  }
>(({ label, value, selectedOptions, onCheck }, ref) => {
  // const handleCheckboxSelection = (e: ChangeEvent<HTMLInputElement>): void => {
  //   e.stopPropagation()
  //   onCheck(e)
  // }

  return (
    <Form.Group
      className="mx-2 fw-normal d-flex mb-2"
      ref={ref}
      controlId={value}
      data-testid="options-dropdown-checkbox"
    >
      <Form.Check
        id={value}
        type="checkbox"
        className="d-flex align-top mt-0"
        checked={selectedOptions.includes(value)}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onCheck(e)}
      />
      <Form.Label column="sm" value={label} className="py-0 ps-2 pe-1 d-inline">
        {label}
      </Form.Label>
    </Form.Group>
  )
})

DropdownCheckbox.displayName = 'DropdownCheckbox'

export default DropdownCheckbox
