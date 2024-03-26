import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import { facetLabels, facetSearchTerms } from '../../config/facets'
import { buildQuery, getFacetLabel } from '../../lib/facets/helper'
import { removeFacet } from '../../lib/facets/removeFacet'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { ICriteria, IOrderedItems } from '../../types/ISearchResults'
import StyledCheckbox from '../../styles/features/facets/Checkbox'
import ApiText from '../common/ApiText'
import { getParamPrefix } from '../../lib/util/params'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addFacets, IFacetsSelected } from '../../redux/slices/facetsSlice'
import { ResultsTab } from '../../types/ResultsTab'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface IProps {
  criteria: ICriteria
  facet: IOrderedItems
  facetSection: string
  selectedFacets: Map<string, Set<string | number>> | null
  facetQuery: ICriteria
  scope: string
}

const Checkbox: React.FC<IProps> = ({
  criteria,
  facet,
  facetSection,
  selectedFacets,
  facetQuery,
  scope,
}) => {
  const facetsState = useAppSelector(
    (state) => state.facetSelection as IFacetsSelected,
  )

  const dispatch = useAppDispatch()

  const facetValue = facet.value as string | number
  const isFacetSelected =
    selectedFacets !== null &&
    selectedFacets.has(facetSection) &&
    selectedFacets.get(facetSection)?.has(facetValue)
  const { pathname, search: currentSearch } = useLocation()
  const params = new URLSearchParams(currentSearch)
  const navigate = useNavigate()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)

  const valueStr = String(facet.value)
  const id = `checklistFacet-${stripYaleIdPrefix(valueStr)}-${facetSection}`

  // requires getting label before rendering it with capitalized content
  let label = ''
  if (typeof facetValue === 'string') {
    const labelFromApi = ApiText(facetValue)
    label = labelFromApi !== null ? labelFromApi : ''
  } else {
    label = getFacetLabel(scope, facetSection, facetValue)
  }

  // Do not display the facet if a label can't be retrieved and if not in DEV environment
  if (label === '' && !pathname.includes('lux-front-dev')) {
    return null
  }

  const handleRemoveFacet = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newSearchParams = removeFacet(
      facetSection,
      facetValue,
      currentSearch,
      facetQuery,
      scope,
      tab,
    )
    dispatch(
      addFacets({ facetName: facetSection, facetUri: event.target.value }),
    )
    pushSiteImproveEvent('Facets', `Remove ${label}`, facetLabels[facetSection])
    navigate(`${pathname}?${newSearchParams}`)
  }

  const submitFacet = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const strValue = event.target.value
    const numValue = parseInt(strValue, 10)
    const newFacetQuery = updateFacetQuery(
      Number.isNaN(numValue) ? strValue : numValue,
    )
    // Set the page number to 1, otherwise it will default to current page
    params.set(`${paramPrefix}p`, '1')
    params.set(`${paramPrefix}f`, JSON.stringify(newFacetQuery))
    params.set('q', JSON.stringify(criteria))
    params.set('facetRequest', 'true')

    dispatch(addFacets({ facetName: facetSection, facetUri: strValue }))
    pushSiteImproveEvent('Facets', `Select ${label}`, facetLabels[facetSection])
    navigate(`${pathname}?${params.toString()}`)
  }

  function updateFacetQuery(value: number | string): ICriteria {
    let query = facetQuery || {}
    // TODO: get rid of keyof typeof
    const searchTerms = facetSearchTerms[scope as keyof typeof facetSearchTerms]
    const { searchTermName, idFacet } = searchTerms.hasOwnProperty(facetSection)
      ? // TODO: get rid of keyof typeof
        searchTerms[facetSection as keyof typeof searchTerms]
      : { searchTermName: null, idFacet: null }
    const criteriaKeys = Object.keys(query)
    if (criteriaKeys.includes('AND')) {
      const { AND } = query
      addFacetToArray(AND)
    } else {
      // if an AND does not already exist, create one and add the facet to it
      const AND: Array<ICriteria> = []
      addFacetToArray(AND)
      query = { AND }
    }
    return query

    function addFacetToArray(array: Array<ICriteria>): void {
      const queryObj = buildQuery(scope, facetSection, value)

      if (queryObj) {
        array.push(queryObj)
      } else if (idFacet && searchTermName) {
        array.push({
          [searchTermName as string]: {
            id: value,
          },
        })
      } else if (searchTermName) {
        array.push({
          [searchTermName as string]: value,
        })
      }
    }
  }

  return (
    <div className="form-check d-block align-top">
      <StyledCheckbox
        className="form-check-input d-inline"
        type="checkbox"
        value={facet.value}
        id={id}
        onChange={isFacetSelected ? handleRemoveFacet : submitFacet}
        checked={isFacetSelected}
        autoFocus={facetsState.lastSelectedFacetUri === facet.value}
      />
      <label className="form-check-label ms-2" htmlFor={id}>
        {label}
        {facet.totalItems ? `(${facet.totalItems})` : null}
      </label>
    </div>
  )
}

export default Checkbox
