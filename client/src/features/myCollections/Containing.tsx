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

  return (
    <StyledEntityPageSection>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <h2>{containing.length} Records</h2>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={3}
          lg={3}
          className={`d-flex ${isMobile ? 'mt-2 flex-wrap' : 'w-auto px-0'} justify-content-end selectAllMyCollectionsOptionsCol`}
        >
          <SelectAll uuidsToAdd={containing} scope="collections" />
        </Col>
        <StyledHr />
      </Row>
      <Row>
        <Col xs={12}>
          {containing.length > 0 ? (
            containing.map((c) => ResultSnippet(c, getTabName(c)))
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
