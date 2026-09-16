import React, { useEffect, useRef, useState } from 'react'
import { Accordion, Col, Row, Form } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
// import { isNull } from 'lodash'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { searchScope } from '../../config/searchTypes'
import {
  filterAdvancedSearch,
  getAdvancedSearchDepth,
} from '../../lib/advancedSearch/advancedSearchParser'
import {
  addAqParamValue,
  IAdvancedSearchState,
  resetState,
} from '../../redux/slices/advancedSearchSlice'
import { addSelectedHelpText } from '../../redux/slices/helpTextSlice'
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
import { AI_SEARCH_PARAM } from '../../config/aiAssistedSearch/variables'
import RefinementContainer from '../aiAssistedSearch/RefinementContainer'

import AdvancedSearchForm from './Form'
import FormHeader from './FormHeader'
import HelpText from './HelpText'
import SubmitButton from './SubmitButton'

/**
 * Container for holding the advanced search components.
 * @returns
 */
const AdvancedSearchContainer: React.FC = () => {
  const [showAllRows, setShowAllRows] = useState<boolean>(true)
  const formRef = useRef(null)
  const navigate = useNavigate()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const scope = searchScope[tab]
  const { search } = useLocation()
  const urlParams = new URLSearchParams(search)
  const query = urlParams.has('q') ? (urlParams.get('q') as string) : ''
  const queryTab = urlParams.get('qt') || tab
  const originalSearchString = urlParams.has('sq') ? urlParams.get('sq') : null
  const fromSearchLink = urlParams.has('searchLink')
    ? urlParams.get('searchLink') === 'true'
    : false
  const isAiSearch = urlParams.has(AI_SEARCH_PARAM)
    ? urlParams.get(AI_SEARCH_PARAM) === 'true'
    : false

  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const filteredSearch = filterAdvancedSearch(scope, currentState)
    const newUrlParams = new URLSearchParams()
    newUrlParams.set('q', JSON.stringify(filteredSearch))
    // TODO: return to this once we have an idea as to how the advanced search should work
    // if (isAiSearch) {
    //   newUrlParams.set(AI_SEARCH_PARAM, 'true')
    //   if (!isNull(originalSearchString)) {
    //     newUrlParams.set('sq', originalSearchString as string)
    //   }
    // }
    const resultsTab = tab !== undefined ? tab : 'objects'
    pushClientEvent('Search Button', 'Submit', 'Advanced Search')
    navigate({
      pathname: `/view/results/${resultsTab}`,
      search: `?${newUrlParams.toString()}`,
    })
  }

  const handleShowRows = (): void => {
    setShowAllRows(!showAllRows)
  }

  useEffect(() => {
    if (tab === queryTab) {
      if (query === '') {
        dispatch(resetState())
        dispatch(addSelectedHelpText({ value: 'fieldSelectRow' }))
      } else {
        dispatch(addAqParamValue({ scope, aqParamValue: query }))
        dispatch(addSelectedHelpText({ value: 'searchSwitch' }))
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

  const advancedSearchFormRow = (
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
            <AdvancedSearchForm
              state={currentState}
              parentScope={scope}
              parentStateId={currentState._stateId as string}
              nestedLevel={0}
            />
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
  )

  return (
    <Row className="mx-3 mb-3" style={{ flexWrap: 'nowrap' }}>
      <StyledContainer
        className="advancedSearchBody"
        $asBodyBorderTopLeftRadius={tab === 'objects' ? '0px' : undefined}
        data-testid="advanced-search-form-container"
      >
        <div className="advanced-search-form-wrapper">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FormHeader
              tab={tab}
              isAiSearch={isAiSearch}
              originalSearchString={originalSearchString}
            />
            <StyledHr width="100%" />
            {isAiSearch && (
              <RefinementContainer currentScope={scope} resultsTab={tab} />
            )}
            {isAiSearch ? (
              <Accordion className="bg-light">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="d-flex align-items-center">
                    Refine with Query Builder&nbsp;
                    <p className="mb-0">
                      Use fields and conditions to build a more precise search.
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>{advancedSearchFormRow}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ) : (
              advancedSearchFormRow
            )}
          </ErrorBoundary>
        </div>
      </StyledContainer>
      <StyledContainer
        className="helpText"
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
export default AdvancedSearchContainer
