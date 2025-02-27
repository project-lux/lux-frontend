import React from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  IHierarchy,
  addShowLess,
  addShowMore,
} from '../../redux/slices/hierarchySlice'

interface IProps {
  parentsArrayLength: number
  displayLength: number
}

const MoreLessButton: React.FC<IProps> = ({
  parentsArrayLength,
  displayLength,
}) => {
  const dispatch = useAppDispatch()
  const currentState = useAppSelector(
    (hierarchyState) => hierarchyState.hierarchy as IHierarchy,
  )

  return (
    <div className="parentMoreLessButton">
      {currentState.currentPageLength < parentsArrayLength && (
        <button
          type="button"
          className="btn btn-link show-more me-3"
          onClick={() =>
            dispatch(addShowMore({ currentPageLength: displayLength }))
          }
          style={{ textDecoration: 'none' }}
        >
          Show More
        </button>
      )}
      {currentState.currentPageLength > currentState.defaultDisplayLength && (
        <button
          type="button"
          className="btn btn-link show-less"
          onClick={() =>
            dispatch(addShowLess({ currentPageLength: displayLength }))
          }
          style={{ textDecoration: 'none' }}
        >
          Show Less
        </button>
      )}
    </div>
  )
}

export default MoreLessButton
