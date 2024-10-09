import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'
import styled from 'styled-components'

import config from '../../config/config'
import { getSelectedLabel } from '../../lib/facets/helper'
import { removeFacet } from '../../lib/facets/removeFacet'
import EntityParser from '../../lib/parse/data/EntityParser'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetNameQuery } from '../../redux/api/ml_api'
import { ICriteria } from '../../types/ISearchResults'
import { useAppDispatch } from '../../app/hooks'
import { reset } from '../../redux/slices/facetsSlice'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'

const StyledSelectedFacetContainer = styled.div`
  background: #ffffff;
  border: 1px solid #cacaca;
  border-radius: 5px;
  font-size: 1.125em;
  color: #222222;
  letter-spacing: 0;
  text-align: left;
  font-weight: 400;
`

const StyledButton = styled.button`
  width: 10px;
  height: 10px;
  padding: 0px;
`

interface ISelected {
  option: string
  searchTag: string
  facetQuery: ICriteria | null
  scope: string
}

const SelectedFacet: React.FC<ISelected> = ({
  option,
  searchTag,
  facetQuery,
  scope,
}) => {
  const dispatch = useAppDispatch()
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab

  let label = getSelectedLabel(scope, searchTag, option)

  const nameResult = useGetNameQuery(
    label.match('https://') ? { uri: stripYaleIdPrefix(option) } : skipToken,
  )

  if (nameResult.isSuccess && nameResult.data) {
    label = new EntityParser(nameResult.data).getPrimaryName(config.aat.langen)
  }

  const handleRemoveFacet = (): void => {
    if (facetQuery != null) {
      const newSearchParams = removeFacet(
        searchTag,
        option,
        search,
        facetQuery,
        scope,
        tab,
      )
      dispatch(reset())
      pushClientEvent('Facets Selected Filters', 'Removed', `Facet ${label}`)
      navigate(`${pathname}?${newSearchParams}`)
    }
  }

  return (
    <StyledSelectedFacetContainer>
      <span className="pe-2">{label}</span>
      <StyledButton
        type="button"
        className="btn-close"
        aria-label={`Remove ${label} filter`}
        onClick={handleRemoveFacet}
      />
    </StyledSelectedFacetContainer>
  )
}
export default SelectedFacet
