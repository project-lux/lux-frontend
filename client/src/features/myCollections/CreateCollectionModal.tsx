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
  const date = new Date()
  const month = date.getUTCMonth()
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  const time = date.toLocaleTimeString()
  const timestamp = `[${month + 1}/${day}/${year} at ${time}]`
  const placeholderName = `Collection ${timestamp}`
  const [name, setName] = useState<string>(placeholderName)
  const [classification, setClassification] = useState<string>('')
  const [language, setLanguage] = useState<string>('')
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
      classification,
      language,
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
              <Form.Select
                value={classification}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setClassification(e.target.value)
                }
                required
              >
                {Object.keys(commonClassifications).map((key) => (
                  <option value={key}>{commonClassifications[key]}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="languageFromGroup">
              <Form.Label>Language of Name (optional)</Form.Label>
              <Form.Select
                value={language}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setLanguage(e.target.value)
                }
              >
                {Object.keys(commonLanguages).map((key) => (
                  <option value={key}>{commonLanguages[key]}</option>
                ))}
              </Form.Select>
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
