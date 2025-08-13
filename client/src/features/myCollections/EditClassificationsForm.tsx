import React, { ChangeEvent, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import IMyCollection from '../../types/data/IMyCollection'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useEditCollectionClassificationsMutation } from '../../redux/api/ml_api'
import { collectionClassifications } from '../../config/myCollections/classifications'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'

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
  const myCollection = new MyCollectionParser(data)
  const currentCollectionClassifications = myCollection.getTypes()
  const [classifications, setClassifications] = useState<Array<string>>(
    currentCollectionClassifications.length > 0
      ? currentCollectionClassifications
      : [],
  )
  const [editClassifications] = useEditCollectionClassificationsMutation()

  const handleOnSelectClassifications = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = e.target
    const newClassifications = [...classifications]
    if (classifications.includes(value)) {
      // remove from the list of selected
      const ind = newClassifications.indexOf(value)
      newClassifications.splice(ind, 1)
      setClassifications(newClassifications)
    } else {
      setClassifications([...newClassifications, value])
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (event: any): void => {
    event.preventDefault()
    editClassifications({
      collection: data,
      classifications,
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
        <Form.Group as={Col} controlId="collectionClassificationFormGroup">
          <Form.Label>
            <strong>Classification</strong>
          </Form.Label>
          <Form.Control
            as={MultiSelectDropdown}
            options={collectionClassifications}
            selectedOptions={classifications}
            ariaLabel="Select one or more classifications for the collection"
            className="editClassificationsDropdownButton"
            onCheck={handleOnSelectClassifications}
            indexOfData={0}
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
