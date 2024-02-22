/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useLocation } from 'react-router-dom'

import config from '../../config/config'
import EntityParser from '../../lib/parse/data/EntityParser'
import IEntity from '../../types/data/IEntity'
import StyledDataRow from '../../styles/shared/DataRow'
import { transformStringForTestId } from '../../lib/parse/data/helper'

import ExpandableList from './ExpandableList'
import ExternalLink from './ExternalLink'
import TextValue from './TextValue'
import TextLabel from './TextLabel'

interface IProps {
  entity: IEntity
}

/**
 * Parses the current entity and returns its data sources
 * @param {IEntity} entity the current entity
 * @returns {JSX.Element}
 */
const DataSources: React.FC<IProps> = ({ entity }) => {
  const element = new EntityParser(entity)
  const dataSources = element.getDataSources()

  const formatExternalLinks = (
    links: Array<string>,
    id: string,
  ): JSX.Element[] =>
    links.map((link, ind) => (
      <ExternalLink
        key={link}
        url={link}
        name={link}
        id={`${transformStringForTestId(id)}-${ind}`}
      />
    ))

  const { pathname, search } = useLocation()

  const currentURL = encodeURIComponent(
    `${config.env.dataApiBaseUrl}${pathname.substring(1)}${search}`,
  )

  return (
    <div data-testid="test">
      <h2 data-testid="data-sources-header">Data Sources</h2>
      <div className="mb-2">
        <span>
          This information has been automatically generated from the sources
          below, and may be inaccurate.&nbsp;
        </span>
        <ExternalLink
          url={`${config.env.luxFeedbackUrl}${currentURL}`}
          name="Please report any issues here"
          id="data-source"
        />
      </div>
      {Object.keys(dataSources).map((key) => {
        if (dataSources[key].length > 0) {
          return (
            <StyledDataRow key={key} className="row mb-2">
              <TextLabel label={key} className="col-12" />
              <ExpandableList className="col-12" itemSpacing="single">
                <TextValue
                  values={formatExternalLinks(dataSources[key], key)}
                  className="col-12"
                  itemSpacing="single"
                />
              </ExpandableList>
            </StyledDataRow>
          )
        }
        return null
      })}
    </div>
  )
}

export default DataSources
