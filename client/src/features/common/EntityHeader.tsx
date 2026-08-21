import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'

import StyledEntityHeader from '../../styles/features/common/EntityHeader'
import { useResizableName } from '../../lib/hooks/useResizableName'
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
  const agentData = AgentData(primaryAgent)

  const element = new EntityParser(entity)
  const name = element.getPrimaryName(config.aat.langen)
  const [typeIcon, helperText] = element.getSupertypeIcon()

  const { displayName, isNameLong, showLongName, setShowLongName } =
    useResizableName(name)

  return (
    <React.Fragment>
      <StyledEntityHeader className="py-3">
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row>
            <Col xs={12} className="d-flex text-start p-0">
              <h1 className="d-flex">
                <span
                  data-testid="entity-header"
                  style={{ overflowWrap: 'anywhere' }}
                >
                  <Tooltip html={helperText} placement="bottom">
                    <StyledImg
                      src={typeIcon}
                      alt={`icon for ${helperText}`}
                      id="icon"
                      height={70}
                      width={70}
                      className="me-2"
                      data-testid="entity-icon-img"
                    />
                  </Tooltip>
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
              <Col xs={12} className="text-start p-0">
                <AgentInHeader data={agentData} />
              </Col>
            )}
            {children}
          </Row>
        </Col>
      </StyledEntityHeader>
    </React.Fragment>
  )
}

export default EntityHeader
