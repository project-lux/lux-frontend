import React, { ChangeEvent, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { isUndefined } from 'lodash'
import { useDispatch } from 'react-redux'

import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useCreateCollectionMutation } from '../../redux/api/ml_api'
import useAuthentication from '../../lib/hooks/useAuthentication'
import {
  IMyCollectionsResultsState,
  resetState,
} from '../../redux/slices/myCollectionsSlice'
import { commonClassifications } from '../../config/myCollections/classifications'
import { commonLanguages } from '../../config/myCollections/languages'
import { useAppSelector } from '../../app/hooks'
import { getFormattedDate } from '../../lib/myCollections/helper'

import MultiSelectDropdown from './MultiSelectDropdown'

interface IMyCollectionsModal {
  showModal: boolean
  onClose: () => void
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @returns
 */
const CreateCollectionModal: React.FC<IMyCollectionsModal> = ({
  showModal,
  onClose,
}) => {
  useAuthentication()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { tab, subTab } = useParams()
  const timestamp = getFormattedDate()
  const placeholderName = `Collection ${timestamp}`
  const [name, setName] = useState<string>(placeholderName)
  const [selectedClassifications, setSelectedClassifications] = useState<
    Array<string>
  >([])
  const [selectedLanguages, setSelectedLanguages] = useState<Array<string>>([])
  const [isDefault, setIsDefault] = useState<boolean>(false)
  const [createCollection] = useCreateCollectionMutation()

  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids } = currentMyCollectionState

  const handleSave = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const pathnameToRedirect =
      tab === undefined
        ? pathname
        : `/view/results/${tab}${!isUndefined(subTab) ? `/${subTab}` : ''}`

    createCollection({
      name,
      classifications: selectedClassifications,
      languages: selectedLanguages,
      collectionDefault: isDefault,
      records: uuids,
    })
      .unwrap()
      .then(() => {
        onClose()
        dispatch(resetState())
        navigate(
          {
            pathname: pathnameToRedirect,
            search,
          },
          {
            state: {
              showAlert: true,
              alertMessage: `${name} was successfully created${uuids.length > 0 ? ' and the records were added successfully' : ''}!`,
              alertVariant: 'primary',
            },
          },
        )
      })
      .catch(() => {
        onClose()
        dispatch(resetState())
        navigate(
          {
            pathname: pathnameToRedirect,
            search,
          },
          {
            state: {
              showAlert: true,
              alertMessage: `${name} could not be made.`,
              alertVariant: 'danger',
            },
          },
        )
      })
    onClose()
  }

  const handleSelectNameClassification = (e: ChangeEvent<any>): void => {
    const { value } = e.target
    const newClassifications = [...selectedClassifications]
    if (selectedClassifications.includes(value)) {
      // remove from the list of selected
      const ind = newClassifications.indexOf(value)
      newClassifications.splice(ind, 1)
      setSelectedClassifications(newClassifications)
    } else {
      setSelectedClassifications([...newClassifications, value])
    }
  }

  const handleSelectNameLanguage = (e: ChangeEvent<any>): void => {
    const { value } = e.target
    const newLanguages = [...selectedLanguages]
    if (selectedClassifications.includes(value)) {
      // remove from the list of selected
      const ind = newLanguages.indexOf(value)
      newLanguages.splice(ind, 1)
      setSelectedLanguages(newLanguages)
    } else {
      setSelectedLanguages([...newLanguages, value])
    }
  }

  return (
    <Modal
      show={showModal}
      onHide={() => onClose()}
      backdrop="static"
      size="lg"
      keyboard={false}
      animation={false}
      aria-describedby="modalBody"
      aria-labelledby="modalTitle"
      data-testid="create-collection-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="modalTitle">Create a New Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">
        <Form onSubmit={handleSave}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={placeholderName}
                value={name}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: ChangeEvent<any>) => setName(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="classificationFromGroup">
              <Form.Label>Classification (required)</Form.Label>
              <Form.Control
                as={MultiSelectDropdown}
                options={commonClassifications}
                selectedOptions={selectedClassifications}
                ariaLabel="Select one or more classifications for the name"
                className="editNameClassificationDropdownButton"
                onCheck={handleSelectNameClassification}
                required
                indexOfData={0}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="languageFromGroup">
              <Form.Label>Language of Name (optional)</Form.Label>
              <Form.Control
                as={MultiSelectDropdown}
                options={commonLanguages}
                selectedOptions={selectedLanguages}
                ariaLabel="Select one or more languages for the name"
                className="editNameLanguageDropdownButton"
                onCheck={handleSelectNameLanguage}
                indexOfData={0}
              />
            </Form.Group>
          </Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              inline
              type="checkbox"
              checked={isDefault}
              onChange={() => setIsDefault(!isDefault)}
              label="Set as default collection"
            />
          </Form.Group>
          <Row>
            <Col className="d-flex justify-content-end">
              <PrimaryButton type="submit">Save</PrimaryButton>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCollectionModal
