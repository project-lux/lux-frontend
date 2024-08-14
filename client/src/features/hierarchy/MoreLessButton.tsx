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
    <div className="ms-4">
      {currentState.currentPageLength <= parentsArrayLength && (
        <button
          type="button"
          className="btn btn-link show-more"
          onClick={() =>
            dispatch(addShowMore({ currentPageLength: displayLength }))
          }
          style={{ textDecoration: 'none' }}
        >
          <strong>Show More</strong>
        </button>
      )}
      {currentState.currentPageLength > currentState.defaultDisplayLength && (
        <button
          type="button"
          className="btn btn-link show-less ms-3"
          onClick={() =>
            dispatch(addShowLess({ currentPageLength: displayLength }))
          }
          style={{ textDecoration: 'none' }}
        >
          <strong>Show Less</strong>
        </button>
      )}
    </div>
  )
}

export default MoreLessButton
