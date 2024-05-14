/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'

interface IFacets {
  earliestYear: string
  latestYear: string
  setZoomRange: (earliest: string, latest: string) => void
  autoFocus?: boolean
}

const StyledInput = styled.input`
  height: auto;
  width: 100%;
`

const StyledSubmit = styled.button`
  background: ${theme.color.primary.darkBlue};
  color: ${theme.color.white};

  &:hover {
    background-color: ${theme.color.white};
    color: ${theme.color.primary.darkBlue};
    border-color: ${theme.color.primary.darkBlue};
  }
`

const ZoomInput: React.FC<IFacets> = ({
  earliestYear,
  latestYear,
  setZoomRange,
  autoFocus = false,
}) => {
  const [earliest, setEarliest] = useState<string>(earliestYear)
  const [latest, setLatest] = useState<string>(latestYear)
  const earliestRef = useRef<HTMLInputElement>(null)
  const latestRef = useRef<HTMLInputElement>(null)

  const earliestDateId = 'earliest-date'
  const latestDateId = 'latest-date'

  const handleEarliestInputChange = (value: string): void => {
    setEarliest(value)
  }

  const handleLatestInputChange = (value: string): void => {
    setLatest(value)
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (earliest === null) {
      setEarliest(earliestYear)
    }

    if (latest === null) {
      setLatest(latestYear)
    }

    setZoomRange(earliest, latest)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="input-group d-flex">
        <div className="justify-content-start">
          <label htmlFor={earliestDateId} className="d-none">
            Earliest Year
          </label>
          <StyledInput
            id={earliestDateId}
            type="number"
            className="form-control"
            placeholder={earliestYear}
            onChange={(e) => handleEarliestInputChange(e.currentTarget.value)}
            min={parseInt(earliestYear, 10)}
            max={parseInt(latestYear, 10)}
            ref={earliestRef}
            value={earliest}
            autoFocus={autoFocus}
          />
        </div>
        <div className="justify-content-end">
          <label htmlFor={latestDateId} className="d-none">
            Latest Year
          </label>
          <StyledInput
            id={latestDateId}
            type="number"
            className="form-control"
            placeholder={latestYear}
            onChange={(e) => handleLatestInputChange(e.currentTarget.value)}
            min={parseInt(earliestYear, 10)}
            max={parseInt(latestYear, 10)}
            ref={latestRef}
            value={latest}
          />
        </div>
        <div className="justify-content-start">
          <StyledSubmit type="submit" className="btn">
            Zoom In
          </StyledSubmit>
        </div>
      </div>
    </form>
  )
}

export default ZoomInput
