import React from 'react'
import { Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import StyledFooter from '../../styles/features/common/Footer'
import theme from '../../styles/theme'
import { pushClientEvent } from '../../lib/pushClientEvent'

import ExternalLink from './ExternalLink'
import FeedbackButton from './FeedbackButton'
import InternalLink from './InternalLink'

const Footer: React.FC = () => (
  <StyledFooter>
    <Container fluid className="px-0">
      <footer
        className="row d-flex flex-wrap align-items-center justify-content-between h-100"
        style={{ backgroundColor: theme.color.primary.darkBlue }}
        data-testid="lux-footer"
      >
        <Col xs={12} sm={6} className="lux-footer-yale-col d-flex">
          <Link
            id="lux-footer-yale"
            to="https://www.yale.edu"
            onClick={() =>
              pushClientEvent('External Link', 'Selected', 'External Yale')
            }
          >
            Yale
          </Link>
        </Col>
        <Col xs={12} sm={6} className="d-flex" id="lux-footer-nav-items-col">
          <ul className="nav" id="lux-footer-nav-items">
            <li className="nav-item">
              <FeedbackButton linkName="Contact" />
            </li>
            <li className="nav-item">
              <InternalLink
                uri="/content/terms-of-use"
                name="Terms of Use"
                linkCategory="Terms of Use"
              />
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

export default Footer
