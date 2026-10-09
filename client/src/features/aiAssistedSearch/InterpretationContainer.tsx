import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Accordion } from 'react-bootstrap'

// import { AI_REFINEMENT_PARAM } from '../../config/aiAssistedSearch/variables'
import theme from '../../styles/theme'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import { ResultsTab } from '../../types/ResultsTab'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { SEARCH_TYPE_PARAM } from '../../config/aiAssistedSearch/variables'

import InterpretationRow from './InterpretationRow'

interface IProps {
  className: string
  showRefineButton: boolean
}

const StyledSpan = styled.span`
  &.refineSearchWithAiButton {
    border-color: ${theme.color.primary.blue};
    border-width: 1px;
    border-style: solid;
    border-radius: ${theme.border.radius};
  }
`

const StyledAccordion = styled(Accordion)`
  background-color: ${theme.color.white};
  border-radius: ${theme.border.radius};
  border: 1px solid ${theme.color.lightGray};

  .accordion-button {
    padding: 16px 20px;
  }
`
const InterpretationContainer: React.FC<IProps> = ({
  className,
  showRefineButton,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const { search } = useLocation()
  const urlSearchParams = new URLSearchParams(search)
  const currentQueryTab = urlSearchParams.get('qt')
  const isKeywordSearch = urlSearchParams.get('isKeywordSearch') === 'true'

  // set a default empty object for query if 'q' parameter is not present
  let query = {}
  if (
    (urlSearchParams.has('q') && currentQueryTab) === tab ||
    isKeywordSearch
  ) {
    query = JSON.parse(urlSearchParams.get('q')!)
  }

  const header = (
    <p className="mb-0 fw-semibold">
      <i className="bi bi-stars" style={{ color: theme.color.primary.blue }} />
      AI-Assisted Interpretation:&nbsp;
    </p>
  )

  urlSearchParams.set(SEARCH_TYPE_PARAM, 'advanced')

  if (isMobile) {
    return (
      <StyledAccordion className="bg-light">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="d-flex align-items-center">
            {header}
          </Accordion.Header>
          <Accordion.Body>
            <InterpretationRow
              disambiguation={{
                parsed: '',
                natural: '',
                query,
              }}
              currentTab={tab}
            />
          </Accordion.Body>
        </Accordion.Item>
      </StyledAccordion>
    )
  }

  return (
    <StyledSpan
      className={`d-inline-flex flex-wrap align-items-center justify-content-start w-100 p-2 ${className}`}
    >
      {header}
      <InterpretationRow
        disambiguation={{
          parsed: '',
          natural: '',
          query,
        }}
        currentTab={tab}
      />
      {showRefineButton && (
        <LinkButton
          variant="link"
          href={`/view/results/${tab}?${urlSearchParams.toString()}`}
          data-testid="refine-search-link"
          className="ms-auto text-decoration-none"
        >
          Refine Search
        </LinkButton>
      )}
    </StyledSpan>
  )
}

export default InterpretationContainer
