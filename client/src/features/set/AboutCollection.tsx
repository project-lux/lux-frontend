/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { isNull } from 'lodash'

import NamesContainer from '../common/NamesContainer'
import ProductionEvent from '../common/ProductionEvent'
import IEntity from '../../types/data/IEntity'
import { IEventInfo } from '../../types/derived-data/events'
import WorkParser from '../../lib/parse/data/WorkParser'
import LinkContainer from '../common/LinkContainer'
import { events } from '../../config/setsSearchTags'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'

interface IObject {
  entity: IEntity
}

const AboutCollection: React.FC<IObject> = ({ entity }) => {
  const collection = new WorkParser(entity)
  const aboutData = collection.getAboutCollectionData()
  const eventHalLink = collection.getHalLink(events.searchTag)
  let eventData: Array<string> = []

  const { data, isSuccess } = useGetSearchRelationshipQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uri: eventHalLink!,
    },
    {
      skip: isNull(eventHalLink),
    },
  )

  if (aboutData === null) {
    return null
  }

  if (isSuccess && data) {
    eventData = data.orderedItems.map((item) => item.id)
  }

  const { name, names, publications, types } = aboutData as Record<string, any>

  return (
    <React.Fragment>
      <h3 className="px-3 pt-2" data-testid="collection-name-header">
        About {name}
      </h3>
      <div className="px-3">
        {names !== null && (
          <div className="row">
            <NamesContainer names={names} />
          </div>
        )}
        {types.length > 0 && (
          <React.Fragment>
            <LinkContainer
              content={types}
              label="Types"
              id="set-types-link-container"
              expandColumns
              itemSpacing="single"
            />
          </React.Fragment>
        )}
        {publications.length > 0 &&
          publications.map((publication: IEventInfo, ind: number) => (
            <ProductionEvent
              key={`publication_${ind}`}
              event={publication}
              label={
                publication.label !== null ? publication.label : 'Publication'
              }
              id="collection-publication"
              expandColumns
              stackKeyValuePairs
            />
          ))}
        {eventData.length > 0 && (
          <LinkContainer
            content={eventData}
            label={events.title}
            id="set-types-link-container"
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default AboutCollection
