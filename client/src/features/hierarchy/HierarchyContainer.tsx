import React, { useRef } from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import ILinks from '../../types/data/ILinks'
import { IHalLink } from '../../types/IHalLink'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { ISearchResults } from '../../types/ISearchResults'
import IPlace from '../../types/data/IPlace'
import IConcept from '../../types/data/IConcept'
import { useAppSelector } from '../../app/hooks'
import { IHierarchy } from '../../redux/slices/hierarchySlice'

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

const HierarchyContainer: React.FC<IProps> = ({
  entity,
  halLink,
  getParentUris,
}) => {
  const currentState = useAppSelector(
    (hierarchyState) => hierarchyState.hierarchy as IHierarchy,
  )
  const hierarchyRef = useRef<HTMLDivElement>(null)
  const childrenUri = getHalLink(entity._links, halLink)
  const parents = getParentUris(entity)

  const skip = childrenUri === null
  const { data, isSuccess, isError } = useGetSearchRelationshipQuery(
    {
      uri: childrenUri!,
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

  if (skip && parents.length === 0) {
    return null
  }

  if ((isSuccess && data) || skip) {
    return (
      <StyledEntityPageSection
        className="hierarchyContainer p-4"
        ref={hierarchyRef}
      >
        <Row>
          <Col xs={12}>
            <h2>Explore</h2>
          </Col>
        </Row>
        <ListContainer
          parents={parents}
          descendents={(data as ISearchResults) || {}}
          currentEntity={entity}
        >
          {parents.length > currentState.defaultDisplayLength && (
            <MoreLessButton
              parentsArrayLength={parents.length}
              displayLength={currentState.currentPageLength}
            />
          )}
        </ListContainer>
      </StyledEntityPageSection>
    )
  }

  return null
}

export default HierarchyContainer
