import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ReactTooltip from 'react-bootstrap/Tooltip'
import sanitizeHtml from 'sanitize-html'
import styled from 'styled-components'

import theme from '../../styles/theme'

type Placement = 'top' | 'bottom' | 'left' | 'right'

interface IProps {
  html: string
  children: JSX.Element
  placement?: Placement
}

const arrowBorderColors: { [key: string]: string } = {
  top: `${theme.color.gray} transparent transparent transparent`,
  bottom: `transparent transparent ${theme.color.gray} transparent`,
  left: `transparent transparent transparent ${theme.color.gray}`,
  right: `transparent ${theme.color.gray} transparent transparent `,
}

const StyledTooltip = styled(ReactTooltip)<{ placement: Placement }>`
  &.show {
    opacity: 1;
  }

  .tooltip-arrow:before {
    border-color: ${({ placement }) => arrowBorderColors[placement || 'none']};
  }
  .tooltip-inner {
    border: solid 1px ${theme.color.gray};
    padding: 8px 16px;
    min-width: auto;
    background-color: ${theme.color.lightGray};
    color: ${theme.color.black};
    opacity: 1;
    text-align: left;
  }
`

const Tooltip: React.FC<IProps> = ({
  html,
  children,
  placement = 'bottom',
}) => {
  const renderTooltip = (inPlacement: Placement): JSX.Element => (
    <StyledTooltip placement={inPlacement}>
      <span
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(html, { allowedTags: [] }),
        }}
      />
    </StyledTooltip>
  )

  return (
    <OverlayTrigger placement={placement} overlay={renderTooltip(placement)}>
      {children}
    </OverlayTrigger>
  )
}

export default Tooltip
