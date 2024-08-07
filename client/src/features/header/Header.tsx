import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

import { listCollections, signout } from '../../lib/my-collections/helper'
import StyledHeader from '../../styles/features/header/Header'
import theme from '../../styles/theme'
import SearchContainer from '../search/SearchContainer'
import { pushClientEvent } from '../../lib/pushClientEvent'

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
  const auth = useAuth()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const displaySearch = isSearchOpen && !hideSearch

  const handlepushClientEvent = (link: string): void => {
    pushClientEvent('Internal Link', 'Selected', `Internal ${link}`)
  }

  if (auth.isAuthenticated) {
    console.log('Authenticated', auth.user)
  } else {
    console.log('Not authenticated')
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
          <NavLink
            to="/"
            state={{ targetName: 'LUX Landing Page' }}
            className="navbar-brand"
            onClick={() => handlepushClientEvent('Landing Page')}
          >
            LUX: Yale Collections Discovery
          </NavLink>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="show-menu"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav id="nav-links">
              <NavLink
                to="/content/about-lux"
                state={{ targetName: 'About LUX' }}
                className="nav-link"
                onClick={() => handlepushClientEvent('About LUX')}
              >
                About LUX
              </NavLink>
              <NavLink
                to="/content/open-access"
                state={{ targetName: 'Open Access' }}
                className="nav-link"
                onClick={() => handlepushClientEvent('Open Access')}
              >
                Open Access
              </NavLink>
              <NavLink
                to="/content/simple-search"
                state={{ targetName: 'Search Tips' }}
                className="nav-link"
                onClick={() => handlepushClientEvent('Search Tips')}
              >
                Search Tips
              </NavLink>
              <NavLink
                to="/content/faq"
                state={{ targetName: 'Help' }}
                className="nav-link"
                onClick={() => handlepushClientEvent('Help')}
              >
                Help
              </NavLink>
              {!auth.isAuthenticated && (
                <button type="submit" onClick={() => auth.signinRedirect()}>
                  Sign In
                </button>
              )}
              {auth.isAuthenticated && (
                <button type="submit" onClick={() => signout(auth)}>
                  Sign Out
                </button>
              )}
              <button type="submit" onClick={() => listCollections(auth)}>
                List
              </button>
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
