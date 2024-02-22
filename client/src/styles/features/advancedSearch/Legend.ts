import styled from 'styled-components'

// The legend is positioned off-screen
const Legend = styled.legend`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`

export default Legend
