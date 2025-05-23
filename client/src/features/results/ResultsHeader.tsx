import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import StyledResultsHeader from '../../styles/features/results/ResultsHeader'
import StyledHr from '../../styles/shared/Hr'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { OverlayKey } from '../../config/cms'
import { getParamPrefix } from '../../lib/util/params'
import EntityResultsDescription from '../cms/EntityResultsDescription'
import { ResultsTab } from '../../types/ResultsTab'
import LuxOverlay from '../common/LuxOverlay'
import MobileSelectedFacets from '../facets/MobileSelectedFacets'
import { searchScope } from '../../config/searchTypes'

import Sort from './Sort'

const StyledCol = styled(Col)`
  margin-bottom: 12px;
  margin-top: 12px;

  @media (min-width: ${theme.breakpoints.md}px) {
    justify-content: flex-end;
    text-align: right;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`

const StyledDiv = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoints.md}px) {
    display: inline;
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
    <React.Fragment>
      <Row>
        <Col>
          <StyledResultsHeader
            className="mb-0"
            data-testid="results-header-title"
          >
            <StyledDiv>
              {total} {label} results
            </StyledDiv>
            {(tab === 'objects' || tab === 'works') && <LuxOverlay />}
          </StyledResultsHeader>
        </Col>
      </Row>
      <Row className="px-2">
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div
            className="descriptiveText"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(descriptiveText),
            }}
            data-testid="results-page-cms-descriptor"
          />
        </Col>
        <StyledCol
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className="d-flex align-items-end"
          data-testid="results-header-options"
        >
          <ButtonGroup>
            <div className="d-flex">
              <div className="flex-shrink-0">
                {toggleView && (
                  <Button
                    type="button"
                    className="btn text-center h-100"
                    onClick={() =>
                      changeView(currentView === 'list' ? 'grid' : 'list')
                    }
                    style={{
                      borderRadius: theme.border.radius,
                      backgroundColor: theme.color.lightGray,
                      color: theme.color.trueBlack,
                      border: theme.color.trueBlack,
                    }}
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
              <Sort />
            </div>
          </ButtonGroup>
        </StyledCol>
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
    </React.Fragment>
  )
}

export default ResultsHeader
