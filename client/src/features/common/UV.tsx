import React from 'react'
import Col from 'react-bootstrap/Col'

import StyledUVContainer from '../../styles/features/common/UVContainer'

type Params = {
  manifest: string
}

/**
 * Wrapper around Universal Viewer (https://universalviewer.io/).
 *
 * @param {manifest: string} - URI of IIIF manifest fed to Universal Viewer
 */
const UV: React.FC<Params> = ({ manifest }) => {
  if (manifest === '') {
    return null
  }
  return (
    <StyledUVContainer className="row viewer-container mx-0">
      <Col className="iframe-container d-flex justify-content-center">
        <iframe
          key={manifest} // reload iframe when manifest changes
          title="Universal Viewer"
          src={`/uv/uv.html#?manifest=${manifest}`}
          allowFullScreen
          data-testid="uv-viewer"
        />
      </Col>
    </StyledUVContainer>
  )
}

export default UV
