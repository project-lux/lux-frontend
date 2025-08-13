import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'
import { useAuth } from 'react-oidc-context'
import { useLocation } from 'react-router-dom'

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
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import AddToCollectionButton from '../myCollections/AddToCollectionButton'
import AddToCollectionModal from '../myCollections/AddToCollectionModal'
import { pushClientEvent } from '../../lib/pushClientEvent'
import CreateCollectionModal from '../myCollections/CreateCollectionModal'
import { IRouteState } from '../../types/myCollections/IRouteState'
import MyCollectionsAlert from '../myCollections/Alert'
import { collectionsIcon } from '../../config/resources'

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
  const auth = useAuth()
  const isAuthenticated = auth.isAuthenticated
  const { state } = useLocation() as {
    state: IRouteState
  }

  const [showAddToCollectionModal, setShowAddToCollectionModal] =
    useState<boolean>(false)
  const [showCreateCollectionModal, setShowCreateCollectionModal] =
    useState<boolean>(false)
  const [alert, setAlert] = useState<IRouteState>({
    showAlert: false,
    alertMessage: '',
    alertVariant: 'primary',
  })
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)
  const agentData = AgentData(primaryAgent)

  const element = new EntityParser(entity)
  const name = element.getPrimaryName(config.aat.langen)
  const [typeIcon, helperText] = element.getSupertypeIcon()

  const { displayName, isNameLong, showLongName, setShowLongName } =
    useResizableName(name)

  useTitle(shortenIfNeeded(displayName))

  useEffect(() => {
    if (state && state.hasOwnProperty('showAlert')) {
      setAlert(state as IRouteState)
    }
  }, [state])

  // event to handle the closing of the add to collection modal
  const handleCloseAddModal = (): void => {
    pushClientEvent('My Collections', 'Closed', 'Add to My Collections modal')
    setShowAddToCollectionModal(false)
  }

  // event to handle the closing of the create a collection modal
  const handleCloseCreateCollectionModal = (): void => {
    pushClientEvent('My Collections', 'Closed', 'Delete Collections modal')
    setShowCreateCollectionModal(false)
  }

  return (
    <React.Fragment>
      {alert.showAlert && (
        <MyCollectionsAlert
          variant={alert.alertVariant as string}
          message={alert.alertMessage as string}
          handleOnClose={setAlert}
        />
      )}
      {showAddToCollectionModal && (
        <AddToCollectionModal
          showModal={showAddToCollectionModal}
          onClose={handleCloseAddModal}
          showCreateNewModal={setShowCreateCollectionModal}
        />
      )}
      {showCreateCollectionModal && (
        <CreateCollectionModal
          showModal={showCreateCollectionModal}
          onClose={handleCloseCreateCollectionModal}
        />
      )}
      <StyledEntityHeader>
        <Col xs={12} sm={12} md={12} lg={isMobile ? 12 : 9}>
          <Row>
            <Col xs={12} className="d-flex text-start p-0">
              <h1 className="d-flex">
                <span data-testid="entity-header">
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
            {children}
          </Row>
        </Col>
        {isAuthenticated && (
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={isMobile ? 12 : 3}
            className="d-flex align-items-center justify-content-center"
          >
            <AddToCollectionButton
              additionalClassName="addToCollectionOnEntityPageButton"
              setShowModal={setShowAddToCollectionModal}
              disabled={false}
            >
              <Row>
                <Col xs={3} className="d-flex float-left w-auto">
                  <img
                    src={collectionsIcon}
                    alt="icon for my collections"
                    id="icon"
                    height={60}
                    width={60}
                    data-testid="my-collection-icon-img"
                  />
                </Col>
                <Col className="px-0">
                  <Row>
                    <Col
                      xs={12}
                      className="d-flex float-left"
                      style={{
                        fontSize: '24px',
                        fontWeight: theme.font.weight.medium,
                      }}
                    >
                      My Collections
                    </Col>
                    <Col
                      xs={12}
                      className="d-flex float-left"
                      style={{
                        color: theme.color.link,
                        fontWeight: theme.font.weight.light,
                      }}
                    >
                      Add this record
                    </Col>
                  </Row>
                </Col>
              </Row>
            </AddToCollectionButton>
          </Col>
        )}
      </StyledEntityHeader>
    </React.Fragment>
  )
}

export default EntityHeader
