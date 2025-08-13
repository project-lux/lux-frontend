/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { isNull } from 'lodash'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import IEntity from '../../types/data/IEntity'
import NamesContainer from '../common/NamesContainer'
import IdentifiersList from '../common/IdentifiersList'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { addEntity } from '../../redux/slices/myCollectionsSlice'
import config from '../../config/config'
import IWebpages from '../../types/data/IWebpages'
import ExternalLink from '../common/ExternalLink'
import StyledDataRow from '../../styles/shared/DataRow'
import TextLabel from '../common/TextLabel'

import EditDropdown from './EditDropdown'
import EditCollectionModal from './EditCollectionModal'
import DeleteCollectionModal from './DeleteCollectionModal'
import Editor from './Editor'

interface IProps {
  data: IEntity
}

const About: React.FC<IProps> = ({ data }) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [editOption, setEditOption] = useState<null | string>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const myCollection = new MyCollectionParser(data)
  const aboutData = myCollection.getAboutData()

  if (aboutData === null) {
    return null
  }

  const {
    name,
    names,
    types,
    identifiers,
    notes,
    webPages,
    creation,
    modification,
  } = aboutData as Record<string, any>

  const handleEditSelectionOptions = (option: string): void => {
    setEditOption(option)
    if (option === 'delete') {
      setShowDeleteModal(true)
      pushClientEvent('My Collections', 'Opened', 'Delete collection modal')
      dispatch(
        addEntity({
          uuid: `${config.env.dataApiBaseUrl}${pathname.replace('/view', 'data')}`,
          scope: 'collection',
        }),
      )
    } else {
      setShowEditModal(true)
      pushClientEvent('My Collections', 'Opened', 'Edit collection modal')
    }
  }

  const handleCloseEditModal = (): void => {
    setShowEditModal(false)
    pushClientEvent('My Collections', 'Closed', 'Edit collection modal')
  }

  const handleCloseDeleteModal = (): void => {
    setShowDeleteModal(false)
    pushClientEvent('My Collections', 'Closed', 'Delete collection modal')
  }

  return (
    <React.Fragment>
      {showEditModal && !isNull(editOption) && (
        <EditCollectionModal
          data={data}
          showModal={showEditModal}
          onClose={handleCloseEditModal}
          editOptionSelected={editOption}
        />
      )}
      {showDeleteModal && !isNull(editOption) && (
        <DeleteCollectionModal
          showModal={showDeleteModal}
          onClose={handleCloseDeleteModal}
        />
      )}
      <Row>
        <Col xs={12} className="d-flex text-start p-0">
          <span className="d-flex">
            <h2 data-testid="person-page-about-header">About {name}</h2>
            <EditDropdown handleOptionSelection={handleEditSelectionOptions} />
          </span>
        </Col>
      </Row>
      <dl className="about-person-and-group mb-0">
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} />
        )}
        {types.length > 0 && (
          <LinkContainer
            content={types}
            label="Categorized As"
            expandColumns
            itemSpacing="single"
            id="my-collection-types-link-container"
          />
        )}
        {identifiers.length > 0 && (
          <IdentifiersList identifiers={identifiers} expandIdentiferColumn />
        )}
        {webPages.length > 0 && (
          <StyledDataRow className="row">
            <TextLabel label="Web Pages" className="col-md-12" />
            {webPages.map((link: IWebpages, ind: number) => (
              <ExternalLink
                key={link.link}
                url={link.link}
                name={
                  link.contentIdentifier !== ''
                    ? link.contentIdentifier
                    : link.link
                }
                data-testid={`site-links-${ind}`}
              />
            ))}
          </StyledDataRow>
        )}
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
        {creation !== null && (
          <Editor creationData={creation} eventType="Created" />
        )}
        {modification.length > 0 &&
          modification.map(
            (c: { creator: string | null; date: string | null }) => (
              <Editor creationData={c} eventType="Modified" />
            ),
          )}
      </dl>
    </React.Fragment>
  )
}

export default About
