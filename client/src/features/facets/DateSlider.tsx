import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'

const StyledDiv = styled.div`
  width: auto;
  position: relative;

  .slider {
    position: relative;
  }

  .slider__track,
  .slider__range {
    border-radius: 3px;
    height: 5px;
    position: absolute;
  }

  .slider__track {
    background-color: #ced4da;
    width: 100%;
    z-index: 1;
  }

  .slider__range {
    background-color: ${theme.color.primary.darkBlue};
    z-index: 2;
  }

  /* Removing the default appearance */
  .thumb,
  .thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .thumb {
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 100%;
  }

  .thumb--zindex-3 {
    z-index: 3;
  }

  .thumb--zindex-4 {
    z-index: 4;
  }

  .thumb--zindex-5 {
    z-index: 5;
  }

  /* For Chrome browsers */
  .thumb::-webkit-slider-thumb {
    background-color: ${theme.color.primary.teal};
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }

  /* For Firefox browsers */
  .thumb::-moz-range-thumb {
    background-color: ${theme.color.primary.teal};
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`

interface IProps {
  min: number
  max: number
  earliestVal: string
  latestVal: string
  onEarliestChange: (x: number) => void
  onLatestChange: (x: number) => void
}

const DateSlider: React.FC<IProps> = ({
  min,
  max,
  earliestVal,
  latestVal,
  onEarliestChange,
  onLatestChange,
}) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)

  const minValRef = useRef<HTMLInputElement>(null)
  const maxValRef = useRef<HTMLInputElement>(null)
  const range = useRef<HTMLDivElement>(null)

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(earliestVal)
      const maxPercent = getPercent(Number(maxValRef.current.value))

      if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minVal, getPercent, latestVal, earliestVal])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(Number(minValRef.current.value))
      const maxPercent = getPercent(latestVal)

      if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxVal, getPercent, earliestVal, latestVal])

  const handleOnEarliestChange = (
    e: React.FormEvent<HTMLInputElement>,
  ): void => {
    const value = Math.min(Number(e.currentTarget.value), maxVal - 1)
    setMinVal(value)
    onEarliestChange(value)
  }

  const handleOnLatestChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const value = Math.max(Number(e.currentTarget.value), minVal + 1)
    setMaxVal(value)
    onLatestChange(value)
  }

  return (
    <StyledDiv>
      <Form.Label hidden>date range slider</Form.Label>
      <input
        type="range"
        id="earliest-range-slider"
        aria-label={new Date(parseInt(earliestVal, 10)).toDateString()}
        className={`thumb thumb--zindex-3 ${
          minVal > max - 100 ? 'thumb--zindex-5' : ''
        }`}
        min={min}
        max={max}
        value={earliestVal}
        ref={minValRef}
        onChange={(e) => handleOnEarliestChange(e)}
      />
      <input
        type="range"
        id="latest-range-slider"
        aria-label={new Date(parseInt(latestVal, 10)).toDateString()}
        className="thumb thumb--zindex-4"
        min={min}
        max={max}
        value={latestVal}
        ref={maxValRef}
        onChange={(e) => handleOnLatestChange(e)}
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
    </StyledDiv>
  )
}

export default DateSlider
