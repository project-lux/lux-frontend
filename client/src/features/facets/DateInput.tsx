/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useRef, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { addFacets } from '../../redux/slices/facetsSlice'
import { useAppDispatch } from '../../app/hooks'
import { facetSearchTerms } from '../../config/facets'
import { getYearsFromFacetValues } from '../../lib/facets/dateParser'
import { removeFacetFromQuery } from '../../lib/facets/removeFacet'
import theme from '../../styles/theme'
import { ICriteria, IOrderedItems } from '../../types/ISearchResults'
import { searchScope } from '../../config/searchTypes'
import { ResultsTab } from '../../types/ResultsTab'

import DateSlider from './DateSlider'

interface IFacets {
  criteria: ICriteria
  facetValues: IOrderedItems[]
  facetSection: string
  facetQuery: ICriteria
  scope: string
  autoFocus?: boolean
}

const StyledInput = styled.input`
  height: auto;
  width: 100%;
`

const StyledSubmit = styled.button`
  margin-top: 5px;
  background: ${theme.color.primary.darkBlue};
  color: white;
`

const DateInput: React.FC<IFacets> = ({
  criteria,
  facetValues,
  facetSection,
  facetQuery,
  scope,
  autoFocus = false,
}) => {
  const dispatch = useAppDispatch()

  const { pathname, search } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = searchScope[tab].slice(0, 1)

  const years = getYearsFromFacetValues(facetValues)
  const [earliest, setEarliest] = useState<string>(years[0].toString())
  const [latest, setLatest] = useState<string>(
    years[years.length - 1].toString(),
  )
  const [redirect, setRedirect] = useState(false)
  const earliestRef = useRef<HTMLInputElement>(null)
  const latestRef = useRef<HTMLInputElement>(null)

  const earliestDateId = 'earliest-date'
  const latestDateId = 'latest-date'

  const handleEarliestInputChange = (value: string): void => {
    setEarliest(value)
  }

  const handleLatestInputChange = (value: string): void => {
    setLatest(value)
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (earliest === null) {
      const earliestYear = years[0]
      setEarliest(earliestYear.toString())
    }

    if (latest === null) {
      const latestYear = years[years.length - 1]
      setLatest(latestYear.toString())
    }

    dispatch(addFacets({ facetName: facetSection, facetUri: '' }))
    setRedirect(true)
  }

  function getUpdatedFacetQuery(): ICriteria {
    // criteria is immutable so we have to create a deep-copy of it
    let query = facetQuery || {}
    query = removeFacetFromQuery(facetSection, '', query, scope) || {}
    // TODO: get rid of keyof typeof
    const searchTerms = facetSearchTerms[scope as keyof typeof facetSearchTerms]
    const { searchTermName } =
      // TODO: get rid of keyof typeof
      searchTerms[facetSection as keyof typeof searchTerms]
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
      const min = { [searchTermName]: earliest, _comp: '>=' }
      const max = { [searchTermName]: latest, _comp: '<=' }
      array.push(min, max)
      // TODO: uncomment when ML estimates are fixed
      // array.push({ [searchTermName]: { start: earliest, end: latest } })
    }
  }

  if (redirect) {
    const newFacetQuery = getUpdatedFacetQuery()
    const searchParams = new URLSearchParams(search)
    searchParams.set(`${paramPrefix}f`, JSON.stringify(newFacetQuery))
    searchParams.set('q', JSON.stringify(criteria))
    searchParams.set('facetRequest', 'true')
    searchParams.set(`${paramPrefix}p`, '1')

    return (
      <Navigate
        to={{
          pathname,
          search: `${searchParams.toString()}`,
        }}
      />
    )
  }

  return (
    <React.Fragment>
      <form className="w-100" onSubmit={submitHandler}>
        <div className="input-group d-block">
          <DateSlider
            min={years[0]}
            max={years[years.length - 1]}
            earliestVal={earliest}
            latestVal={latest}
            onEarliestChange={handleEarliestInputChange}
            onLatestChange={handleLatestInputChange}
          />
          <div className="d-flex justify-content-between pt-4">
            <div className="justify-content-start">
              <label htmlFor={earliestDateId} className="d-none">
                Earliest Date
              </label>
              <StyledInput
                id={earliestDateId}
                type="number"
                className="form-control"
                placeholder={years[0].toString()}
                onChange={(e) =>
                  handleEarliestInputChange(e.currentTarget.value)
                }
                min={years[0]}
                max={years[years.length - 1]}
                ref={earliestRef}
                value={earliest}
                autoFocus={autoFocus}
              />
            </div>
            <div className="justify-content-end">
              <label htmlFor={latestDateId} className="d-none">
                Latest Date
              </label>
              <StyledInput
                id={latestDateId}
                type="number"
                className="form-control"
                placeholder={years[years.length - 1].toString()}
                onChange={(e) => handleLatestInputChange(e.currentTarget.value)}
                min={years[0]}
                max={years[years.length - 1]}
                ref={latestRef}
                value={latest}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <StyledSubmit type="submit" className="btn">
            Apply
          </StyledSubmit>
        </div>
      </form>
    </React.Fragment>
  )
}

export default DateInput
