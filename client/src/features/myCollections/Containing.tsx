import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IMyCollection from '../../types/data/IMyCollection'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import StyledHr from '../../styles/shared/Hr'
import SelectAll from '../common/SelectAll'
import ResultSnippet from '../common/ResultSnippet'
import { pushClientEvent } from '../../lib/pushClientEvent'
import DangerButton from '../../styles/shared/DangerButton'
import { useAppSelector } from '../../app/hooks'
import { IMyCollectionsResultsState } from '../../redux/slices/myCollectionsSlice'

import DeleteRecordsModal from './DeleteRecordsModal'

const getTabName = (uri: string): string => {
  switch (true) {
    case uri.includes('object') || uri.includes('digital'):
      return 'objects'
    case uri.includes('text') || uri.includes('visual'):
      return 'works'
    case uri.includes('set'):
      // Problem with this is that if it is classified as a Personal Collection, it should return 'my-collections'
      return 'collections'
    case uri.includes('person') || uri.includes('group'):
      return 'people'
    case uri.includes('concept'):
      return 'concepts'
    case uri.includes('activity') || uri.includes('period'):
      return 'events'
    default:
      return 'my-collections'
  }
}

const Containing: React.FC<{ data: IMyCollection }> = ({ data }) => {
  const myCollection = new MyCollectionParser(data)
  const containing = myCollection.getContaining()
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const [showDeleteRecordsModal, setShowDeleteRecordsModal] =
    useState<boolean>(false)

  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids } = currentMyCollectionState

  const handleShowDeleteRecordsModal = (): void => {
    setShowDeleteRecordsModal(true)
    pushClientEvent(
      'My Collections',
      'Opened',
      'Delete records from collection modal',
    )
  }

  const handleCloseDeleteRecordsModal = (): void => {
    setShowDeleteRecordsModal(false)
    pushClientEvent(
      'My Collections',
      'Closed',
      'Delete records from collection modal',
    )
  }

  return (
    <StyledEntityPageSection>
      {showDeleteRecordsModal && (
        <DeleteRecordsModal
          showModal={showDeleteRecordsModal}
          onClose={handleCloseDeleteRecordsModal}
          collectionId={myCollection.json.id as string}
          collectionObject={myCollection.json}
        />
      )}
      <Row>
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="d-flex align-items-center"
        >
          <h2>{containing.length} Records</h2>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className={`d-flex ${isMobile ? 'mt-2 flex-wrap' : ''} justify-content-end selectAllMyCollectionsOptionsCol`}
        >
          <DangerButton
            disabled={uuids.length === 0}
            onClick={() => handleShowDeleteRecordsModal()}
            className="m-3 p-2"
          >
            <i className="bi bi-trash3" /> Remove
          </DangerButton>
          <SelectAll uuidsToAdd={containing} scope="containing" />
        </Col>
        <StyledHr />
      </Row>
      <Row>
        <Col xs={12}>
          {containing.length > 0 ? (
            containing.map((c) => ResultSnippet(c, getTabName(c), 'containing'))
          ) : (
            <p className="mb-0 fs-3 p-2" data-testid="no-related-objects-works">
              The collection does not contain any records.
            </p>
          )}
        </Col>
      </Row>
    </StyledEntityPageSection>
  )
}

export default Containing
