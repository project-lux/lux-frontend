import React, { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { isNull } from 'lodash'

import { useGetRelatedListsQuery } from '../../redux/api/ml_api'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { pushClientEvent } from '../../lib/pushClientEvent'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import RelatedList from '../relatedLists/RelatedList'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'

import InteractiveMap from './InteractiveMap'

interface ILocationsProps {
  halLink: {
    href: string
    _estimate: number | null
  }
}

const Container: React.FC<ILocationsProps> = ({ halLink }) => {
  const [show, setShow] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const { href } = halLink

  const { data, isSuccess, isLoading } = useGetRelatedListsQuery({
    url: href,
  })

  useResizeableWindow(setIsMobile)

  if (isLoading) {
    return (
      <StyledEntityPageSection>
        <p>Loading...</p>
      </StyledEntityPageSection>
    )
  }

  // Check if returned data is valid
  if (isSuccess) {
    if (isNull(data)) {
      return null
    }
    if (data) {
      const { results } = data
      // If there are no results return null
      if (results === null || Object.keys(results).length === 0) {
        return null
      }
    }
  }

  if (isSuccess && data) {
    return (
      <StyledEntityPageSection className="row">
        <Col xs={12} sm={12} md={9} lg={9} xl={9}>
          <h2>Related Locations</h2>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          className={`d-flex ${isMobile ? 'justify-content-start' : 'justify-content-end'}'`}
        >
          <PrimaryButton
            variant="button"
            className="viewMapButton"
            onClick={() => {
              pushClientEvent('Map Button', 'Selected', 'View Map')
              setShow(!show)
            }}
            data-testid="locations-view-map-button"
          >
            View on a map
          </PrimaryButton>
        </Col>
        <Modal
          className="h-100"
          show={show}
          animation={false}
          size="xl"
          onHide={() => setShow(false)}
        >
          <Modal.Body>
            <InteractiveMap />
          </Modal.Body>
        </Modal>
        <Row>
          <Col>
            {data !== null && (
              <RelatedList
                activeAccordion={true}
                results={data.results}
                halLink={href}
                next={undefined}
                title="Related Locations"
              />
            )}
          </Col>
        </Row>
      </StyledEntityPageSection>
    )
  }

  return null
}

export default Container
