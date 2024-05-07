import React from 'react'

import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import { addOrigin } from '../../redux/slices/hierarchyVisualizationSlice'
import { useAppDispatch } from '../../app/hooks'
import IEntity from '../../types/data/IEntity'

interface IProps {
  currentEntity: IEntity
}

const BackButton: React.FC<IProps> = ({ currentEntity }) => {
  const dispatch = useAppDispatch()

  const handleHierarchyChange = (): void => {
    dispatch(addOrigin({ value: currentEntity }))
  }

  const entity = new EntityParser(currentEntity)
  const name = entity.getPrimaryName(config.dc.langen)

  return (
    <LinkButton
      variant="link"
      type="button"
      className="hierarchySwitch"
      id="hierarchy-switch"
      value="hierarchySwitch"
      aria-label={`Back to the ${name} hierarchy`}
      onClick={() => handleHierarchyChange()}
      data-testid="hierarchy-current-entity-switch"
    >
      Back to the {name} hierarchy
    </LinkButton>
  )
}

export default BackButton
