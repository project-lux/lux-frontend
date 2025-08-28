/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import NamesContainer from '../common/NamesContainer'
import ProductionEvent from '../common/ProductionEvent'
import IEntity from '../../types/data/IEntity'
import { IEventInfo } from '../../types/derived-data/events'
import WorkParser from '../../lib/parse/data/WorkParser'
import LinkContainer from '../common/LinkContainer'
import { setEvent } from '../../config/collectionsSearchTags'
import ApiAboutData from '../common/ApiAboutData'

interface IObject {
  data: IEntity
}

const AboutCollection: React.FC<IObject> = ({ data }) => {
  const collection = new WorkParser(data)
  const aboutData = collection.getAboutCollectionData()

  if (aboutData === null) {
    return null
  }

  const { name, names, types, publications } = aboutData as Record<string, any>

  return (
    <div data-testid="about-collection">
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
              label="Categorized As"
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
        {data._links && (
          <ApiAboutData providedLinks={data._links} configuredLink={setEvent} />
        )}
      </div>
    </div>
  )
}

export default AboutCollection
