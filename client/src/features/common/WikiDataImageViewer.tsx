import React from 'react'

import IEntity from '../../types/data/IEntity'
import EntityParser from '../../lib/parse/data/EntityParser'
import {
  getWikiDataImageName,
  getWikidataImage,
} from '../../lib/parse/data/helper'
import config from '../../config/config'

import UV from './UV'

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
