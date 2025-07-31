import React, { useState } from 'react'
import { Nav, Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'
import { nestedPageLinks } from '../../config/myCollections/resultsTabs'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

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
}

const MyCollectionsNavBar: React.FC<IProps> = ({
  searchQueryString,
  nestedPage,
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
      >
        {Object.keys(nestedPageLinks).map((key) => (
          <Nav.Item>
            <NavLink
              href={`/view/results/collections/${key}${searchQueryString}`}
              eventKey={key}
              active={key === nestedPage}
            >
              {nestedPageLinks[key]}
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  )
}

export default MyCollectionsNavBar
