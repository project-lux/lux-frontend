import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { IHelpTextKey } from '../../redux/slices/helpTextSlice'

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
  const { pathname, search } = useLocation()

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
            Learn more about LUX&apos;s advanced search capabilities and common
            search patterns.
          </StyledP>
          <Link
            to="/content/advanced-search#faq-header"
            state={{
              prevPath: `${pathname}${search}`,
              targetName: 'Advanced Search Help',
            }}
          >
            View Advanced Search Help
          </Link>
        </div>
      </Col>
    </Row>
  )
}

export default HelpText
