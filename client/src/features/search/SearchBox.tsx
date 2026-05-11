import React, { useEffect, useRef, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { isNull } from 'lodash'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { searchScope } from '../../config/searchTypes'
import { checkForStopWords, translate } from '../../lib/util/translate'
import {
  addSimpleSearchInput,
  ISimpleSearchState,
  resetState,
} from '../../redux/slices/simpleSearchSlice'
import theme from '../../styles/theme'
import LoadingSpinner from '../common/LoadingSpinner'
import { pushClientEvent } from '../../lib/pushClientEvent'

const StyledSearchBox = styled.div`
  display: flex;
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
`

const SearchBox: React.FC<{
  unselectable?: boolean
  closeSearchBox?: () => void
  id: string
  isResults?: boolean
  setIsError: (x: boolean) => void
  isSearchOpen?: boolean
}> = ({
  unselectable: isUnselectable,
  closeSearchBox,
  id,
  isResults,
  setIsError,
  isSearchOpen = false,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const currentState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )
  const dispatch = useAppDispatch()

  let simpleQuery: string | null = null
  const { search } = useLocation()
  const tab = useParams<{ tab: string }>().tab || 'objects'
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

  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.currentTarget
    dispatch(addSimpleSearchInput({ value }))
  }

  const handleClearSearch = (): void => {
    dispatch(resetState())
    setIsError(false)
    inputRef.current?.focus()
  }

  const validateInput = (): boolean => {
    const { value } = currentState
    return value !== null && value.trim() !== '' // ignore empty search string
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (validateInput()) {
      const valueToSubmit = checkForStopWords(currentState.value!)
      translate({
        query: valueToSubmit,
        scope: searchScope[tab],
        onSuccess: (translatedString) => {
          const newUrlParams = new URLSearchParams()
          const query = JSON.parse(translatedString)
          delete query._scope
          newUrlParams.set('q', JSON.stringify(query))
          newUrlParams.set('sq', valueToSubmit)
          if (closeSearchBox) {
            closeSearchBox()
          }
          inputRef.current!.value = ''
          setIsError(false)
          setIsLoading(false)
          pushClientEvent('Search Button', 'Submit', 'Simple Search')
          navigate(
            {
              pathname: `/view/results/${tab}`,
              search: `${newUrlParams.toString()}`,
            },
            {
              state: {
                fromNonResultsPage: !isResults,
              },
            },
          )
        },
        onError: () => {
          setIsLoading(false)
          setIsError(true)
        },
        onLoading: () => setIsLoading(true),
      })
    }
  }

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus()
    }

    if (isSearchOpen) {
      inputRef.current!.focus()
    }
  }, [isSearchOpen])

  const hasInputValue =
    !isNull(currentState.value) && currentState.value.length > 0

  return (
    <Row className={`${isResults ? 'py-3' : ''} mx-0`}>
      <div className="col-12 d-flex justify-content-center">
        <StyledSearchBox>
          <form
            className="w-100"
            onSubmit={submitHandler}
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
                className="form-control"
                placeholder="Search LUX"
                onChange={handleInputChange}
                ref={inputRef}
                tabIndex={isUnselectable ? -1 : 0}
                value={currentState.value !== null ? currentState.value : ''}
                data-testid={`${id}-search-submit-input`}
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
                  disabled={!validateInput()}
                  type="submit"
                  className="btn submitButton"
                  aria-label="submit search input"
                  data-testid={`${id}-search-submit-button`}
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <i className="bi bi-search" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </StyledSearchBox>
      </div>
    </Row>
  )
}

export default SearchBox
