import React from 'react'
import Col from 'react-bootstrap/Col'

import StyledUVContainer from '../../styles/features/common/UVContainer'

type Params = {
  manifest: string
}

const UV: React.FC<Params> = ({ manifest }) => {
  if (manifest === '') {
    return null
  }
  return (
    <StyledUVContainer className="row viewer-container mx-0">
      <Col className="iframe-container d-flex justify-content-center">
        <iframe
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
