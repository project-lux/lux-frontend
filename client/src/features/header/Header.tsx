import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

import StyledHeader from '../../styles/features/header/Header'
import theme from '../../styles/theme'
import SearchContainer from '../search/SearchContainer'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

import SearchButton from './SearchButton'

const headerTransitionDuration = '200ms'

const SeparatingLine = styled.div`
  border-left-width: 1px;
  border-left-style: solid;
  border-color: white;
  margin-right: 10px;
  margin-left: 10px;
`

const HeaderExpander = styled.div<{ displaySearch: boolean }>`
  height: ${(props) => (props.displaySearch ? 'auto' : '0px')};
  opacity: ${(props) => (props.displaySearch ? '100%' : '0%')};
  transition-property: height;
  transition-duration: ${headerTransitionDuration};
  transition-timing-function: ease-in-out;
  width: 100%;
  background-color: ${theme.color.primary.darkBlue};
  display: ${(props) => (props.displaySearch ? 'block' : 'none')};

  margin: 0;
  padding-right: 1rem;
  padding-left: 1rem;
`

/* eslint-disable jsx-a11y/anchor-is-valid */
const Header: React.FC<{ hideSearch?: boolean }> = ({ hideSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const displaySearch = isSearchOpen && !hideSearch

  const handlePushEvent = (link: string): void => {
    pushSiteImproveEvent('Internal Link', 'Selected', `Internal ${link}`)
  }

  return (
    <StyledHeader>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="w-auto px-4 py-3"
      >
        <Container fluid className="mx-0">
          <Navbar.Brand
            href="/"
            onClick={() => handlePushEvent('Landing Page')}
          >
            LUX: Yale Collections Discovery
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="show-menu"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav id="nav-links">
              <Nav.Link
                href="/content/about-lux"
                onClick={() => handlePushEvent('About LUX')}
              >
                About LUX
              </Nav.Link>
              <Nav.Link
                href="/content/open-access"
                onClick={() => handlePushEvent('Open Access')}
              >
                Open Access
              </Nav.Link>
              <Nav.Link
                href="/content/simple-search"
                onClick={() => handlePushEvent('Search Tips')}
              >
                Search Tips
              </Nav.Link>
              <Nav.Link
                href="/content/faq"
                onClick={() => handlePushEvent('Help')}
              >
                Help
              </Nav.Link>
              {hideSearch ? null : (
                <React.Fragment>
                  <SeparatingLine />
                  <SearchButton
                    displaySearch={displaySearch}
                    setIsSearchOpen={setIsSearchOpen}
                  />
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <HeaderExpander displaySearch={displaySearch}>
        <SearchContainer
          className="headerSearchContainer"
          bgColor={theme.color.primary.darkBlue}
          id="header-search-container"
          searchTipsStyle={{
            color: theme.color.white,
            textDecoration: 'underline',
          }}
        />
      </HeaderExpander>
    </StyledHeader>
  )
}

export default Header
