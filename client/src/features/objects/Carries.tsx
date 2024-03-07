import React from 'react'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IEntity from '../../types/data/IEntity'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import WorksSnippet from '../results/WorksSnippet'

interface IApiText {
  entity: IEntity
}

const Carries: React.FC<IApiText> = ({ entity }) => {
  const object = new ObjectParser(entity)
  const works = object.getWorks()
  const digitallyCarries = object.getDigitallyCarries()
  const digitallyShows = object.getDigitallyShows()
  const carries = [...works, ...digitallyCarries, ...digitallyShows]

  if (carries.length === 0) {
    return null
  }

  return (
    <StyledEntityPageSection data-testid="carried-by-container">
      <h2>This object includes the following works</h2>
      {/* uri is not needed in this case */}
      <React.Fragment>
        {carries.map((work) => (
          <div key={work} className="row">
            <div className="col-12">
              <WorksSnippet uri={work} view="list" />
            </div>
          </div>
        ))}
      </React.Fragment>
    </StyledEntityPageSection>
  )
}

export default Carries
