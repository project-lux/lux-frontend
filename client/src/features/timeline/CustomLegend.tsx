/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface IProps {
  payload: any
  handleOnHover: (value: string | null) => void
}

const CustomLegend: React.FC<IProps> = ({ payload, handleOnHover }) => {
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
          ) => (
            <div
              key={`item-${index}`}
              tabIndex={0}
              role="button"
              onMouseOver={() => handleOnHover(entry.dataKey.split('.')[0])}
              onMouseOut={() => handleOnHover(null)}
              onFocus={() => handleOnHover(entry.dataKey.split('.')[0])}
              onBlur={() => handleOnHover(null)}
              onKeyDown={() => handleOnHover(entry.dataKey.split('.')[0])}
            >
              <i
                className="bi bi-square-fill mx-2"
                style={{ color: entry.color }}
              />
              {/* <FaSquareFull className="mx-2" size={18} color={colors[index]} /> */}
              <span style={{ color: 'black', fontWeight: '300' }}>
                {entry.value}
              </span>
            </div>
          ),
        )}
      </div>
    )
  }

  return null
}

export default CustomLegend
