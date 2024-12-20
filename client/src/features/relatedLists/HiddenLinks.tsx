import React from 'react'

interface IProps {
  data: Array<string>
}

/**
 * Renders the accordion child links so that they are visible to crawlers
 * @param {Array<string>} data data returned from API request for related lists
 * @param {boolean} isSuccess determines if API request was successful
 * @returns {JSX.Element}
 */
const HiddenLinks: React.FC<IProps> = ({ data }) => {
  if (data.length > 0) {
    return (
      <div style={{ display: 'none' }} aria-hidden="true">
        {data.map((d) => (
          <div>{d}</div>
        ))}
      </div>
    )
  }

  return null
}

export default HiddenLinks
