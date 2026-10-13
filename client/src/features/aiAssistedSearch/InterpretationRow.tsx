import React from 'react'
import { useLocation } from 'react-router-dom'

import IAiDisambiguation from '../../types/ai/IAiDisambiguation'
import AiDisambigationParser from '../../lib/ai/AiDisambigationParser'
import { searchScope } from '../../config/searchTypes'
import useApiText from '../../lib/hooks/useApiText'

interface IProps {
  disambiguation: IAiDisambiguation
  currentTab?: string
}

const InterpretationValue: React.FC<{ value: string }> = ({ value }) => {
  const location = useLocation()
  const { value: interpretedValue, isReady } = useApiText({
    textOrUri: value,
    pageUri: location.pathname,
  })

  if (isReady && interpretedValue !== null && interpretedValue !== '') {
    return interpretedValue
  }
  return null
}

const InterpretationRow: React.FC<IProps> = ({
  disambiguation,
  currentTab,
}) => {
  const interpretation =
    AiDisambigationParser.getAiDisambiguationInterpretation(
      disambiguation.query,
      searchScope[currentTab as string] || undefined,
    )
  return (
    <span
      className="d-inline-flex flex-wrap align-items-center justify-content-start"
      data-testid="ai-interpretation-row"
    >
      {Object.keys(interpretation).map((key, ind) => {
        if (key === '_scope') {
          return null
        }
        if (interpretation[key].length === 1) {
          return (
            <div
              key={key}
              className="d-inline-flex align-items-center flex-wrap"
            >
              <strong className="me-2">{key}:</strong>{' '}
              <InterpretationValue value={interpretation[key][0]} /> &nbsp;
              {ind !== Object.keys(interpretation).length - 1 && (
                <span className="me-2">|</span>
              )}
            </div>
          )
        }
        // If there are multiple values for one search term, render each one separately
        if (interpretation[key].length > 1) {
          return interpretation[key].map((item, textInd) => (
            <div
              key={textInd}
              className="d-inline-flex align-items-center flex-wrap"
            >
              <strong className="me-2">{key}:</strong>{' '}
              <InterpretationValue value={item} /> &nbsp;
              {textInd !== interpretation[key].length - 1 && (
                <span className="me-2">|</span>
              )}
            </div>
          ))
        }
      })}
    </span>
  )
}

export default InterpretationRow
