import React from 'react'

import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import config from '../../config/config'
import ObjectParser from '../../lib/parse/data/ObjectParser'

import UV from './UV'

/**
 * Extracts the IIIF manifest URI from the LUX document by looking
 * for the digital access point specified with a IIIF protocol,
 * and shows the image(s) using the UV component.
 *
 * @param {uri: string} - URI of the LUX document
 */
const IiifImageViewer: React.FC<{ uri: string }> = ({ uri }) => {
  const { data, isSuccess, isError } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
  })

  if (isError && !config.env.luxEnv.includes('production')) {
    return <h2>We encountered an error retrieving the item</h2>
  }

  if (isSuccess && data) {
    const object = new ObjectParser(data)
    const manifestId = object.getManifestId()

    return <UV manifest={manifestId} />
  }
  return null
}

export default IiifImageViewer
