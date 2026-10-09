import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { isUndefined } from 'lodash'

import { useAppDispatch } from '../../app/hooks'
import { advancedSearchTitles } from '../../config/searchTypes'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import StyledOriginalQuery from '../../styles/features/aiAssistedSearch/OriginalQuery'
import AiToggleButton from '../aiAssistedSearch/AiToggleButton'
import theme from '../../styles/theme'
import {
  AI_ASSISTED_SEARCH_STORAGE_KEY,
  SEARCH_TYPE_PARAM,
  // AI_REFINEMENT_PARAM,
  OPT_IN_MODAL_TEXT,
  OPT_OUT_WITH_ADVANCED_SEARCH_MODAL_TEXT,
  OPT_OUT_WITH_ADVANCED_SEARCH_MODAL_TITLE,
  OPT_IN_MODAL_CONFIRM_BUTTON_TEXT,
  OPT_OUT_WITH_ADVANCED_SEARCH_MODAL_CANCEL_BUTTON_TEXT,
  OPT_IN_MODAL_TITLE,
  OPT_IN_WITH_ADVANCED_SEARCH_MODAL_CANCEL_BUTTON_TEXT,
  OPT_OUT_WITH_ADVANCED_SEARCH_MODAL_CONFIRM_BUTTON_TEXT,
} from '../../config/aiAssistedSearch/variables'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { changeIsAiSearch } from '../../redux/slices/currentSearchSlice'
import LinkDivider from '../../styles/features/search/LinkDivider'

import AlertModal from './AlertModal'

const StyledH3 = styled.h3`
  font-size: 24px;
  letter-spacing: 0;
  text-align: left;
  line-height: 24px;
  font-weight: 500;
`
/**
 * The header to be displayed for the advanced search.
 * @param {string} tab the scope of the parent object
 * @param {string | null} originalSearchString the original search string entered by the user
 * @returns {JSX.Element}
 */
const FormHeader: React.FC<{
  handleResetForm?: () => void
  tab: string
  currentSearchScope?: string
  originalSearchString: string | null
}> = ({ tab, originalSearchString, handleResetForm, currentSearchScope }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname, search } = useLocation()
  const [isAiSearch, setIsAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleCloseModal = (): void => {
    setShowModal(false)
    pushClientEvent(
      'Search Switch',
      'Selected',
      isAiSearch ? 'Keep AI-Assisted Search' : 'Keep Advanced Search',
    )
  }

  // Set both the local storage and the component state
  const handleConfirmToggleSwitch = (): void => {
    const nextIsActive = !isAiSearch
    setIsAiSearch(nextIsActive)
    dispatch(changeIsAiSearch({ value: nextIsActive }))
    localStorage.setItem(
      AI_ASSISTED_SEARCH_STORAGE_KEY,
      JSON.stringify(nextIsActive),
    )
    const newUrlParams = new URLSearchParams(search)
    newUrlParams.set(SEARCH_TYPE_PARAM, 'advanced')
    newUrlParams.delete('sq')
    setShowModal(false)
    pushClientEvent(
      'Search Switch',
      'Selected',
      nextIsActive ? 'Use AI-Assisted Search' : 'Use Advanced Search',
    )
    navigate(
      {
        pathname: `${pathname}${!isUndefined(currentSearchScope) && isUndefined(tab) ? `/${currentSearchScope}` : ''}`,
        search: `?${newUrlParams.toString()}`,
      },
      { state: { focusRefinementInput: nextIsActive } },
    )
  }

  return (
    <Row className="mt-3 mb-4">
      <Col
        xxl={8}
        xl={8}
        lg={8}
        md={12}
        sm={12}
        xs={12}
        className="d-flex align-middle"
      >
        {showModal && (
          <AlertModal
            showModal={showModal}
            onConfirm={handleConfirmToggleSwitch}
            onClose={handleCloseModal}
            title={
              isAiSearch
                ? OPT_OUT_WITH_ADVANCED_SEARCH_MODAL_TITLE
                : OPT_IN_MODAL_TITLE
            }
            text={
              isAiSearch
                ? OPT_OUT_WITH_ADVANCED_SEARCH_MODAL_TEXT
                : OPT_IN_MODAL_TEXT
            }
            confirmButtonText={
              isAiSearch
                ? OPT_OUT_WITH_ADVANCED_SEARCH_MODAL_CONFIRM_BUTTON_TEXT
                : OPT_IN_MODAL_CONFIRM_BUTTON_TEXT
            }
            cancelButtonText={
              isAiSearch
                ? OPT_OUT_WITH_ADVANCED_SEARCH_MODAL_CANCEL_BUTTON_TEXT
                : OPT_IN_WITH_ADVANCED_SEARCH_MODAL_CANCEL_BUTTON_TEXT
            }
            confirmButtonDataTestId={
              isAiSearch
                ? 'use-advanced-search-button'
                : 'use-ai-assisted-search-button'
            }
            cancelButtonDataTestId={
              isAiSearch
                ? 'keep-ai-assisted-search-button'
                : 'keep-advanced-search-button'
            }
            modalDataTestId={
              isAiSearch ? 'ai-off-alert-modal' : 'ai-on-alert-modal'
            }
          />
        )}
        {isAiSearch ? (
          <span className="d-flex justify-content-start align-items-center">
            <StyledH3>Searching for:&nbsp;</StyledH3>
            {originalSearchString && (
              <StyledOriginalQuery data-testid="natural-language-text">
                "{originalSearchString}"
              </StyledOriginalQuery>
            )}
          </span>
        ) : (
          <StyledH3 data-testid={`${tab}-advanced-search-header`}>
            Search for
            {isUndefined(tab) ? '...' : ` ${advancedSearchTitles[tab]} that...`}
          </StyledH3>
        )}
      </Col>
      <Col
        xxl={4}
        xl={4}
        lg={4}
        md={12}
        sm={12}
        xs={12}
        className="d-flex justify-content-end align-items-center"
      >
        <AiToggleButton
          linkStyle={{
            color: theme.color.link,
            textDecoration: 'none',
          }}
          isStickyHeaderActive={false}
          isAiSearch={isAiSearch}
          handleToggle={() => setShowModal(true)}
        />
        {!isAiSearch && (
          <React.Fragment>
            <LinkDivider />
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
          </React.Fragment>
        )}
      </Col>
    </Row>
  )
}
export default FormHeader
