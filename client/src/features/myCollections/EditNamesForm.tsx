import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

import SecondaryButton from '../../styles/shared/SecondaryButton'
import IMyCollection from '../../types/data/IMyCollection'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import theme from '../../styles/theme'
import PrimaryButton from '../../styles/shared/PrimaryButton'

import EditNameFormElements from './EditNameFormElements'

interface IMyCollectionsModal {
  data: IMyCollection
  onFormSave: (e: React.FormEvent<HTMLFormElement>) => void
}

/**
 * Form elements used for entering new name data
 * @param {IMyCollection} data the collection json
 * @returns
 */
const EditNamesForm: React.FC<IMyCollectionsModal> = ({ data, onFormSave }) => {
  const myCollection = new MyCollectionParser(data)
  const namesData = myCollection.getNamesForEditing()
  const [namesToEdit, setNamesToEdit] = useState<
    Array<{
      name: string
      languages: Array<string>
      classifications: Array<string>
    }>
  >(namesData)

  const handleAddNewName = (): void => {
    setNamesToEdit([
      ...namesToEdit,
      { name: '', classifications: [], languages: [] },
    ])
  }

  const handleDeleteName = (indexOfNameToDelete: number): void => {
    setNamesToEdit(namesToEdit.filter((n, i) => i !== indexOfNameToDelete))
  }

  return (
    <Form onSubmit={onFormSave}>
      {namesToEdit.map((d, ind) => {
        const { name, languages, classifications } = d
        return (
          <EditNameFormElements
            index={ind + 1}
            name={name}
            languages={languages}
            classifications={classifications}
            namesLength={namesToEdit.length}
            handleDeleteName={handleDeleteName}
          />
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
