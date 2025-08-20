import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { advancedSearchTitles } from '../../config/searchTypes'
import { resetState } from '../../redux/slices/advancedSearchSlice'
import { resetHelpTextState } from '../../redux/slices/helpTextSlice'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import { changeClearedAdvancedSearch } from '../../redux/slices/currentSearchSlice'

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
 * @returns {JSX.Element}
 */
const FormHeader: React.FC<{ tab: string }> = ({ tab }) => {
  const dispatch = useAppDispatch()
  const handleResetForm = (): void => {
    dispatch(resetHelpTextState())
    dispatch(resetState())
    dispatch(changeClearedAdvancedSearch({ value: true }))
  }

  return (
    <Row className="mt-3 mb-4">
      <Col sm={10} xs={12} className="d-flex align-middle">
        <StyledH3 data-testid={`${tab}-advanced-search-header`}>
          Search for {advancedSearchTitles[tab]} that...
        </StyledH3>
      </Col>
      <Col
        sm={2}
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
  )
}
export default FormHeader
