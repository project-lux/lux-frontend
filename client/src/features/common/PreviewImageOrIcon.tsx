import React from 'react'

import EntityParser from '../../lib/parse/data/EntityParser'
import { IImages } from '../../types/IImages'
import StyledImageContainer from '../../styles/shared/ImageDiv'
import ResultsIconSvg from '../../styles/features/common/ResultsIconSvg'
import IEntity from '../../types/data/IEntity'
import StyledIconDiv from '../../styles/features/common/IconDiv'

import ImageThumbnail from './ImageThumbnail'

interface IObjectsBy {
  images: Array<IImages>
  entity: IEntity
  types: Array<string>
  margin?: string
  className?: string
  width?: string
  height?: string
}

const PreviewImageOrIcon: React.FC<IObjectsBy> = ({
  images,
  entity,
  types,
  margin,
  className,
  width,
  height,
}) => {
  if (images.length > 0) {
    return (
      <StyledImageContainer
        className={className || ''}
        height={height}
        width={width}
        data-testid="results-snippet-preview-image"
      >
        <ImageThumbnail imageInfo={images[0]} linkUrl={entity.id} />
      </StyledImageContainer>
    )
  }

  const element = new EntityParser(entity)
  const [supertypeIcon, helperText] = element.getSupertypeIcon(types)

  return (
    <StyledIconDiv
      margin={margin}
      className={className || ''}
      height={height}
      width={width}
      data-testid="entitiy-type-icon"
    >
      <ResultsIconSvg
        data={supertypeIcon}
        width="50"
        height="50"
        aria-label={`${helperText} icon`}
        data-testid="results-snippet-icon"
      />
    </StyledIconDiv>
  )
}

export default PreviewImageOrIcon
