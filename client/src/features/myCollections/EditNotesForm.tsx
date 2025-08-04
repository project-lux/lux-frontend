/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { isUndefined } from 'lodash'

import IMyCollection from '../../types/data/IMyCollection'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useEditCollectionNotesMutation } from '../../redux/api/ml_api'
import SecondaryButton from '../../styles/shared/SecondaryButton'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import StyledDeleteButton from '../../styles/features/myCollections/DeleteButton'
import theme from '../../styles/theme'
import { commonLanguages } from '../../config/myCollections/languages'
import { INoteContent } from '../../types/IContentWithLanguage'
import { commonClassifications } from '../../config/myCollections/classifications'

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
const EditNotesForm: React.FC<IProps> = ({ data, onClose }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const myCollection = new MyCollectionParser(data)
  const collectionNotes = myCollection.getNotesForEditing()
  const defaultNotesData: INoteContent = {
    content: '',
    classifications: [],
    languages: [],
    label: '',
    labelLanguages: [],
  }
  const [notes, setNotes] = useState<Array<INoteContent>>(
    collectionNotes.length > 0 ? collectionNotes : [defaultNotesData],
  )
  const [editNotes] = useEditCollectionNotesMutation()

  const handleSave = (event: any): void => {
    event.preventDefault()
    editNotes({
      collection: data,
      notes,
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

  const handleNoteInputChange = (
    e: ChangeEvent<any>,
    indexOfNoteToEdit: number,
  ): void => {
    const { value } = e.target
    const newIdArray = [...notes]
    newIdArray[indexOfNoteToEdit].content = value
    setNotes(newIdArray)
  }

  const handleSelectNoteClassification = (
    e: ChangeEvent<any>,
    indexOfNoteToEdit: number,
  ): void => {
    const { value } = e.target
    const newNoteArray = [...notes]
    const noteToEdit = newNoteArray[indexOfNoteToEdit]
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
    newNoteArray[indexOfNoteToEdit] = noteToEdit
    setNotes(newNoteArray)
  }

  const handleSelectNoteLanguage = (
    e: ChangeEvent<any>,
    indexOfNoteToEdit: number,
  ): void => {
    const { value } = e.target
    const newNoteArray = [...notes]
    const noteToEdit = newNoteArray[indexOfNoteToEdit]
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
    newNoteArray[indexOfNoteToEdit] = noteToEdit
    setNotes(newNoteArray)
  }

  const handleLabelInputChange = (
    e: ChangeEvent<any>,
    indexOfNoteToEdit: number,
  ): void => {
    const { value } = e.target
    const newIdArray = [...notes]
    newIdArray[indexOfNoteToEdit].label = value
    setNotes(newIdArray)
  }

  const handleOnSelectLabelLanguages = (
    e: ChangeEvent<HTMLInputElement>,
    indexOfNoteToEdit: number,
  ): void => {
    const { value } = e.target
    const notesCopy = [...notes]
    const labelLanguages = notesCopy[indexOfNoteToEdit].labelLanguages
    if (!isUndefined(labelLanguages)) {
      if (labelLanguages.includes(value)) {
        // remove from the list of selected
        const ind = labelLanguages.indexOf(value)
        labelLanguages.splice(ind, 1)
        notesCopy[indexOfNoteToEdit].labelLanguages = labelLanguages
      } else {
        notesCopy[indexOfNoteToEdit].labelLanguages = [...labelLanguages, value]
      }
    } else {
      notesCopy[indexOfNoteToEdit].labelLanguages = [value]
    }
    setNotes(notesCopy)
  }

  const handleAddNoteRow = (): void => {
    setNotes([...notes, defaultNotesData])
  }

  const handleRemoveNote = (indexOfNoteToDelete: number): void => {
    setNotes(notes.filter((wp, i) => i !== indexOfNoteToDelete))
  }

  // Set the save button to disabled on default
  let isSaveButtonDisabled = true
  // Set the save button to not disabled if there is even 1 form input that is valid
  notes.map((note) => {
    if (note.content !== '') {
      isSaveButtonDisabled = false
    }
  })

  return (
    <Form onSubmit={handleSave}>
      {notes.map((note, ind) => {
        const { content, classifications, languages, label, labelLanguages } =
          note
        return (
          <React.Fragment>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="noteFormGroup">
                <Row>
                  <Col xs={9} className="d-flex align-items-center mb-2">
                    <Form.Label className="fs-5 mb-0">
                      <strong>Note {ind + 1}</strong>
                    </Form.Label>
                  </Col>
                  {notes.length > 1 && (
                    <Col xs={3} className="d-flex justify-content-end">
                      <StyledDeleteButton
                        aria-label={`Delete Note ${ind}`}
                        onClick={() => handleRemoveNote(ind)}
                        className="mb-2"
                      >
                        <i className="bi bi-trash3 fs-4" />
                      </StyledDeleteButton>
                    </Col>
                  )}
                  <Col xs={12} className="mb-2">
                    <Form.Control
                      type="text"
                      value={content}
                      placeholder={
                        content !== ''
                          ? content
                          : "What's your collection about?"
                      }
                      onChange={(e) => handleNoteInputChange(e, ind)}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="classificationFromGroup">
                <Form.Label>Classifications (required)</Form.Label>
                <Form.Control
                  as={MultiSelectDropdown}
                  options={commonClassifications}
                  selectedOptions={classifications || []}
                  ariaLabel="Select one or more classifications for the note"
                  className="editNoteClassificationDropdownButton"
                  indexOfData={ind}
                  onCheck={handleSelectNoteClassification}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Languages (optional)</Form.Label>
                <Form.Control
                  as={MultiSelectDropdown}
                  options={commonLanguages}
                  selectedOptions={languages || []}
                  ariaLabel="Select one or more languages for the note"
                  className="editNoteLanguageDropdownButton"
                  indexOfData={ind}
                  onCheck={handleSelectNoteLanguage}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="nameClassificationFormGroup">
                <Form.Label>Display Label (optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={label}
                  placeholder={label !== '' ? label : 'Enter a label...'}
                  onChange={(e) => handleLabelInputChange(e, ind)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Display Label Language (optional)</Form.Label>
                <Form.Control
                  as={MultiSelectDropdown}
                  options={commonLanguages}
                  selectedOptions={labelLanguages || []}
                  ariaLabel="Select one or more languages for the label"
                  className="editNoteLabelLanguageDropdownButton"
                  indexOfData={ind}
                  onCheck={handleOnSelectLabelLanguages}
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
            textColor={theme.color.button}
            actionBgColor={theme.color.button}
            onClick={() => handleAddNoteRow()}
          >
            <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
            Add Note
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

export default EditNotesForm
