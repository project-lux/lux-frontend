import React, { ChangeEvent, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import IMyCollection from '../../types/data/IMyCollection'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useEditDefaultCollectionMutation } from '../../redux/api/ml_api'
import { collectionClassifications } from '../../config/myCollections/classifications'

import MultiSelectDropdown from './MultiSelectDropdown'

interface IProps {
  data: IMyCollection
  onClose: () => void
}
/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} data the my collection object
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @param {string} editOptionSelected the edit option selected by the user
 * @returns
 */
const EditClassificationsForm: React.FC<IProps> = ({ data, onClose }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [selectedClassifications, setSelectedClassifications] = useState<
    Array<string>
  >([])
  const [setDefault] = useEditDefaultCollectionMutation()

  const handleOnSelectClassifications = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = e.target
    if (selectedClassifications.includes(value)) {
      // remove from the list of selected
      const ind = selectedClassifications.indexOf(value)
      selectedClassifications.splice(ind, 1)
      setSelectedClassifications(selectedClassifications)
    } else {
      setSelectedClassifications([...selectedClassifications, e.target.value])
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (event: any): void => {
    event.preventDefault()
    setDefault({
      collection: data,
    })
      .unwrap()
      .then(() => {
        onClose()
        navigate(
          {
            pathname,
          },
          {
            state: {
              showAlert: true,
              alertMessage: `The collection was successfully set as the default.`,
              alertVariant: 'primary',
            },
          },
        )
      })
      .catch(() => {
        onClose()
        navigate(
          {
            pathname,
          },
          {
            state: {
              showAlert: true,
              alertMessage: `The change could not be made.`,
              alertVariant: 'danger',
            },
          },
        )
      })
    onClose()
  }

  return (
    <Form onSubmit={handleSave}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>
            <strong>Classification (required)</strong>
          </Form.Label>
          <Form.Control
            value="test"
            as={MultiSelectDropdown}
            options={collectionClassifications}
            selectedOptions={selectedClassifications}
            ariaLabel="Select one or more classifications for the name"
            className="editClassificationsDropdownButton"
            onCheck={handleOnSelectClassifications}
            required
          />
          <Form.Text id="passwordHelpBlock">
            <i
              className="bi bi-question-circle me-2"
              data-testid="tooltip-icon"
            />
            Default classification can't be edited.
          </Form.Text>
        </Form.Group>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <PrimaryButton type="submit">Save</PrimaryButton>
        </Col>
      </Row>
    </Form>
  )
}

export default EditClassificationsForm
