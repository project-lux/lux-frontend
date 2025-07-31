import React, { ChangeEvent, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

import StyledDeleteButton from '../../styles/features/myCollections/DeleteButton'
import { commonLanguages } from '../../config/myCollections/languages'
import { commonClassifications } from '../../config/myCollections/classifications'

import MultiSelectDropdown from './MultiSelectDropdown'

interface IMyCollectionsModal {
  index: number
  name: string
  classifications: Array<string>
  languages: Array<string>
  namesLength: number
  handleDeleteName: (ind: number) => void
}

/**
 * Form elements used for entering new name data
 * @param {number} index the current index of the name within the array
 * @param {string} name the current name
 * @param {Array<string>} languages the languages for the current name
 * @param {Array<string>} classifications the classifications for the current name
 * @param {number} namesLength the number of names on the collection
 * @param {(ind: number) => void} handleDeleteName the function to remove the name from the current form state
 * @returns
 */
const EditNameFormElements: React.FC<IMyCollectionsModal> = ({
  index,
  name,
  languages,
  classifications,
  namesLength,
  handleDeleteName,
}) => {
  const [formName, setFormName] = useState<string>(name || 'Enter name...')
  const [selectedClassifications, setSelectedClassifications] =
    useState<Array<string>>(classifications)
  const [selectedLanguages, setSelectedLanguages] =
    useState<Array<string>>(languages)

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

  const handleOnSelectLanguages = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    if (selectedLanguages.includes(value)) {
      // remove from the list of selected
      const ind = selectedLanguages.indexOf(value)
      selectedLanguages.splice(ind, 1)
      console.log('spliced: ', selectedLanguages)

      setSelectedLanguages(selectedLanguages)
    } else {
      setSelectedLanguages([...selectedLanguages, e.target.value])
    }
  }

  // const handleOnCheckboxSelect = (): void => {
  //   if (selectedClassifications.includes())
  // }
  return (
    <React.Fragment>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Row>
            <Col className="d-flex align-items-center">
              <Form.Label className="fs-5 mb-0">
                <strong>Name {index}</strong>
              </Form.Label>
            </Col>
            {namesLength > 1 && (
              <Col className="d-flex justify-content-end">
                <StyledDeleteButton
                  aria-label={`Delete Name ${index}`}
                  onClick={() => handleDeleteName(index - 1)}
                  className="mb-2"
                >
                  <i className="bi bi-trash3 fs-4" />
                </StyledDeleteButton>
              </Col>
            )}
          </Row>
          <Form.Control
            type="text"
            placeholder={formName}
            value={formName === 'Enter name...' ? '' : formName}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: ChangeEvent<any>) => setFormName(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Classification (required)</Form.Label>
          <Form.Control
            value="test"
            as={MultiSelectDropdown}
            options={commonClassifications}
            selectedOptions={selectedClassifications}
            ariaLabel="Select one or more classifications for the name"
            className="editNameClassificationDropdownButton"
            onCheck={handleOnSelectClassifications}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Language of Name (optional)</Form.Label>
          <Form.Control
            value="test"
            as={MultiSelectDropdown}
            options={commonLanguages}
            selectedOptions={selectedLanguages}
            ariaLabel="Select one or more languages for the name"
            className="editNameLanguageDropdownButton"
            onCheck={handleOnSelectLanguages}
          />
        </Form.Group>
      </Row>
    </React.Fragment>
  )
}

export default EditNameFormElements
