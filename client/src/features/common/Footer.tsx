import React from 'react'
import { Col, Container } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'

import StyledFooter from '../../styles/features/common/Footer'
import theme from '../../styles/theme'

import ExternalLink from './ExternalLink'
import FeedbackButton from './FeedbackButton'

const Footer: React.FC = () => {
  const { pathname, search } = useLocation()
  return (
    <StyledFooter>
      <Container fluid className="px-0">
        <footer
          className="row d-flex flex-wrap align-items-center justify-content-between h-100"
          style={{ backgroundColor: theme.color.primary.darkBlue }}
          data-testid="lux-footer"
        >
          <Col xs={12} sm={6} className="lux-footer-yale-col d-flex">
            <a id="lux-footer-yale" href="https://www.yale.edu">
              Yale
            </a>
          </Col>
          <Col xs={12} sm={6} className="d-flex" id="lux-footer-nav-items-col">
            <ul className="nav" id="lux-footer-nav-items">
              <li className="nav-item">
                <FeedbackButton linkName="Contact" />
              </li>
              <li className="nav-item">
                <NavLink
                  to="/content/terms-of-use"
                  state={{
                    prevPath: `${pathname}${search}`,
                    targetName: 'Terms of Use',
                  }}
                >
                  Terms of Use
                </NavLink>
              </li>
              <li className="nav-item">
                <ExternalLink
                  url="https://usability.yale.edu/web-accessibility/accessibility-yale"
                  name="Accessibility"
                />
              </li>
              <li className="nav-item">
                <ExternalLink
                  url="https://privacy.yale.edu/resources/privacy-statement"
                  name="Privacy"
                />
              </li>
            </ul>
          </Col>
        </footer>
      </Container>
    </StyledFooter>
  )
}

export default Footer
