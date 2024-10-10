import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'

import StyledEntityHeader from '../../styles/features/common/EntityHeader'
import {
  useResizableName,
  shortenIfNeeded,
} from '../../lib/hooks/useResizableName'
import useTitle from '../../lib/hooks/useTitle'
import IEntity from '../../types/data/IEntity'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import theme from '../../styles/theme'

import Dates from './Dates'
import AgentInHeader from './AgentInHeader'
import AgentData from './AgentData'
import Tooltip from './Tooltip'

interface IEntityHeader {
  entity: IEntity
  primaryAgent?: string
  start?: string
  end?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

const StyledImg = styled.img`
  display: none;

  @media (min-width: ${theme.breakpoints.md}px) {
    display: initial;
  }
`

/**
 * Returns the header for all entity pages with the provided data
 * @param {IEntity} entity data for the current entity
 * @param {string} icon the entity type icon to be displayed
 * @param {string} entityTypeForIcon the name of the entity type icon to be displayed as alt text
 * @param {string} primaryAgent optional; the person or group responsible for the creation of the entity
 * @param {string} start optional; the start year
 * @param {string} end optional; the end year
 * @param {any} children optional; child components to be rendering within the header
 * @returns {JSX.Element}
 */
const EntityHeader: React.FC<IEntityHeader> = ({
  entity,
  primaryAgent,
  start,
  end,
  children,
}) => {
  const agentData =
    primaryAgent !== undefined ? AgentData(primaryAgent) : undefined

  const element = new EntityParser(entity)
  const name = element.getPrimaryName(config.aat.langen)
  const [typeIcon, helperText] = element.getSupertypeIcon()

  const { displayName, isNameLong, showLongName, setShowLongName } =
    useResizableName(name)

  useTitle(shortenIfNeeded(displayName))

  return (
    <React.Fragment>
      <StyledEntityHeader>
        <Col xs={12} sm={12} md={11}>
          <Row>
            <Col xs={12} className="text-start p-0">
              <h1 className="d-flex">
                <span data-testid="entity-header">
                  {displayName}
                  <Dates start={start || ''} end={end || ''} />
                  {isNameLong &&
                    (showLongName ? (
                      <button
                        type="button"
                        className="btn btn-link show-more"
                        onClick={() => setShowLongName(false)}
                      >
                        Shorten Name
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-link show-more"
                        onClick={() => setShowLongName(true)}
                      >
                        Show Full Name
                      </button>
                    ))}
                </span>
              </h1>
            </Col>
            {agentData && (
              <Col className="text-start p-0">
                <AgentInHeader data={agentData} />
              </Col>
            )}
          </Row>
          {children}
        </Col>
        <Col xs={12} sm={12} md={1} className="px-0 text-end">
          <Tooltip html={helperText} placement="bottom">
            <StyledImg
              src={typeIcon}
              alt={`icon for ${helperText}`}
              id="icon"
              height={70}
              width={70}
              className="mx-2"
              data-testid="entity-icon-img"
            />
          </Tooltip>
        </Col>
      </StyledEntityHeader>
    </React.Fragment>
  )
}

export default EntityHeader
