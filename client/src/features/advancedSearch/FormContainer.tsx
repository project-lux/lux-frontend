import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { isUndefined } from 'lodash'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { scopeToTabTranslation, searchScope } from '../../config/searchTypes'
import {
  filterAdvancedSearch,
  getAdvancedSearchDepth,
} from '../../lib/advancedSearch/advancedSearchParser'
import {
  addAqParamValue,
  IAdvancedSearchState,
  resetState,
} from '../../redux/slices/advancedSearchSlice'
import {
  addSelectedHelpText,
  resetHelpTextState,
} from '../../redux/slices/helpTextSlice'
import { StyledContainer } from '../../styles/features/advancedSearch/AdvancedSearchContainers'
import StyledHr from '../../styles/shared/Hr'
import { ErrorFallback } from '../error/ErrorFallback'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'
import StyledAddButton from '../../styles/features/advancedSearch/AddButton'
import {
  ICurrentSearchState,
  changeClearedAdvancedSearch,
} from '../../redux/slices/currentSearchSlice'
import theme from '../../styles/theme'
import {
  AI_ASSISTED_SEARCH_STORAGE_KEY,
  AI_REFINEMENT_PARAM,
  SEARCH_TYPE_PARAM,
} from '../../config/aiAssistedSearch/variables'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'

import AdvancedSearchForm from './Form'
import FormHeader from './FormHeader'
import HelpText from './HelpText'
import SubmitButton from './SubmitButton'
import ScopeSelectionRow from './ScopeSelectionRow'

interface IProps {
  formClassName: string
  helpTextClassName: string
}

/**
 * Container for holding the advanced search components.
 * @returns
 */
