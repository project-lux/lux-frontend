import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AI_REFINEMENT_PARAM } from '../../config/aiAssistedSearch/variables'
import theme from '../../styles/theme'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import { ResultsTab } from '../../types/ResultsTab'

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

const InterpretationContainer: React.FC<IProps> = ({
  className,
  showRefineButton,
}) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const { search } = useLocation()
  const urlSearchParams = new URLSearchParams(search)
  // set a default empty object for query if 'q' parameter is not present
  let query = {}
  if (urlSearchParams.has('q')) {
    query = JSON.parse(urlSearchParams.get('q')!)
  }

  return (
    <StyledSpan
      className={`d-inline-flex flex-wrap align-items-center justify-content-start w-100 p-2 ${className}`}
    >
      <p className="mb-0 fw-semibold">
        <i className="bi bi-stars" />
        AI-Assisted Suggestions:&nbsp;
      </p>
      <InterpretationRow
        disambiguation={{
          parsed: '',
          natural: '',
          query,
        }}
      />
      {showRefineButton && (
        <LinkButton
          variant="link"
          href={`/view/results/${tab}${search}&${AI_REFINEMENT_PARAM}=true`}
          data-testid="refine-search-with-ai-button"
          className="ms-auto text-decoration-none"
        >
          Refine Search
        </LinkButton>
      )}
    </StyledSpan>
  )
}

export default InterpretationContainer
