import React from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'

const StyledBorderDiv = styled.div`
  border-left: 1px solid ${theme.color.secondary.cornflowerBlue};
  position: absolute;
  top: 0%;
  bottom: 22px;
  left: -1px;
`

/**
 * Button for adding a row to the advanced search form.
 * @returns {JSX.Element}
 */
const Connector: React.FC = () => (
  <div style={{ position: 'relative' }}>
    {/* vertical line */}
    <StyledBorderDiv className="borderLeft" />
    <div className="addNewQueryButton ps-0 pb-0">AND</div>
  </div>
)

export default Connector
