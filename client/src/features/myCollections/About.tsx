/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { isNull } from 'lodash'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import IEntity from '../../types/data/IEntity'
import NamesContainer from '../common/NamesContainer'
import IdentifiersList from '../common/IdentifiersList'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { addEntity } from '../../redux/slices/myCollectionsSlice'
import IWebpages from '../../types/data/IWebpages'
import ExternalLink from '../common/ExternalLink'
import StyledDataRow from '../../styles/shared/DataRow'
import TextLabel from '../common/TextLabel'
import { useGetUserResultsQuery } from '../../redux/api/ml_api'
import { getOrderedItemsIds } from '../../lib/parse/search/searchResultParser'
import { getFormattedUuidFromPathname } from '../../lib/myCollections/helper'

import EditDropdown from './EditDropdown'
import EditCollectionModal from './EditCollectionModal'
import DeleteCollectionModal from './DeleteCollectionModal'
import Editor from './Editor'

interface IProps {
  data: IEntity
}

const About: React.FC<IProps> = ({ data }) => {
  // Is the user authenticated
  const auth = useAuth()

  // get the current logged in user's record
  const { data: userData, isSuccess } = useGetUserResultsQuery({
    username: auth.user?.profile['cognito:username'],
  })

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
    if (option === 'delete') {
      setShowDeleteModal(true)
      pushClientEvent('My Collections', 'Opened', 'Delete collection modal')
      dispatch(
        addEntity({
          uuid: getFormattedUuidFromPathname(pathname),
          scope: 'collection',
        }),
      )
    } else {
      setShowEditModal(true)
      pushClientEvent('My Collections', 'Opened', 'Edit collection modal')
    }
    setEditOption(option)
  }

  const handleCloseEditModal = (): void => {
    setShowEditModal(false)
    pushClientEvent('My Collections', 'Closed', 'Edit collection modal')
  }

  const handleCloseDeleteModal = (): void => {
    setShowDeleteModal(false)
    pushClientEvent('My Collections', 'Closed', 'Delete collection modal')
  }

  const userUuid =
    isSuccess && getOrderedItemsIds(userData).length > 0
      ? getOrderedItemsIds(userData)[0]
      : undefined

  return (
    <div data-testid="about-my-collection">
      {showEditModal && !isNull(editOption) && (
        <EditCollectionModal
          data={data}
          showModal={showEditModal}
          onClose={handleCloseEditModal}
          editOptionSelected={editOption}
          currentUserUuid={userUuid}
        />
      )}
      {showDeleteModal && !isNull(editOption) && (
        <DeleteCollectionModal
          showModal={showDeleteModal}
          onClose={handleCloseDeleteModal}
          userUuid={userUuid}
        />
      )}
      <span className="d-flex w-100 justify-content-between">
        <h2 data-testid="person-page-about-header">About {name}</h2>
        <EditDropdown
          handleOptionSelection={handleEditSelectionOptions}
          userUuid={userUuid}
        />
      </span>
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
          <Editor creationData={creation} eventType="Created By" italics />
        )}
        {!isNull(modification) && (
          <Editor
            creationData={modification}
            eventType="Last Modified By"
            italics
          />
        )}
      </dl>
    </div>
  )
}

export default About
