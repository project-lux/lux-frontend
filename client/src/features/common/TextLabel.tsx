import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

import useApiText from '../../lib/hooks/useApiText'
import {
  capitalizeLabels,
  transformStringForTestId,
} from '../../lib/parse/data/helper'

import InfoPopover from './InfoPopover'

interface ITextLabelProps {
  className?: string
  label?: string
  showPopover?: boolean
}

const TextLabel: React.FC<ITextLabelProps> = ({
  className = 'col-md-3',
  label,
  showPopover = false,
}) => {
  const auth = useAuth()
  const loc = useLocation()
  const popover = showPopover ? <InfoPopover /> : null

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
          {popover}
        </dt>
      ) : (
        <dt hidden>
          Label unknown
          {popover}
        </dt>
      )}
    </div>
  )
}

export default TextLabel
