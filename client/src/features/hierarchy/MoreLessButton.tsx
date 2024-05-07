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
  <React.Fragment>
    {displayLength <= parentsLength && (
      <button
        type="button"
        className="btn btn-link show-more"
        onClick={() =>
          setParentDisplayLength(displayLength + defaultDisplayLength)
        }
      >
        Show More
      </button>
    )}
    {displayLength > defaultDisplayLength && (
      <button
        type="button"
        className="btn btn-link show-less ms-2"
        onClick={() =>
          setParentDisplayLength(
            Math.max(
              displayLength - defaultDisplayLength,
              defaultDisplayLength,
            ),
          )
        }
      >
        Show Less
      </button>
    )}
  </React.Fragment>
)

export default MoreLessButton
