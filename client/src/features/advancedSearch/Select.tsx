import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import { isUndefined } from 'lodash'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import {
  addHoverHelpText,
  addSelectedHelpText,
  resetHoverHelpText,
} from '../../redux/slices/helpTextSlice'
import { dropdownGroupings, scopeToAriaLabel } from '../../config/searchTypes'
import { capitalizeLabels } from '../../lib/parse/data/helper'
import theme from '../../styles/theme'
// import AdvancedSearchDropdown from './Dropdown'

const FormSelect = styled(Form.Select)`
  &.form-select {
    color: ${theme.color.button};
    background-color: ${theme.color.white};
    border: 1px solid ${theme.color.button};
    border-radius: 5px;
    width: auto;

    &.mobileNavigationDropdown {
      color: ${theme.color.button};
      border: none;
      display: flex;
    }
  }

  .dropdown-toggle.show {
    color: ${theme.color.button};
    background-color: ${theme.color.white};
  }

  .dropdown-menu.show {
    max-height: 400px;
    overflow-y: scroll;
  }

  .dropdown-item.active &.btn:active {
    background-color: ${theme.color.primary.blue};
  }

  &#advanced-search-switch {
    display: none;

    @media (min-width: ${theme.breakpoints.md}px) {
      display: block;
    }
  }
`

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
const Select: React.FC<IDropdown> = ({
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

  const handleOnMouseEnter = (
    e: MouseEventHandler<HTMLSelectElement>,
  ): void => {
    clearTimeout(timeout)
    console.log(className, ariaLabel)
    const target = e.target as HTMLButtonElement
    timeout = setTimeout(() => setValues(target.id), 1000)
  }

  const handleOnMouseLeave = (): void => {
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(resetHoverHelpText()), 1000)
  }

  const handleOptionSelection = (
    e: ChangeEventHandler<HTMLSelectElement>,
  ): void => {
    console.log(e)
    const target = e.target.value
    console.log('target: ', target)
    handleChange(target)
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
    <FormSelect
      aria-label={
        selectedValue !== undefined ? selectedValue : dropdownHeaderText
      }
      onChange={(e: ChangeEventHandler<HTMLSelectElement>) =>
        handleOptionSelection(e)
      }
      onMouseOver={(e: MouseEventHandler<HTMLSelectElement>) =>
        handleOnMouseEnter(e)
      }
      onMouseLeave={() => handleOnMouseLeave()}
    >
      {typeof dropdownHeaderText === 'string' && (
        <option disabled selected={selectedValue === undefined}>
          {dropdownHeaderText}
        </option>
      )}
      {dropdownType === 'singleFieldSelection' ? (
        <React.Fragment>
          {dropdownGroupings.map((scopeName) => {
            if (!isUndefined(options[scopeName])) {
              return (
                <React.Fragment>
                  <option className="border-bottom fw-bold" disabled>
                    {scopeToAriaLabel[scopeName] !== undefined
                      ? capitalizeLabels(scopeToAriaLabel[scopeName])
                      : capitalizeLabels(scopeName)}
                  </option>
                  {Object.entries(options[scopeName]).map(([term, label]) => (
                    <option
                      key={term}
                      className="ps-4"
                      eventKey={term}
                      id={term}
                      aria-label={label}
                      aria-describedby="help-text"
                      data-testid={`${id}-${term}-option`}
                      active={selected === term}
                    >
                      {label}
                    </option>
                  ))}
                </React.Fragment>
              )
            }
          })}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {Object.entries(options).map(([key, value]) => (
            <option
              key={key}
              id={key}
              aria-label={value as string}
              aria-describedby="help-text"
              data-testid={`${id}-${key}-option`}
              active={selected === key}
            >
              {value as string}
            </option>
          ))}
        </React.Fragment>
      )}
    </FormSelect>
  )
}

export default Select
