import styled from 'styled-components'

const ConnectedDiv = styled.div`
  position: relative;

  &:first-child {
    margin-top: 0;
  }

  &:after {
    border: 0.5px solid #8095e8;
    left: 0;
    right: 0;
    width: 0;
    height: 50px;
    display: block;
    content: '';
    margin-left: 25px;
  }

  &:last-child:after {
    display: none;
  }
`

export default ConnectedDiv
