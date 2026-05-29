import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { isNull } from 'lodash'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  DEFAULT_PAGE_LENGTH,
  scopeToTabTranslation,
  searchScope,
} from '../../config/searchTypes'
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

const MAX_WORDS = 100

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
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isSimpleSearchLoading, setIsSimpleSearchLoading] = useState(false)
  const [isAiSearchLoading, setIsAiSearchLoading] = useState(false)
  const [isAiSearch, setIsAiSearch] = useState<boolean>(false)
  const [aiDisambiguation, setAiDisambiguation] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<Array<any>>([])
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

  // Helper to count words
  const countWords = (str: string): number => {
    return str
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
  }

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

  const validateInput = (): boolean => {
    const { value } = currentState
    if (value === null || value.trim() === '') {
      return false
    }
    if (countWords(value) > MAX_WORDS) {
      return false
    }
    return true
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (validateInput()) {
      const valueToSubmit = checkForStopWords(currentState.value!)
      translate({
        query: valueToSubmit,
        isAiSearch,
        scope: searchScope[tab],
        onSuccess: (translatedString) => {
          const newUrlParams = new URLSearchParams()
          let newTab = tab
          if (closeSearchBox) {
            closeSearchBox()
          }
          inputRef.current!.value = ''
          setIsError(false)
          setIsSimpleSearchLoading(false)
          pushClientEvent(
            'Search Button',
            'Submit',
            isAiSearch ? 'AI Search' : 'Simple Search',
          )
          if (isAiSearch) {
            setIsAiSearchLoading(false)
            const jsonTranslatedString = JSON.parse(translatedString)
            if (jsonTranslatedString.length > 1) {
              setAiDisambiguation(jsonTranslatedString)
              return
            } else {
              const query = jsonTranslatedString[0].query
              newTab = scopeToTabTranslation[query._scope]
              delete query._scope
              newUrlParams.set('q', JSON.stringify(query))
              newUrlParams.set('pageLength', DEFAULT_PAGE_LENGTH.toString())
              newUrlParams.set('aiSearch', isAiSearch ? 'true' : 'false')
              newUrlParams.set('sq', valueToSubmit)
              setIsAiSearch(false)
              navigate(
                {
                  pathname: `/view/results/${newTab}`,
                  search: `${newUrlParams.toString()}`,
                },
                {
                  state: {
                    fromNonResultsPage: !isResults,
                  },
                },
              )
            }
          } else {
            const query = JSON.parse(translatedString)
            delete query._scope
            newUrlParams.set('q', JSON.stringify(query))
            newUrlParams.set('pageLength', DEFAULT_PAGE_LENGTH.toString())
            newUrlParams.set('sq', valueToSubmit)
            navigate(
              {
                pathname: `/view/results/${newTab}`,
                search: `${newUrlParams.toString()}`,
              },
              {
                state: {
                  fromNonResultsPage: !isResults,
                },
              },
            )
          }
        },
        onError: () => {
          isAiSearch
            ? setIsAiSearchLoading(false)
            : setIsSimpleSearchLoading(false)
          setIsError(true)
        },
        onLoading: () =>
          isAiSearch
            ? setIsAiSearchLoading(true)
            : setIsSimpleSearchLoading(true),
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
                  disabled={!validateInput()}
                  type="submit"
                  className="btn submitAiButton submitSearch"
                  aria-label="submit AI search input"
                  onClick={() => setIsAiSearch(true)}
                  data-testid={`${id}-ai-search-submit-button`}
                >
                  {isAiSearchLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <i className="bi bi-stars" />
                  )}
                </button>
                <button
                  disabled={!validateInput()}
                  type="submit"
                  className="btn submitButton submitSearch"
                  aria-label="submit search input"
                  onClick={() => setIsAiSearch(false)}
                  data-testid={`${id}-search-submit-button`}
                >
                  {isSimpleSearchLoading ? (
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
      {aiDisambiguation.length > 1 && (
        <React.Fragment>
          <Col xs={12} className="mt-3 d-flex justify-content-center">
            <strong>
              Your query returned more than one option. Please select a query to
              continue:
            </strong>
          </Col>
          <Col xs={12} className="mt-2 d-flex justify-content-center">
            <ul>
              {aiDisambiguation.map((queryData) => (
                <li>
                  <Link
                    to={{
                      pathname: `/view/results/${scopeToTabTranslation[queryData.query._scope]}`,
                      search: `q=${JSON.stringify(queryData.query)}&pageLength=${DEFAULT_PAGE_LENGTH}&aiSearch=true&sq=${queryData.parsed}`,
                    }}
                    onClick={() => setIsAiSearch(false)}
                  >
                    {queryData.natural}
                  </Link>
                  <ul className="ms-3">
                    <li>Parsed Query: {queryData.parsed}</li>
                  </ul>
                </li>
              ))}
            </ul>
          </Col>
        </React.Fragment>
      )}
    </Row>
  )
}

export default SearchBox
