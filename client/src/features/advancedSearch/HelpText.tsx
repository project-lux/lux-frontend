import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppSelector } from '../../app/hooks'
import { IHelpTextKey } from '../../redux/slices/helpTextSlice'
import InternalLink from '../common/InternalLink'

const StyledP = styled.p`
  text-wrap: initial;
  word-wrap: break-word;
`

/**
 * Responsible for displaying help text the corresponds with fields and state within the advanced search.
 * The state of this component is controlled by user interaction with the advanced search form.
 * @returns {JSX.Element}
 */
const HelpText: React.FC = () => {
  const helpTextState = useAppSelector(
    (state) => state.helpTextKey as IHelpTextKey,
  )

  const unknownHelpText =
    'The help text has not been configured for this term yet.'
  const helpTextValue =
    helpTextState.hoverHelpText === ''
      ? helpTextState.selectedHelpText
      : helpTextState.hoverHelpText
  const helpTextKey =
    helpTextState.selectedHoverKey === ''
      ? helpTextState.selectedKey
      : helpTextState.selectedHoverKey

  return (
    <Row style={{ position: 'sticky', top: '0' }}>
      <Col>
        <h3 style={{ wordWrap: 'break-word' }}>
          Help {helpTextKey !== '' && `for ${helpTextKey}`}
        </h3>
        <StyledP
          id="help-text"
          className="mb-4"
          data-testid="advanced-search-help-text"
        >
          {helpTextValue === undefined ? unknownHelpText : helpTextValue}
        </StyledP>
        <div>
          <StyledP className="mb-0">
            Learn more about the advanced search capabilities and common
            patterns.
          </StyledP>
          <InternalLink
            uri="/content/advanced-search#faq-header"
            name="View Advanced Search Help"
            linkCategory="View Advanced Search Help"
          />
        </div>
      </Col>
    </Row>
  )
}

export default HelpText
