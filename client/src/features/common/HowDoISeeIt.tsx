import React from 'react'
import { Col, Row } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'

import { unit } from '../../config/objectsSearchTags'
import { setUnit } from '../../config/setsSearchTags'
import { access } from '../../config/tooltips'
import EntityParser from '../../lib/parse/data/EntityParser'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import IEntity from '../../types/data/IEntity'
import StyledDl from '../../styles/shared/DescriptionList'
import { searchTypes } from '../../config/searchTypes'
import {
  useGetCollectionQuery,
  useGetSearchRelationshipQuery,
} from '../../redux/api/ml_api'
import { getFacetsOrderedItems } from '../../lib/facets/helper'

import ExternalLink from './ExternalLink'
import NotesContainer from './NotesContainer'
import LinkContainer from './LinkContainer'

interface IProps {
  data: IEntity
}

const HowDoISeeIt: React.FC<IProps> = ({ data }) => {
  const entity = new EntityParser(data)
  const accessStatement = entity.getAccessStatement()
  const links = [...entity.getAllSiteLinks(), ...entity.getHowDoISeeItLinks()]
  let accessPoints: Array<{ content: string; id: string }> = []
  // Parse the entity to get the appropriate HAL links for rendering the unit(s)
  const planYourVisitLinks = entity.getPlanYourVisitLink()
  const unitHalLink =
    entity.getHalLink(unit.searchTag) || entity.getHalLink(setUnit.searchTag)

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

  // get the responsible units via HAL link
  const { data: units, isSuccess: unitsIsSuccess } =
    useGetSearchRelationshipQuery(
      { uri: unitHalLink! },
      { skip: unitHalLink === null },
    )
  const unitUris = unitsIsSuccess && units ? getFacetsOrderedItems(units) : []

  if (searchTypes.objects.includes(entity.json.type)) {
    const object = new ObjectParser(data)
    accessPoints = object.getAccessPoints()
  }

  // Return null if there is no data to display
  if (
    accessStatement.length === 0 &&
    links.length === 0 &&
    accessPoints.length === 0 &&
    collectionData.length === 0 &&
    planYourVisitLinks.length === 0 &&
    unitUris.length === 0
  ) {
    return null
  }

  return (
    <StyledDataRow className="row" data-testid="how-do-i-see-it">
      <Col xs={12}>
        <h2>How do I see it?</h2>
      </Col>
      {accessStatement.length > 0 && (
        <StyledDl data-testid="access-statement-dl mb-0">
          <NotesContainer
            notes={{ Access: accessStatement }}
            id="access-statement"
            expandColumns
            labelTooltipText={access}
            hrClassName="accessStatementHr"
          />
        </StyledDl>
      )}
      {accessPoints.length > 0 &&
        accessPoints.map((accessPoint) => (
          <ExternalLink
            key={accessPoint.id}
            url={accessPoint.id}
            name={
              accessPoint.content !== '' ? accessPoint.content : 'Access Point'
            }
            style={{ marginBottom: theme.spacing.verticalItemDoubleSpacing }}
          />
        ))}
      {links.map((link) => (
        <div
          key={link.link}
          className="col-12"
          style={{ marginBottom: theme.spacing.verticalItemDoubleSpacing }}
          data-testid="site-links"
        >
          <ExternalLink
            url={link.link}
            name={
              link.contentIdentifier !== '' ? link.contentIdentifier : link.link
            }
          />
        </div>
      ))}
      <dl className="mb-0">
        {collectionsIsLoading && <p>Loading...</p>}
        {collectionsIsSuccess && collectionData.length > 0 && (
          <LinkContainer
            label="Collection"
            content={collectionData}
            expandColumns
            itemSpacing="single"
            id="collection-container"
            hrClassName="collectionHr"
          />
        )}
        {unitUris.length > 0 && (
          <LinkContainer
            label="Responsible Unit"
            content={unitUris}
            expandColumns
            itemSpacing="single"
            id="campus-division-container"
            hrClassName="responsibleUnitHr"
          />
        )}
      </dl>
      {planYourVisitLinks.length > 0 &&
        planYourVisitLinks.map((link, ind) => {
          if (link._content_html !== undefined) {
            return (
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
      <Col xs={12}>
        <StyledHr className="howDoISeeItHr" width="100%" />
      </Col>
    </StyledDataRow>
  )
}

export default HowDoISeeIt
