import React from 'react'
import { Row } from 'react-bootstrap'

import {
  collectionsIcon,
  conceptsIcon,
  eventsIcon,
  objectsIcon,
  peopleOrgsIcon,
  placesIcon,
  workIcon,
} from '../../config/resources'
import { IStats } from '../../redux/api/returnTypes'
import StyledInfographicsSection from '../../styles/features/landing/InfographicsSection'

import InfographicsCard from './InfographicsCard'

interface IProps {
  data: IStats
}

const InfographicsSection: React.FC<IProps> = ({ data }) => {
  const stats = data.estimates.searchScopes

  return (
    <StyledInfographicsSection data-testid="whats-in-lux-container">
      <h2>What&apos;s in LUX?</h2>
      <Row className="d-flex justify-content-around">
        <InfographicsCard
          icon={objectsIcon}
          number={stats.item}
          label="Objects"
        />
        <InfographicsCard icon={workIcon} number={stats.work} label="Works" />
        <InfographicsCard
          icon={collectionsIcon}
          number={stats.set}
          label="Collections"
        />
        <InfographicsCard
          icon={peopleOrgsIcon}
          number={stats.agent}
          label="People & Groups"
        />
        <InfographicsCard
          icon={placesIcon}
          number={stats.place}
          label="Places"
        />
        <InfographicsCard
          icon={conceptsIcon}
          number={stats.concept}
          label="Concepts"
        />
        <InfographicsCard
          icon={eventsIcon}
          number={stats.event}
          label="Events"
        />
      </Row>
    </StyledInfographicsSection>
  )
}

export default InfographicsSection
