import React, { useState } from 'react'
import { Nav, Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'
import { nestedPageLinks } from '../../config/myCollections/resultsTabs'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import LoadingSpinner from '../common/LoadingSpinner'

import MobileMyCollectionsNavBar from './MobileMyCollectionsNavBar'

const NavLink = styled(Nav.Link)`
  color: ${theme.color.trueBlack};
  font-size: 1.25rem;

  &.nav-link.active {
    color: ${theme.color.primary.blue};
    border-bottom-color: ${theme.color.primary.blue};
  }
`

interface IProps {
  searchQueryString: string
  nestedPage: string
  currentEstimates: Record<string, string | number>
  isLoading: boolean
  isFetching: boolean
}

const MyCollectionsNavBar: React.FC<IProps> = ({
  searchQueryString,
  nestedPage,
  currentEstimates,
  isLoading,
  isFetching,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  if (isMobile) {
    return (
      <MobileMyCollectionsNavBar
        searchQueryString={searchQueryString}
        currentNestedPage={nestedPage}
        currentEstimates={currentEstimates}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    )
  }

  return (
    <Col className="px-0 mb-2">
      <Nav
        variant="underline"
        defaultActiveKey="/all"
        className="collectionsSubTabs mt-2 px-2"
        style={{
          backgroundColor: theme.color.white,
          borderBottom: `2px solid ${theme.color.lightGray}`,
        }}
        data-testid="my-collections-nav-bar"
      >
        {Object.keys(nestedPageLinks).map((key) => {
          // const subTabQuery = formatSubTabNavLinks(auth, key, searchQueryString)
          return (
            <Nav.Item>
              <NavLink
                href={`/view/results/collections/${key}?${searchQueryString}`}
                eventKey={key}
                active={key === nestedPage}
              >
                {nestedPageLinks[key]} (
                {isLoading || isFetching ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  currentEstimates[key]
                )}
                )
              </NavLink>
            </Nav.Item>
          )
        })}
      </Nav>
    </Col>
  )
}

export default MyCollectionsNavBar
