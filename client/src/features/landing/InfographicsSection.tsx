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
          dataTestId="objects"
        />
        <InfographicsCard
          icon={workIcon}
          number={stats.work}
          label="Works"
          dataTestId="works"
        />
        <InfographicsCard
          icon={collectionsIcon}
          number={stats.set}
          label="Collections"
          dataTestId="collections"
        />
        <InfographicsCard
          icon={peopleOrgsIcon}
          number={stats.agent}
          label="People & Groups"
          dataTestId="people-groups"
        />
        <InfographicsCard
          icon={placesIcon}
          number={stats.place}
          label="Places"
          dataTestId="places"
        />
        <InfographicsCard
          icon={conceptsIcon}
          number={stats.concept}
          label="Concepts"
          dataTestId="concepts"
        />
        <InfographicsCard
          icon={eventsIcon}
          number={stats.event}
          label="Events"
          dataTestId="events"
        />
      </Row>
    </StyledInfographicsSection>
  )
}

export default InfographicsSection
