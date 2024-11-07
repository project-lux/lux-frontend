import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { advancedSearch } from '../../config/advancedSearch/advancedSearch'
import { conditionals } from '../../config/advancedSearch/conditionals'
import { nonSearchTermHelpText } from '../../config/advancedSearch/helpText'
import config from '../../config/config'
import { getStateId } from '../../lib/advancedSearch/stateId'
import { dimensions } from '../../config/advancedSearch/inputTypes'

import AppRender from './utils/AppRender'
import eventTrackingMock from './utils/eventTrackingMock'

jest.mock('../../lib/advancedSearch/stateId', () => ({
  __esModule: true,
  getStateId: jest.fn(() => '1'),
}))

describe('Advanced Search', () => {
  config.advancedSearch = advancedSearch()

  const page = '/view/results/objects?q='

  beforeEach(async () => {
    const stateId = getStateId as jest.MockedFunction<typeof getStateId>
    stateId.mockImplementation(() => '1')
    eventTrackingMock()
  })

  it('renders', async () => {
    render(<AppRender route={page} />)

    const form = screen.getByTestId('advanced-search-form-container')
    expect(form).toBeInTheDocument()
  })

  it('renders advanced search title', async () => {
    render(<AppRender route={page} />)

    const header = screen.getByTestId('advanced-search-header')
    expect(header).toHaveTextContent('Search for Objects that...')
  })

  it('renders show all rows button', async () => {
    const searchLinkPage = `/view/results/works?q={"AND":[{"OR":[{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}},{"publishedBy":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}},{"creationInfluencedBy":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]},{"publishedDate":"1975-12-31T00:00:00.000Z","_comp":"<="},{"publishedDate":"1975-01-01T00:00:00.000Z","_comp":">="}]}&openSearch=false`
    render(<AppRender route={searchLinkPage} />)

    const button = screen.getByTestId('advanced-search-rows-button')
    expect(button).toBeInTheDocument()
  })

  describe('Form', () => {
    it('renders the FieldSelectRow component', async () => {
      render(<AppRender route={page} />)

      const fieldSelectRow = screen.getByTestId(/field-select-row-1/i)
      expect(fieldSelectRow).toBeInTheDocument()
    })

    it('renders the InputRow component', async () => {
      // advanced search fields that render the InputRow
      const inputFields = [
        'name',
        'text',
        'id',
        'identifier',
        'encounteredDate',
        'producedDate',
        'hasDigitalImage',
        'isOnline',
      ]
      const randomIndex = Math.floor(Math.random() * inputFields.length)
      const field = inputFields[randomIndex]
      render(<AppRender route={page} />)

      // select the single field dropdown
      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // select name
      const dropdownItem = screen.getByTestId(`single-fields-1-${field}-option`)
      await act(async () => {
        fireEvent.click(dropdownItem)
      })
      // expect the input row to be in the document
      const inputRow = screen.getByTestId(`${field}-1-input-row`)
      expect(inputRow).toBeInTheDocument()
    })

    it('renders the Group component', async () => {
      // advanced search fields that render the Group component
      const conditionalKeys = Object.keys(conditionals)
      const randomIndex = Math.floor(Math.random() * conditionalKeys.length)
      const groupField = conditionalKeys[randomIndex]

      render(<AppRender route={page} />)

      // select the multiple field dropdown
      const dropdown = screen.getByTestId(/multiple-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // select AND
      const dropdownItem = screen.getByTestId(
        `multiple-fields-1-${groupField}-option`,
      )
      await act(async () => {
        fireEvent.click(dropdownItem)
      })

      // expect the group to be in the document
      const group = screen.getByTestId(`${groupField}-1-group-row`)
      expect(group).toBeInTheDocument()
    })

    it('renders the RelationshipRow component', async () => {
      render(<AppRender route={page} />)

      // select the single field dropdown
      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // select created by
      const dropdownItem = screen.getByTestId(
        /single-fields-1-producedAt-option/i,
      )
      await act(async () => {
        fireEvent.click(dropdownItem)
      })

      // expect the relationship row to be in the document
      const relationshipRow = screen.getByTestId(
        'producedAt-1-relationship-row',
      )
      expect(relationshipRow).toBeInTheDocument()
    })
  })

  describe('SubmitButton', () => {
    it('is disabled if there is no valid input', async () => {
      render(<AppRender route={page} />)

      const submitButton = screen.getByTestId('advanced-search-submit-button')
      expect(submitButton).toBeDisabled()
    })

    it('is enabled if there is valid input', async () => {
      render(<AppRender route={page} />)
      const input = screen.getByTestId('name-1-text-input')
      await act(async () => {
        fireEvent.change(input, { target: { value: 'something valid' } })
      })
      const submitButton = screen.getByTestId('advanced-search-submit-button')
      expect(submitButton).toBeEnabled()
    })
  })

  describe('AddButton', () => {
    it('adds a new row to a group', async () => {
      render(<AppRender route={page} />)

      const dropdown = screen.getByTestId(/multiple-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })

      // select AND
      const dropdownItem = screen.getByTestId(/multiple-fields-1-AND-option/i)
      await act(async () => {
        fireEvent.click(dropdownItem)
      })

      // add a row
      const addButton = screen.getByTestId('1-add-row-button')
      await act(async () => {
        fireEvent.click(addButton)
      })

      const secondRow = screen.getByTestId(/field-select-row-1-1/i)
      expect(secondRow).toBeInTheDocument()
    })
  })

  describe('RemoveButton', () => {
    it('removes the row from the advanced search form', async () => {
      render(<AppRender route={page} />)

      const dropdown = screen.getByTestId(/multiple-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // select AND
      const dropdownItem = screen.getByTestId(/multiple-fields-1-AND-option/i)
      await act(async () => {
        fireEvent.click(dropdownItem)
      })
      // add a row
      const addButton = screen.getByTestId('1-add-row-button')
      await act(async () => {
        fireEvent.click(addButton)
      })
      // expect the row to be there once it is added
      const secondRow = screen.getByTestId(/field-select-row-1-1/i)
      expect(secondRow).toBeInTheDocument()

      // remove the row just added
      const removeButton = screen.getByTestId('1-1-remove-row-button-1')
      await act(async () => {
        fireEvent.click(removeButton)
      })

      // expect the row to be removed
      expect(secondRow).not.toBeInTheDocument()
    })
  })

  describe('InputRow', () => {
    it('renders the FieldSelectRow component', async () => {
      render(<AppRender route={page} />)

      const fieldSelectRow = screen.getByTestId(/field-select-row-1/i)
      expect(fieldSelectRow).toBeInTheDocument()
    })

    it('renders the TextInput component', async () => {
      // advanced search fields that render the TextInput component
      const inputFields = ['name', 'text', 'id', 'identifier']
      const randomIndex = Math.floor(Math.random() * inputFields.length)
      const field = inputFields[randomIndex]
      render(<AppRender route={page} />)

      // select the single field dropdown
      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // select name
      const dropdownItem = screen.getByTestId(`single-fields-1-${field}-option`)
      await act(async () => {
        fireEvent.click(dropdownItem)
      })
      // expect the input row to be in the document
      const inputRow = screen.getByTestId(`${field}-1-text-input`)
      expect(inputRow).toBeInTheDocument()
    })

    it('renders the DateRangeInput component', async () => {
      // advanced search fields that render the TextInput component
      const rangeFields = ['encounteredDate', 'producedDate']
      const randomIndex = Math.floor(Math.random() * rangeFields.length)
      const field = rangeFields[randomIndex]

      render(<AppRender route={page} />)

      // select the single field dropdown
      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // select name
      const dropdownItem = screen.getByTestId(`single-fields-1-${field}-option`)

      await act(async () => {
        fireEvent.click(dropdownItem)
      })
      // expect the input row to be in the document
      const inputRow = screen.getByTestId(`${field}-1-date-input`)
      expect(inputRow).toBeInTheDocument()
    })

    it('renders the RangeInput component', async () => {
      // advanced search fields that render the TextInput component
      const randomIndex = Math.floor(Math.random() * dimensions.length)
      const field = dimensions[randomIndex]

      render(<AppRender route={page} />)

      // select the single field dropdown
      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // select name
      const dropdownItem = screen.getByTestId(`single-fields-1-${field}-option`)
      await act(async () => {
        fireEvent.click(dropdownItem)
      })
      // expect the input row to be in the document
      const inputRow = screen.getByTestId(`${field}-1-range-input`)
      expect(inputRow).toBeInTheDocument()
    })

    it('renders the BooleanInput component', async () => {
      // advanced search fields that render the InputRow
      const inputFields = ['hasDigitalImage', 'isOnline']
      const randomIndex = Math.floor(Math.random() * inputFields.length)
      const field = inputFields[randomIndex]
      render(<AppRender route={page} />)

      // select the single field dropdown
      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // select name
      const dropdownItem = screen.getByTestId(`single-fields-1-${field}-option`)
      await act(async () => {
        fireEvent.click(dropdownItem)
      })
      // expect the input row to be in the document
      const inputRow = screen.getByTestId(`${field}-1-boolean-input`)
      expect(inputRow).toBeInTheDocument()
    })
  })

  describe('Dropdown', () => {
    it('renders the correct number of options', async () => {
      const totalOptions = Object.keys(config.advancedSearch.terms.item).length
      render(<AppRender route={page} />)

      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // get all dropdown options
      const dropdownOptions = screen.getAllByTestId(
        /single-fields-1-[a-zA-Z]*-option/i,
      )
      expect(dropdownOptions.length).toBe(totalOptions)
    })

    it('renders the correct help text onMouseEnter', async () => {
      // Testing with the name field
      render(<AppRender route={page} />)

      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // hover over option
      jest.useFakeTimers()
      const dropdownOption = screen.getByTestId(/single-fields-1-name-option/i)
      await act(async () => {
        fireEvent.mouseOver(dropdownOption)
      })
      jest.runAllTimers()

      expect(
        screen.getByText(config.advancedSearch.terms.item.name.helpText),
      ).toBeInTheDocument()
    })

    it('renders the previous help text onMouseLeave', async () => {
      // Testing with the name field
      render(<AppRender route={page} />)

      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      // hover over option
      jest.useFakeTimers()
      const dropdownOption = screen.getByTestId(/single-fields-1-name-option/i)
      await act(async () => {
        fireEvent.mouseOver(dropdownOption)
      })
      jest.runAllTimers()

      await act(async () => {
        fireEvent.mouseLeave(dropdownOption)
      })
      jest.runAllTimers()

      expect(
        screen.getByText(nonSearchTermHelpText.fieldSelectRow.helpText),
      ).toBeInTheDocument()
    })

    it('renders the active selection in the dropdown', async () => {
      // Testing with the name field
      render(<AppRender route={page} />)

      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      const dropdownOption = screen.getByTestId(/single-fields-1-name-option/i)
      await act(async () => {
        fireEvent.click(dropdownOption)
      })
      const selectedDropdown = screen.getByTestId(
        /input-row-1-dropdown-toggle/i,
      )
      expect(selectedDropdown).toHaveTextContent('Name')
    })
  })

  describe('AlertModal', () => {
    it('renders the modal when a user selects to go to simple search', async () => {
      render(<AppRender route={page} />)

      const toggleButton = screen.getByTestId(/search-toggle-button/i)
      await act(async () => {
        fireEvent.click(toggleButton)
      })
      const modal = screen.getByText(
        /You are about to leave the advanced search form. All input will be lost. Do you wish to continue?/i,
      )
      expect(modal).toBeInTheDocument()
    })
  })

  describe('OptionsButton', () => {
    it('renders the correct number of options', async () => {
      render(<AppRender route={page} />)

      const dropdown = screen.getByTestId(/single-fields-1-dropdown-toggle/i)
      await act(async () => {
        fireEvent.click(dropdown)
      })
      const dropdownOption = screen.getByTestId(/single-fields-1-name-option/i)
      await act(async () => {
        fireEvent.click(dropdownOption)
      })
      const gearDropdown = screen.getByTestId(/gear-toggle-1/i)
      await act(async () => {
        fireEvent.click(gearDropdown)
      })
      const options = screen.getAllByTestId(/options-dropdown-checkbox/i)

      expect(options.length).toEqual(7)
    })
  })

  afterEach(cleanup)
})
