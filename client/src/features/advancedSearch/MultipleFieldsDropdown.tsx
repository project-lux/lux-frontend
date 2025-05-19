import React, { MouseEvent } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import { useAppDispatch } from '../../app/hooks'
import {
  addHoverHelpText,
  addSelectedHelpText,
  resetHoverHelpText,
} from '../../redux/slices/helpTextSlice'
import StyledDropdown from '../../styles/shared/Dropdown'

interface IDropdown {
  options: Record<string, string>
  handleChange: (x: string) => void
  className: string
  dropdownHeaderText: string
  id: string
  ariaLabel: string
  scope?: string
  selected?: string
}

let timeout: NodeJS.Timeout

/**
 * Dropdown button used for selecting advanced search fields
 * @param {Record<string, string>} options current dropdown options
 * @param {(x: string) => void} handleChange callback function for when the option is selected
 * @param {string} className dropdown class
 * @param {string} dropdownHeaderText text to be displayed as the dropdown header
 * @param {string} id id of the dropdown
 * @param {string} ariaLabel aria-label text
 * @param {string} scope optional; scope of the current parent object within the advanced search state
 * @param {string} selected optional; current value to display as the default dropdown value
 * @returns {JSX.Element}
 */
const MultipleFieldsDropdown: React.FC<IDropdown> = ({
  options,
  handleChange,
  className,
  dropdownHeaderText,
  id,
  ariaLabel,
  scope,
  selected,
}) => {
  const dispatch = useAppDispatch()

  const setValues = (value: string): void => {
    dispatch(addHoverHelpText({ value, scope }))
  }

  const handleOnMouseEnter = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    clearTimeout(timeout)
    const target = e.target as HTMLButtonElement
    timeout = setTimeout(() => setValues(target.id), 1000)
  }

  const handleOnMouseLeave = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(resetHoverHelpText()), 1000)
  }

  const handleOptionSelection = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    handleChange(target.id)
    dispatch(addSelectedHelpText({ value: target.id, scope }))
  }

  const selectedValue =
    selected !== undefined && selected !== ''
      ? options[selected]
      : dropdownHeaderText

  return (
    <StyledDropdown id={id}>
      <Dropdown.Toggle
        id={`${id}-toggle`}
        aria-label={ariaLabel}
        className={`${className} me-2`}
        data-testid={`${id}-dropdown-toggle`}
      >
        {selectedValue !== undefined ? selectedValue : selected}
      </Dropdown.Toggle>

      <Dropdown.Menu data-testid={`${id}-menu`} id={`${id}-menu`}>
        {typeof dropdownHeaderText === 'string' && (
          <Dropdown.Header>{dropdownHeaderText}</Dropdown.Header>
        )}
        {Object.entries(options).map(([key, value]) => (
          <Dropdown.Item
            key={key}
            as="button"
            eventKey={key}
            id={key}
            aria-label={value}
            aria-describedby="help-text"
            data-testid={`${id}-${key}-option`}
            active={selected === key}
            onClick={(e: MouseEvent<HTMLButtonElement>) =>
              handleOptionSelection(e)
            }
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) =>
              handleOnMouseEnter(e)
            }
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) =>
              handleOnMouseLeave(e)
            }
          >
            {value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export default MultipleFieldsDropdown
