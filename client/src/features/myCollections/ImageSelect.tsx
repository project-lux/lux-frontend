import React, { ChangeEvent, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

import IMyCollection from '../../types/data/IMyCollection'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { commonLanguages } from '../../config/myCollections/languages'

import MultiSelectDropdown from './MultiSelectDropdown'

interface IMyCollectionsModal {
  data: IMyCollection
  onFormSave: (e: React.FormEvent<HTMLFormElement>) => void
}

/**
 * Form elements used for entering new name data
 * @param {IMyCollection} data the collection json
 * @returns
 */
const ImageSelect: React.FC<IMyCollectionsModal> = ({ data, onFormSave }) => {
  const myCollection = new MyCollectionParser(data)
  const images = myCollection.getImages()
  console.log(images)

  const [selectedLanguages, setSelectedLanguages] = useState<Array<string>>([])

  const handleOnSelectLanguages = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    if (selectedLanguages.includes(value)) {
      // remove from the list of selected
      const ind = selectedLanguages.indexOf(value)
      selectedLanguages.splice(ind, 1)

      setSelectedLanguages(selectedLanguages)
    } else {
      setSelectedLanguages([...selectedLanguages, e.target.value])
    }
  }

  return (
    <Form onSubmit={onFormSave}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Row>
            <Col xs={12} className="d-flex align-items-center">
              <Form.Label className="fs-5 mb-0">
                <strong>Cover Image</strong>
              </Form.Label>
            </Col>
            <Col xs={12} className="d-flex justify-content-end">
              <Form.Control as={ImageSelect} />
            </Col>
          </Row>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Description</Form.Label>
          <Form.Control value="test" type="text" required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Description Language (optional)</Form.Label>
          <Form.Control
            value="test"
            as={MultiSelectDropdown}
            options={commonLanguages}
            selectedOptions={selectedLanguages}
            ariaLabel="Select one or more languages for the name"
            onCheck={handleOnSelectLanguages}
          />
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

export default ImageSelect
