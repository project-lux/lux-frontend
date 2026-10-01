import React, { RefObject, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { isNull } from 'lodash'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addSimpleSearchInput,
  ISimpleSearchState,
  resetState,
} from '../../redux/slices/simpleSearchSlice'
import theme from '../../styles/theme'
import LoadingSpinner from '../common/LoadingSpinner'
import Disambiguation from '../aiAssistedSearch/Disambiguation'
import {
  countWords,
  validateInput,
} from '../../lib/parse/search/searchBoxHelper'

import { MAX_WORDS } from './SearchContainer'

const StyledSearchBox = styled.div`
  display: flex;
  position: relative;
  z-index: 1001;
  width: ${theme.searchBox.width};
  border: solid 1px #979797;
  border-radius: ${theme.searchBox.borderRadiusMobile};

  @media (min-width: ${theme.breakpoints.md}px) {
    border-radius: ${theme.searchBox.borderRadius};
  }

  .form-control {
    border: none;
    border-radius: ${theme.searchBox.borderRadiusMobile} 0 0
      ${theme.searchBox.borderRadiusMobile} !important;
    margin-left: 0px !important;
    max-width: ${theme.searchBox.width};
    font-weight: 300;
    height: 50px;
    font-size: 1.5rem;

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 2rem;
      height: 72px;
      border-radius: ${theme.searchBox.borderRadius} 0 0
        ${theme.searchBox.borderRadius} !important;
    }
  }

  .btn {
    &:hover {
      background-color: ${theme.color.lightGray};
    }

    &:focus {
      border: 2px solid ${theme.color.link};
    }
  }

  .submitButton {
    border: none;
    background-color: ${theme.color.white};
    height: 50px;
    font-size: 1.5rem;
    border-left: 1px solid #979797;
    border-radius: 0 ${theme.searchBox.borderRadiusMobile}
      ${theme.searchBox.borderRadiusMobile} 0;

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 2rem;
      height: 72px;
      border-radius: 0 ${theme.searchBox.borderRadius}
        ${theme.searchBox.borderRadius} 0;
    }
  }

  .clearButton {
    background-color: ${theme.color.white};
    height: 50px;
    font-size: 1.5rem;

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 2rem;
      height: 72px;
    }
  }

  .submitAiButton {
    border: none;
    background-color: ${theme.color.white};
    height: 72px;
    font-size: inherit;
  }

  .submitSearch {
    &:hover {
      background-color: ${theme.color.lightGray};
    }
  }
`

const SearchBox: React.FC<{
  id: string
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void
  isSearchLoading: boolean
  inputRef: RefObject<HTMLInputElement | null>
  aiDisambiguation: Array<any>
  setAiDisambiguation: (value: Array<any>) => void
  unselectable?: boolean
  isResults?: boolean
  setIsError: (x: boolean) => void
  isSearchOpen?: boolean
}> = ({
  id,
  submitForm,
  isSearchLoading,
  inputRef,
  aiDisambiguation,
  setAiDisambiguation,
  unselectable: isUnselectable,
  isResults,
  setIsError,
  isSearchOpen = false,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const currentState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )
  const dispatch = useAppDispatch()

  let simpleQuery: string | null = null
  const { search } = useLocation()
  const queryString = new URLSearchParams(search)
  simpleQuery = queryString.get('sq') || ''

  useEffect(() => {
    if (simpleQuery !== null) {
      dispatch(addSimpleSearchInput({ value: simpleQuery }))
    }
  }, [dispatch, simpleQuery])

  useEffect(() => {
    // If on the results page, get the current search query
    if (isResults) {
      if (currentState.value === null) {
        dispatch(addSimpleSearchInput({ value: simpleQuery }))
      }
    }
  }, [isResults, simpleQuery])

  const disambiguationRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.currentTarget
    const wordCount = countWords(value)

    if (wordCount > MAX_WORDS) {
      inputRef.current?.setCustomValidity(
        `Search cannot exceed ${MAX_WORDS} words.`,
      )
      inputRef.current?.reportValidity()
      setIsValid(false)
    } else {
      inputRef.current?.setCustomValidity('') // Valid state
      setIsValid(true)
      dispatch(addSimpleSearchInput({ value }))
    }
  }

  const handleClearSearch = (): void => {
    dispatch(resetState())
    setIsError(false)
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus()
    }

    if (isSearchOpen) {
      inputRef.current!.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    if (aiDisambiguation.length <= 1) {
      return undefined
    }

    // Close the Disambiguation dropdown on any click outside of it
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        disambiguationRef.current &&
        !disambiguationRef.current.contains(event.target as Node)
      ) {
        setAiDisambiguation([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [aiDisambiguation])

  const hasInputValue =
    !isNull(currentState.value) && currentState.value.length > 0

  return (
    <Row className={`${isResults ? 'py-3' : ''} mx-0`}>
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="d-flex justify-content-center"
      >
        <StyledSearchBox>
          <form
            className="w-100"
            onSubmit={submitForm}
            data-testid={`${id}-simple-search-form`}
          >
            <div className="input-group">
              <label htmlFor={id} className="d-none">
                Search Input Box
              </label>
              {/* If it is the results page, return input with value property */}
              <input
                id={id}
                type="text"
                className="form-control searchBox"
                placeholder="Search LUX"
                onChange={handleInputChange}
                ref={inputRef}
                tabIndex={isUnselectable ? -1 : 0}
                value={currentState.value !== null ? currentState.value : ''}
                data-testid={`${id}-search-submit-input`}
                aria-invalid={!isValid}
              />
              {hasInputValue && (
                <button
                  type="button"
                  className="btn clearButton"
                  aria-label="clear search input"
                  onClick={handleClearSearch}
                  data-testid={`${id}-search-clear-button`}
                >
                  <i className="bi bi-x-lg" />
                </button>
              )}
              <div className="input-group-append submitButtonDiv">
                <button
                  disabled={!validateInput(currentState)}
                  type="submit"
                  className="btn submitButton submitSearch"
                  aria-label="submit search input"
                  data-testid={`${id}-search-submit-button`}
                >
                  {isSearchLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <i className="bi bi-search" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </StyledSearchBox>
      </Col>
      {aiDisambiguation.length > 0 && (
        <Col
          ref={disambiguationRef}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="d-flex justify-content-center"
        >
          <Disambiguation
            aiDisambiguation={aiDisambiguation}
            searchString={currentState.value !== null ? currentState.value : ''}
            className="searchBoxDisambiguation"
          />
        </Col>
      )}
    </Row>
  )
}

export default SearchBox
