/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Form } from 'react-bootstrap'

import theme from '../../styles/theme'

import { IZoomState } from './Graph'

interface IProps {
  state: IZoomState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setZoomState: (x: IZoomState) => void
  setZoom: () => void
  setZoomOut: () => void
  disabledZoomOut: boolean
}

const StyledBtn = styled.button`
  background: ${theme.color.gray};
  color: ${theme.color.white};

  &:hover {
    background-color: ${theme.color.white};
    color: ${theme.color.primary.darkBlue};
    border-color: ${theme.color.primary.darkBlue};
  }
`

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

const ZoomInput: React.FC<IProps> = ({
  state,
  setZoomState,
  setZoom,
  setZoomOut,
  disabledZoomOut,
}) => {
  const { data } = state
  const min = parseInt(data[0].yearKey, 10)
  const max = parseInt(data[data.length - 1].yearKey, 10)

  const [earliest, setEarliest] = useState<string>(min.toString())
  const [latest, setLatest] = useState<string>(max.toString())
  const earliestRef = useRef<HTMLInputElement>(null)
  const latestRef = useRef<HTMLInputElement>(null)

  const earliestDateId = 'earliest-date'
  const latestDateId = 'latest-date'

  const handleEarliestInputChange = (value: string): void => {
    setEarliest(value)
    setZoomState({ ...state, refAreaLeft: value })
  }

  const handleLatestInputChange = (value: string): void => {
    setLatest(value)
    setZoomState({
      ...state,
      refAreaLeft: state.refAreaLeft,
      refAreaRight: value,
    })
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    let submitEarliest = earliest
    if (submitEarliest === '') {
      submitEarliest = data[0].yearKey
      setEarliest(submitEarliest)
    }

    let submitLatest = latest
    if (submitLatest === '') {
      submitLatest = data[data.length - 1].yearKey
      setLatest(submitLatest)
    }

    setZoom()
  }

  return (
    <Form onSubmit={submitHandler}>
      <div>
        <Form.Text id="yearRangeInput">
          Enter a start and end year to view the graph in that range. You may
          also click and drag the cursor over the graph to highlight a range you
          wish to view.
        </Form.Text>
      </div>
      <div className="input-group d-flex">
        <div
          className="justify-content-start me-2"
          aria-describedby="yearRangeInput"
        >
          <Form.Label htmlFor={earliestDateId} className="d-none">
            Earliest Year
          </Form.Label>
          <StyledInput
            id={earliestDateId}
            type="number"
            className="form-control"
            placeholder={earliest}
            onChange={(e) => handleEarliestInputChange(e.currentTarget.value)}
            min={min}
            max={max}
            ref={earliestRef}
            value={earliest}
          />
        </div>
        <div className="justify-content-end me-2">
          <Form.Label htmlFor={latestDateId} className="d-none">
            Latest Year
          </Form.Label>
          <StyledInput
            id={latestDateId}
            type="number"
            className="form-control"
            placeholder={latest}
            onChange={(e) => handleLatestInputChange(e.currentTarget.value)}
            min={min}
            max={max}
            ref={latestRef}
            value={latest}
          />
        </div>
        <div className="justify-content-start">
          <StyledSubmit
            type="submit"
            className="btn me-2"
            disabled={
              (earliest === min.toString() && latest === max.toString()) ||
              (min.toString() === '' && max.toString() === '')
            }
          >
            View Selected Years
          </StyledSubmit>
          <StyledBtn
            type="button"
            className="btn update"
            onClick={() => setZoomOut()}
            disabled={disabledZoomOut}
          >
            Reset
          </StyledBtn>
        </div>
      </div>
    </Form>
  )
}

export default ZoomInput
