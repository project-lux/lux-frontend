import React, { useState } from 'react'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import WorksSnippet from '../results/WorksSnippet'
import theme from '../../styles/theme'

interface IApiText {
  entity: IEntity
  defaultLength?: number
}

const Carries: React.FC<IApiText> = ({ entity, defaultLength = 5 }) => {
  const [displayLength, setDisplayLength] = useState<number>(defaultLength)

  const object = new ObjectParser(entity)
  const works = object.getWorks()
  const digitallyCarries = object.getDigitallyCarries()
  const digitallyShows = object.getDigitallyShows()
  const carries = [...works, ...digitallyCarries, ...digitallyShows]
  const carriesLength = carries.length

  if (carriesLength === 0) {
    return null
  }

  return (
    <StyledEntityPageSection data-testid="carries-container">
      <h2>This object includes the following works</h2>
      {/* uri is not needed in this case */}
      {carries.slice(0, displayLength).map((work) => (
        <div key={work} className="row">
          <div className="col-12">
            <WorksSnippet uri={work} view="list" />
          </div>
        </div>
      ))}
      <div className="mt-2">
        {displayLength < carriesLength && (
          <button
            type="button"
            className="btn btn-link show-more fs-5"
            onClick={() => setDisplayLength(carriesLength)}
            data-testid="carries-show-all"
            style={{ color: theme.color.primary.blue }}
          >
            Show All
          </button>
        )}
        {displayLength > defaultLength && (
          <button
            type="button"
            className="btn btn-link show-less fs-5"
            onClick={() => setDisplayLength(defaultLength)}
            data-testid="carries-show-less"
            style={{ color: theme.color.primary.blue }}
          >
            Show Less
          </button>
        )}
      </div>
    </StyledEntityPageSection>
  )
}

export default Carries
