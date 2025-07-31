/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { isNull } from 'lodash'

import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import IEntity from '../../types/data/IEntity'
import NamesContainer from '../common/NamesContainer'
import WebPages from '../common/WebPages'
import IdentifiersList from '../common/IdentifiersList'
import { pushClientEvent } from '../../lib/pushClientEvent'

import EditDropdown from './EditDropdown'
import EditCollectionModal from './EditCollectionModal'

interface IProps {
  data: IEntity
}

const About: React.FC<IProps> = ({ data }) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [editOption, setEditOption] = useState<null | string>(null)
  const agent = new MyCollectionParser(data)
  const aboutData = agent.getAboutData()

  if (aboutData === null) {
    return null
  }

  const { name, names, types, identifiers, notes, webPages } =
    aboutData as Record<string, any>

  const handleEditSelectionOptions = (option: string): void => {
    setEditOption(option)
    setShowEditModal(true)
    pushClientEvent('My Collections', 'Opened', 'Edit collection modal')
  }

  const handleCloseEditModal = (): void => {
    setShowEditModal(false)
    pushClientEvent('My Collections', 'Closed', 'Edit collection modal')
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
      <Row>
        <Col xs={12} className="d-flex text-start p-0">
          <span className="d-flex">
            <h2 data-testid="person-page-about-header">About {name}</h2>
            <EditDropdown handleOptionSelection={handleEditSelectionOptions} />
          </span>
        </Col>
      </Row>
      <dl className="about-person-and-group">
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
        <WebPages webPages={webPages} />
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </React.Fragment>
  )
}

export default About
