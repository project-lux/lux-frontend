import React, { MouseEvent } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { isUndefined } from 'lodash'

import { useAppDispatch } from '../../app/hooks'
import {
  addHoverHelpText,
  addSelectedHelpText,
  resetHoverHelpText,
} from '../../redux/slices/helpTextSlice'
import StyledDropdown from '../../styles/shared/Dropdown'
import { dropdownGroupings, scopeToAriaLabel } from '../../config/searchTypes'
import { capitalizeLabels } from '../../lib/parse/data/helper'

interface IDropdown {
  dropdownType:
    | 'multipleFieldSelection'
    | 'singleFieldSelection'
    | 'comparatorSelection'
    | 'classSelection'
  options: Record<string, string | Record<string, string>>
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
 * @param {string} dropdownType current dropdown options
 * @param {Record<string, string | Record<string, string>>} options current dropdown options
 * @param {(x: string) => void} handleChange callback function for when the option is selected
 * @param {string} className dropdown class
 * @param {string} dropdownHeaderText text to be displayed as the dropdown header
 * @param {string} id id of the dropdown
 * @param {string} ariaLabel aria-label text
 * @param {string} scope optional; scope of the current parent object within the advanced search state
 * @param {string} selected optional; current value to display as the default dropdown value
 * @returns {JSX.Element}
 */
const AdvancedSearchDropdown: React.FC<IDropdown> = ({
  dropdownType,
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

  let selectedValue: string | undefined = undefined
  Object.keys(options).map((key: string) => {
    if (dropdownType === 'singleFieldSelection') {
      const singleFieldOptions = options as Record<
        string,
        Record<string, string>
      >
      Object.keys(singleFieldOptions[key]).map((term: string) => {
        if (term === selected) {
          selectedValue = singleFieldOptions[key][term] as string
        }
      })
    } else if (key === selected) {
      selectedValue = options[key] as string
    }
  })

  return (
    <StyledDropdown id={id}>
      <Dropdown.Toggle
        id={`${id}-toggle`}
        aria-label={ariaLabel}
        className={`${className} me-2`}
        data-testid={`${id}-dropdown-toggle`}
      >
        {selectedValue !== undefined ? selectedValue : dropdownHeaderText}
      </Dropdown.Toggle>

      <Dropdown.Menu data-testid={`${id}-menu`} id={`${id}-menu`}>
        {typeof dropdownHeaderText === 'string' && (
          <Dropdown.Header>{dropdownHeaderText}</Dropdown.Header>
        )}
        {dropdownType === 'singleFieldSelection' ? (
          <React.Fragment>
            {dropdownGroupings.map((scopeName) => {
              if (!isUndefined(options[scopeName])) {
                return (
                  <React.Fragment>
                    <Dropdown.ItemText className="border-bottom fw-bold">
                      {scopeToAriaLabel[scopeName] !== undefined
                        ? capitalizeLabels(scopeToAriaLabel[scopeName])
                        : capitalizeLabels(scopeName)}
                    </Dropdown.ItemText>
                    {Object.entries(options[scopeName]).map(([term, label]) => (
                      <Dropdown.Item
                        key={term}
                        className="ps-4"
                        as="button"
                        eventKey={term}
                        id={term}
                        aria-label={label}
                        aria-describedby="help-text"
                        data-testid={`${id}-${term}-option`}
                        active={selected === term}
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
                        {label}
                      </Dropdown.Item>
                    ))}
                  </React.Fragment>
                )
              }
            })}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {Object.entries(options).map(([key, value]) => (
              <Dropdown.Item
                key={key}
                as="button"
                eventKey={key}
                id={key}
                aria-label={value as string}
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
                {value as string}
              </Dropdown.Item>
            ))}
          </React.Fragment>
        )}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export default AdvancedSearchDropdown
