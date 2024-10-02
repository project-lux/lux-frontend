import React, { MouseEvent } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import { useAppDispatch } from '../../app/hooks'
import { addSelectedHelpText } from '../../redux/slices/helpTextSlice'
import StyledDropdown from '../../styles/shared/Dropdown'

interface IDropdown {
  options: Array<string>
  handleChange: (x: string) => void
  className: string
  dropdownHeaderText: string | Element
  id: string
  ariaLabel: string
  scope?: string
  selected?: string
}

/**
 * Dropdown button used for selecting advanced search fields
 * @param {Record<string, string>} options current dropdown options
 * @param {(x: string) => void} handleChange callback function for when the option is selected
 * @param {string} className dropdown class
 * @param {string | Element} dropdownHeaderText text to be displayed as the dropdown header
 * @param {string} id id of the dropdown
 * @param {string} ariaLabel aria-label text
 * @param {string} scope optional; scope of the current parent object within the advanced search state
 * @param {string} selected optional; current value to display as the default dropdown value
 * @returns {JSX.Element}
 */
const DayDropdown: React.FC<IDropdown> = ({
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

  const handleOptionSelection = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    handleChange(target.id)
    if (scope) {
      dispatch(addSelectedHelpText({ value: target.id, scope }))
    }
  }

  return (
    <StyledDropdown id={id}>
      <Dropdown.Toggle
        id={`${id}-toggle`}
        aria-label={ariaLabel}
        className={`${className} me-2`}
        data-testid={`${id}-dropdown-toggle`}
      >
        {selected !== undefined ? selected : '01'}
      </Dropdown.Toggle>

      <Dropdown.Menu data-testid={`${id}-menu`} id={`${id}-menu`}>
        {typeof dropdownHeaderText === 'string' && (
          <Dropdown.Header>{dropdownHeaderText}</Dropdown.Header>
        )}
        {options.map((option) => (
          <Dropdown.Item
            key={option}
            as="button"
            eventKey={option}
            id={option}
            aria-label={option}
            aria-describedby="help-text"
            data-testid={`${id}-${option}-option`}
            active={selected === option}
            onClick={(e: MouseEvent<HTMLButtonElement>) =>
              handleOptionSelection(e)
            }
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export default DayDropdown
