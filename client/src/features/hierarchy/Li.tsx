import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// import RecordLink from '../common/RecordLink'
import ApiText from '../common/ApiText'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { pushClientEvent } from '../../lib/pushClientEvent'

interface IProps {
  id: string
  indexToFocus?: boolean
  ind?: string
  focusOnLiElement?: boolean
}

const Li: React.FC<IProps> = ({
  id,
  indexToFocus = false,
  ind,
  focusOnLiElement = false,
}) => {
  const entityName = ApiText(id)
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (focusOnLiElement && ref !== null) {
      if (ref.current && indexToFocus) {
        ref.current.focus()
      }
    }
  })

  return (
    <li id={ind}>
      <Link
        to={{
          pathname: `/view/${stripYaleIdPrefix(id)}`,
        }}
        aria-label={entityName || 'unknown name'}
        role="link"
        onClick={() =>
          pushClientEvent('Entity Link', 'Selected', 'Hierarchy Link')
        }
        ref={ref}
        data-testid={`${stripYaleIdPrefix(id)}-record-link`}
      >
        {entityName || 'unknown name'}
      </Link>
    </li>
  )
}

export default Li
