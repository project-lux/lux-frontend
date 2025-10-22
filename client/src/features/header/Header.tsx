import React, { useState } from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

import config from '../../config/config'
import { signout, verifyToken } from '../../lib/auth/helper'
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

const HeaderExpander = styled.div<{ $displaySearch: boolean }>`
  height: ${(props) => (props.$displaySearch ? 'auto' : '0px')};
  opacity: ${(props) => (props.$displaySearch ? '100%' : '0%')};
  transition-property: height;
  transition-duration: ${headerTransitionDuration};
  transition-timing-function: ease-in-out;
  width: 100%;
  background-color: ${theme.color.primary.darkBlue};
  display: ${(props) => (props.$displaySearch ? 'block' : 'none')};

  margin: 0;
  padding-right: 1rem;
  padding-left: 1rem;
`

const StyledSpan = styled.span`
  justify-content: start;
  width: 100%;

  @media (min-width: ${theme.breakpoints.md}px) and (max-width: ${theme
      .breakpoints.lg}px) {
    justify-content: space-between;
  }

  @media (min-width: ${theme.breakpoints.lg}px) {
    width: auto;
  }
`

const Header: React.FC<{ hideSearch?: boolean }> = ({ hideSearch }) => {
  const auth = useAuth()
  const isLoggedIn = auth.isAuthenticated
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const displaySearch = isSearchOpen && !hideSearch

  const handlePushClientEvent = (link: string): void => {
    pushClientEvent('Internal Link', 'Selected', `Internal ${link}`)
  }

  if (config.env.featureMyCollections) {
    if (auth.isAuthenticated) {
      // console.log('Authenticated', auth.user)
      if (auth.user) {
        config.currentAccessToken = auth.user.access_token
      }
      verifyToken(auth.user?.access_token || '')
    } else {
      // console.log('Not authenticated')
    }
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
        <Container fluid className="mx-0 navbarContainer">
          <StyledSpan className="d-flex">
            <NavLink
              to="/"
              className="navbar-brand titleHeading float-right"
              onClick={() => handlePushClientEvent('Landing Page')}
            >
              LUX: Yale Collections Discovery
            </NavLink>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="show-menu float-left"
            />
          </StyledSpan>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav id="nav-links">
              <NavLink
                to="/content/about-lux"
                className="nav-link"
                onClick={() => handlePushClientEvent('About LUX')}
              >
                About LUX
              </NavLink>
              <NavLink
                to="/content/open-access"
                className="nav-link"
                onClick={() => handlePushClientEvent('Open Access')}
              >
                Open Access
              </NavLink>
              <NavLink
                to="/content/simple-search"
                className="nav-link"
                onClick={() => handlePushClientEvent('Search Tips')}
              >
                Search Tips
              </NavLink>
              <NavLink
                to="/content/faq"
                className="nav-link"
                onClick={() => handlePushClientEvent('Help')}
              >
                Help
              </NavLink>
              {/* {config.env.featureMyCollections && !auth.isAuthenticated && ( */}
              {config.env.featureMyCollections && !isLoggedIn && (
                <NavLink
                  to="#"
                  className="nav-link"
                  // TODO: revert to the signin function
                  // onClick={() => setIsLoggedIn(true)}
                  onClick={() => auth.signinRedirect()}
                  data-testid="login-button"
                >
                  Login
                </NavLink>
              )}
              {/* {config.env.featureMyCollections && auth.isAuthenticated && ( */}
              {config.env.featureMyCollections && isLoggedIn && (
                <React.Fragment>
                  <NavLink
                    // TODO: change to correspond with the correct results page
                    to={`/view/results/collections/my-collections?q=${JSON.stringify({ _scope: 'set', createdBy: { username: auth.user?.profile['cognito:username'] } })}&viewingMyCollections=true&sQt=my-collections`}
                    className="nav-link"
                    data-testid="my-collections-button"
                  >
                    My Collections
                  </NavLink>
                  <NavDropdown
                    title="username TBD"
                    id="user-navbar-dropdown"
                    data-testid="user-navbar-dropdown"
                  >
                    <NavDropdown.Item
                      // TODO: change once the user's profile page is ready
                      href="#"
                      className="navDropdownItem"
                    >
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      // TODO: revert to the signout function
                      // onClick={() => setIsLoggedIn(false)}
                      onClick={() => signout(auth)}
                      className="navDropdownItem"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </React.Fragment>
              )}
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
      <HeaderExpander $displaySearch={displaySearch}>
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
