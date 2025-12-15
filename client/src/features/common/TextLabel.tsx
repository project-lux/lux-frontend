import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

import useApiText from '../../lib/hooks/useApiText'
import {
  capitalizeLabels,
  transformStringForTestId,
} from '../../lib/parse/data/helper'

import Tooltip from './Tooltip'

interface ITextLabelProps {
  className?: string
  label?: string
  tooltipText?: string
}

const TextLabel: React.FC<ITextLabelProps> = ({
  className = 'col-md-3',
  label,
  tooltipText = '',
}) => {
  const auth = useAuth()
  const loc = useLocation()
  const tooltip =
    tooltipText === '' ? (
      ''
    ) : (
      <Tooltip html={tooltipText} placement="bottom">
        <i
          className="bi bi-question-circle"
          style={{ fontSize: '1rem', marginLeft: '0.2rem' }}
          data-testid="tooltip-icon"
        />
      </Tooltip>
    )

  // Get apiText in case there is a label that contains the base url
  let displayLabel = label
  const { value: apiText, isReady: apiTextIsReady } = useApiText({
    textOrUri: label || '',
    pageUri: loc.pathname,
    auth,
  })

  // Capitalize the text returned from the api if it did not come from the data
  displayLabel =
    displayLabel !== undefined &&
    apiTextIsReady &&
    apiText !== null &&
    displayLabel !== apiText
      ? capitalizeLabels(apiText)
      : displayLabel

  const testId = label
    ? `${transformStringForTestId(label).toLowerCase()}-text-label`
    : 'text-label'

  return (
    <div className={`${className} col-sm-12`} data-testid={testId}>
      {displayLabel ? (
        <dt className="mb-1">
          {displayLabel}
          {tooltip}
        </dt>
      ) : (
        <dt hidden>
          Label unknown
          {tooltip}
        </dt>
      )}
    </div>
  )
}

export default TextLabel
