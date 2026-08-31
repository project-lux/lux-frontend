import React from 'react'

import IAiDisambiguation from '../../types/ai/IAiDisambiguation'
import AiDisambigationParser from '../../lib/ai/AiDisambigationParser'

interface IProps {
  disambiguation: IAiDisambiguation
}

const InterpretationRow: React.FC<IProps> = ({ disambiguation }) => {
  const interpretation =
    AiDisambigationParser.getAiDisambiguationInterpretation(
      disambiguation.query,
    )
  return (
    <span className="d-inline-flex flex-nowrap align-items-center justify-content-start text-nowrap">
      {Object.keys(interpretation).map((key, ind) => {
        if (key === '_scope') {
          return null
        }
        return (
          <div
            key={key}
            className="d-inline-flex align-items-center text-nowrap"
          >
            <strong className="me-2">{key}:</strong> {interpretation[key]}{' '}
            &nbsp;
            {ind !== Object.keys(interpretation).length - 1 && (
              <span className="me-2">|</span>
            )}
          </div>
        )
      })}
    </span>
  )
}

export default InterpretationRow
