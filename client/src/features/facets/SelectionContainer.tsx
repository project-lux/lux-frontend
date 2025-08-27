import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'

import theme from '../../styles/theme'
import { useAppDispatch } from '../../app/hooks'
import { ICriteria } from '../../types/ISearchResults'
import { getParamPrefix } from '../../lib/util/params'
import { reset } from '../../redux/slices/facetsSlice'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'

import SelectedFacet from './SelectedFacet'

const StyledSelectionContainer = styled(Col)`
  background: ${theme.color.lightBabyBlue};
`

const StyledClearAllContainer = styled(Col)`
  display: flex;
  justify-content: start;

  @media (min-width: ${theme.breakpoints.lg}px) {
    justify-content: end;
  }

  @media (min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme
      .breakpoints.md}px) {
    justify-content: end;
  }
`

const StyledClearAllButton = styled.button`
  font-size: 1em;
  color: ${theme.color.primary.blue};
  letter-spacing: 0;
  text-align: left;
  font-weight: 400;
  height: 25px;
  width: 100px;
  padding: 0px 0px;
  text-decoration: none;

  @media (min-width: ${theme.breakpoints.lg}px) {
    text-align: right;
  }

  @media (min-width: ${theme.breakpoints.sm}px) and (max-width: ${theme
      .breakpoints.md}px) {
    text-align: right;
  }
`

interface IProps {
  facetQuery: ICriteria | null
  scope: string
  selectedFacets: Map<string, Set<string>> | null
}

const SelectionContainer: React.FC<IProps> = ({
  facetQuery,
  scope,
  selectedFacets,
}) => {
  const location = useLocation()
  const { tab, subTab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(subTab ? subTab : tab)
  const { search } = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const dispatch = useAppDispatch()

  // Removes all URL params that are facet related
  const handleClearAll = (): void => {
    // Set page to 1 so that the current page is not set as default
    params.set(`${paramPrefix}p`, '1')
    params.delete('facetRequest')
    params.delete(`${paramPrefix}f`)
    const updatedQuery = params.toString()
    dispatch(reset())
    pushClientEvent('Facets Selected Filters', 'Selected', 'Facet Clear All')
    navigate(`${location.pathname}?${updatedQuery}`)
  }

  const getSelectedFacets = (): JSX.Element[] | null => {
    if (selectedFacets === null) {
      return null
    }
    const selectedFacetComponents = [] as JSX.Element[]
    selectedFacets.forEach((entityIds, searchTag) =>
      entityIds.forEach((entityId) => {
        // If the entityId is of type number, it should be rendered as we need to accept string and numerical values
        if (entityId || typeof entityId === 'number') {
          selectedFacetComponents.push(
            <SelectedFacet
              key={`${searchTag}_${entityId}`}
              searchTag={searchTag}
              option={entityId}
              facetQuery={facetQuery}
              scope={scope}
            />,
          )
        }
      }),
    )
    return selectedFacetComponents
  }

  if (selectedFacets && selectedFacets.size > 0) {
    return (
      <StyledSelectionContainer data-testid="selected-filters">
        <Row className="px-1 py-3">
          <Col xs={12} sm={6} md={12} lg={6} className="mb-2">
            <div style={{ fontWeight: theme.font.weight.bold }}>
              Selected Filters
            </div>
          </Col>
          <StyledClearAllContainer
            xs={12}
            sm={6}
            md={12}
            lg={6}
            xl={6}
            className="mb-2"
          >
            <StyledClearAllButton
              type="button"
              className="btn btn-link"
              data-testid="clear-all-selected-filters"
              onClick={() => handleClearAll()}
            >
              Clear All
            </StyledClearAllButton>
          </StyledClearAllContainer>
          <Col xs={12}>
            <span
              className="d-flex"
              style={{ whiteSpace: 'nowrap', flexWrap: 'wrap' }}
            >
              {selectedFacets ? getSelectedFacets() : null}
            </span>
          </Col>
        </Row>
      </StyledSelectionContainer>
    )
  }

  return null
}

export default SelectionContainer
