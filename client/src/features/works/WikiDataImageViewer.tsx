import React from 'react'

import UV from '../common/UV'
import IEntity from '../../types/data/IEntity'
import WorkParser from '../../lib/parse/data/WorkParser'
import {
  getWikiDataImageName,
  getWikidataImage,
} from '../../lib/parse/data/helper'
import config from '../../config/config'

const WikiDataImageViewer: React.FC<{ entity: IEntity }> = ({ entity }) => {
  const work = new WorkParser(entity)
  const imageReps = work.getImages()

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
