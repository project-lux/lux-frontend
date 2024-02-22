import React, { useEffect, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { searchScope } from '../../config/searchTypes'
import { filterAdvancedSearch } from '../../lib/advancedSearch/advancedSearchParser'
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
  const navigate = useNavigate()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const scope = searchScope[tab]
  const { search } = useLocation()
  const urlParams = new URLSearchParams(search)
  const query = urlParams.has('q') ? (urlParams.get('q') as string) : undefined
  const queryTab = urlParams.get('qt') || tab
  const openTopLevel = urlParams.has('openSearch')
    ? urlParams.get('openSearch') === 'true'
    : true

  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const filteredSearch = filterAdvancedSearch(scope, currentState)
    const newUrlParams = new URLSearchParams()
    newUrlParams.set('q', JSON.stringify(filteredSearch))
    navigate({
      pathname: `/view/results/${tab !== undefined ? tab : 'objects'}`,
      search: `?${newUrlParams.toString()}`,
    })
  }

  useEffect(() => {
    if (query !== undefined && tab === queryTab) {
      if (query === '') {
        dispatch(resetState())
        dispatch(addSelectedHelpText({ value: 'fieldSelectRow' }))
      } else {
        dispatch(addAqParamValue({ scope, aqParamValue: query }))
        dispatch(addSelectedHelpText({ value: 'searchSwitch' }))
      }
    }
  }, [dispatch, scope, query, tab, queryTab])

  const currentState = useAppSelector(
    (asState) => asState.advancedSearch as IAdvancedSearchState,
  )

  return (
    <React.Fragment>
      <Row className="mx-0">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {showModal && (
            <AlertModal showModal={showModal} onClose={setShowModal} />
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
                >
                  <div style={{ minHeight: '150px' }} className="mt-3 mb-3">
                    <AdvancedSearchForm
                      state={currentState}
                      parentScope={scope}
                      parentStateId={currentState._stateId as string}
                      nestedLevel={0}
                      openTopLevel={openTopLevel}
                    />
                  </div>
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
