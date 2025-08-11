import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import IMyCollection from '../../types/data/IMyCollection'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useEditDefaultCollectionMutation } from '../../redux/api/ml_api'

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
const SetAsDefault: React.FC<IProps> = ({ data, onClose }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [setDefault] = useEditDefaultCollectionMutation()

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
    <Row>
      <Col xs={12}>
        <p>
          Set as your default collection. It will stay pinned at the top of My
          Collections and can be changed anytime.
        </p>
      </Col>
      <Col xs={12} className="d-flex justify-content-end">
        <PrimaryButton type="button" onClick={(e) => handleSave(e)}>
          Save
        </PrimaryButton>
      </Col>
    </Row>
  )
}

export default SetAsDefault
