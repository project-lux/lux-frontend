/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { isUndefined } from 'lodash'

import IMyCollection from '../../types/data/IMyCollection'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useEditCollectionWebpagesMutation } from '../../redux/api/ml_api'
import SecondaryButton from '../../styles/shared/SecondaryButton'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import StyledDeleteButton from '../../styles/features/myCollections/DeleteButton'
import theme from '../../styles/theme'
import { commonLanguages } from '../../config/myCollections/languages'
import IWebpages from '../../types/data/IWebpages'

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
const EditWebpageLinksForm: React.FC<IProps> = ({ data, onClose }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const myCollection = new MyCollectionParser(data)
  const collectionWebpages = myCollection.getAllSiteLinks()
  const defaultWebpageData = {
    contentIdentifier: '',
    link: '',
    languages: [],
  }
  const [webpages, setWebpages] = useState<Array<IWebpages>>(
    collectionWebpages.length > 0 ? collectionWebpages : [defaultWebpageData],
  )
  const [editWebpages] = useEditCollectionWebpagesMutation()

  const handleSave = (event: any): void => {
    event.preventDefault()
    editWebpages({
      collection: data,
      webPages: webpages,
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

  const handleLinkInputChange = (
    e: ChangeEvent<any>,
    indexOfWebpageToEdit: number,
  ): void => {
    const { value } = e.target
    const newIdArray = [...webpages]
    newIdArray[indexOfWebpageToEdit].link = value
    setWebpages(newIdArray)
  }

  const handleLabelInputChange = (
    e: ChangeEvent<any>,
    indexOfWebpageToEdit: number,
  ): void => {
    const { value } = e.target
    const newIdArray = [...webpages]
    newIdArray[indexOfWebpageToEdit].contentIdentifier = value
    setWebpages(newIdArray)
  }

  const handleRemoveWebpage = (indexOfWebpageToDelete: number): void => {
    setWebpages(webpages.filter((wp, i) => i !== indexOfWebpageToDelete))
  }

  const handleOnSelectLanguages = (
    e: ChangeEvent<HTMLInputElement>,
    indedOfWebpageToEdit: number,
  ): void => {
    const { value } = e.target
    const webpagesCopy = [...webpages]
    const languagesToEdit = webpagesCopy[indedOfWebpageToEdit].languages
    if (!isUndefined(languagesToEdit)) {
      if (languagesToEdit.includes(value)) {
        // remove from the list of selected
        const ind = languagesToEdit.indexOf(value)
        languagesToEdit.splice(ind, 1)
        webpagesCopy[indedOfWebpageToEdit].languages = languagesToEdit
        setWebpages(webpagesCopy)
      } else {
        webpagesCopy[indedOfWebpageToEdit].languages = [
          ...languagesToEdit,
          value,
        ]
        setWebpages(webpagesCopy)
      }
    } else {
      webpagesCopy[indedOfWebpageToEdit].languages = [value]
    }
  }

  const handleAddIdentifierRow = (): void => {
    setWebpages([...webpages, defaultWebpageData])
  }

  // Set the save button to disabled on default
  let isSaveButtonDisabled = true
  // Set the save button to not disabled if there is even 1 form input that is valid
  webpages.map((wp) => {
    if (wp.link !== '') {
      isSaveButtonDisabled = false
    }
  })

  return (
    <Form onSubmit={handleSave}>
      {webpages.map((wp, ind) => {
        const { link, contentIdentifier, languages } = wp
        return (
          <React.Fragment>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="identifierFormGroup">
                <Row>
                  <Col xs={9} className="d-flex align-items-center mb-2">
                    <Form.Label className="fs-5 mb-0">
                      <strong>Link {ind + 1}</strong>
                    </Form.Label>
                  </Col>
                  {webpages.length > 1 && (
                    <Col xs={3} className="d-flex justify-content-end">
                      <StyledDeleteButton
                        aria-label={`Delete Identifier ${ind}`}
                        onClick={() => handleRemoveWebpage(ind)}
                        className="mb-2"
                      >
                        <i className="bi bi-trash3 fs-4" />
                      </StyledDeleteButton>
                    </Col>
                  )}
                  <Col xs={12} className="mb-2">
                    <Form.Control
                      type="text"
                      value={link}
                      placeholder={link !== '' ? link : 'Enter a link...'}
                      onChange={(e) => handleLinkInputChange(e, ind)}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="nameClassificationFormGroup">
                <Form.Label>Display Label (required)</Form.Label>
                <Form.Control
                  type="text"
                  value={contentIdentifier}
                  placeholder={
                    contentIdentifier !== ''
                      ? contentIdentifier
                      : 'Enter a label...'
                  }
                  onChange={(e) => handleLabelInputChange(e, ind)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Display Label Language (optional)</Form.Label>
                <Form.Control
                  value="test"
                  as={MultiSelectDropdown}
                  options={commonLanguages}
                  selectedOptions={languages || []}
                  ariaLabel="Select one or more languages for the name"
                  className="editNameLanguageDropdownButton"
                  indexOfData={ind}
                  onCheck={handleOnSelectLanguages}
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
            onClick={() => handleAddIdentifierRow()}
          >
            <i className="bi bi-plus-lg mx-2 d-inline-block ms-0" />
            Add Link
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

export default EditWebpageLinksForm
