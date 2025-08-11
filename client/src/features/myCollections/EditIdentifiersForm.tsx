/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import IMyCollection from '../../types/data/IMyCollection'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useEditCollectionIdentifiersMutation } from '../../redux/api/ml_api'
import SecondaryButton from '../../styles/shared/SecondaryButton'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import StyledDeleteButton from '../../styles/features/myCollections/DeleteButton'
import theme from '../../styles/theme'

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
const EditIdentifiersFrom: React.FC<IProps> = ({ data, onClose }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const myCollection = new MyCollectionParser(data)
  const collectionIdentifiersData = myCollection.getIdentifiers()
  const listOfCollectionIdentifiers: Array<string> = []
  collectionIdentifiersData.map((id) =>
    listOfCollectionIdentifiers.push(...id.identifier),
  )
  const [identifiers, setIdentifiers] = useState<Array<string>>(
    listOfCollectionIdentifiers.length > 0 ? listOfCollectionIdentifiers : [''],
  )
  const [editIdentifiers] = useEditCollectionIdentifiersMutation()

  const handleSave = (event: any): void => {
    event.preventDefault()
    const filteredIdentifiers = identifiers.filter((id) => id !== '')
    editIdentifiers({
      collection: data,
      identifiers: filteredIdentifiers,
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
              alertMessage: `The changes were successfully saved!`,
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
              alertMessage: `The changes could not be made.`,
              alertVariant: 'danger',
            },
          },
        )
      })
    onClose()
  }

  const handleInputChange = (
    e: ChangeEvent<any>,
    indexOfIdentifierToEdit: number,
  ): void => {
    const { value } = e.target
    const newIdArray = [...identifiers]
    newIdArray[indexOfIdentifierToEdit] = value
    setIdentifiers(newIdArray)
  }

  const handleRemoveIdentifier = (indexOfIdentifierToDelete: number): void => {
    setIdentifiers(
      identifiers.filter((n, i) => i !== indexOfIdentifierToDelete),
    )
  }

  const handleAddIdentifierRow = (): void => {
    setIdentifiers([...identifiers, ''])
  }

  // Set the save button to disabled on default
  let isSaveButtonDisabled = true
  // Set the save button to not disabled if there is even 1 form input that is valid
  identifiers.map((id) => {
    if (id !== '') {
      isSaveButtonDisabled = false
    }
  })

  return (
    <Form onSubmit={handleSave}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="identifierFormGroup">
          {identifiers.map((i, ind) => (
            <Row>
              <Col xs={9} className="d-flex align-items-center mb-2">
                <Form.Label className="fs-5 mb-0">
                  <strong>Identifier {ind + 1}</strong>
                </Form.Label>
              </Col>
              {identifiers.length > 1 && (
                <Col xs={3} className="d-flex justify-content-end">
                  <StyledDeleteButton
                    aria-label={`Delete Identifier ${ind}`}
                    onClick={() => handleRemoveIdentifier(ind)}
                    className="mb-2"
                  >
                    <i className="bi bi-trash3 fs-4" />
                  </StyledDeleteButton>
                </Col>
              )}
              <Col xs={12} className="mb-2">
                <Form.Control
                  type="text"
                  value={i}
                  placeholder={i !== '' ? i : 'Enter an identifier...'}
                  onChange={(e) => handleInputChange(e, ind)}
                />
              </Col>
            </Row>
          ))}
        </Form.Group>
      </Row>
      <Row>
        <Col className="d-flex justify-content-start">
          <SecondaryButton
            type="button"
            textColor={theme.color.button}
            actionBgColor={theme.color.button}
            onClick={() => handleAddIdentifierRow()}
          >
            <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
            Add Identifier
          </SecondaryButton>
        </Col>
        <Col className="d-flex justify-content-end">
          <PrimaryButton type="submit" disabled={isSaveButtonDisabled}>
            Save
          </PrimaryButton>
        </Col>
      </Row>
    </Form>
  )
}

export default EditIdentifiersFrom
