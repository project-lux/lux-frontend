import styled from 'styled-components'

interface IProps {
  className?: string
}

const Sup = styled.sup<IProps>`
  ${(props) => (props.className === 'contentHtml' ? 'top: 0.75em' : '')};
`

export default Sup
