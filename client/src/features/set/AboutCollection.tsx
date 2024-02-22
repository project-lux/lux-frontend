/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import NamesContainer from '../common/NamesContainer'
import ProductionEvent from '../common/ProductionEvent'
import IEntity from '../../types/data/IEntity'
import { IEventInfo } from '../../types/derived-data/events'
import WorkParser from '../../lib/parse/data/WorkParser'

interface IObject {
  data: IEntity
}

const AboutCollection: React.FC<IObject> = ({ data }) => {
  const collection = new WorkParser(data)
  const aboutData = collection.getAboutCollectionData()

  if (aboutData === null) {
    return null
  }

  const { name, names, publications } = aboutData as Record<string, any>

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
      </div>
    </React.Fragment>
  )
}

export default AboutCollection
