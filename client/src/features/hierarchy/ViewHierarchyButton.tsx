import React from 'react'

import StyledHierarchyButton from '../../styles/features/hierarchy/HierarchyButton'
import { useAppDispatch } from '../../app/hooks'
import IEntity from '../../types/data/IEntity'
import { addOrigin } from '../../redux/slices/hierarchySlice'
import { ISearchResults } from '../../types/ISearchResults'

interface IProps {
  data: ISearchResults
  name: string
  rotation: string
  className: string
}

const ViewHierarchyButton: React.FC<IProps> = ({
  data,
  name,
  rotation,
  className,
}) => {
  const dispatch = useAppDispatch()

  const handleHierarchyChange = (entity: IEntity): void => {
    dispatch(addOrigin({ value: entity }))
  }

  return (
    <StyledHierarchyButton
      type="button"
      rotate={rotation}
      className={className}
      onClick={() => handleHierarchyChange(data)}
      aria-label={`View the hierarchy for ${name}`}
    >
      <i className="bi bi-diagram-2 fs-5" />
    </StyledHierarchyButton>
  )
}

export default ViewHierarchyButton
