/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface IProps {
  payload: any
  activeLegend: string | null
  selectedRelationships: Array<string>
  isMobile: boolean
  handleOnClick: (value: string) => void
  handleOnHover: (value: string | null) => void
}

const CustomLegend: React.FC<IProps> = ({
  payload,
  activeLegend,
  selectedRelationships,
  isMobile,
  handleOnClick,
  handleOnHover,
}) => {
  if (payload && payload.length > 0) {
    return (
      <div
        className={`mt-3 ${isMobile ? '' : 'd-flex justify-content-center'}`}
      >
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
            const isSelected = selectedRelationships.includes(legendValue)
            const isActive =
              isSelected &&
              (activeLegend === null || activeLegend === legendValue)

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
                  opacity: isActive ? 1 : 0.45,
                }}
              >
                {/* hidden series use an outline and strikethrough as well as fading, so the state is not shown by color alone */}
                <i
                  className={`bi ${isSelected ? 'bi-square-fill' : 'bi-square'} mx-2`}
                  style={{ color: entry.color }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    color: 'black',
                    fontWeight: '300',
                    textDecoration: isSelected ? 'none' : 'line-through',
                  }}
                >
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
