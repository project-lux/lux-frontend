/* eslint-disable prefer-destructuring */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'

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
import {
  getDateInputPlaceholder,
  getEra,
  getTimestampsFromFacetValues,
} from '../../lib/facets/dateParser'
import { timePeriod } from '../../config/advancedSearch/inputTypes'

import DateSlider from './DateSlider'
import FacetDropdown from './Dropdown'

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
  const dispatch = useAppDispatch()

  // Get initial values
  let minDate = Date.now()
  let defaultLastYear = Date.now()
  let timestamps: Array<number> = []
  if (facetValues.requests.hasOwnProperty('call1')) {
    timestamps = getTimestampsFromFacetValues(facetValues.requests.call1)
    // timestamps = getTimestampsFromFacetValues([
    //   {
    //     id: '',
    //     totalItems: 1,
    //     type: 'OrderedCollection',
    //     value: '-0148-01-01T00:00:00Z',
    //   },
    //   {
    //     id: '',
    //     totalItems: 1,
    //     type: 'OrderedCollection',
    //     value: '2000-01-01T00:00:00Z',
    //   },
    // ])
    if (timestamps.length > 0) {
      minDate = timestamps[0]
      defaultLastYear = timestamps[timestamps.length - 1]
    }
  }

  const [earliest, setEarliest] = useState<number>(minDate)
  const [latest, setLatest] = useState<number>(defaultLastYear)
  const [earliestEra, setEarliestEra] = useState<string>(getEra(earliest))
  const [latestEra, setLatestEra] = useState<string>(getEra(latest))
  // This will only change upon retrieving the last date year
  const [maxDate, setMaxDate] = useState<number>(defaultLastYear)
  const disableEraDropdown = getEra(minDate) === getEra(maxDate)
  const swapDates = disableEraDropdown && getEra(minDate) === 'bce'

  const { data, isSuccess } = useGetFacetsSearchQuery(
    {
      q: JSON.stringify(combinedQuery),
      facets: {},
      facetNames: facetName,
      tab: currentTab,
      page: lastPage,
      sort: 'desc',
    },
    {
      skip: lastPage === 1,
    },
  )

  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = searchScope[tab].slice(0, 1)

  const earliestRef = useRef<HTMLInputElement>(null)
  const latestRef = useRef<HTMLInputElement>(null)

  const earliestDateId = 'earliest-date'
  const latestDateId = 'latest-date'

  useEffect(() => {
    if (isSuccess && data) {
      const { orderedItems } = data as ISearchResults
      const lastPageDates = getTimestampsFromFacetValues(orderedItems)
      const datesOfLastPageLength = lastPageDates.length
      const lastDateOfRange = lastPageDates[datesOfLastPageLength - 1]
      setLatest(lastDateOfRange)
      setLatestEra(getEra(lastDateOfRange))
      setMaxDate(lastDateOfRange)
      // if (swapDates) {
      //   setLatest(earliest)
      //   setEarliest(lastDateOfRange)
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, minDate])

  const handleEarliestInputChange = (value: string | number): void => {
    const date = new Date(value)
    // The input comes from the date picker if it is a string
    if (typeof value === 'string') {
      // check if it is bce or not
      if (earliestEra === 'bce') {
        let year = date.getUTCFullYear()
        year = -year
        // Will need to add logic for adding date if user passes over BCE into CE and vice versa
        date.setFullYear(year)
        setEarliest(date.getTime())
      } else {
        setEarliest(date.getTime())
      }
    } else {
      const year = date.getUTCFullYear()
      if (earliestEra === 'bce' && year > 1) {
        setEarliestEra('ce')
      }
      if (earliestEra === 'ce' && year < 1) {
        setEarliestEra('bce')
      }
      setEarliest(value)
    }
  }

  const handleLatestInputChange = (value: string | number): void => {
    const date = new Date(value)
    // The input comes from the date picker if it is a string
    if (typeof value === 'string') {
      // check if it is bce or not
      if (earliestEra === 'bce') {
        let year = date.getUTCFullYear()
        year = -year
        // Will need to add logic for adding date if user passes over BCE into CE and vice versa
        date.setFullYear(year)
        setLatest(date.getTime())
      } else {
        setLatest(date.getTime())
      }
    } else {
      const year = date.getUTCFullYear()
      if (latestEra === 'bce' && year > 1) {
        setLatestEra('ce')
      }
      if (latestEra === 'ce' && year < 1) {
        setLatestEra('bce')
      }
      setLatest(value)
    }
  }

  const handleEarliestEraChange = (selected: string): void => {
    const date = new Date(earliest)
    let year = date.getUTCFullYear()
    if (year < 1) {
      if (selected === 'ce') {
        year = Math.abs(year)
        date.setUTCFullYear(year)
      }
    }

    if (year > 1) {
      if (selected === 'bce') {
        year = -year
        date.setUTCFullYear(year)
      }
    }
    setEarliest(date.getTime())
    setEarliestEra(selected)
    // will need to set earliest too
  }

  const handleLatestEraChange = (selected: string): void => {
    const date = new Date(earliest)
    let year = date.getUTCFullYear()
    if (year < 1) {
      if (selected === 'ce') {
        year = Math.abs(year)
        date.setUTCFullYear(year)
      }
    }

    if (year > 1) {
      if (selected === 'bce') {
        year = -year
        date.setUTCFullYear(year)
      }
    }
    setLatest(date.getTime())
    setLatestEra(selected)
    // will need to set latest too
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (earliest === null) {
      const earliestYear = minDate
      setEarliest(earliestYear)
    }

    if (latest === null) {
      const latestYear = maxDate
      setLatest(latestYear)
    }

    dispatch(addLastSelectedFacet({ facetName: facetSection, facetUri: '' }))
    pushClientEvent(
      'Facets Date Input',
      'Selected',
      `Facet ${facetLabels[facetSection]}`,
    )

    const newFacetQuery = getUpdatedFacetQuery()
    const searchParams = new URLSearchParams(search)
    searchParams.set(`${paramPrefix}f`, JSON.stringify(newFacetQuery))
    searchParams.set('q', JSON.stringify(criteria))
    searchParams.set('facetRequest', 'true')
    searchParams.set(`${paramPrefix}p`, '1')
    const searchQ = searchParams.toString()
    navigate(`${pathname}?${searchQ}`, {
      state: { targetName: 'Results Page' },
    })
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
    // Convert to ISO date
    const earliestIsoDate = new Date(earliest)
    const latestIsoDate = new Date(latest)
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
      const min = { [searchTermName]: earliestIsoDate, _comp: '>=' }
      const max = { [searchTermName]: latestIsoDate, _comp: '<=' }
      array.push(min, max)
      // TODO: uncomment when ML estimates are fixed
      // array.push({ [searchTermName]: { start: earliest, end: latest } })
    }
  }

  return (
    <React.Fragment>
      <form className="w-100" onSubmit={submitHandler}>
        <div className="input-group d-block">
          <DateSlider
            min={swapDates ? maxDate : minDate}
            max={swapDates ? minDate : maxDate}
            earliestVal={earliest}
            latestVal={latest}
            onEarliestChange={handleEarliestInputChange}
            onLatestChange={handleLatestInputChange}
          />
          <div className="d-flex justify-content-between pt-4">
            <Row>
              <Col xs="12">
                <label htmlFor={earliestDateId}>Earliest Date</label>
              </Col>
              <Col>
                <StyledInput
                  id={earliestDateId}
                  type="date"
                  className="form-control"
                  placeholder={getDateInputPlaceholder(earliest)}
                  onChange={(e) =>
                    handleEarliestInputChange(e.currentTarget.value)
                  }
                  // min={
                  //   getEra(minDate) === 'bce'
                  //     ? undefined
                  //     : getDateInputPlaceholder(earliest)
                  // }
                  // max={
                  //   getEra(minDate) === 'bce'
                  //     ? undefined
                  //     : getDateInputPlaceholder(maxDate)
                  // }
                  ref={earliestRef}
                  value={getDateInputPlaceholder(earliest)}
                  autoFocus={autoFocus}
                />
              </Col>
              <Col>
                <label htmlFor="earliest-date-period" hidden>
                  Select CE or BCE
                </label>
                <FacetDropdown
                  options={timePeriod}
                  handleChange={handleEarliestEraChange}
                  className="earliestYearEraSelection me-2"
                  dropdownHeaderText="Select the era"
                  ariaLabel="Select the era BC or BCE"
                  selected={earliestEra}
                  id="earliest-date-period"
                  disabled={disableEraDropdown}
                />
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-between pt-4">
            <Row>
              <Col xs="12">
                <label htmlFor={latestDateId}>Latest Date</label>
              </Col>
              <Col>
                <StyledInput
                  id={latestDateId}
                  type="date"
                  className="form-control"
                  placeholder={getDateInputPlaceholder(maxDate)}
                  onChange={(e) =>
                    handleLatestInputChange(e.currentTarget.value)
                  }
                  // min={
                  //   getEra(maxDate) === 'bce'
                  //     ? undefined
                  //     : getDateInputPlaceholder(earliest)
                  // }
                  // max={
                  //   getEra(maxDate) === 'bce'
                  //     ? undefined
                  //     : getDateInputPlaceholder(maxDate)
                  // }
                  ref={latestRef}
                  value={getDateInputPlaceholder(latest)}
                />
              </Col>
              <Col>
                <label htmlFor="latest-date-period" hidden>
                  Select CE or BCE
                </label>
                <FacetDropdown
                  options={timePeriod}
                  handleChange={handleLatestEraChange}
                  className="latestYearEraSelection me-2"
                  dropdownHeaderText="Select the era"
                  ariaLabel="Select the era BC or BCE"
                  selected={latestEra}
                  id="latest-date-period"
                  disabled={disableEraDropdown}
                />
              </Col>
            </Row>
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
