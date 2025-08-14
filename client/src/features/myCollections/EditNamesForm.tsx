/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import SecondaryButton from '../../styles/shared/SecondaryButton'
import IMyCollection from '../../types/data/IMyCollection'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import theme from '../../styles/theme'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import INames from '../../types/myCollections/INames'
import { commonClassifications } from '../../config/myCollections/classifications'
import { commonLanguages } from '../../config/myCollections/languages'
import StyledDeleteButton from '../../styles/features/myCollections/DeleteButton'
import { useEditCollectionNamesMutation } from '../../redux/api/ml_api'

import MultiSelectDropdown from './MultiSelectDropdown'

interface IProps {
  data: IMyCollection
  onClose: () => void
}

/**
 * Form elements used for entering new name data
 * @param {IMyCollection} data the collection json
 * @param {() => void} onClose function to close the modal
 * @returns
 */
const EditNamesForm: React.FC<IProps> = ({ data, onClose }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const myCollection = new MyCollectionParser(data)
  const collectionNames = myCollection.getNamesForEditing()
  const defaultNamesData: INames = {
    name: '',
    classifications: [],
    languages: [],
  }
  const [names, setNames] = useState<Array<INames>>(
    collectionNames.length > 0 ? collectionNames : [defaultNamesData],
  )
  const [editNames] = useEditCollectionNamesMutation()

  const handleSave = (event: any): void => {
    event.preventDefault()
    editNames({
      collection: data,
      names,
    })
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

  const handleNameInputChange = (
    e: ChangeEvent<any>,
    indexOfNameToEdit: number,
  ): void => {
    const { value } = e.target
    const newNameArray = [...names]
    newNameArray[indexOfNameToEdit].name = value
    setNames(newNameArray)
  }

  const handleSelectNameClassification = (
    e: ChangeEvent<any>,
    indexOfNameToEdit: number,
  ): void => {
    const { value } = e.target
    const newNoteArray = [...names]
    const noteToEdit = newNoteArray[indexOfNameToEdit]
    if (noteToEdit.hasOwnProperty('classifications')) {
      const { classifications } = noteToEdit
      if (noteToEdit.classifications?.includes(value)) {
        const indexOfClassificationToRemove = classifications?.indexOf(
          value,
        ) as number
        classifications?.splice(indexOfClassificationToRemove, 1)
      } else {
        classifications?.push(value)
      }
    } else {
      noteToEdit.classifications = [value]
    }
    newNoteArray[indexOfNameToEdit] = noteToEdit
    setNames(newNoteArray)
  }

  const handleSelectNameLanguage = (
    e: ChangeEvent<any>,
    indexOfNameToEdit: number,
  ): void => {
    const { value } = e.target
    const newNoteArray = [...names]
    const noteToEdit = newNoteArray[indexOfNameToEdit]
    if (noteToEdit.hasOwnProperty('languages')) {
      const { languages } = noteToEdit
      if (noteToEdit.languages?.includes(value)) {
        const indexOfClassificationToRemove = languages?.indexOf(
          value,
        ) as number
        languages?.splice(indexOfClassificationToRemove, 1)
      } else {
        languages?.push(value)
      }
    } else {
      noteToEdit.languages = [value]
    }
    newNoteArray[indexOfNameToEdit] = noteToEdit
    setNames(newNoteArray)
  }

  const handleAddNewName = (): void => {
    setNames([...names, defaultNamesData])
  }

  const handleRemoveName = (indexOfNameToDelete: number): void => {
    setNames(names.filter((n, i) => i !== indexOfNameToDelete))
  }

  return (
    <Form onSubmit={handleSave}>
      {names.map((n, ind) => {
        const { name, languages, classifications } = n
        return (
          <React.Fragment>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Row>
                  <Col className="d-flex align-items-center">
                    <Form.Label className="fs-5 mb-0">
                      <strong>Name {ind + 1}</strong>
                    </Form.Label>
                  </Col>
                  {names.length > 1 && (
                    <Col className="d-flex justify-content-end">
                      <StyledDeleteButton
                        aria-label={`Delete Name ${ind}`}
                        onClick={() => handleRemoveName(ind)}
                        className="mb-2"
                      >
                        <i className="bi bi-trash3 fs-4" />
                      </StyledDeleteButton>
                    </Col>
                  )}
                </Row>
                <Form.Control
                  type="text"
                  placeholder={name !== '' ? name : 'Enter name...'}
                  value={name}
                  onChange={(e: ChangeEvent<any>) =>
                    handleNameInputChange(e, ind)
                  }
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="nameClassificationFormGroup">
                <Form.Label>Classification (required)</Form.Label>
                <Form.Control
                  as={MultiSelectDropdown}
                  options={commonClassifications}
                  selectedOptions={classifications}
                  indexOfData={ind}
                  ariaLabel="Select one or more classifications for the name"
                  className="editNameClassificationDropdownButton"
                  onCheck={handleSelectNameClassification}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Language of Name (optional)</Form.Label>
                <Form.Control
                  as={MultiSelectDropdown}
                  options={commonLanguages}
                  selectedOptions={languages}
                  indexOfData={ind}
                  ariaLabel="Select one or more languages for the name"
                  className="editNameLanguageDropdownButton"
                  onCheck={handleSelectNameLanguage}
                />
              </Form.Group>
            </Row>
          </React.Fragment>
        )
      })}
      <Row>
        <Col className="d-flex justify-content-start">
          <SecondaryButton
            type="button"
            onClick={() => handleAddNewName()}
            textColor={theme.color.button}
            actionBgColor={theme.color.button}
          >
            <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
            Add Name
          </SecondaryButton>
        </Col>
        <Col className="d-flex justify-content-end">
          <PrimaryButton type="submit">Save</PrimaryButton>
        </Col>
      </Row>
    </Form>
  )
}

export default EditNamesForm
