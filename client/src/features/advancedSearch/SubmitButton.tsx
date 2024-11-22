import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { validateAdvancedSearch } from '../../lib/advancedSearch/advancedSearchParser'
import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'
import PrimaryButton from '../../styles/shared/PrimaryButton'

interface ISubmitButton {
  state: IAdvancedSearchState
}

/**
 * Button for submitting the advanced search.
 * @param {string} state the current nested state within the advanced search state
 * @returns {JSX.Element}
 */
const SubmitButton: React.FC<ISubmitButton> = ({ state }) => {
  const validated = validateAdvancedSearch(state)

  return (
    <Row className="mb-2 mt-3 d-flex">
      <Col sm={3} xs={12} className="w-auto">
        <PrimaryButton
          disabled={!validated}
          type="submit"
          className="addNewQueryButton"
          value="searchButton"
          aria-label="search LUX"
          data-testid="advanced-search-submit-button"
        >
          Search LUX
        </PrimaryButton>
      </Col>
    </Row>
  )
}

export default SubmitButton
