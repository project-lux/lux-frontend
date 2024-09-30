import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { isUndefined } from 'lodash'

import theme from '../../styles/theme'
import { IGraphTimelineData } from '../../types/ITimelines'

import { getInitialState } from './Graph'

interface IFacets {
  graphData: Array<IGraphTimelineData>
  earliestYear: string
  latestYear: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setZoomRange: (x: Record<string, any>) => void
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

const ZoomInput: React.FC<IFacets> = ({
  graphData,
  earliestYear,
  latestYear,
  setZoomRange,
  disabledZoomOut,
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

  const getAxisYDomain = (
    from: string,
    to: string | undefined,
    ref: string,
    offset: number,
  ): Array<number | Array<IGraphTimelineData>> => {
    let fromIndex: number | undefined
    let toIndex: number | undefined
    graphData.map((obj) => {
      // change to obj.year if using the highlight zoom method
      if (obj.yearKey === from) {
        fromIndex = graphData.indexOf(obj)
      }
      if (obj.yearKey === to) {
        toIndex = graphData.indexOf(obj)
      }
      return null
    })

    // const stateKeys = Object.keys(state)
    // const ind = stateKeys.indexOf('_stateId')
    if (fromIndex !== undefined) {
      const refData = graphData.slice(
        fromIndex,
        isUndefined(toIndex) ? fromIndex + 1 : toIndex + 1,
      )
      let [bottom, top] = [refData[0][ref], refData[0][ref]]
      refData.forEach((d) => {
        if (d[ref] > top) {
          top = d[ref]
        }
        if (d[ref] < bottom) {
          bottom = d[ref]
        }
      })

      console.log('ref: ', refData)

      return [
        parseInt(bottom as string, 10) - offset,
        parseInt(top as string, 10) + offset,
        refData,
      ]
    }

    // set this to default to the lowest and highest points on the graph
    return []
  }

  const zoomInput = (left: string, right: string): void => {
    let refAreaLeft = left
    let refAreaRight = right

    // if (refAreaLeft === refAreaRight || refAreaRight === '') {
    //   setZoomRange(() => ({
    //     refAreaLeft: '',
    //     refAreaRight: '',
    //   }))
    //   return
    // }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

    // yAxis domain
    const [bottom, top, slicedData] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      'yearKey',
      1,
    )

    setZoomRange(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: slicedData,
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }))
  }

  const zoomOut = (): void => {
    setZoomRange(getInitialState(graphData))
    setEarliest(earliestYear)
    setLatest(latestYear)
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (earliest === null) {
      setEarliest(earliestYear)
    }

    if (latest === null) {
      setLatest(latestYear)
    }

    zoomInput(earliest, latest)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="input-group d-flex">
        <div className="justify-content-start me-2">
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
          />
        </div>
        <div className="justify-content-end me-2">
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
          <StyledSubmit type="submit" className="btn me-2">
            Zoom In
          </StyledSubmit>
          <StyledBtn
            type="button"
            className="btn update"
            onClick={() => zoomOut()}
            disabled={disabledZoomOut}
          >
            Zoom Out
          </StyledBtn>
        </div>
      </div>
    </form>
  )
}

export default ZoomInput
