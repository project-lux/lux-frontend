/* eslint-disable prefer-destructuring */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { addLastSelectedFacet } from '../../redux/slices/facetsSlice'
import { useAppDispatch } from '../../app/hooks'
import { facetLabels, facetSearchTerms } from '../../config/facets'
import { removeFacetFromQuery } from '../../lib/facets/removeFacet'
import theme from '../../styles/theme'
import { ICriteria, ISearchResults } from '../../types/ISearchResults'
import { searchScope } from '../../config/searchTypes'
import { ResultsTab } from '../../types/ResultsTab'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { IFacetsPagination } from '../../types/IFacets'
import { useGetFacetsSearchQuery } from '../../redux/api/ml_facets_api'
import { getYearsFromFacetValues } from '../../lib/facets/dateParser'

import DateSlider from './DateSlider'

interface IFacets {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  combinedQuery: any
  criteria: ICriteria
  facetValues: IFacetsPagination
  facetSection: string
  facetQuery: ICriteria
  scope: string
  currentTab: string
  facetName: string
  lastPage: number
  autoFocus?: boolean
}

const StyledInput = styled.input`
  height: auto;
  width: 100%;
`

const StyledSubmit = styled.button`
  margin-top: 5px;
  background: ${theme.color.primary.darkBlue};
  color: ${theme.color.white};

  &:hover {
    background-color: ${theme.color.white};
    color: ${theme.color.primary.darkBlue};
    border-color: ${theme.color.primary.darkBlue};
  }
`

const DateInput: React.FC<IFacets> = ({
  combinedQuery,
  criteria,
  facetValues,
  facetSection,
  facetQuery,
  scope,
  currentTab,
  facetName,
  lastPage,
  autoFocus = false,
}) => {
  let yearOne = ''
  let defaultLastYear = ''
  if (facetValues.requests.hasOwnProperty('call1')) {
    const years = getYearsFromFacetValues(facetValues.requests.call1)
    if (years.length > 0) {
      yearOne = years[0].toString()
      defaultLastYear = years[years.length - 1].toString()
    }
  }
  const dispatch = useAppDispatch()
  const [earliest, setEarliest] = useState<string>(yearOne)
  const [latest, setLatest] = useState<string>(defaultLastYear)
  // This will only change upon retrieving the last date year
  const [maxYear, setMaxYear] = useState<string>(defaultLastYear)

  const { data, isSuccess } = useGetFacetsSearchQuery({
    q: JSON.stringify(combinedQuery),
    facets: {},
    facetNames: facetName,
    tab: currentTab,
    page: lastPage,
  })

  const { pathname, search } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = searchScope[tab].slice(0, 1)

  // const years = getYearsFromFacetValues(facetValues)

  const [redirect, setRedirect] = useState(false)
  const earliestRef = useRef<HTMLInputElement>(null)
  const latestRef = useRef<HTMLInputElement>(null)

  const earliestDateId = 'earliest-date'
  const latestDateId = 'latest-date'

  useEffect(() => {
    if (isSuccess && data) {
      const { orderedItems } = data as ISearchResults
      const yearsOfLastPage = getYearsFromFacetValues(orderedItems)
      const yearsOfLastPageLength = yearsOfLastPage.length
      const lastYearOfRange =
        yearsOfLastPage[yearsOfLastPageLength - 1].toString()
      setLatest(lastYearOfRange)
      setMaxYear(lastYearOfRange)
    }
  }, [data, isSuccess])

  const handleEarliestInputChange = (value: string): void => {
    setEarliest(value)
  }

  const handleLatestInputChange = (value: string): void => {
    setLatest(value)
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (earliest === null) {
      const earliestYear = yearOne
      setEarliest(earliestYear.toString())
    }

    if (latest === null) {
      const latestYear = maxYear
      setLatest(latestYear.toString())
    }

    dispatch(addLastSelectedFacet({ facetName: facetSection, facetUri: '' }))
    pushClientEvent(
      'Facets Date Input',
      'Selected',
      `Facet ${facetLabels[facetSection]}`,
    )
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

    const searchQ = searchParams.toString()
    return (
      <Navigate
        to={{
          pathname,
          search: searchQ,
        }}
        state={{
          targetName: `${pathname}${searchQ}`,
        }}
      />
    )
  }

  return (
    <React.Fragment>
      <form className="w-100" onSubmit={submitHandler}>
        <div className="input-group d-block">
          <DateSlider
            min={parseInt(yearOne, 10)}
            max={parseInt(maxYear, 10)}
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
                placeholder={yearOne.toString()}
                onChange={(e) =>
                  handleEarliestInputChange(e.currentTarget.value)
                }
                min={parseInt(yearOne, 10)}
                max={parseInt(maxYear, 10)}
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
                placeholder={maxYear}
                onChange={(e) => handleLatestInputChange(e.currentTarget.value)}
                min={parseInt(yearOne, 10)}
                max={parseInt(maxYear, 10)}
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
