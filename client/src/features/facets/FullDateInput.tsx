/* eslint-disable prefer-destructuring */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import {
  getDatesFromFacetValues,
  getDefaultDate,
  IDateObj,
  getYearToDisplay,
  isDayOrMonthToLuxNumberAsString,
  isValid,
  getLuxYear,
  getDaysInMonthArray,
  getLuxISOString,
  convertYearToISOYear,
  getLUXTimestamp,
  getISOMonth,
  getISODay,
} from '../../lib/facets/dateParser'
import { numbersToMonths } from '../../config/advancedSearch/inputTypes'
import DayDropdown from '../dates/DayDropdown'
import MonthDropdown from '../dates/MonthDropdown'

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

const FullDateInput: React.FC<IFacets> = ({
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
  let earliestFacet = getDefaultDate('')
  let defaultLatestFacet = getDefaultDate('')
  if (facetValues.requests.hasOwnProperty('call1')) {
    const dates = getDatesFromFacetValues(facetValues.requests.call1)
    if (dates.length > 0) {
      earliestFacet = dates[0]
      defaultLatestFacet = dates[dates.length - 1]
    }
  }
  const dispatch = useAppDispatch()
  const [earliest, setEarliest] = useState<IDateObj>(earliestFacet)
  const [latest, setLatest] = useState<IDateObj>(defaultLatestFacet)
  // This will only change upon retrieving the last date year
  const [maxDate, setMaxDate] = useState<IDateObj>(defaultLatestFacet)

  const { data, isSuccess } = useGetFacetsSearchQuery({
    q: JSON.stringify(combinedQuery),
    facets: {},
    facetNames: facetName,
    tab: currentTab,
    page: lastPage,
  })

  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = searchScope[tab].slice(0, 1)

  const earliestDateId = 'earliest-date'
  const latestDateId = 'latest-date'

  useEffect(() => {
    if (isSuccess && data) {
      const { orderedItems } = data as ISearchResults
      const yearsOfLastPage = getDatesFromFacetValues(orderedItems)
      const yearsOfLastPageLength = yearsOfLastPage.length
      const lastYearOfRange = yearsOfLastPage[yearsOfLastPageLength - 1]
      setLatest(lastYearOfRange)
      setMaxDate(lastYearOfRange)
    }
  }, [data, isSuccess])

  // Earliest date functions
  const handleEarliestMonthChange = (selected: string): void => {
    // Check if day inputed is valid
    if (
      isValid(
        parseInt(earliest.day, 10),
        parseInt(selected, 10),
        parseInt(earliest.year, 10),
      )
    ) {
      setEarliest({ year: earliest.year, month: selected, day: earliest.day })
    } else {
      setEarliest({ year: earliest.year, month: selected, day: '1' })
    }
  }

  const handleEarliestDayChange = (selected: string): void => {
    setEarliest({ year: earliest.year, month: earliest.month, day: selected })
  }

  const handleEarliestYearChange = (selected: string): void => {
    const yearToAdd = getLuxYear(selected)
    setEarliest({ year: yearToAdd, month: earliest.month, day: earliest.day })
  }

  const handleEarliestSliderChange = (selected: number): void => {
    const dateObj = new Date(selected)
    const luxDate = getDefaultDate(dateObj.toISOString())
    setEarliest({ year: luxDate.year, month: luxDate.month, day: luxDate.day })
  }

  // Latest date functions
  const handleLatestMonthChange = (selected: string): void => {
    // Check if day inputed is valid
    if (
      isValid(
        parseInt(latest.day, 10),
        parseInt(selected, 10),
        parseInt(latest.year, 10),
      )
    ) {
      setLatest({ year: latest.year, month: selected, day: latest.day })
    } else {
      setLatest({ year: latest.year, month: selected, day: '1' })
    }
  }

  const handleLatestDayChange = (selected: string): void => {
    setLatest({ year: latest.year, month: latest.month, day: selected })
  }

  const handleLatestYearChange = (selected: string): void => {
    const yearToAdd = getLuxYear(selected)
    setLatest({ year: yearToAdd, month: latest.month, day: latest.day })
  }

  // selected is the timestamp
  const handleLatestSliderChange = (selected: number): void => {
    const dateObj = new Date(selected)
    const luxDate = getDefaultDate(dateObj.toISOString())
    setLatest({ year: luxDate.year, month: luxDate.month, day: luxDate.day })
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

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
    navigate(`${pathname}?${searchQ}`)
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
      const min = {
        [searchTermName]: getLuxISOString(
          convertYearToISOYear(earliest.year),
          getISOMonth(earliest.month),
          getISODay(earliest.day),
        ),
        _comp: '>=',
      }
      const max = {
        [searchTermName]: getLuxISOString(
          convertYearToISOYear(latest.year),
          getISOMonth(latest.month),
          getISODay(latest.day),
        ),
        _comp: '<=',
      }
      array.push(min, max)
    }
  }

  return (
    <form className="w-100" onSubmit={submitHandler}>
      <div className="input-group d-block">
        <DateSlider
          min={getLUXTimestamp(
            getLuxISOString(
              convertYearToISOYear(earliestFacet.year),
              earliestFacet.month,
              earliestFacet.day,
            ),
          )}
          max={getLUXTimestamp(
            getLuxISOString(
              convertYearToISOYear(maxDate.year),
              maxDate.month,
              maxDate.day,
            ),
          )}
          earliestVal={getLUXTimestamp(
            getLuxISOString(
              convertYearToISOYear(earliest.year),
              earliest.month,
              earliest.day,
            ),
          ).toString()}
          latestVal={getLUXTimestamp(
            getLuxISOString(
              convertYearToISOYear(latest.year),
              latest.month,
              latest.day,
            ),
          ).toString()}
          onEarliestChange={handleEarliestSliderChange}
          onLatestChange={handleLatestSliderChange}
        />
        {/* EARLIEST */}
        <label htmlFor={`${earliestDateId}-date-selection`} className="mt-3">
          Earliest Date
        </label>
        <div
          id={`${earliestDateId}-date-selection`}
          className="d-flex justify-content-between pt-2"
        >
          <label htmlFor={`${earliestDateId}-month-selection`} hidden>
            Earliest Month
          </label>
          <MonthDropdown
            options={numbersToMonths}
            handleChange={handleEarliestMonthChange}
            className="monthSelection me-2"
            dropdownHeaderText="Select a month"
            ariaLabel="Select a month"
            selected={isDayOrMonthToLuxNumberAsString(earliest.month)}
            id={`${earliestDateId}-month-selection`}
          />
          <label htmlFor={`${earliestDateId}-day-selection`} hidden>
            Earliest Day
          </label>
          <DayDropdown
            options={getDaysInMonthArray(earliest.month, earliest.year)}
            handleChange={handleEarliestDayChange}
            className="dateSelection me-2"
            dropdownHeaderText="Select a date"
            ariaLabel="Select a date"
            selected={isDayOrMonthToLuxNumberAsString(earliest.day)}
            id={`${earliestDateId}-day-selection`}
          />
          <label htmlFor={`${earliestDateId}-year-input`} hidden>
            Earliest Year
          </label>
          <StyledInput
            id={`${earliestDateId}-year-input`}
            type="number"
            className="form-control"
            onChange={(e) => handleEarliestYearChange(e.target.value)}
            placeholder="Enter a year"
            value={getYearToDisplay(earliest.year)}
            min={parseInt(earliestFacet.year, 10)}
            max={parseInt(latest.year, 10)}
            aria-label="Enter a year"
            required
          />
        </div>
        {/* LATEST */}
        <label htmlFor={`${latestDateId}-date-selection`} className="mt-3">
          Latest Date
        </label>
        <div
          id={`${latestDateId}-date-selection`}
          className="d-flex justify-content-between pt-2"
        >
          <label htmlFor={`${latestDateId}-month-selection`} hidden>
            Latest Month
          </label>
          <MonthDropdown
            options={numbersToMonths}
            handleChange={handleLatestMonthChange}
            className="monthSelection me-2"
            dropdownHeaderText="Select a month"
            ariaLabel="Select a month"
            selected={isDayOrMonthToLuxNumberAsString(latest.month)}
            id={`${latestDateId}-month-selection`}
          />
          <label htmlFor={`${latestDateId}-day-selection`} hidden>
            Latest Day
          </label>
          <DayDropdown
            options={getDaysInMonthArray(latest.month, latest.year)}
            handleChange={handleLatestDayChange}
            className="dateSelection me-2"
            dropdownHeaderText="Select a date"
            ariaLabel="Select a date"
            selected={isDayOrMonthToLuxNumberAsString(latest.day)}
            id={`${latestDateId}-day-selection`}
          />
          <label htmlFor={`${latestDateId}-year-input`} hidden>
            Latest Year
          </label>
          <StyledInput
            id={`${latestDateId}-year-input`}
            type="number"
            className="form-control"
            onChange={(e) => handleLatestYearChange(e.target.value)}
            placeholder="Enter a year"
            value={getYearToDisplay(latest.year)}
            min={parseInt(earliest.year, 10)}
            max={parseInt(maxDate.year, 10)}
            aria-label="Enter a year"
            required
          />
        </div>
      </div>
      {/* </div> */}
      <div className="d-flex justify-content-end">
        <StyledSubmit
          type="submit"
          className="btn"
          aria-label="Apply date facet"
        >
          Apply
        </StyledSubmit>
      </div>
    </form>
  )
}

export default FullDateInput
