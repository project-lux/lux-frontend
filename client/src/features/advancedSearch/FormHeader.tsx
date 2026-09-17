import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { advancedSearchTitles } from '../../config/searchTypes'
import { resetState } from '../../redux/slices/advancedSearchSlice'
import { resetHelpTextState } from '../../redux/slices/helpTextSlice'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import { changeClearedAdvancedSearch } from '../../redux/slices/currentSearchSlice'
import StyledOriginalQuery from '../../styles/features/aiAssistedSearch/OriginalQuery'
import AiToggleButton from '../aiAssistedSearch/AiToggleButton'
import theme from '../../styles/theme'
import {
  AI_ASSISTED_SEARCH_STORAGE_KEY,
  AI_SEARCH_PARAM,
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
  tab: string
  originalSearchString: string | null
}> = ({ tab, originalSearchString }) => {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [isAiSearch, setIsAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })

  const dispatch = useAppDispatch()
  const handleResetForm = (): void => {
    dispatch(resetHelpTextState())
    dispatch(resetState())
    dispatch(changeClearedAdvancedSearch({ value: true }))
  }

  // Set both the local storage and the component state
  const handleToggle = (): void => {
    const nextIsActive = !isAiSearch
    setIsAiSearch(nextIsActive)
    localStorage.setItem(
      AI_ASSISTED_SEARCH_STORAGE_KEY,
      JSON.stringify(nextIsActive),
    )
    const newUrlParams = new URLSearchParams(search)
    newUrlParams.delete(AI_SEARCH_PARAM)
    newUrlParams.delete(AI_REFINEMENT_PARAM)
    newUrlParams.delete('sq')
    navigate({
      pathname,
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
            Search for {advancedSearchTitles[tab]} that...
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
        {isAiSearch && (
          <AiToggleButton
            linkStyle={{
              color: theme.color.link,
              textDecoration: 'none',
            }}
            isStickyHeaderActive={false}
            isAiSearch={isAiSearch}
            handleToggle={handleToggle}
          />
        )}
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
  )
}
export default FormHeader
