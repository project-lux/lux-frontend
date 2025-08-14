import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { isUndefined } from 'lodash'

import IMyCollection from '../../types/data/IMyCollection'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import {
  useEditDefaultCollectionMutation,
  useGetItemQuery,
} from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'

interface IProps {
  data: IMyCollection
  onClose: () => void
  currentUserUuid?: string
}
/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} data the my collection object
 * @param {() => void} onClose function to close the modal
 * @param {string} currentUserUuid optional; the current logged in user's UUID
 * @returns
 */
const SetAsDefault: React.FC<IProps> = ({ data, onClose, currentUserUuid }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [setDefault] = useEditDefaultCollectionMutation()

  const { data: userData, isSuccess } = useGetItemQuery(
    { uri: stripYaleIdPrefix(currentUserUuid as string) },
    { skip: isUndefined(currentUserUuid) },
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (event: any): void => {
    event.preventDefault()
    if (isSuccess && userData) {
      setDefault({
        collectionUuid: data.id as string,
        currentUser: userData,
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
    } else {
      navigate(
        {
          pathname,
        },
        {
          state: {
            showAlert: true,
            alertMessage: `The change could not be made. The user data could not be retrieved.`,
            alertVariant: 'danger',
          },
        },
      )
    }
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
