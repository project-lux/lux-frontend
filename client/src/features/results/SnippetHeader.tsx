/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type JSX } from 'react'
import { Link } from 'react-router-dom'
import { isUndefined } from 'lodash'

import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import { pushClientEvent } from '../../lib/pushClientEvent'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'

interface IProps {
  data: any
  snippetData: JSX.Element
  className: string
  mapComponent?: JSX.Element
  children?: JSX.Element
  titleOfTabbedContent?: string
}

const SnippetHeader: React.FC<IProps> = ({
  data,
  snippetData,
  className,
  mapComponent,
  children,
}) => {
  const entity = new EntityParser(data)
  const images = entity.getImages()
  const primaryName = entity.getPrimaryName(config.aat.langen)

  return (
    <React.Fragment>
      <div className="flex-shrink-0">
        {!isUndefined(mapComponent) ? (
          mapComponent
        ) : (
          <PreviewImageOrIcon images={images} entity={data} />
        )}
      </div>
      <div className={`flex-grow-1 ms-3 ${className}`} data-testid={className}>
        <StyledSnippetTitle
          className="d-flex w-100"
          data-testid="results-snippet-title"
        >
          <Link
            to={{
              pathname: `/view/${stripYaleIdPrefix(data.id)}`,
            }}
            onClick={() =>
              pushClientEvent('Entity Link', 'Selected', 'Results Snippet Link')
            }
            style={{
              width: 'inherit',
            }}
          >
            {primaryName.length > 200
              ? `${primaryName.slice(0, 200)}...`
              : primaryName}
            {children}
          </Link>
        </StyledSnippetTitle>
        {snippetData}
      </div>
    </React.Fragment>
  )
}

export default SnippetHeader
