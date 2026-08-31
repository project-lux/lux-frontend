import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'
import { Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import StyledResultsHeader from '../../styles/features/results/ResultsHeader'
import StyledHr from '../../styles/shared/Hr'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { getParamPrefix } from '../../lib/util/params'
import EntityResultsDescription from '../cms/EntityResultsDescription'
import { ResultsTab } from '../../types/ResultsTab'
import LuxOverlay from '../common/LuxOverlay'
import MobileSelectedFacets from '../facets/MobileSelectedFacets'
import {
  advancedSearchTitles,
  resultsHeaderOverlays,
  searchScope,
} from '../../config/searchTypes'
import { useWindowWidth } from '../../lib/hooks/useWindowWidth'
import { ISearchResults } from '../../types/ISearchResults'

import Sort from './Sort'

const StyledDiv = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoints.md}px) {
    display: inline;
  }
`

interface IResultsHeader {
  total: number
  resultsData?: ISearchResults
}

const ResultsHeader: React.FC<IResultsHeader> = ({ total }) => {
  const navigate = useNavigate()
  const { pathname, search } = useLocation() as {
    pathname: string
    search: string
  }
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)
  const queryString = new URLSearchParams(search)
  const label = advancedSearchTitles[tab] || ''
  const overlay = resultsHeaderOverlays[tab]

  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const [redirect, setRedirect] = useState<boolean>(false)
  const { width } = useWindowWidth()
  useResizeableWindow(setIsMobile)

  useEffect(() => {
    if (redirect !== false) {
      setRedirect(false)
    }
  }, [redirect])

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
  const descriptiveText = EntityResultsDescription(overlay) || ''

  // toggle view between list and image view
  const changeView = (selectedView: string): void => {
    pushClientEvent(
      'Results View Toggle',
      'Selected',
      `To ${selectedView} View`,
    )

    queryString.set('view', selectedView)
    navigate({
      pathname,
      search: `?${queryString.toString()}`,
    })
  }

  return (
    <div>
      <Row className="resultsHeaderTitleRow">
        <Col className="resultsHeaderTitleCol">
          <StyledResultsHeader
            className="mb-0 resultsHeaderTitle"
            data-testid="results-header-title"
          >
            <StyledDiv>
              {total} {label} results
            </StyledDiv>
            {(tab === 'objects' || tab === 'works') && <LuxOverlay />}
          </StyledResultsHeader>
        </Col>
      </Row>
      <Row className="px-2 resultsHeaderControlsRow">
        <Col
          className="resultsHeaderDescriptiveTextCol"
          xs={12}
          sm={12}
          md={7}
          lg={7}
          xl={7}
        >
          <div
            className="descriptiveText"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(descriptiveText),
            }}
            data-testid="results-page-cms-descriptor"
          />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          className="d-flex align-items-end resultsHeaderOptionsCol"
          data-testid="results-header-options"
        >
          <Row className="w-100 d-flex justify-content-end resultsHeaderOptionsRow">
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={12}
              className={`d-flex ${width < theme.breakpoints.sm ? 'w-100' : 'w-auto'} justify-content-end resultsHeaderSortingCol`}
            >
              <div
                className={`d-flex toggleViewButtonDiv ${isMobile ? 'w-100 order-2' : 'order-1'}`}
              >
                <Button
                  type="button"
                  className={`btn text-center h-100 text-nowrap rounded-3 toggleViewButton w-100 ${isMobile ? '' : 'me-2'}`}
                  onClick={() =>
                    changeView(currentView === 'list' ? 'grid' : 'list')
                  }
                  style={{
                    backgroundColor: theme.color.lightGray,
                    color: theme.color.trueBlack,
                    border: theme.color.trueBlack,
                    paddingTop: width < theme.breakpoints.md ? '1em' : '0.5em',
                    paddingBottom:
                      width < theme.breakpoints.md ? '1em' : '0.5em',
                  }}
                  data-testid={
                    currentView === 'list'
                      ? 'switch-to-grid-view-button'
                      : 'switch-to-list-view-button'
                  }
                >
                  {currentView === 'list' ? (
                    <React.Fragment>
                      <i
                        className="bi bi-grid-3x3-gap-fill mx-2 d-inline-block"
                        style={{ color: theme.color.link }}
                      />
                      Grid View
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <i
                        className="bi bi-list-ul mx-2 d-inline-block"
                        style={{ color: theme.color.link }}
                      />
                      List View
                    </React.Fragment>
                  )}
                </Button>
              </div>
              <Sort />
            </Col>
          </Row>
        </Col>
        {isMobile && (
          <MobileSelectedFacets
            tab={tab}
            scope={searchScope[tab]}
            search={search}
            selectedSortBy={sort}
            selectedSortDirection={sortDirectionParamValue}
          />
        )}
      </Row>
      <StyledHr width="100%" className="my-2 resultsHeaderHr" />
    </div>
  )
}

export default ResultsHeader
