import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { sortBy, sortDirection } from '../../config/sortingOptions'
import { getParamPrefix } from '../../lib/util/params'
import { ResultsTab } from '../../types/ResultsTab'

import SortDropdown from './SortDropdown'
import MobileRefine from './MobileRefine'

// Sequence number used to create a different URL for a random shuffle query
let seq = 0

const Sort: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )

  useResizeableWindow(setIsMobile)

  const [redirect, setRedirect] = useState<boolean>(false)

  useEffect(() => {
    if (redirect !== false) {
      setRedirect(false)
    }
  }, [redirect])

  const navigate = useNavigate()
  const { pathname, search } = useLocation() as {
    pathname: string
    search: string
  }
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)
  const queryString = new URLSearchParams(search)
  // Set sorting options
  const sortName = `${paramPrefix}s`
  const sort = queryString.has(sortName)
    ? (queryString.get(sortName)?.split(':')[0] as string)
    : undefined
  const sortDirectionParamValue = queryString.has(sortName)
    ? (queryString.get(sortName)?.split(':')[1] as string)
    : undefined
  const sortByOptions = sortBy[tab]

  const [sortBySelection, setSortBySelection] = useState<string>(sort || '')
  const [selectedSortDirection, setSelectedSortDirection] = useState<string>(
    sortDirectionParamValue || 'desc',
  )

  // Handle selection of sorting direction
  const handleSortDirectionSelection = (value: string): void => {
    pushClientEvent(
      'Results Sort',
      'Selected',
      `Sort By ${sortBySelection}:${value}`,
    )
    setSelectedSortDirection(value)
    if (sort !== undefined) {
      setSortBySelection(sort)
      // set query string params
      queryString.set(sortName, `${sortBySelection}:${value}`)
      const searchQ = queryString.toString()
      navigate(`${pathname}?${searchQ}`)
    }
  }

  // Handle selection of sorting term
  const handleSortSelection = (value: string): void => {
    pushClientEvent(
      'Results Sort',
      'Selected',
      `Sort By ${value}:${selectedSortDirection}`,
    )
    queryString.delete('rnd')
    if (value === 'random') {
      queryString.set('rnd', String(seq))
      seq += 1
    }
    queryString.set(sortName, `${value}:${selectedSortDirection}`)
    const searchQ = queryString.toString()
    setSortBySelection(value)
    navigate(`${pathname}?${searchQ}`)
  }

  if (isMobile) {
    return (
      <div className="flex-grow-1 ms-3">
        <MobileRefine
          sortTermSelected={sort}
          sortDirectionSelected={sortDirectionParamValue}
          handleSelectionOfSortDirection={handleSortDirectionSelection}
          handleSelectionOfSortTerm={handleSortSelection}
        />
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="flex-grow-1 ms-3">
        <SortDropdown
          options={sortByOptions}
          handleChange={handleSortSelection}
          className="sortingDropdown"
          id="sorting-dropdown"
          selected={sort}
          label="Sort By"
          headerText="Sort By"
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <SortDropdown
          options={sortDirection}
          handleChange={handleSortDirectionSelection}
          className="sortAscOrDesc"
          id="sort-asc-or-desc"
          selected={sortDirectionParamValue}
          label={selectedSortDirection}
          headerText="Sorting Direction"
        />
      </div>
    </React.Fragment>
  )
}

export default Sort
