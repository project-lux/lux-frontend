import React from 'react'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import { getIconFromUri } from '../../lib/parse/data/helper'
import RelatedEntity from '../common/RelatedEntity'

interface IApiText {
  entity: IEntity
}

const Carries: React.FC<IApiText> = ({ entity }) => {
  const object = new ObjectParser(entity)
  const works = object.getWorks()
  const digitallyCarries = object.getDigitallyCarries()
  const digitallyShows = object.getDigitallyShows()
  const carries = [...works, ...digitallyCarries, ...digitallyShows]

  if (carries.length > 0) {
    return (
      <StyledEntityPageSection data-testid="included-works-container">
        <h2>This object includes the following works</h2>
        {carries.map((carry, ind) => {
          const [icon, accompanyingText] = getIconFromUri(carry)
          return (
            <RelatedEntity
              key={carry}
              icon={icon}
              text={accompanyingText}
              uri={carry}
              id={`related-entity-${ind}`}
            />
          )
        })}
      </StyledEntityPageSection>
    )
  }

  return null
}

export default Carries
