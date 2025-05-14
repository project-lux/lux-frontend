import styled from 'styled-components'

interface IProps {
  display: string
  transformX?: string
  transformY?: string
}

const ConnectedDiv = styled.div<IProps>`
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
    display: ${(props) => props.display};
    content: '';
    margin-left: 38px;
  }

  &:last-child:after {
    display: none;
  }
`

export default ConnectedDiv
