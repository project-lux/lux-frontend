/* eslint-disable react/no-danger */
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'

import { unit } from '../../config/objectsSearchTags'
import EntityParser from '../../lib/parse/data/EntityParser'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import IEntity from '../../types/data/IEntity'
import { setUnit } from '../../config/worksSearchTags'
import {
  useGetCollectionQuery,
  useGetFacetedRelationshipQuery,
} from '../../redux/api/ml_api'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'

import LinkContainer from './LinkContainer'

interface IObject {
  data: IEntity
}

const getUnitData = (units: ISearchResults | null): Array<string> => {
  if (units !== null) {
    const { orderedItems } = units
    return orderedItems === null || orderedItems.length === 0
      ? []
      : orderedItems.map(
          (facetValue: IOrderedItems) => facetValue.value as string,
        )
  }
  return []
}

const WhereAtYale: React.FC<IObject> = ({ data }) => {
  // get the collection but skip request if data does not have a member_of property
  const {
    data: collections,
    isSuccess: collectionsIsSuccess,
    isLoading: collectionsIsLoading,
  } = useGetCollectionQuery(data, {
    skip: data === undefined || data.member_of === undefined,
  })
  const collectionData = collections
    ? collections.filter((collection: string) => collection !== null)
    : []

  // Parse the entity to get the appropriate HAL links for rendering the unit(s)
  const entity = new EntityParser(data)
  const unitHalLink =
    entity.getHalLink(unit.searchTag) || entity.getHalLink(setUnit.searchTag)
  const { data: units, isSuccess: unitsIsSuccess } =
    useGetFacetedRelationshipQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      { uri: unitHalLink! },
      { skip: unitHalLink === null },
    )
  const unitUris = unitsIsSuccess && units ? getUnitData(units) : []
  const planYourVisitLinks = entity.getPlanYourVisitLink()

  return (
    <StyledDataRow
      className="row"
      id="where-at-yale"
      data-testid="where-at-yale"
    >
      <h2>Where is it at Yale?</h2>
      <div className="mb-2">
        <dl className="mb-0">
          {collectionsIsLoading && <p>Loading...</p>}
          {collectionsIsSuccess && collectionData.length > 0 && (
            <LinkContainer
              label="Collection"
              content={collectionData}
              expandColumns
              itemSpacing="single"
              id="collection-container"
            />
          )}
          {unitUris.length > 0 && (
            <LinkContainer
              label="Campus Division"
              content={unitUris}
              expandColumns
              itemSpacing="single"
              id="campus-division-container"
            />
          )}
        </dl>
        {planYourVisitLinks.length > 0 &&
          planYourVisitLinks.map((link) => {
            if (link._content_html !== undefined) {
              return (
                <Row>
                  <Col>
                    <span className="d-flex" data-testid="plan-your-visit-link">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(link._content_html),
                        }}
                        className="mb-0"
                      />
                    </span>
                  </Col>
                </Row>
              )
            }
            return null
          })}
      </div>
      <StyledHr />
    </StyledDataRow>
  )
}

export default WhereAtYale
