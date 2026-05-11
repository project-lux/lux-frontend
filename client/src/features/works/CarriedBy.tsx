import React, { useState } from 'react'
import { Col } from 'react-bootstrap'

import IEntity from '../../types/data/IEntity'
import WorkParser from '../../lib/parse/data/WorkParser'
import { carriedBy } from '../../config/worksSearchTags'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import ObjectsContainer from '../common/ObjectsContainer'
import LuxOverlay from '../common/LuxOverlay'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'
import StyledHr from '../../styles/shared/Hr'

const CarriedBy: React.FC<{ entity: IEntity }> = ({ entity }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const work = new WorkParser(entity)
  const workCarriedByQuery = work.getHalLink(carriedBy.searchTag)

  if (workCarriedByQuery === null) {
    return null
  }

  const title = 'This Work is included in the following Objects'

  return (
    <StyledEntityPageSection className="row" data-testid="carried-by-container">
      <Col xs={12}>
        <span className="d-flex flex-wrap">
          <h2>{title}</h2>
          <LuxOverlay />
        </span>
        {isMobile && <StyledHr width="100%" />}
      </Col>
      <Col xs={12}>
        <ObjectsContainer
          uri={workCarriedByQuery}
          tab="objects"
          title={title}
        />
      </Col>
    </StyledEntityPageSection>
  )
}

export default CarriedBy
