import React, { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Popover } from 'react-bootstrap'

import { StyledButton } from '../common/LuxOverlay'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

interface IProps {
  buttonColor: string
  popoverText: string
  id: string
  ariaLabel: string
}

const AiInfoPopover: React.FC<IProps> = ({
  buttonColor,
  popoverText,
  id,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const popover = (
    <Popover id={id} data-testid={id} style={{ maxWidth: '300px' }}>
      <Popover.Body>
        <p className="mb-0">{popoverText}</p>
      </Popover.Body>
    </Popover>
  )

  return (
    <OverlayTrigger
      placement="bottom"
      trigger={['click']}
      overlay={popover}
      rootClose={true}
      show={isOpen}
      onToggle={setIsOpen}
    >
      <StyledButton
        variant="info"
        className="p-0 ms-0"
        data-testid={`${id}-button`}
        style={{
          border: 'none',
          background: 'none',
          color: buttonColor,
        }}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-controls={isOpen ? id : undefined}
        aria-describedby={isOpen ? id : undefined}
      >
        <i
          className={`bi ${isOpen ? 'bi-x-circle' : 'bi-info-circle'}`}
          style={{
            fontSize: '1rem',
            marginRight: '0.2rem',
          }}
          data-testid={`${id}-button-icon`}
          aria-hidden={true}
        />
      </StyledButton>
    </OverlayTrigger>
  )
}

export default AiInfoPopover
