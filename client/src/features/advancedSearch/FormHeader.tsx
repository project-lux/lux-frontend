import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { isUndefined } from 'lodash'

import { advancedSearchTitles } from '../../config/searchTypes'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import StyledOriginalQuery from '../../styles/features/aiAssistedSearch/OriginalQuery'
import AiToggleButton from '../aiAssistedSearch/AiToggleButton'
import theme from '../../styles/theme'
import {
  AI_ASSISTED_SEARCH_STORAGE_KEY,
  SEARCH_TYPE_PARAM,
  AI_REFINEMENT_PARAM,
} from '../../config/aiAssistedSearch/variables'

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
  const { pathname, search } = useLocation()
  const [isAiSearch, setIsAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })

  // Set both the local storage and the component state
  const handleToggle = (): void => {
    const nextIsActive = !isAiSearch
    setIsAiSearch(nextIsActive)
    localStorage.setItem(
      AI_ASSISTED_SEARCH_STORAGE_KEY,
      JSON.stringify(nextIsActive),
    )
    const newUrlParams = new URLSearchParams(search)
    newUrlParams.set(SEARCH_TYPE_PARAM, 'advanced')
    // Only add this parameter if the tab is defined
    // New advanced searches will not have the tab defined
    if (!isUndefined(tab)) {
      newUrlParams.set('qt', tab)
    }
    // If setting the AI search to true, then the AI_REFINEMENT_PARAM should be added to the URL and set to true
    if (nextIsActive) {
      newUrlParams.set(AI_REFINEMENT_PARAM, 'true')
    } else {
      newUrlParams.delete(AI_REFINEMENT_PARAM)
    }
    newUrlParams.delete('sq')
    navigate({
      pathname: `${pathname}${!isUndefined(currentSearchScope) ? `/${currentSearchScope}` : ''}`,
      search: `?${newUrlParams.toString()}`,
    })
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
        {isAiSearch ? (
          <span className="d-flex justify-content-start align-items-center">
            <StyledH3>Searching for:&nbsp;</StyledH3>
            <StyledOriginalQuery>
              "{originalSearchString || ''}"
            </StyledOriginalQuery>
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
          handleToggle={handleToggle}
        />
        {!isAiSearch && (
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
        )}
      </Col>
    </Row>
  )
}
export default FormHeader
