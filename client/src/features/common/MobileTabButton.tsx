import React from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import SecondaryButton from '../../styles/shared/SecondaryDropdown'
import { getIcon } from '../../lib/advancedSearch/searchHelper'
import { searchScope } from '../../config/searchTypes'

interface IProps {
  title: string
  index: number
  tab: string
  handleOnClick: (index?: number) => void
  isActive: boolean
  className?: string
  showArrow?: boolean
}

const MobileTabButton: React.FC<IProps> = ({
  title,
  index,
  tab,
  handleOnClick,
  isActive,
  className = '',
  showArrow = false,
}) => (
  <SecondaryButton
    role="button"
    className={`border border-0 w-100 ${className}`}
    onClick={() => handleOnClick(index)}
    actionBgColor={theme.color.primary.teal}
  >
    <Row>
      <Col xs={2}>
        <img
          className="navIcon"
          src={getIcon(searchScope[tab])}
          alt="icon"
          aria-label="icon"
          height={45}
          width={45}
        />
      </Col>
      <Col xs={8} className="d-flex align-items-center">
        <Row className="d-flex float-start">
          <Col xs={12} className="linkTitle d-flex float-start">
            <h5>{title}</h5>
          </Col>
        </Row>
      </Col>
      {showArrow && (
        <Col xs={2}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.5rem',
            }}
          >
            <i className="bi bi-chevron-down" />
          </div>
        </Col>
      )}
      {isActive && (
        <Col xs={2}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              color: theme.color.primary.blue,
              fontSize: '1.5rem',
            }}
          >
            <i className="bi bi-check-lg fs-1 mt-2" />
          </div>
        </Col>
      )}
    </Row>
    <StyledHr width="100%" color={theme.color.lightGray} />
  </SecondaryButton>
)

export default MobileTabButton
