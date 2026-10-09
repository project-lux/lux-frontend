import React from 'react'

import IAiDisambiguation from '../../types/ai/IAiDisambiguation'
import AiDisambigationParser from '../../lib/ai/AiDisambigationParser'
import { searchScope } from '../../config/searchTypes'

interface IProps {
  disambiguation: IAiDisambiguation
  currentTab?: string
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
              <strong className="me-2">{key}:</strong> {interpretation[key]}{' '}
              &nbsp;
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
              <strong className="me-2">{key}:</strong> {item} &nbsp;
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
