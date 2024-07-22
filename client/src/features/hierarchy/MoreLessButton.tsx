import React from 'react'

interface IProps {
  parentsLength: number
  defaultDisplayLength: number
  displayLength: number
  setParentDisplayLength: (x: number) => void
}

const MoreLessButton: React.FC<IProps> = ({
  parentsLength,
  defaultDisplayLength,
  displayLength,
  setParentDisplayLength,
}) => (
  <div className="ms-4">
    {displayLength <= parentsLength && (
      <button
        type="button"
        className="btn btn-link show-more"
        onClick={() =>
          setParentDisplayLength(displayLength + defaultDisplayLength)
        }
        style={{ textDecoration: 'none' }}
      >
        <strong>Show More</strong>
      </button>
    )}
    {displayLength > defaultDisplayLength && (
      <button
        type="button"
        className="btn btn-link show-less ms-3"
        onClick={() =>
          setParentDisplayLength(
            Math.max(
              displayLength - defaultDisplayLength,
              defaultDisplayLength,
            ),
          )
        }
        style={{ textDecoration: 'none' }}
      >
        <strong>Show Less</strong>
      </button>
    )}
  </div>
)

export default MoreLessButton
