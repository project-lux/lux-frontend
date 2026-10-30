import React, { KeyboardEvent, useState } from 'react'
import { Form } from 'react-bootstrap'

import { validateYearInput } from '../../lib/parse/timeline/timelineGraphHelper'

interface IProps {
  id: string
  label: string
  field: 'start' | 'end'
  years: Array<string>
  index: number
  otherIndex: number
  hintId: string
  allowNegative: boolean
  onCommit: (index: number) => void
}

/**
 * A year input for the timeline filters. The value is only applied when the
 * user presses Enter or leaves the field, so partially typed years are not
 * applied while typing. Invalid values are kept so they can be corrected.
 */
const TimelineYearInput: React.FC<IProps> = ({
  id,
  label,
  field,
  years,
  index,
  otherIndex,
  hintId,
  allowNegative,
  onCommit,
}) => {
  const [draft, setDraft] = useState<string>(years[index])
  const [error, setError] = useState<string | null>(null)

  // Show the new year when the range changes elsewhere, such as from the Brush
  const [prevYear, setPrevYear] = useState<string>(years[index])
  if (years[index] !== prevYear) {
    setPrevYear(years[index])
    setDraft(years[index])
    setError(null)
  }

  const commit = (): void => {
    const result = validateYearInput(draft, years, field, otherIndex)
    if (result.error !== null) {
      setError(result.error)
      return
    }
    setError(null)
    setDraft(years[result.index])
    if (result.index !== index) {
      onCommit(result.index)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      commit()
    }
  }

  const errorId = `${id}-error`

  return (
    <Form.Group controlId={id}>
      <Form.Label className="mb-1">{label}</Form.Label>
      <Form.Control
        type="text"
        // a numeric keypad on mobile has no minus key, so allow text when B.C.E. years exist
        inputMode={allowNegative ? 'text' : 'numeric'}
        autoComplete="off"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        isInvalid={error !== null}
        aria-invalid={error !== null}
        aria-describedby={error !== null ? `${hintId} ${errorId}` : hintId}
        data-testid={id}
      />
      {error !== null && (
        <Form.Control.Feedback
          type="invalid"
          id={errorId}
          role="alert"
          data-testid={errorId}
        >
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  )
}

export default TimelineYearInput
