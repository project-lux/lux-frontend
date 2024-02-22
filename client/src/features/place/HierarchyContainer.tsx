/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import IEntity from '../../types/data/IEntity'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { hierarchyChildren } from '../../config/placeSearchTags'
// import ExploreHierarchy from '../common/ExploreHierarchy'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import ILinks from '../../types/data/ILinks'
import { IHalLink } from '../../types/IHalLink'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import HierarchyChart from '../visualizations/HierarchyChart'
import PageLoading from '../common/PageLoading'
import ExploreHierarchy from '../common/ExploreHierarchy'

interface IProps {
  parents: Array<string>
  entity: IEntity
}

const getHalLink = (
  links: ILinks | undefined,
  halLink: IHalLink,
): string | null => {
  if (links === undefined) {
    return null
  }

  const { searchTag } = halLink
  if (links.hasOwnProperty(searchTag)) {
    return links[searchTag].href
  }

  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HierarchyContainer: React.FC<IProps> = ({ parents, entity }) => {
  const [view, setView] = useState<'graph' | 'list'>('list')

  const uri = getHalLink(entity._links, hierarchyChildren)
  const skip = uri === null
  const { data, isSuccess, isError, isLoading } = useGetSearchRelationshipQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uri: uri!,
    },
    {
      skip,
    },
  )

  if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    console.log(
      'An error occurred retrieving the children of the current entity.',
    )
  }

  const currentUuid = entity.id!
  if ((isSuccess && data) || skip) {
    return (
      <StyledEntityPageSection className="hierarchyContainer">
        <Row>
          <Col xs={12} sm={12} md={8}>
            <h2>Explore</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <PrimaryButton
              onClick={() => setView(view === 'graph' ? 'list' : 'graph')}
            >
              <i className="bi bi-list-ul" />
            </PrimaryButton>
          </Col>
        </Row>
        {view === 'graph' ? (
          <div style={{ height: '600px' }}>
            <HierarchyChart
              parents={parents}
              descendants={data!}
              currentUuid={currentUuid}
            />
          </div>
        ) : (
          <ExploreHierarchy
            parents={parents}
            descendents={data!}
            currentUuid={currentUuid}
          />
        )}
      </StyledEntityPageSection>
    )
  }

  return null
}

export default HierarchyContainer
