/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
// import ExploreHierarchy from '../common/ExploreHierarchy'
// import PrimaryButton from '../../styles/shared/PrimaryButton'
import ILinks from '../../types/data/ILinks'
import { IHalLink } from '../../types/IHalLink'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { ISearchResults } from '../../types/ISearchResults'
import IPlace from '../../types/data/IPlace'
import IConcept from '../../types/data/IConcept'

import ListContainer from './ListContainer'
import MoreLessButton from './MoreLessButton'

interface IProps {
  entity: IPlace | IConcept
  halLink: IHalLink
  getParentUris: (entity: IPlace | IConcept) => Array<string>
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
const HierarchyContainer: React.FC<IProps> = ({
  entity,
  halLink,
  getParentUris,
}) => {
  const hierarchyRef = useRef<HTMLDivElement>(null)

  const [displayLength, setDisplayLength] = useState(5)

  const defaultLength = 5
  const uri = getHalLink(entity._links, halLink)
  const parents = getParentUris(entity)

  const skip = uri === null
  const { data, isSuccess, isError } = useGetSearchRelationshipQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uri: uri!,
    },
    {
      skip,
    },
  )

  if (isError) {
    console.log(
      'An error occurred retrieving the children of the current entity.',
    )
  }

  if ((isSuccess && data) || skip) {
    return (
      <StyledEntityPageSection
        className="hierarchyContainer p-4"
        ref={hierarchyRef}
      >
        <Row>
          <Col xs={8}>
            <h2>Explore</h2>
          </Col>
        </Row>
        <ListContainer
          displayLength={displayLength}
          parents={parents}
          descendents={(data as ISearchResults) || {}}
          currentEntity={entity}
        >
          <MoreLessButton
            parentsLength={parents.length}
            defaultDisplayLength={defaultLength}
            displayLength={displayLength}
            setParentDisplayLength={setDisplayLength}
          />
        </ListContainer>
      </StyledEntityPageSection>
    )
  }

  return null
}

export default HierarchyContainer
