import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Popover } from 'react-bootstrap'

import { StyledButton } from '../common/LuxOverlay'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

interface IProps {
  buttonColor: string
}

const AiInfoPopover: React.FC<IProps> = ({ buttonColor }) => {
  const popover = (
    <Popover
      id="popover-basic"
      data-testid="access-details-popover"
      style={{ maxWidth: '300px' }}
      title="Access details popover"
    >
      <Popover.Header as="h3">What is AI Assisted Search?</Popover.Header>
      <Popover.Body>
        <p className="mt-2 mb-0">
          This is some information about the AI Assisted Search feature.
        </p>
      </Popover.Body>
    </Popover>
  )

  return (
    <OverlayTrigger placement="bottom" trigger={['click']} overlay={popover}>
      <StyledButton
        variant="info"
        className="p-0 ms-0"
        data-testid="ai-assisted-search-popover-button"
        style={{
          border: 'none',
          background: 'none',
          color: buttonColor,
        }}
        aria-label="Learn more about AI Assisted Search"
      >
        <i
          className="bi bi-info-circle"
          style={{
            fontSize: '1rem',
            marginRight: '0.2rem',
          }}
          data-testid="ai-assisted-search-popover-icon"
        />
      </StyledButton>
    </OverlayTrigger>
  )
}

export default AiInfoPopover
