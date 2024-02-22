import styled from 'styled-components'

import theme from '../../theme'

export const StyledInput = styled.input`
  height: auto;
  width: 100%;
  border: none;
  border: 1px solid ${theme.color.button};
  border-radius: 5px !important;
  min-width: 100px;
`
