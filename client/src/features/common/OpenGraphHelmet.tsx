import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import { IImages } from '../../types/IImages'

const getOgImage = (images: Array<IImages>, defaultImage: string): string => {
  for (const image of images) {
    if (image.imageUrls.length > 0) {
      return image.imageUrls[0]
    }
  }

  return defaultImage
}

const OpenGraphHelmet: React.FC<{ title: string; images?: Array<IImages> }> = ({
  title,
  images,
}) => {
  const { pathname, search } = useLocation()
  const url = `${pathname}${search}`
  const hasImages = !!(images && images.length > 0)
  const defaultImage = 'https://lux.collections.yale.edu/opengraph.png'
  const ogImage = hasImages ? getOgImage(images, defaultImage) : defaultImage
  const twitterImageAlt = hasImages ? title : 'LUX: Yale Collections Discovery'

  return (
    <Helmet>
      <title>{title} - LUX</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta
        property="og:description"
        content="Explore Yale University's cultural heritage collections"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content="Explore Yale University's cultural heritage collections"
      />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:image:alt" content={twitterImageAlt} />
    </Helmet>
  )
}

export default OpenGraphHelmet
