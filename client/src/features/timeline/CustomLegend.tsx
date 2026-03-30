/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface IProps {
  payload: any
  activeLegend: string | null
  selectedLegend: string | null
  handleOnClick: (value: string | null) => void
  handleOnHover: (value: string | null) => void
}

const CustomLegend: React.FC<IProps> = ({
  payload,
  activeLegend,
  selectedLegend,
  handleOnClick,
  handleOnHover,
}) => {
  if (payload && payload.length > 0) {
    return (
      <div className="d-flex justify-content-center">
        {payload.map(
          (
            entry: {
              value: string
              color: string
              dataKey: string
            },
            index: any,
          ) => {
            const legendValue = entry.dataKey.split('.')[0]
            const isActive =
              activeLegend === null || activeLegend === legendValue
            const isSelected = selectedLegend === legendValue

            return (
              <button
                key={`item-${index}`}
                type="button"
                className="btn btn-link d-inline-flex align-items-center text-decoration-none p-0 mx-2"
                aria-pressed={isSelected}
                onClick={() => handleOnClick(legendValue)}
                onMouseEnter={() => handleOnHover(legendValue)}
                onMouseLeave={() => handleOnHover(null)}
                onFocus={() => handleOnHover(legendValue)}
                onBlur={() => handleOnHover(null)}
                onKeyDown={() => handleOnHover(legendValue)}
                style={{
                  color: 'black',
                  fontWeight: isSelected ? '600' : '300',
                  opacity: isActive ? 1 : 0.45,
                }}
              >
                <i
                  className="bi bi-square-fill mx-2"
                  style={{ color: entry.color }}
                />
                <span style={{ color: 'black', fontWeight: '300' }}>
                  {entry.value}
                </span>
              </button>
            )
          },
        )}
      </div>
    )
  }

  return null
}

export default CustomLegend
