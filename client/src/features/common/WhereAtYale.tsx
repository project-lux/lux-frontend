/* eslint-disable react/no-danger */
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'

import { unit, collection } from '../../config/objectsSearchTags'
import EntityParser from '../../lib/parse/data/EntityParser'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import IEntity from '../../types/data/IEntity'
import { setUnit } from '../../config/worksSearchTags'
import {
  useGetFacetedRelationshipQuery,
  useGetSearchRelationshipQuery,
} from '../../redux/api/ml_api'
import { getOrderedItemsIds } from '../../lib/parse/search/searchResultParser'
import { getFacetValues } from '../../lib/facets/helper'

import LinkContainer from './LinkContainer'

interface IObject {
  data: IEntity
}

const WhereAtYale: React.FC<IObject> = ({ data }) => {
  // Parse the entity to get the appropriate HAL links for rendering the unit(s)
  const entity = new EntityParser(data)
  const planYourVisitLinks = entity.getPlanYourVisitLink()
  const collectionHalLink = entity.getHalLink(collection.searchTag)
  const unitHalLink =
    entity.getHalLink(unit.searchTag) || entity.getHalLink(setUnit.searchTag)

  // get the responsible units via HAL link
  const { data: units, isSuccess: unitsIsSuccess } =
    useGetFacetedRelationshipQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      { uri: unitHalLink! },
      { skip: unitHalLink === null },
    )
  const unitUris = unitsIsSuccess && units ? getFacetValues(units) : []

  // Get collections via HAL link
  const {
    data: collectionData,
    isSuccess: collectionIsSuccess,
    isLoading: collectionIsLoading,
  } = useGetSearchRelationshipQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { uri: collectionHalLink! },
    { skip: collectionHalLink === null },
  )
  const collections =
    collectionIsSuccess && collectionData
      ? getOrderedItemsIds(collectionData)
      : []

  return (
    <StyledDataRow
      className="row"
      id="where-at-yale"
      data-testid="where-at-yale"
    >
      <h2>Where is it at Yale?</h2>
      <div className="mb-2">
        <dl className="mb-0">
          {collectionIsLoading && <p>Loading...</p>}
          {collectionIsSuccess && collections.length > 0 && (
            <LinkContainer
              label="Collection"
              content={collections}
              expandColumns
              itemSpacing="single"
              id="collection-container"
            />
          )}
          {unitUris.length > 0 && (
            <LinkContainer
              label="Responsible Unit"
              content={unitUris}
              expandColumns
              itemSpacing="single"
              id="campus-division-container"
            />
          )}
        </dl>
        {planYourVisitLinks.length > 0 &&
          planYourVisitLinks.map((link, ind) => {
            if (link._content_html !== undefined) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Row key={`plan-your-visit-${ind}`}>
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
