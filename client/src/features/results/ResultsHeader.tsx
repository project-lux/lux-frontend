/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams, Navigate } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import StyledResultsHeader from '../../styles/features/results/ResultsHeader'
import StyledHr from '../../styles/shared/Hr'
import { pushSiteImproveEvent } from '../../lib/siteImprove'
import { OverlayKey } from '../../config/cms'
import { sortBy, sortDirection } from '../../config/sortingOptions'
import { getParamPrefix } from '../../lib/util/params'
import EntityResultsDescription from '../cms/EntityResultsDescription'
import { ResultsTab } from '../../types/ResultsTab'

import SortDropdown from './SortDropdown'

// Sequence number used to create a different URL for a random shuffle query
let seq = 0

const StyledCol = styled(Col)`
  @media (min-width: 768px) {
    justify-content: flex-end;
    text-align: right;
  }
`

interface IResultsHeader {
  total: number
  label: string
  toggleView?: boolean
  overlay: OverlayKey
}

const ResultsHeader: React.FC<IResultsHeader> = ({
  total,
  label,
  overlay,
  toggleView = false,
}) => {
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

  // set list vs grid view
  const currentView = queryString.has('view') ? queryString.get('view') : 'list'

  // Set sorting options
  const sortName = `${paramPrefix}s`
  const sort = queryString.has(sortName)
    ? (queryString.get(sortName)?.split(':')[0] as string)
    : undefined
  const sortDirectionParamValue = queryString.has(sortName)
    ? (queryString.get(sortName)?.split(':')[1] as string)
    : undefined
  const sortByOptions = sortBy[tab]
  const descriptiveText = EntityResultsDescription(overlay) || ''

  const [sortBySelection, setSortBySelection] = useState<string>(sort || '')
  const [selectedSortDirection, setSelectedSortDirection] = useState<string>(
    sortDirectionParamValue || 'desc',
  )

  // toggle view between list and image view
  const changeView = (selectedView: string): void => {
    const formattedView =
      selectedView.substring(0, 1).toUpperCase() + selectedView.substring(1)
    pushSiteImproveEvent('Results View', formattedView, label)

    queryString.set('view', selectedView)
    navigate({
      pathname: `/view/results/${tab !== undefined ? tab : 'objects'}`,
      search: `?${queryString.toString()}`,
    })
  }

  const handleSortDirectionSelection = (value: string): void => {
    pushSiteImproveEvent(
      'Results',
      'Change Sort Direction',
      `${sortBySelection}:${value}`,
    )
    setSelectedSortDirection(value)
    if (sort !== undefined) {
      setSortBySelection(sort)
      setRedirect(true)
    }
  }

  const handleSortSelection = (value: string): void => {
    pushSiteImproveEvent(
      'Results',
      'Change Sort Field',
      `${value}:${selectedSortDirection}`,
    )
    setSortBySelection(value)
    setRedirect(true)
  }

  if (redirect) {
    queryString.set(sortName, `${sortBySelection}:${selectedSortDirection}`)
    queryString.delete('rnd')

    // If it is a query for random shuffling, add a sequence nunber to the URL
    // so that the results component is re-rendered
    // and that the cached results won't be reused.
    if (sortBySelection === 'random') {
      queryString.set('rnd', String(seq))
      seq += 1
    }
    const searchQ = queryString.toString()
    return (
      <Navigate
        to={{
          pathname,
          search: searchQ,
        }}
        state={{
          prevPath: `${pathname}${search}`,
          targetName: `${pathname}${searchQ}`,
        }}
      />
    )
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <StyledResultsHeader data-testid="results-header-title">
            {total} {label} results
          </StyledResultsHeader>
        </Col>
        <StyledCol
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className="d-flex align-items-center"
          data-testid="results-header-options"
        >
          <ButtonGroup>
            <div className="d-flex">
              <div className="flex-shrink-0">
                {toggleView && (
                  <Button
                    type="button"
                    className="btn btn-light mx-2 text-center"
                    onClick={() =>
                      changeView(currentView === 'list' ? 'grid' : 'list')
                    }
                    data-testid={
                      currentView === 'list'
                        ? 'switch-to-grid-view-button'
                        : 'switch-to-list-view-button'
                    }
                  >
                    {currentView === 'list' ? (
                      <React.Fragment>
                        <i className="bi bi-grid-3x3-gap-fill mx-2 d-inline-block" />
                        Grid View
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <i className="bi bi-list-ul mx-2 d-inline-block" />
                        List View
                      </React.Fragment>
                    )}
                  </Button>
                )}
              </div>
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
            </div>
          </ButtonGroup>
        </StyledCol>
      </Row>
      <Row className="row d-flex align-middle justify-content-between pb-2">
        <Col
          xs={12}
          className="descriptiveText"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(descriptiveText) }}
          data-testid="results-page-cms-descriptor"
        />
      </Row>
      <StyledHr />
    </React.Fragment>
  )
}

export default ResultsHeader
