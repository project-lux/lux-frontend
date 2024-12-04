import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { tabToLinkLabel } from '../../config/results'
import { getIcon } from '../../lib/advancedSearch/searchHelper'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import SecondaryButton from '../../styles/shared/SecondaryButton'

interface IProps {
  estimate: number | string
  icon: string
  tab: string
  handleClick: () => void
  showArrow?: boolean
}

const MobileTabButton: React.FC<IProps> = ({
  estimate,
  icon,
  tab,
  handleClick,
  showArrow = false,
}) => (
  <SecondaryButton
    className="border border-0 w-100"
    onClick={() => handleClick()}
  >
    <Row>
      <Col xs={2}>
        <img
          className="float-start navIcon"
          src={getIcon(icon)}
          alt="icon"
          aria-label="icon"
          height={45}
          width={45}
        />
      </Col>
      <Col xs={showArrow ? 8 : 10}>
        <Row className="d-flex float-start">
          <Col xs={12} className="linkTitle d-flex float-start">
            <h3>{tabToLinkLabel[tab]}</h3>
          </Col>
          <Col xs={12} className="linkSubtext d-flex float-start">
            {estimate} results
          </Col>
        </Row>
      </Col>
      {showArrow && (
        <Col xs={2}>
          <h3
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <i className="bi bi-chevron-down" />
          </h3>
        </Col>
      )}
    </Row>
    <StyledHr width="100%" color={theme.color.lightGray} hiddenOnDesktop />
  </SecondaryButton>
)

export default MobileTabButton
