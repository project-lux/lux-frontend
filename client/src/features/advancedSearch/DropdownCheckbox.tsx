/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, forwardRef } from 'react'
import { Form } from 'react-bootstrap'

import { useAppDispatch } from '../../app/hooks'
import {
  addHoverHelpText,
  resetHoverHelpText,
} from '../../redux/slices/helpTextSlice'
import { pushClientEvent } from '../../lib/pushClientEvent'

let timeout: NodeJS.Timeout

/**
 * Checkbox used for advanced search field options
 * @param {string} label label for the form group
 * @param {string} helpTextKey the checkbox's corresponding help text
 * @param {boolean} checked value is checked or not
 * @param {() => void} onCheck callback function to check the checkbox
 * @param {() => void} onUncheck callback function to uncheck the checkbox
 * @returns {JSX.Element}
 */
const DropdownCheckbox = forwardRef<
  HTMLDivElement,
  {
    label: string
    helpTextKey: string
    checked: boolean
    onCheck: () => void
    onUncheck: () => void
  }
>(({ label, checked, helpTextKey, onCheck, onUncheck }, ref) => {
  const dispatch = useAppDispatch()

  const setValues = (value: string): void => {
    dispatch(addHoverHelpText({ value }))
  }

  const handleOnCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation()
    pushClientEvent('Options', 'Checked', e.target.id)
    onCheck()
  }

  const handleOnUncheck = (e: ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation()
    pushClientEvent('Options', 'Unchecked', e.target.id)
    onUncheck()
  }

  const handleOnMouseEnter = (e: any): void => {
    e.preventDefault()
    clearTimeout(timeout)
    timeout = setTimeout(() => setValues(helpTextKey), 1000)
  }

  const handleOnMouseLeave = (e: any): void => {
    e.preventDefault()
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(resetHoverHelpText()), 1000)
  }

  return (
    <Form.Group
      className="mx-2 fw-normal d-flex mb-2"
      ref={ref}
      controlId={label}
      onMouseOver={(e) => handleOnMouseEnter(e)}
      onMouseLeave={(e) => handleOnMouseLeave(e)}
      data-testid="options-dropdown-checkbox"
    >
      <Form.Check
        type="checkbox"
        className="d-flex align-top mt-0"
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          checked ? handleOnUncheck(e) : handleOnCheck(e)
        }
      />
      <Form.Label column="sm" value={label} className="py-0 ps-2 pe-1 d-inline">
        {label}
      </Form.Label>
    </Form.Group>
  )
})

DropdownCheckbox.displayName = 'DropdownCheckbox'

export default DropdownCheckbox
