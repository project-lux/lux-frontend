import React, { MouseEvent } from 'react'
import { Row, Col, Dropdown } from 'react-bootstrap'

import StyledDropdown from '../../styles/shared/Dropdown'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addHoverHelpText,
  addSelectedHelpText,
  resetHoverHelpText,
} from '../../redux/slices/helpTextSlice'
import {
  advancedSearchTitles,
  searchScope,
  scopeToOptionLabel,
} from '../../config/searchTypes'
import {
  addScope,
  IAdvancedSearchState,
  resetState,
} from '../../redux/slices/advancedSearchSlice'
import StyledInputGroupDiv from '../../styles/features/advancedSearch/InputGroup'
import theme from '../../styles/theme'

import DescriptiveText from './DescriptiveText'

let timeout: NodeJS.Timeout

/**
 * Contains the functionality and components of a nested relationship within the advanced search state.
 * @returns {JSX.Element}
 */
const ScopeSelectionRow: React.FC = () => {
  const dispatch = useAppDispatch()
  const currentState = useAppSelector(
    (asState) => asState.advancedSearch as IAdvancedSearchState,
  )
  const selectedScope = scopeToOptionLabel[currentState._scope as string]

  const setValues = (value: string): void => {
    dispatch(addHoverHelpText({ value, scope: selectedScope }))
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
    const scope = searchScope[target.id]
    dispatch(
      addSelectedHelpText({
        value: target.id,
        scope,
      }),
    )
    dispatch(resetState())
    dispatch(
      addScope({
        scope,
      }),
    )
  }

  return (
    <Row className="mb-4">
      <Col xs={12} style={{ backgroundColor: theme.color.advancedSearchRow }}>
        <StyledInputGroupDiv>
          <span className="w-100 d-flex ps-2 py-2">
            <DescriptiveText text="I want to find" className="me-2" />
            <StyledDropdown id="advanced-search-scope-dropdown">
              <Dropdown.Toggle
                id="advanced-search-scope-toggle"
                aria-label="Select a scope for the advanced search."
                className="me-2"
                data-testid="advanced-search-scope-dropdown-toggle"
              >
                {selectedScope !== undefined ? selectedScope : 'Select option'}
              </Dropdown.Toggle>

              <Dropdown.Menu
                data-testid="advanced-search-scope-menu"
                id="advanced-search-scope-menu"
              >
                {Object.entries(advancedSearchTitles).map(([key, value]) => (
                  <Dropdown.Item
                    key={key}
                    as="button"
                    eventKey={key}
                    id={key}
                    aria-label={value}
                    aria-describedby="help-text"
                    data-testid={`advanced-search-${key}-option`}
                    active={selectedScope === key}
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
            <DescriptiveText text="that" />
          </span>
        </StyledInputGroupDiv>
      </Col>
    </Row>
  )
}

export default ScopeSelectionRow
