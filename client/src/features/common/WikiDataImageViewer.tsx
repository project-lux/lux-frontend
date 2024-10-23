import React from 'react'

import IEntity from '../../types/data/IEntity'
import EntityParser from '../../lib/parse/data/EntityParser'
import {
  getWikiDataImageName,
  getWikidataImage,
} from '../../lib/parse/data/helper'
import config from '../../config/config'

import UV from './UV'

/**
 * Extracts the WikiMedia Commons image from the LUX document by looking
 * for a digital access point URI that follows the WikiMedia pattern,
 * then builds the IIIF manifest URI from it to be passed to the UV component.
 *
 * The level-0 IIIF manifest is to be generated dynamically by the manifest
 * server.
 * @param {entity: IEntity} - an IEntity representing a LUX document
 */
const WikiDataImageViewer: React.FC<{ entity: IEntity }> = ({ entity }) => {
  const element = new EntityParser(entity)
  const imageReps = element.getImages()

  if (imageReps.length > 0) {
    const url = getWikidataImage(imageReps)
    if (url !== null) {
      const imageName = getWikiDataImageName(url)

      return (
        <UV manifest={`${config.env.luxWikidataManifestPrefix}${imageName}`} />
      )
    }
  }
  return null
}

export default WikiDataImageViewer
