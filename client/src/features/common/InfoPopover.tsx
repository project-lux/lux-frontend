import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Col, Popover, Row } from 'react-bootstrap'

import StyledHr from '../../styles/shared/Hr'

import { StyledButton } from './LuxOverlay'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

const InfoPopover: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const getButtonText = (): string =>
    isOpen ? 'Hide access details' : 'Learn more about access options'

  const popover = (
    <Popover
      id="popover-basic"
      data-testid="access-details-popover"
      style={{ maxWidth: '300px' }}
      title="Access details popover"
    >
      <Popover.Header as="h3">Access Details</Popover.Header>
      <Popover.Body>
        <Row>
          <Col xs={12}>
            <strong>For Library & Archival Materials:</strong>
          </Col>
          <Col xs={12}>
            <ul className="ms-4">
              <li>View access information and request items</li>
              <li>Check holdings and location details</li>
            </ul>
          </Col>
          <Col xs={12}>
            <strong>For Museum Collections:</strong>
          </Col>
          <Col xs={12}>
            <ul className="ms-4">
              <li>See if items are on public display</li>
              <li>Access digital records and viewing options</li>
            </ul>
          </Col>
        </Row>
        <StyledHr />
        <p className="mt-2 mb-0">
          <i>Need help? Contact the appropriate library or museum directly.</i>
        </p>
      </Popover.Body>
    </Popover>
  )

  return (
    <OverlayTrigger
      placement="bottom"
      trigger={['click']}
      overlay={popover}
      onToggle={(show) => setIsOpen(show)}
    >
      <StyledButton
        variant="info"
        className="p-0"
        data-testid="access-details-popover-button"
        style={{ border: 'none', background: 'none' }}
      >
        <i
          className="bi bi-question-circle"
          style={{
            fontSize: '1rem',
            marginLeft: '0.2rem',
            marginRight: '0.2rem',
          }}
          data-testid="access-details-popover-icon"
        />
        {getButtonText()}
      </StyledButton>
    </OverlayTrigger>
  )
}

export default InfoPopover
