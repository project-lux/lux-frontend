import React from 'react'
import { Row } from 'react-bootstrap'

import {
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
      <h2>What&apos;s in the Research Data Demonstrator?</h2>
      <Row className="d-flex justify-content-around">
        <InfographicsCard
          icon={objectsIcon}
          number={stats.item}
          label="Files"
        />
        <InfographicsCard
          icon={conceptsIcon}
          number={stats.concept}
          label="Concepts"
        />
        <InfographicsCard
          icon={peopleOrgsIcon}
          number={stats.agent}
          label="People & Groups"
        />
        <InfographicsCard
          icon={eventsIcon}
          number={stats.event}
          label="Projects"
        />
        <InfographicsCard
          icon={placesIcon}
          number={stats.place}
          label="Places"
        />
        <InfographicsCard
          icon={workIcon}
          number={stats.work}
          label="Datasets"
        />
      </Row>
    </StyledInfographicsSection>
  )
}

export default InfographicsSection