const FormContainer: React.FC<IProps> = ({
  formClassName,
  helpTextClassName,
}) => {
  const [showAllRows, setShowAllRows] = useState<boolean>(true)
  const [isAiSearch, setIsAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })
  const formRef = useRef(null)
  const navigate = useNavigate()
  // tab can be undefined
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const scope = searchScope[tab] || null
  const { search } = useLocation()
  const urlParams = new URLSearchParams(search)
  const query = urlParams.has('q') ? (urlParams.get('q') as string) : ''
  const queryTab = urlParams.get('qt') || tab
  const originalSearchString = urlParams.has('sq') ? urlParams.get('sq') : null
  const fromSearchLink = urlParams.has('searchLink')
    ? urlParams.get('searchLink') === 'true'
    : false
  const isAiSearchWithRefinement =
    urlParams.has(AI_REFINEMENT_PARAM) &&
    urlParams.get(AI_REFINEMENT_PARAM) === 'true'

  const dispatch = useAppDispatch()

  // Handle the Clear Search button action
  const handleResetForm = (): void => {
    dispatch(resetHelpTextState())
    dispatch(resetState())
    dispatch(changeClearedAdvancedSearch({ value: true }))
  }

  const handleShowRows = (): void => {
    setShowAllRows(!showAllRows)
  }

  useEffect(() => {
    if (tab === queryTab) {
      if (query === '') {
        dispatch(resetState())
        dispatch(addSelectedHelpText({ value: 'fieldSelectRow' }))
      } else if (scope !== null) {
        dispatch(addAqParamValue({ scope, aqParamValue: query }))
        dispatch(addSelectedHelpText({ value: 'searchSwitch' }))
      }
      if (isAiSearchWithRefinement) {
        setIsAiSearch(true)
      }
      dispatch(changeClearedAdvancedSearch({ value: false }))
    }
  }, [dispatch, scope, query, tab, queryTab])

  const currentState = useAppSelector(
    (asState) => asState.advancedSearch as IAdvancedSearchState,
  )
  const asSearchState = useAppSelector(
    (searchState) => searchState.currentSearch as ICurrentSearchState,
  )

  // Handle the form submission action
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const filteredSearch = filterAdvancedSearch(
      scope || (currentState._scope as string | null),
      currentState,
    )
    const newScope = currentState._scope
      ? (currentState._scope as string)
      : 'objects'
    const newResultTab = scopeToTabTranslation[newScope]
    const newUrlParams = new URLSearchParams()
    newUrlParams.set('q', JSON.stringify(filteredSearch))
    newUrlParams.set(SEARCH_TYPE_PARAM, 'advanced')
    newUrlParams.set(
      AI_REFINEMENT_PARAM,
      isAiSearchWithRefinement ? 'true' : 'false',
    )
    newUrlParams.set(`${newScope.slice(0, 1)}p`, '1')
    // TODO: return to this once we have an idea as to how the advanced search should work
    // if (isAiSearch) {
    //   newUrlParams.set(SEARCH_TYPE_PARAM, 'true')
    //   if (!isNull(originalSearchString)) {
    //     newUrlParams.set('sq', originalSearchString as string)
    //   }
    // }
    pushClientEvent('Search Button', 'Submit', 'Advanced Search')
    navigate({
      pathname: `/view/results/${newResultTab}`,
      search: `?${newUrlParams.toString()}`,
    })
  }

  // Calculate the number of rows in the currently submitted search
  const numberOfRows = getAdvancedSearchDepth(
    query !== '' ? JSON.parse(query) : {},
  )
  const hideAdvancedSearch =
    numberOfRows > 6 && fromSearchLink && !asSearchState.clearedAdvancedSearch
  const formStyle = hideAdvancedSearch
    ? {
        minHeight: '150px',
        maxHeight: showAllRows ? '340px' : 'none',
        overflow: showAllRows ? 'clip' : 'visible',
      }
    : {
        minHeight: '150px',
      }

  return (
    <Row
      className={`${isAiSearch ? '' : 'mx-3 mb-3'}`}
      style={{ flexWrap: 'nowrap' }}
    >
      <StyledContainer
        className={formClassName}
        $asBodyBorderTopLeftRadius={tab === 'objects' ? '0px' : undefined}
        data-testid="advanced-search-form-container"
      >
        <div className="advanced-search-form-wrapper">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {!isAiSearch ? (
              <React.Fragment>
                <FormHeader
                  tab={tab}
                  originalSearchString={originalSearchString}
                  handleResetForm={handleResetForm}
                  currentSearchScope={
                    !isUndefined(currentState._scope)
                      ? scopeToTabTranslation[currentState._scope as string] ||
                        undefined
                      : undefined
                  }
                />
                <StyledHr width="100%" />
              </React.Fragment>
            ) : (
              <Row>
                <Col
                  xs={12}
                  className="d-flex justify-content-end align-items-center"
                >
                  <LinkButton
                    variant="link"
                    type="reset"
                    className="resetAdvancedSearchForm"
                    onClick={handleResetForm}
                    data-testid="reset-button"
                    aria-label="Clear Search"
                  >
                    Clear Search
                  </LinkButton>
                </Col>
              </Row>
            )}
            <Row className="mb-2 advancedSearchFormRow">
              <Col xs={12} sm={12}>
                <Form
                  onSubmit={handleSubmit}
                  className="mt-3"
                  aria-describedby="help-text"
                  data-testid="testing"
                >
                  <div
                    style={formStyle}
                    ref={formRef}
                    id="advanced-search-form-content"
                    className="mt-3 mb-3 ps-2"
                  >
                    <ScopeSelectionRow />
                    {currentState._scope !== undefined && (
                      <div className="ms-4">
                        <AdvancedSearchForm
                          state={currentState}
                          parentScope={currentState._scope as string}
                          parentStateId={currentState._stateId as string}
                          nestedLevel={0}
                          parentBgColor={
                            (currentState._bgColor as
                              | 'bg-white'
                              | 'bg-light') || 'bg-white'
                          }
                        />
                      </div>
                    )}
                  </div>
                  {hideAdvancedSearch && queryTab === tab && (
                    <div style={{ height: '50px' }}>
                      <StyledAddButton
                        type="button"
                        onClick={handleShowRows}
                        className={`show${
                          showAllRows ? 'Less' : 'All'
                        }AdvancedSearchRows w-auto`}
                        value={`show${showAllRows ? 'Less' : 'All'}AdvancedSearchRows`}
                        aria-label={`Show ${
                          showAllRows ? 'less' : 'all'
                        } advanced search rows`}
                        data-testid="advanced-search-rows-button"
                      >
                        Show {showAllRows ? 'All' : 'Fewer'} Rows
                      </StyledAddButton>
                    </div>
                  )}
                  <SubmitButton state={currentState} />
                </Form>
              </Col>
            </Row>
          </ErrorBoundary>
        </div>
      </StyledContainer>
      <StyledContainer
        className={helpTextClassName}
        $helpTextBorderTopRightRadius={tab === 'events' ? '0px' : undefined}
      >
        <div
          style={{
            borderLeft: `0.5px solid ${theme.color.black65}`,
            height: '95%',
            position: 'absolute',
            width: '0%',
          }}
        />
        <HelpText key={tab as string} />
      </StyledContainer>
    </Row>
  )
}
export default FormContainer
