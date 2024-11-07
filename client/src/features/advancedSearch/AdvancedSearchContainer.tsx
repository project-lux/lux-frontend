import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

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
import StyledTitleHeader from '../../styles/features/advancedSearch/TitleHeader'
import StyledHr from '../../styles/shared/Hr'
import ErrorMessage from '../search/ErrorMessage'
import { ErrorFallback } from '../error/ErrorFallback'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'
import StyledAddButton from '../../styles/features/advancedSearch/AddButton'
import {
  ICurrentSearchState,
  changeClearedAdvancedSearch,
} from '../../redux/slices/currentSearchSlice'

import AdvancedSearchForm from './Form'
import FormHeader from './FormHeader'
import HelpText from './HelpText'
import SubmitButton from './SubmitButton'
import ToggleButton from './ToggleSearchButton'
import AlertModal from './AlertModal'
/**
 * Container for holding the advanced search components.
 * @returns
 */
const AdvancedSearchContainer: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [showAllRows, setShowAllRows] = useState<boolean>(true)
  const formRef = useRef(null)
  const navigate = useNavigate()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const scope = searchScope[tab]
  const { search } = useLocation()
  const urlParams = new URLSearchParams(search)
  const query = urlParams.has('q') ? (urlParams.get('q') as string) : ''
  const queryTab = urlParams.get('qt') || tab
  const fromSearchLink = urlParams.has('searchLink')
    ? urlParams.get('searchLink') === 'true'
    : false

  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const filteredSearch = filterAdvancedSearch(scope, currentState)
    const newUrlParams = new URLSearchParams()
    newUrlParams.set('q', JSON.stringify(filteredSearch))
    const resultsTab = tab !== undefined ? tab : 'objects'
    pushClientEvent('Search Button', 'Submit', 'Advanced Search')
    navigate({
      pathname: `/view/results/${resultsTab}`,
      search: `?${newUrlParams.toString()}`,
    })
  }
  const handleCloseModal = (): void => {
    setShowModal(false)
    pushClientEvent(
      'Search Switch',
      'Selected',
      'Cancel Switch to Simple Search',
    )
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

  return (
    <React.Fragment>
      <Row className="mx-0">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {showModal && (
            <AlertModal showModal={showModal} onClose={handleCloseModal} />
          )}
          {isError && (
            <Col xs={12} className="mt-2 w-75">
              <ErrorMessage onClose={setIsError} />
            </Col>
          )}
          <Col xs={12} className="px-0">
            <StyledTitleHeader className="mb-3 mx-0">
              <Col sm={9} xs={12}>
                <h2>Advanced Search</h2>
              </Col>
              <Col
                sm={3}
                xs={12}
                className="d-flex align-items-center justify-content-end"
              >
                <ToggleButton
                  setIsError={setIsError}
                  setShowModal={setShowModal}
                />
              </Col>
            </StyledTitleHeader>
          </Col>
        </ErrorBoundary>
      </Row>
      <Row
        className="mx-0"
        style={{ flexWrap: 'nowrap', paddingRight: '2.5rem' }}
      >
        <StyledContainer
          className="advancedSearchBody"
          data-testid="advanced-search-form-container"
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FormHeader tab={tab} />
            <StyledHr width="100%" />
            <Row className="mb-2">
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
                  {hideAdvancedSearch && (
                    <div style={{ height: showAllRows ? '200px' : '75px' }}>
                      <StyledAddButton
                        type="button"
                        onClick={handleShowRows}
                        className={`show${
                          showAllRows ? 'Less' : 'All'
                        }AdvancedSearchRows w-auto`}
                        value={`show${
                          showAllRows ? 'Less' : 'All'
                        }AdvancedSearchRows`}
                        aria-label={`Show ${
                          showAllRows ? 'less' : 'all'
                        } advanced search rows`}
                        data-testid="advanced-search-rows-button"
                      >
                        Show {showAllRows ? 'All' : 'Less'} Rows
                      </StyledAddButton>
                    </div>
                  )}
                  <StyledHr width="100%" />
                  <SubmitButton state={currentState} />
                </Form>
              </Col>
            </Row>
          </ErrorBoundary>
        </StyledContainer>
        <StyledContainer className="helpText">
          <HelpText key={tab as string} />
        </StyledContainer>
      </Row>
    </React.Fragment>
  )
}
export default AdvancedSearchContainer
