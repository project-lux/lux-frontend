/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'

interface IDatesData {
  start: string
  end: string
}

/**
 * Returns a component with the formatted dates from start to end
 * @param {string} start the start year
 * @param {string} end the end year
 * @returns {JSX.Element}
 */
const Dates: React.FC<IDatesData> = ({ start, end }) => (
  <React.Fragment>
    {(start !== '' || end !== '') && (
      <span data-testid="start-end-dates">
        , {start || ''}-{end || ''}
      </span>
    )}
  </React.Fragment>
)

export default Dates
