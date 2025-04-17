import React from 'react'

import EntityParser from '../../lib/parse/data/EntityParser'
import { IImages } from '../../types/IImages'
import StyledImageContainer from '../../styles/shared/ImageDiv'
import ResultsIconSvg from '../../styles/features/common/ResultsIconSvg'
import IEntity from '../../types/data/IEntity'
import StyledIconDiv from '../../styles/features/common/IconDiv'
import config from '../../config/config'

import ImageThumbnail from './ImageThumbnail'
import Tooltip from './Tooltip'

interface IObjectsBy {
  images: Array<IImages>
  entity: IEntity
  margin?: string
  className?: string
  width?: string
  height?: string
}

const PreviewImageOrIcon: React.FC<IObjectsBy> = ({
  images,
  entity,
  margin,
  className,
  width,
  height,
}) => {
  if (images.length > 0) {
    const entityParser = new EntityParser(entity)
    const name = entityParser.getPrimaryName(config.aat.primaryName)

    return (
      <StyledImageContainer
        className={className || ''}
        height={height}
        width={width}
        data-testid="results-snippet-preview-image"
      >
        <ImageThumbnail imageInfo={images[0]} linkUrl={entity.id} name={name} />
      </StyledImageContainer>
    )
  }

  const element = new EntityParser(entity)
  const [supertypeIcon, helperText] = element.getSupertypeIcon()

  return (
    <StyledIconDiv
      margin={margin}
      className={className || ''}
      height={height}
      width={width}
      data-testid="entitiy-type-icon"
    >
      <Tooltip html={helperText} placement="top">
        <ResultsIconSvg
          data={supertypeIcon}
          width="50"
          height="50"
          aria-label={`${helperText} icon`}
          data-testid="results-snippet-icon"
        />
      </Tooltip>
    </StyledIconDiv>
  )
}

export default PreviewImageOrIcon
