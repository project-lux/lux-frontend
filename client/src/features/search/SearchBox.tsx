import React, { useEffect, useRef, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { scopeToTabTranslation, searchScope } from '../../config/searchTypes'
import { checkForStopWords, translate } from '../../lib/util/translate'
import {
  addSimpleSearchInput,
  ISimpleSearchState,
} from '../../redux/slices/simpleSearchSlice'
import theme from '../../styles/theme'
import LoadingSpinner from '../common/LoadingSpinner'
import { pushClientEvent } from '../../lib/pushClientEvent'

const StyledSearchBox = styled.div`
  display: flex;
  width: ${theme.searchBox.width};
  border: solid 1px #979797;
  border-radius: ${theme.searchBox.borderRadius};
  font-size: 2rem;

  input {
    border: none;
    border-radius: ${theme.searchBox.borderRadius} 0 0
      ${theme.searchBox.borderRadius} !important;
    margin-left: 0px !important;
    max-width: ${theme.searchBox.width};
    font-weight: 300;
    height: 72px;
    font-size: inherit;
  }

  .submitButton {
    border: none;
    background-color: ${theme.color.white};
    border-radius: 0 ${theme.searchBox.borderRadius}
      ${theme.searchBox.borderRadius} 0;
    height: 72px;
    font-size: inherit;
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
  const [isAiSearch, setIsAiSearch] = useState<boolean>(false)
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
        isAiSearch,
        scope: searchScope[tab],
        onSuccess: (translatedString) => {
          let newTab = tab
          if (isAiSearch) {
            const jsonTranslatedString = JSON.parse(translatedString)
            newTab = scopeToTabTranslation[jsonTranslatedString._scope]
          }
          const newUrlParams = new URLSearchParams()
          const query = JSON.parse(translatedString)
          delete query._scope
          newUrlParams.set('q', JSON.stringify(query))
          if (!isAiSearch) {
            newUrlParams.set('sq', valueToSubmit)
          }
          newUrlParams.set('aiSearch', isAiSearch ? 'true' : 'false')
          if (closeSearchBox) {
            closeSearchBox()
          }
          inputRef.current!.value = ''
          setIsError(false)
          setIsLoading(false)
          pushClientEvent(
            'Search Button',
            'Submit',
            isAiSearch ? 'AI Search' : 'Simple Search',
          )
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
              <div className="input-group-append submitButtonDiv">
                <button
                  disabled={!validateInput()}
                  type="submit"
                  className="btn submitAiButton submitSearch"
                  aria-label="submit AI search input"
                  onClick={() => setIsAiSearch(true)}
                  data-testid={`${id}-ai-search-submit-button`}
                >
                  {isLoading ? (
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
