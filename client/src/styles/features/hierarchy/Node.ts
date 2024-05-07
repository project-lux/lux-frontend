import styled from 'styled-components'

const Node = styled.div`
  height: auto;
  width: auto;
  padding: 5px;
  border-radius: 5px;
  background: transparent;

  .sourceHandle {
    visibility: hidden;
  }

  .targetHandle {
    visibility: hidden;
  }
`

export default Node
