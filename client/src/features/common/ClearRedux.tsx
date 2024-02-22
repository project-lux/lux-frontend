import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'
import { resetState } from '../../redux/slices/advancedSearchSlice'

/**
 * Clears the advanced search state in Redux
 * @returns {null}
 */
const ClearRedux: React.FC = () => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!pathname.includes('/view/results')) {
      dispatch(resetState())
    }
  }, [pathname, dispatch])

  return null
}

export default ClearRedux
