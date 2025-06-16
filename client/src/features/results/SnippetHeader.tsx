/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isUndefined } from 'lodash'
import { useAuth } from 'react-oidc-context'

import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import { pushClientEvent } from '../../lib/pushClientEvent'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'

interface IProps {
  data: any
  snippetData: JSX.Element
  mapComponent?: JSX.Element
  children?: JSX.Element
}

const SnippetHeader: React.FC<IProps> = ({
  data,
  mapComponent,
  children,
  snippetData,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  // TODO: switch to auth once functionality can be added
  const auth = useAuth()
  console.log(auth)
  const userIsAuthenticate = true
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
      <div className="flex-grow-1 ms-3">
        <StyledSnippetTitle
          className="d-flex w-100"
          data-testid="person-group-results-snippet-title"
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
          {userIsAuthenticate && (
            <span className="d-flex align-items-center">
              <input
                className="form-check-input d-inline mt-0 float-right selectResultCheckbox"
                type="checkbox"
                id="select-all-checkbox"
                onChange={() => setIsSelected(!isSelected)}
                checked={isSelected}
              />
              <label
                hidden
                className="form-check-label ms-2"
                htmlFor="select-all-checkbox"
              >
                Select {primaryName}
              </label>
            </span>
          )}
        </StyledSnippetTitle>
        {snippetData}
      </div>
    </React.Fragment>
  )
}

export default SnippetHeader
